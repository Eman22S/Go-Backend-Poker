package sngscheduler

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/go-redis/redis/v8"
)

/* todo list to implement a scheduler module
. make sure to use GRPC
. scheduler should create a timer
. timer should have a default action upon completion
. program should allow cancellation of said timer before completion if action was taken
. Redis is used to publish and subscribe actions
. main backend server will publish a redis actions; the scheduler subscribes
. resetting should be prepared
. concurrency of gameplays should be taken under consideration
. pop not recommended as more actions might be pushed in between publish and receive
. in case of server restart, timers should be reset based on their message createdAt time and timout
. don't forget to remove action from any slice you've place it in
{
	listName, entryValue, defaultFunctionName, functionArguments, timeout, actionTaken, createdAt
}
*/

type Payload struct {
	Id                  string `json:"id"`
	ListName            string `json:"listName"`
	DefaultFunctionName string `json:"defaultFunctionName"`
	FunctionArguments   string `json:"functionArguments"`
	Timeout             int    `json:"timeout"`
	ActionTaken         bool   `json:"actionTaken"`
	CreatedAt           string `json:"createdAt"`
}

type Action struct {
	id                string
	functionName      string
	functionArguments string
	timeout           *time.Timer
}

var ctx = context.Background()
var actionSlice []Action

// map function-references from any package to their functionNames
var callbackMap = map[string]func(*[]string){
	"foldOnTurn":  foldOnTurn,
	"checkOnTurn": checkOnTurn,
}

// sample functions to test the callbackExecutor
func foldOnTurn(args *[]string) {
	fmt.Println("folding", args)
}

// sample functions to test the callbackExecutor
func checkOnTurn(args *[]string) {
	fmt.Println("checking", args)
}

// This is the main entry function for the scheduler
func ScheduleOperations() {
	rdb := redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "", // no password set
		DB:       0,  // use default DB
	})
	subscriber := rdb.Subscribe(ctx, "poker_game")
	defer subscriber.Close()
	ch := subscriber.Channel()

	reInitializeTimers(rdb)
	for msg := range ch {
		manageSubscritpionPayload(msg.Payload, rdb)
	}
}

/*
the operations existance within a redis list shows that they have not yet been executed
This method should be called at the beginning of the scheduler
*/
// Re-Initialize timers upon server restart
func reInitializeTimers(redisClient *redis.Client) {
	keys, _ := redisClient.Scan(ctx, 0, "", 0).Val()
	for _, list := range keys {
		fmt.Println("checking operations in list", list)
		n := redisClient.LLen(ctx, list).Val()
		var i int64
		for i = 0; i < n; i++ {
			val, err := redisClient.LIndex(ctx, list, i).Result()
			if err != nil {
				panic(err)
			} else {
				payload := Payload{}
				json.Unmarshal([]byte(val), &payload)
				if payload.CreatedAt != "" {
					createActionFromPayloadToSetTimer(&payload, redisClient)
				}
			}
		}
	}
}

// Evaluates what action to perform on the publised message
func manageSubscritpionPayload(message string, redisClient *redis.Client) {
	payload := Payload{}
	json.Unmarshal([]byte(message), &payload)
	fmt.Println("looking for action in ", payload.ListName)
	if payload.ActionTaken {
		removeActionFromActionSlice(&payload)
		removeActionFromOperationList(&payload, redisClient)
	} else {
		// this will create an action timer even if there action was not pushed
		// to operations list in redis by the server
		createActionFromPayloadToSetTimer(&payload, redisClient)
	}
}

// Use the payload from the subscription to create an action and set the timer
func createActionFromPayloadToSetTimer(payload *Payload, redisClient *redis.Client) {
	action := Action{id: payload.Id, functionName: payload.DefaultFunctionName, functionArguments: payload.FunctionArguments}
	createdTime, err := time.Parse(time.RFC3339, payload.CreatedAt)
	if err != nil {
		panic(err)
	}
	endTime := createdTime.Add(time.Second * time.Duration(int64(payload.Timeout)))
	if time.Now().After(endTime) {
		// operation end time has passed; login should be decided on what do here
		fmt.Println("operation end time has already passed")
		removeActionFromOperationList(payload, redisClient)
		return
	}
	timeLeftInSeconds := time.Until(endTime).Seconds()
	action.timeout = createNewTimer(int(timeLeftInSeconds), func() {
		// other function calls go here
		callbackExecuter(action.functionArguments, callbackMap[action.functionName])
		removePendingAction(payload, nil)
		removeActionFromOperationList(payload, redisClient)
	})
	actionSlice = append(actionSlice, action)
}

func removePendingAction(payload *Payload, redisClient *redis.Client) {
	if len(actionSlice) < 1 {
		return
	}
	var newActions []Action
	for _, action := range actionSlice {
		if action.id == payload.Id {
			action.clearTimerForAction()
			action = Action{}
			actionSlice = actionSlice[:len(actionSlice)-1]
			break
		} else {
			newActions = append(newActions, action)
		}
	}
	actionSlice = newActions
}

// Remove the action from actions slice
func removeActionFromActionSlice(payload *Payload) {
	if len(actionSlice) < 1 {
		return
	}
	var newActions []Action
	for _, action := range actionSlice {
		if action.id == payload.Id {
			action.clearTimerForAction()
			action = Action{}
			actionSlice = actionSlice[:len(actionSlice)-1]
			break
		} else {
			newActions = append(newActions, action)
		}
	}
	actionSlice = newActions
}

// Removes the action from redis list upon completion of the task
func removeActionFromOperationList(payload *Payload, redisClient *redis.Client) {
	n := redisClient.LLen(ctx, payload.ListName).Val()
	var i int64
	for i = 0; i < n; i++ {
		val, err := redisClient.LIndex(ctx, payload.ListName, i).Result()
		if err != nil {
			if err == redis.Nil {
				fmt.Println("key does not exists")
				return
			}
			panic(err)
		}
		if strings.Contains(val, payload.Id) {
			redisClient.LRem(ctx, payload.ListName, 1, val)
			break
		}
	}
}

// Stops the timer of the pending action
func (action *Action) clearTimerForAction() {
	stopTimer := action.timeout.Stop()
	if stopTimer {
		fmt.Println("timer stoped for id", action.id)
	}
}

// Creates a new timer and returns the pointer to allow early cancellation.
func createNewTimer(seconds int, action func()) *time.Timer {
	timer := time.NewTimer(time.Second * time.Duration(seconds))

	go func() {
		<-timer.C
		action()
	}()
	fmt.Println("timer set for", seconds, "seconds")
	return timer
}

// execute the callback function on timer end
func callbackExecuter(functionArguments string, f func(params *[]string)) {
	args := strings.Split(functionArguments, ",")
	for i := range args {
		args[i] = strings.TrimSpace(args[i])
	}
	f(&args)
}
