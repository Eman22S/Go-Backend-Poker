import React, { useEffect, useState } from "react";


import { useForm } from "react-hook-form";


import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextFieldx from "./fragments/TextFieldx";
import Buttonx from "./fragments/Buttonx";
import MenuItem from "@material-ui/core/MenuItem";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import Typographyx from "./fragments/Typographyx";
import CardContent from "@material-ui/core/CardContent";
import Loading from "./fragments/Loading";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import { useSnackBarContext } from "../contexts/snackbar";

import useGrpcClient from "../contexts/grpc_client";


const questions = [
  "What was the house number and street name you lived in as a child?",
  "What were the last four digits of your childhood telephone number?",
  "What primary school did you attend?",
  "In what town or city was your first full time job?",
  "In what town or city did you meet your spouse or partner?",
  "What is the middle name of your oldest child?",
  "What are the last five digits of your driver's license number?",
  "What is your grandmother's (on your mother's side) maiden name?",
  "What is your spouse or partner's mother's maiden name?",
  "In what town or city did your parents meet?",
  "What time of the day were you born? (hh:mm)",
  "What time of the day was your first child born? (hh:mm)",
];


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 24,
  },
  pos: {
    marginBottom: 12,
  },
  disabled: {
    "&$disabled": {
      backgroundColor: "#0A2042",
    },
  },
});


export default function SecurityQuestions({
  submitLoading,
  
}) {

  const showSnackBar = useSnackBarContext();

  const [formData, setFormData] = useState(null);
  const [question1, setQuestion1] = useState(questions[1]);
  const [question2, setQuestion2] = useState(questions[2]);
  const [password, setPassword] = useState("");
  const [open, setOpen] = React.useState(false);
  const {
    register,
    handleSubmit,
    watch,
    errors,
    setValue
  } = useForm({
    defaultValues: {
          // react-hook-form needs values set here to work with default values properly
          question1: questions[0],
          answer1: "",
          question2: questions[1],
          answer2: "",
        },
  });

  const grpc_client = useGrpcClient();

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setOpen(false);
    let data = formData;
    data["password"] = password;


    console.log("data");
    console.log(data);



    
   grpc_client.updateSecurityQuestions(
      data,
      (response)=>{
        console.log(response.getSuccess())
        if(response.getSuccess()){
          showSnackBar('Updated !', 'success')

        }else{
          showSnackBar('Incorrect Password', 'error')
        }
        console.log(response)

      },
      on_error
    );
  };



  const onFormSubmit = (data) => {
    console.log("data!!!!!!!!")
    
    delete data["question1"];
    delete data["question2"] ;
    data["question1"] = question1;
    data["question2"] = question2;


    if (question1 === question2){
      showSnackBar('Question 2 must be different from question 1.', 'error')
    }else{
      console.log(data)
      setFormData(data)

      setOpen(true);
    }

    /*setForm3Data(data);
    let all_user_data = Object.assign({}, form1Data, form2Data, data);
    setSignupBtnLoading(true);
    console.log("sign up data")
    console.log(all_user_data)
    grpc_client.signup(all_user_data, on_signup_response, on_signup_error);*/
  };



  const signupDisabled = submitLoading;

  // use this handler so material-ui select can work with react-hook-form
  const changeSelectUsing = (name,setFunc) => (e) => {
    setValue(name, e.target.value);
    setFunc(e.target.value)
  };


  useEffect(() => {
    getSecurityQuestions();
    //eslint-disable-next-line  
  }, [])


  const getSecurityQuestions = () => {
    grpc_client.getUserSecurityQuestions((resp) => {
      console.log("getSecurityQuestions");
      let questions_list = JSON.parse(resp.getQuestions());
      console.log(questions_list)

      if(questions_list.length > 1 ){

        //setValue("question1",questions[8])
        console.log(questions_list[0]);
        console.log(typeof(questions_list[0]))
        setQuestion1(questions_list[0].question)
        //setValue("question2",questions[7])
        setQuestion2(questions_list[1].question)
        /*let tempFormData = {
          question1: questions[5],
          answer1: "hi",
          question2: questions[5],
          answer2: "hi",
        }


        setFormData(tempFormData)*/

        console.log(resp.getQuestions())
      }

    }, on_error);
  }
  const on_error = (custom_msg) => {
    console.log(custom_msg);
    if (custom_msg) {
        console.log(custom_msg);
    }
  }

  // custom register material-ui select so that they can work with react-hook-from properly
  useEffect(() => {
    register(
      { name: "question1" },
      {
        required: "Question 1 is required.",
        validate: (value) =>
          value !== watch("question2") ||
          "Question 1 must be different from question 2.",
      }
    );
    register(
      { name: "question2" },
      {
        required: "Question 2 is required.",
        validate: (value) =>
          value !== watch("question1") ||
          "Question 2 must be different from question 1.",
      }
    );
  }, [register, watch]);

  return (
    <React.Fragment>
      <Container maxWidth="lg" align="left">
        <Grid item xs={12}>
          <Typographyx
            className={classes.pos}
            variant="h6"
            color="textSecondary"
          >
            Update Security Questions
          </Typographyx>
        </Grid>

        <Grid item xs={10}>
          <Card className={classes.root}>
          <React.Fragment>
                <CardContent>
                    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextFieldx
                            select={true}
                            name="question1"
                            onChange={changeSelectUsing("question1" ,setQuestion1)}
                            value={question1}
                            //defaultValue={questions[0]}
                            variant="outlined"
                            margin="normal"
                            placeholder=""
                            required
                            fullWidth
                            id="question1"
                            label="Question 1"
                            autoComplete="question1"
                            autoFocus
                            my={0.5}
                            error={Boolean(errors.question1)}
                            helperText={errors.question1?.message}
                          >
                            {questions.map((text, index) => (
                              <MenuItem value={text} key={index}>
                                {text}
                              </MenuItem>
                            ))}
                          </TextFieldx>
                        </Grid>
                        <Grid item xs={12}>
                          <TextFieldx
                            name="answer1"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Answer 1"
                            type="text"
                            id="answer1"
                            autoComplete=""
                            my={1}
                            inputRef={register({
                              required: "Answer 1 is required.",
                            })}
                            error={Boolean(errors.answer1)}
                            helperText={errors.answer1?.message}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextFieldx
                            select={true}
                            name="question2"
                            onChange={changeSelectUsing("question2" ,setQuestion2)}
                            value={question2}
                            //defaultValue={questions[1]}
                            variant="outlined"
                            margin="normal"
                            placeholder=""
                            required
                            fullWidth
                            id="question2"
                            label="Question 2"
                            autoComplete="question2"
                            autoFocus
                            my={0.5}
                            error={Boolean(errors.question2)}
                            helperText={errors.question2?.message}
                          >
                            {questions.map((text, index) => (
                              <MenuItem value={text} key={index}>
                                {text}
                              </MenuItem>
                            ))}
                          </TextFieldx>
                        </Grid>
                        <Grid item xs={12}>
                          <TextFieldx
                            name="answer2"
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Answer 2"
                            type="text"
                            id="answer2"
                            autoComplete=""
                            my={1}
                            inputRef={register({
                              required: "Answer 2 is required.",
                            })}
                            error={Boolean(errors.answer2)}
                            helperText={errors.answer2?.message}
                          />
                        </Grid>


                        <Grid item xs={3}></Grid>  
                        <Grid item xs={6}>

                          <Box mt={3} mb={1}>
                            <Buttonx
                              type="submit"
                              variant="contained"
                              color="primary"
                              fullWidth
                              disabled={Boolean(signupDisabled)}
                              endIcon={submitLoading ? <Loading size={20} /> : null}
                            >
                              Update
                            </Buttonx>
                          </Box>
                        </Grid>
                      </Grid>
                    </form>
                </CardContent>
          </React.Fragment>
          </Card>
        </Grid>

        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Password</DialogTitle>
            <DialogContent>
              <DialogContentText>
              </DialogContentText>
              <TextFieldx
                autoFocus
                margin="dense"
                id="password"
                label="password"
                type="password"
                onChange={(e=>{setPassword(e.target.value)})}
                onKeyPress={e =>  e.key === "Enter" && password ? handleSave() : null }
                value={password}
                fullWidth
                required
              />
            </DialogContent>
            <DialogActions>
              <Buttonx onClick={handleClose} color="primary">
                Cancel
              </Buttonx>
              <Buttonx onClick={handleSave} color="primary" disabled={!(password)}>
                Save
              </Buttonx>
            </DialogActions>
          </Dialog>
    </Container>
    </React.Fragment>
  );
}


