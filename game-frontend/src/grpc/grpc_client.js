import { get_local_token,  get_local_admin_token } from "../utils/auth_utils";
import { number_exists } from "../utils/number_utils";

const grpc = require("grpc-web");
const md5 = require("md5");

const { SngClient } = require("./sng_grpc_web_pb");
const {
  MakeSngRequest,
  GetStatusRequest,
  MakePlayerActionRequest,
  SignupRequest,
  LoginRequest,
  LogoutRequest,
  ChangePasswordRequest,
  GetUserByEmailRequest,
  GetTournamentsRequest,
  JoinTournamentRequest,
  GetGameplayHistoriesRequest,
  GetHandHistoryRequest,
  DrawReplaceActionRequest,
  CreateTournamentTemplateRequest,
  GetTournamentTemplateListRequest,
  LaunchTournamentRequest,
  UnregisterTournamentRequest,
  MakeDepositRequest,
  MakeWithdrawalRequest,
  AccountStatementsRequest,
  ClientTokenRequest,
  VaultPaymentMethodRequest,
  GeolocationRequest,
  AddPayoutStructureRequest,
  PayoutOptions,
  GetPayoutStructureRequest,
  GetRankingsRequest,
  SearchUserRequest,
  WhitelistUserRequest,
  CaptureDepositRequest,
  AcceptTOSRequest,
  AccountUpdatesRequest,
  WhitelistedUsersRequest,
  ActiveUsersRequest,
  TournamentDetailsRequest,
  StartTournamentTableInstanceRequest,
  CancelTournamentRequest,
  GetLobbyTournamentTemplateListRequest,
  JoinTournamentTemplateRequest,
  UnsubscribeFromTournamentTemplateBufferRequest,
  RemoveTournamentTemplateFromLobbyRequest,
  AddTournamentTemplateToLobbyRequest,
  PlayerAccountBalanceRequest,
  GetTournamentTemplateDetailRequest,
  GetTournamentTemplateBufferStateRequest,
  JoinAnyTournamentRequest,
  AdminJoinAnyTournamentRequest,
  UnregisterAnyTournamentRequest,
  JoinAnyTournamentStatusRequest,
  ActiveJoinAnyTournamentsRequest,
  JoinAnyUsersListRequest,
  CancelJoinAnyTournamentRequest,
  CancelJoinAnyUsersRequest,
  CancelTournamentsRequest,
  AddonPlayerRequest,
  PrizeRevealRequest,
  GeofenceRequest,
  GeofenceAddRequest,
  GeofenceUpdateRequest,
  GeofenceRemoveRequest,
  GeofenceWhitelistRequest,
  GeofenceBlacklistRequest,
  GeofenceUsersRequest,
  GeofenceGlobalRuleRequest,
  RankHandsRequest,
  NewDeckRequest,
  UpdateAccountBalanceRequest,
  GetUserInfoRequest,
  UpdateUserInfoRequest,
  GlobalSettingsRequest,
  UiSettingsRequest,
  ThemesRequest,
  EditThemesRequest,
  AllUiSettingsRequest,
  GetPasswordResetLinkRequest,
  FetchSecurityQuestionsRequest,
  ResetPasswordRequest,
  ValidateSecurityQuestionsRequest,
  ClientRequest,
  ClientAddRequest,
  ClientUpdateRequest,
  ClientRemoveRequest,
  ComponentPermissionRequest,
  ComponentPermissionAddRequest,
  ComponentPermissionUpdateRequest,
  ComponentPermissionRemoveRequest,
  AdminRoleRequest,
  AdminAddRequest,
  AdminUpdateRequest,
  AdminRemoveRequest,
  AdminRoleAddRequest,
  AdminRoleRemoveRequest,
  UpdateTournamentTemplateRequest,
  SimulateGamesRequest,
  UpdatePendingRequest,
  PendingDepositRequest,
  CreateMultipleUsersRequest,
  DeletePrizePoolStatusRequest,
  PlayerTournamentRequest,
  GeopollRequest,
  UpdateSecurityQuestionsRequest,
  CustomCssRequest,
  Player,
  Card
} = require("./sng_pb");

const CustomGrpcExceptionCode = 111;

/**
 * Higher level abstarction implementation for grpc communications
 */
class GrpcClient {
  constructor(
    host = process.env.REACT_APP_GRPC_HOST,
    port = process.env.REACT_APP_GRPC_PORT
  ) {
    // check grpc host and port exists
    if (!host) {
      throw new Error(
        "No grpc host is given. Check REACT_APP_GRPC_HOST environment variable is set properly."
      );
    }
    if (!port) {
      throw new Error(
        "No grpc port is given. Check REACT_APP_GRPC_PORT environment variable is set properly."
      );
    }

    // Create reusable grpc client with appropriate host
    let grpc_host = `${host}:${port}`;
    this.client = new SngClient(grpc_host);
    console.log(`grpc client initialized @${grpc_host}`);

    // subscribed tournament and table instance
    this.tournament_instance_id = null;
    this.table_instance_id = null;

    // needed to determine request transfer time to get latency
    this.latest_request_start_time = null;

    // latest request transfer time to get latency
    this.latest_rtt = null;

    this.grpc_responsed = true;
    //!! this variable should influence this.grpc_responsed
    this.cancel_subscriptions = false;

    this.tournament_subscription_interval = null;
  }

  /**
   * Process common grpc call error
   * @param {obj} err: grpc error object
   */
  process_common_error(err) {
    if (err.code === CustomGrpcExceptionCode) {
      return err.message; // custom error message sent
    } else if (err.code === grpc.StatusCode.UNAVAILABLE) {
      // connection failure
      // ! also could be 400 and 500 level error from grpc
      return "Could not connect to server. Please, check your connection.";
    } else if (err.code === grpc.StatusCode.UNKNOWN) {
      // uncatched exception from server implementation(most probably)
      return "Server Error. Please, try again.";
    } else if (err.code === grpc.StatusCode.PERMISSION_DENIED) {
      return "Permissin Denied";
    } else if (err.code === grpc.StatusCode.UNAUTHENTICATED) {
      // user is not logged in or its credential is outdated
      localStorage.clear();
      return "You have been logged out. Please, login again.";
    } else if (err.message) {
      // custom server exception with message from grpc implementation
      // ! also could be grpc errors which are not custom but have message attributes set
      return null;
    }

    return null;
  }

  /**
   * Call remote grpc method appropriately
   * @param {grpc_request} request: grpc generated request data structure of the call
   * @param {str} method_name: grpc remote method name
   * @param {func} on_response: handles grpc response
   * @param {func} on_error: error handler functoin by caller
   */
  call_grpc(method_name, request, on_response, on_error, admin = false) {
    this.latest_request_start_time = new Date().getTime();

    // attach metadata values if needed be
    let metadata = {};
    let access_token = admin ? get_local_admin_token() :get_local_token();
    if (access_token) {
      metadata = { access_token: access_token };
    }

    this.client[method_name](request, metadata, (err, response) => {
      console.log(
        `------------------------------in [${method_name}]grpc callback start-------------------`
      );
      console.warn("grpc callback(err): ", err);
      console.log("grpc callback(response): ", response);

      // caculate latest request transfer time
      this.latest_rtt = new Date().getTime() - this.latest_request_start_time;

      // err and response both are returned mutually exclusively(weird)
      if (err) {
        let custom_message = this.process_common_error(err);
        if (on_error) {
          on_error(custom_message, err);
        }
      }

      if (response) {
        on_response(response);
      } else {
        // when there is error, empty response is sent(actuallly, depends on server side development response)
        console.warn("empty response from server");
      }

      console.log(
        `------------------------------ in [${method_name}]grpc callback end --------------------`
      );
    });
  }

  call_streaming_grpc(method_name, request, opts = {}) {
    return this.client[method_name](request, opts)
  }

  signup(data, on_response, on_error) {
    let request = new SignupRequest();
    request.setUsername(data.username);
    request.setPassword(data.password);
    request.setEmail(data.email);
    request.setFirstName(data.firstName);
    request.setLastName(data.lastName);
    request.setAddress(data.address);
    request.setCity(data.city);
    request.setState(data.state.code);
    request.setZip(data.zip);
    request.setSsn(data.ssn);
    request.setIdNumber(data.idNumber);
    request.setIdState(data.idState.code);
    request.setDateOfBirth(data.dateOfBirth.toDateString());
    request.setQuestion1(data.question1);
    request.setAnswer1(data.answer1);
    request.setQuestion2(data.question2);
    request.setAnswer2(data.answer2);
    request.setUserRewardsId(data.user_rewards_id)
    request.setPhone(data.phone)
    console.log("signup request: ", request);

    this.call_grpc("signup", request, on_response, on_error);
  }

  login(username, password, device_id, geolocationData, on_response, on_error) {
    let request = new LoginRequest();
    request.setUserName(username);
    request.setPassword(password);
    request.setDeviceId("user.device_id");
    request.setRemoteIp("198.199.81.169");
    request.setGeolocationData(geolocationData);
    request.setClient("Tablet");
    // don't need to set user agent, since grpc will set appropriate header
    // request.getExtraHeadersMap().set("HTTP_USER_AGENT", window.navigator.userAgent);
    console.log("login request: ", request);

    this.call_grpc("login", request, on_response, on_error);
  }

  logout(on_response, on_error) {
    let request = new LogoutRequest();
    request.setRemoteIp("198.199.81.169");
    console.log("logout request: ", request);

    this.call_grpc("logout", request, on_response, on_error);
  }

  changePassword(current_password, new_password, on_response, on_error) {
    let request = new ChangePasswordRequest();
    request.setCurrentPassword(current_password);
    request.setNewPassword(new_password);
    console.log("change password request: ", request);

    this.call_grpc("changePassword", request, on_response, on_error);
  }

  getUser(email, on_response, on_error) {
    let request = new GetUserByEmailRequest();
    request.setEmail(email);

    this.call_grpc(
      "getUserByEmail",
      request,
      function (response) {
        on_response(parseUser(response));
      },
      on_error
    );
  }

  getUserInfo(onResponse, onError) {
    let request = new GetUserInfoRequest();

    this.call_grpc(
      "getUserInfo",
      request,
      response => {
        onResponse(response);
      },
      onError
    );
  }

  updateUserInfo(data, onResponse, onError) {
    let request = new UpdateUserInfoRequest();
    request.setEmail(data.email);
    request.setPhone(data.phone);
    request.setUserRewardsId(data.user_rewards_id);
    console.log("request!!!!")
    console.log(request)
    this.call_grpc(
      "updateUserInfo",
      request,
      response => onResponse(response),
      onError
    );
  }

  makeSng(options, on_response, on_error) {
    let request = new MakeSngRequest();
    request.setGameType(options.game_type);
    request.setTableType(options.table_type);
    request.setSmallBlindValue(options.small_blind_value);
    request.setTableTimer(options.table_timer);

    console.log("makeSng request: ", request);

    this.call_grpc(
      "makeSng",
      request,
      function (response) {
        let parsed_response = JSON.parse(response.getResult());
        console.log("makeSng: response: ", parsed_response);

        on_response(parsed_response);
      },
      on_error
    );
  }

  joinTournament(tournament_id, addons, on_response, on_error) {
    let request = new JoinTournamentRequest();
    request.setTournamentInstanceId(tournament_id);
    request.setAddonsAmount(addons || 0);

    console.log("joinTournament request: ", request);

    this.call_grpc(
      "joinTournament",
      request,
      function (response) {
        let parsedResponse = JSON.parse(response.getResult());
        console.log("joinTournament: response: ", parsedResponse);

        on_response(parsedResponse);
      },
      on_error
    );
  }

  unregisterTournament(tournament_id, on_response, on_error) {
    let request = new UnregisterTournamentRequest();
    request.setTournamentInstanceId(tournament_id);

    console.log("unregisterTournament request: ", request);

    this.call_grpc(
      "unregisterTournament",
      request,
      function (response) {
        let parsedResponse = JSON.parse(response.getResult());
        console.log("unregisterTournament: response: ", parsedResponse);

        on_response(parsedResponse);
      },
      on_error
    );
  }

  cancelTournament(tournament_id, on_response, on_error) {
    let request = new CancelTournamentRequest();
    request.setTournamentInstanceId(tournament_id);

    console.log("cancelTournament request: ", request);

    this.call_grpc(
      "cancelTournament",
      request,
      function (response) {
        let parsedResponse = JSON.parse(response.getResult());
        console.log("cancelTournament: response: ", parsedResponse);

        on_response(parsedResponse);
      },
      on_error,
      true //admin
    );
  }

  launchTournament(ids, on_response, on_error) {
    let request = new LaunchTournamentRequest();
    request.setTournamentTemplateIdsAndName(JSON.stringify(ids));
    console.log("launchTournament request: ", request);

    this.call_grpc(
      "launchTournament",
      request,
      function (response) {
        console.log("launchTournament: response: ", response);

        on_response(response);
      },
      on_error,
      true //admin
    );
  }

  addPayoutStructure(data, on_response, on_error) {
    let request = new AddPayoutStructureRequest();
    let payout_options = new PayoutOptions();

    payout_options.setNumPlayersMin(data.minPlayers);
    payout_options.setNumPlayersMax(data.maxPlayers);
    payout_options.setPercentages(data.payoutStructure);
    let payout_list = [payout_options];
    console.log(
      "addPayoutStructure request: payout_listpayout_list",
      payout_list
    );
    request.setPayoutsList(payout_list);
    console.log("addPayoutStructure request: ", request);

    this.call_grpc(
      "addPayoutStructure",
      request,
      function (response) {
        console.log("addPayoutStructure: response: ", response);

        on_response(response);
      },
      on_error,
      true //admin
    );
  }

  getPayoutStructure(data, on_response, on_error) {
    let request = new GetPayoutStructureRequest();
    request.setFilter("");
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getPayoutStructure", request, on_response, on_error, true);
  }

  createTournamentTemplate(data, on_response, on_error) {
    let request = new CreateTournamentTemplateRequest();

    request.setName(data.name);
    request.setBuyin(data.buyin);
    request.setBuyinChips(data.buyin_chips);
    request.setAddonChips(data.addon_chips);
    request.setMinPrizePoolValue(data.min_prize_pool_value);
    request.setRake(data.rake);
    request.setIsForMoney(data.is_for_money);
    request.setRebuysPermitted(data.rebuys_permitted);
    request.setAddonsPermitted(data.addons_permitted);
    request.setAddonThreshold(data.addon_threshold);
    request.setRebuysRoundStart(data.rebuys_round_start);
    request.setRebuysRoundEnd(data.rebuys_round_end);
    request.setAddonsRoundStart(data.addons_round_start);
    request.setAddonsRoundEnd(data.addons_round_end);
    request.setScheduledBreaks(data.scheduled_breaks);
    request.setTimeLimitSeconds(data.time_limit_seconds);
    request.setPendingTimeoutSeconds(data.pending_timeout_seconds);
    request.setMinPlayersPerTable(data.min_players_per_table);
    request.setMaxPlayersPerTable(data.max_players_per_table);
    request.setSmallBlindMaxValue(data.small_blind_max_value);
    request.setTableTimer(data.table_timer);
    request.setTourPlayersMin(data.tour_players_min);
    request.setTourPlayersMax(data.tour_players_max);
    request.setType(data.tournamentType);
    request.setBlindsIncreaseIntervalSeconds(data.blinds_increase_interval_seconds);
    request.setBlindsIncreaseIntervalRounds(data.blinds_increase_interval_rounds);
    request.setTableType(data.tableType);
    request.setTableMaxNumRaises(data.table_max_num_raises); // default number of maximum raises
    request.setRebalancingTableAlgorithm(data.rebalancing_table_algorithm);
    request.setStatus(data.status);
    request.setUseDecimals(data.use_decimals);
    request.setGameType(data.gameType);
    request.setBlindLevelAndValues(data.blindLevels);
    request.setFlashPrizePoolValues(data.flashPrizePool);
    request.setAdditionalPrizePoolPayoutId(data.additionalPayout);
    request.setAdditionalPayoutPlayer(data.additionalPayoutPlayer);
    request.setPrizePoolPayoutId(data.prizePayout);
    request.setUseAdditionalPayoutOnly(data.useAdditionalPayoutOnly);
    request.setUniqueDeck(data.uniqueDeck);
    request.setInstantPayout(data.instantPayout);
    request.setTournamentImage(data.tournamentImage);
    request.setWildcardsEnabled(data.wildcards_enabled);
    request.setWildcardValue(data.wildcard_value);
    request.setChipsInPenny(data.chips_in_penny);
    request.setPairMixedAddonPlayers(data.pair_mixed_addon_players);
    request.setHardCapEnabled(data.hard_cap_enabled);
    request.setUsernamePrivacy(data.username_privacy);
    request.setRevealCardsAfterAction(data.reveal_cards_after_action);

    console.log("createTournamentTemplate request: ", request);

    this.call_grpc(
      "createTournamentTemplate",
      request,
      function (response) {
        console.log("createTournamentTemplate: response: ", response);

        on_response(response);
      },
      on_error,
      true //admin
    );
  }

  sendPlayerAction(action, bet, on_response, on_error) {
    this.pauseSubscription(true);

    // check if there exists a subscribed tournament and table
    if (!this.table_instance_id || !this.tournament_instance_id) {
      on_error("No tournament or table subscribed.");
      return;
    }

    let is_auto = 0;
    if (action === "auto_pass") {
      action = "pass";
      is_auto = 1;
    } else if (action === "auto_check") {
      action = "check";
      is_auto = 1;
    }

    let request = new MakePlayerActionRequest();
    request.setTournamentInstanceId(this.tournament_instance_id);
    request.setTableInstanceId(this.table_instance_id);
    request.setAction(action);
    request.setBet(bet);
    request.setLatestRtt(`${this.latest_rtt}`);
    request.setIsAuto(`${is_auto}`);

    console.log("player action request: ", request);
    let this_grpc_client = this;
    this.call_grpc(
      "makePlayerAction",
      request,
      function (response) {
        let table_state = this_grpc_client.getExpectedTableState(response);
        console.log("GC: sendPlayerAction: table state: ", table_state);

        on_response(table_state);

        this_grpc_client.pauseSubscription(false);
      },
      (custom_msg, err) => {
        on_error(custom_msg, err);
        this_grpc_client.pauseSubscription(false);
      }
    );
  }

  sendDrawReplaceAction(user_id, change_idxs, on_response, on_error) {
    this.pauseSubscription(true);

    // check if there exists a subscribed tournament and table
    if (!this.table_instance_id || !this.tournament_instance_id) {
      on_error("No tournament or table subscribed.");
      return;
    }

    let request = new DrawReplaceActionRequest();
    request.setUserId(user_id);
    request.setTournamentInstanceId(this.tournament_instance_id);
    request.setTableInstanceId(this.table_instance_id);
    request.setLatestRtt(`${this.latest_rtt}`);

    request.setChangeIdxsList(change_idxs);

    console.log("draw replace action request: ", request);
    let this_grpc_client = this;
    this.call_grpc(
      "drawReplaceAction",
      request,
      function (response) {
        let table_state = this_grpc_client.getExpectedTableState(response);
        console.log("GC: sendPlayerAction: table state: ", table_state);

        on_response(table_state);

        this_grpc_client.pauseSubscription(false);
      },
      (custom_msg, err) => {
        on_error(custom_msg, err);
        this_grpc_client.pauseSubscription(false);
      }
    );
  }

  subscribeTournamentState(tournament_id, table_id) {
    this.unSubscribeTournamentState();
    this.tournament_instance_id = tournament_id;
    this.table_instance_id = table_id;
    // console.log("GC: subscribing to: ", tournament_id);

    let request = new GetStatusRequest();
    request.setTournamentInstanceId(tournament_id);

    return this.call_streaming_grpc('getStatus', request)
  }

  unSubscribeTournamentState() {
    this.tournament_instance_id = null;
    this.table_instance_id = null;

    this.pauseSubscription(true); // needed to stop callback effects

    clearInterval(this.tournament_subscription_interval);
  }

  /**
   * Hacky implementation to pause/resume subscritpion effects including callbacks
   * @param {bool} pause : whether to pause subscription or resume
   */
  pauseSubscription(pause) {
    this.cancel_subscriptions = pause;
    this.grpc_responsed = !pause; // if pause set grpc_responsed false
  }

  getTournaments(data, on_response, on_error, user_only = false, all_tournaments = false) {
    let request = new GetTournamentsRequest();
    request.setUserOnly(user_only);
    request.setAllTournaments(all_tournaments);
    // change "all" or "*" value to backend expectation which is empty
    request.setStatusList(data.status.filter(val => val !== "*"));
    request.setLimitsList(data.tableType.filter(val => val !== "*"));
    request.setBuyinLowList(data.buyinLow.filter(val => val !== "*"));
    request.setBuyinHighList(data.buyinHigh.filter(val => val !== "*"));
    request.setTimerLowList(data.timerLow.filter(val => val !== "*"));
    request.setTimerHighList(data.timerHigh.filter(val => val !== "*"));
    request.setGameTypeList(data.gameType.filter(val => val !== "*"));
    request.setEntryFeeLowList(data.entryFeeLow.filter(val => val !== "*"));
    request.setEntryFeeHighList(data.entryFeeHigh.filter(val => val !== "*"));

    request.setPaginationCurrPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    console.log("get touranments request: ", request);

    this.call_grpc("getTournaments", request, on_response, on_error);
  }

  getTournamentsAdmin(data, on_response, on_error, user_only = false, all_tournaments = false, simulation_only = false) {
    let request = new GetTournamentsRequest();
    request.setUserOnly(user_only);
    request.setAllTournaments(all_tournaments);
    // change "all" or "*" value to backend expectation which is empty
    request.setStatusList(data.status.filter(val => val !== "*"));
    request.setLimitsList(data.tableType.filter(val => val !== "*"));
    request.setBuyinLowList(data.buyinLow.filter(val => val !== "*"));
    request.setBuyinHighList(data.buyinHigh.filter(val => val !== "*"));
    request.setTimerLowList(data.timerLow.filter(val => val !== "*"));
    request.setTimerHighList(data.timerHigh.filter(val => val !== "*"));
    request.setGameTypeList(data.gameType.filter(val => val !== "*"));
    request.setEntryFeeLowList(data.entryFeeLow.filter(val => val !== "*"));
    request.setEntryFeeHighList(data.entryFeeHigh.filter(val => val !== "*"));

    request.setSimulationOnly(simulation_only);
    request.setPaginationCurrPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    console.log("get touranments request: ", request);

    this.call_grpc("getTournaments", request, on_response, on_error, true); //admin
  }

  getTournamentTemplateList(data, on_response, on_error) {
    let request = new GetTournamentTemplateListRequest();
    request.setFilter("user_only");
    request.setPaginationCurrentPage(data.pagination_current_page.toString());
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page.toString()
    );

    this.call_grpc("getTournamentTemplateList", request, on_response, on_error, true); //admin
  }

  removeTournamentTemplateFromLobby(
    tournament_template_id,
    on_response,
    on_error
  ) {
    let request = new RemoveTournamentTemplateFromLobbyRequest();
    request.setTournamentTemplateId(tournament_template_id);
    this.call_grpc(
      "removeTournamentTemplateFromLobby",
      request,
      response => {
        on_response(JSON.parse(response.getResult()));
      },
      on_error,
      true //admin
    );
  }

  addTournamentTemplateToLobby(
    tournament_template_id,
    is_flash_mode,
    is_single_hand,
    has_additional_payout,
    is_turbo_mode,
    on_response,
    on_error
  ) {
    let request = new AddTournamentTemplateToLobbyRequest();
    request.setTournamentTemplateId(tournament_template_id);
    request.setIsFlashMode(is_flash_mode);
    request.setIsSingleHand(is_single_hand);
    request.setHasAdditionalPayout(has_additional_payout);
    request.setIsTurboMode(is_turbo_mode);
    this.call_grpc(
      "addTournamentTemplateToLobby",
      request,
      response => {
        on_response(JSON.parse(response.getResult()));
      },
      on_error,
      true //admin
    );
  }

  unsubscribeFromTournamentTemplateBuffer(
    tournament_template_id,
    on_response,
    on_error
  ) {
    let request = new UnsubscribeFromTournamentTemplateBufferRequest();
    request.setTournamentTemplateId(tournament_template_id);
    this.call_grpc(
      "unsubscribeFromTournamentTemplateBuffer",
      request,
      response => {
        on_response(JSON.parse(response.getResult()));
      },
      on_error
    );
  }

  joinTournamentTempalte(
    tournament_template_id,
    addons,
    on_response,
    on_error,
    tournament_batch_id = null
  ) {
    let request = new JoinTournamentTemplateRequest();
    request.setTournamentTemplateId(tournament_template_id);
    request.setAddonsAmount(addons || 0);
    request.setTournamentBatchId(tournament_batch_id);
    this.call_grpc(
      "joinTournamentTempalte",
      request,
      response => {
        on_response(JSON.parse(response.getResult()));
      },
      on_error
    );
  }

  getLobbyTournamentTemplateList(data, on_response, on_error) {
    let request = new GetLobbyTournamentTemplateListRequest();
    request.setLimitsList(data.tableType.filter(val => val !== "*"));
    request.setBuyinLowList(data.buyinLow.filter(val => val !== "*"));
    request.setBuyinHighList(data.buyinHigh.filter(val => val !== "*"));
    request.setTimerLowList(data.timerLow.filter(val => val !== "*"));
    request.setTimerHighList(data.timerHigh.filter(val => val !== "*"));
    request.setGameTypeList(data.gameType.filter(val => val !== "*"));
    request.setPaginationCurrentPage(data.pagination_current_page.toString());
    request.setEntryFeeLowList(data.entryFeeLow.filter(val => val !== "*"));
    request.setEntryFeeHighList(data.entryFeeHigh.filter(val => val !== "*"));
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page.toString()
    );
    this.call_grpc(
      "getLobbyTournamentTemplateList",
      request,
      on_response,
      on_error
    );
  }

  getTournamentTemplateDetail(tournament_template_id, on_response, on_error) {
    let request = new GetTournamentTemplateDetailRequest();
    request.setTournamentTemplateId(tournament_template_id);

    this.call_grpc(
      "getTournamentTemplateDetail",
      request,
      on_response,
      on_error
    );
  }

  getTournamentTemplateDetailAdmin(tournament_template_id, on_response, on_error) {
    let request = new GetTournamentTemplateDetailRequest();
    request.setTournamentTemplateId(tournament_template_id);

    this.call_grpc(
      "getTournamentTemplateDetail",
      request,
      on_response,
      on_error,
      true // admin
    );
  }

  getTournamentTemplateBufferState(
    tournament_template_id,
    on_response,
    on_error
  ) {
    let request = new GetTournamentTemplateBufferStateRequest();
    request.setTournamentTemplateId(tournament_template_id);

    this.call_grpc(
      "getTournamentTemplateBufferState",
      request,
      response => {
        on_response(JSON.parse(response.getResult()));
      },
      on_error
    );
  }

  getGameplayHistories(tournament_instance_id, on_response, on_error, admin) {
    let request = new GetGameplayHistoriesRequest();
    request.setTournamentInstanceId(tournament_instance_id);

    this.call_grpc("getGameplayHistories", request, on_response, on_error, admin);
  }
  getAllHandHistoryData(data, on_response, on_error) {
    let request = new GetHandHistoryRequest();
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getAllHandHistoryData", request, on_response, on_error);
  }

  getHandHistoryStat(on_response, on_error) {
    let request = new GetHandHistoryRequest();

    this.call_grpc("getHandHistoryStat", request, on_response, on_error);
  }


  getHandHistoryData(gameplay_history_id, on_response, on_error, admin) {
    let request = new GetHandHistoryRequest();
    request.setGameplayHistoryId(gameplay_history_id);

    this.call_grpc("getHandHistoryData", request, on_response, on_error, admin);
  }

  getClientToken(on_response, on_error) {
    let request = new ClientTokenRequest();

    this.call_grpc("getClientToken", request, on_response, on_error);
  }

  vaultPaymentMethod(nonce, on_response, on_error) {
    let request = new VaultPaymentMethodRequest();
    request.setNonce(nonce);

    this.call_grpc("vaultPaymentMethod", request, on_response, on_error);
  }

  captureProcessedDeposit(data, on_response, on_error) {
    let request = new CaptureDepositRequest();

    request.setTransactionId(data.transaction_id);

    this.call_grpc("captureProcessedDeposit", request, on_response, on_error);
  }

  makeDeposit(data, on_response, on_error) {
    let request = new MakeDepositRequest();

    request.setNonce(data.nonce);
    request.setAmount(parseFloat(data.amount));

    this.call_grpc("makeDeposit", request, on_response, on_error);
  }

  makeWithdrawal(data, on_response, on_error) {
    let request = new MakeWithdrawalRequest();

    request.setAmount(parseFloat(data.amount));

    this.call_grpc("makeWithdrawal", request, on_response, on_error);
  }

  getAccountStatements(data, on_response, on_error) {
    let request = new AccountStatementsRequest();

    request.setStartDate(data.startDate.toDateString());
    request.setEndDate(data.endDate.toDateString());

    this.call_grpc("getAccountStatements", request, on_response, on_error);
  }

  getExpectedTableState(get_status_response) {
    let players = getExpectedPlayersData(get_status_response);

    let server_game_meta = JSON.parse(
      get_status_response.getGameMeta() || null
    );
    let server_game = JSON.parse(get_status_response.getGame() || null);
    let server_action_result = JSON.parse(
      get_status_response.getActionResult() || null
    );
    let table_state = {
      game_meta: {
        ...server_game_meta,
      },
      game: server_game,
      players: players,
      action_result: server_action_result,
      // actually tournament_meta not used at all
      tournament_meta: JSON.parse(get_status_response.getTournament()),
    };

    return table_state;
  }

  sendGeolocationData(data, on_response, on_error) {
    let request = new GeolocationRequest();
    request.setData(JSON.stringify(data));
    console.log(request);
    this.call_grpc("sendGeolocationData", request, on_response, on_error);
  }

  getRankings(tournament_id, on_resp, on_err) {
    let request = new GetRankingsRequest();
    request.setTournamentInstanceId(tournament_id);
    this.call_grpc("getRankings", request, on_resp, on_err);
  }

  searchByUsername(data, on_response, on_error) {
    let request = new SearchUserRequest();
    request.setUsername(data.username);
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );
    this.call_grpc("searchUserByUsername", request, on_response, on_error, true); //admin
  }

  whitelistUser(id, on_response, on_error) {
    let request = new WhitelistUserRequest();
    request.setId(id);
    console.log(request);
    this.call_grpc("whitelistUser", request, on_response, on_error, true); //admin
  }

  acceptTOS(on_response, on_error) {
    let request = new AcceptTOSRequest();

    this.call_grpc("acceptTOS", request, on_response, on_error);
  }

  checkForUpdates(on_response, on_error) {
    let request = new AccountUpdatesRequest();

    this.call_grpc("checkForUpdates", request, on_response, on_error);
  }

  getWhitelistedUsers(data, on_response, on_error) {
    let request = new WhitelistedUsersRequest();
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getWhitelistedUsers", request, on_response, on_error, true); //admin
  }


  getActiveUsers(data, on_response, on_error) {
    let request = new ActiveUsersRequest();
    request.setUsername(data.username);
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getActiveUsers", request, on_response, on_error, true); //admin
  }
  getClients(data, on_response, on_error) {
    let request = new WhitelistedUsersRequest();
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getClients", request, on_response, on_error, true); //admin
  }

  removeWhitelistUser(id, on_response, on_error) {
    let request = new WhitelistUserRequest();
    request.setId(id);
    this.call_grpc("removeWhitelistUser", request, on_response, on_error, true); //admin
  }

  getTournamentDetails(tournament_id, on_change, on_err) {
    this.tournament_instance_id = tournament_id;

    let request = new TournamentDetailsRequest();
    request.setTournamentInstanceId(tournament_id);

    console.log("GT: subscribing to: ", tournament_id);
    this.call_grpc("getTournamentDetails", request, on_change, on_err);
  }

  getPlayerAccountBalance(on_response, on_error, tournament_instance_id) {
    let request = new PlayerAccountBalanceRequest();
    request.setTournamentInstanceId(tournament_instance_id);
    this.call_grpc("getPlayerAccountBalance", request, on_response, on_error);
  }

  getNextTournament(current_tournament_id, on_change, on_err) {
    this.tournament_instance_id = current_tournament_id;

    let request = new TournamentDetailsRequest();
    request.setTournamentInstanceId(current_tournament_id);

    this.call_grpc("getNextTournament", request, on_change, on_err);
  }
  startTournamentTableInstance(launch_data, on_change, on_err) {
    this.tournament_instance_id = launch_data.tournament_id;

    let request = new StartTournamentTableInstanceRequest();
    request.setTournamentInstanceId(launch_data.tournament_id);

    request.setAddons(launch_data.addons)
    this.call_grpc("startTournamentTableInstance", request, on_change, on_err);
  }
  joinAnyTournament(limit, game_type, game_mode, on_change, on_err) {
    let request = new JoinAnyTournamentRequest();
    request.setLimit(limit);
    request.setGameMode(game_mode);
    request.setGameType(game_type);
    this.call_grpc("joinAnyTournament", request, on_change, on_err);
  }

  unregisterAnyTournament(on_change, on_err) {
    let request = new UnregisterAnyTournamentRequest();

    this.call_grpc("unregisterAnyTournament", request, on_change, on_err);
  }
  getJoinAnyTournamentStatus(on_change, on_err) {
    let request = new JoinAnyTournamentStatusRequest();

    this.call_grpc("getJoinAnyTournamentStatus", request, on_change, on_err);
  }
  getActiveJoinAnyTournaments(on_change, on_err) {
    let request = new ActiveJoinAnyTournamentsRequest();
    this.call_grpc("getActiveJoinAnyTournaments", request, on_change, on_err);
  }

  getJoinAnyUsers(data, on_response, on_error) {
    let request = new JoinAnyUsersListRequest();
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getJoinAnyUsersList", request, on_response, on_error, true); //admin
  }

  cancelJoinAny(user_id, on_change, on_err) {
    let request = new CancelJoinAnyTournamentRequest();
    request.setUserId(user_id);

    this.call_grpc("cancelJoinAnyTournament", request, on_change, on_err, true); //admin
  }

  cancelJoinAnyMultipleUsers(user_ids, on_change, on_err) {
    let request = new CancelJoinAnyUsersRequest();
    request.setUserIdsList(user_ids);

    this.call_grpc("cancelJoinAnyMultipleUsers", request, on_change, on_err, true); //admin
  }

  cancelJoinAnyAllUsers(on_change, on_err) {
    let request = new CancelJoinAnyUsersRequest();

    this.call_grpc("cancelJoinAnyAllUsers", request, on_change, on_err, true); //admin
  }

  cancelTournaments(tournament_ids, on_response, on_error) {
    let request = new CancelTournamentsRequest();
    request.setTournamentInstanceIdsList(tournament_ids);

    this.call_grpc(
      "cancelTournaments",
      request,
      function (response) {
        let parsedResponse = JSON.parse(response.getResult());
        on_response(parsedResponse);
      },
      on_error,
      true //admin
    );
  }

  addonPlayer(tournament_instance_id, on_response, on_error) {
    let request = new AddonPlayerRequest();
    request.setTournamentInstanceId(tournament_instance_id);

    this.call_grpc("addonPlayer", request, on_response, on_error);
  }

  setPrizeAsRevealed(tournament_instance_id, on_response, on_error) {
    let request = new PrizeRevealRequest();
    request.setTournamentInstanceId(tournament_instance_id);
    this.call_grpc("setPrizeAsRevealed", request, on_response, on_error);
  }

  getGeofenceData(data, on_change, on_err) {
    let request = new GeofenceRequest();
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getGeofenceData", request, on_change, on_err, true); //admin
  }
  addGeofenceData(data, on_change, on_err) {
    let request = new GeofenceAddRequest();
    request.setName(data.name);
    request.setGeofenceData(data.geofenceData);

    this.call_grpc("addGeofenceData", request, on_change, on_err, true); //admin
  }
  updateGeofenceData(data, on_change, on_err) {
    let request = new GeofenceUpdateRequest();
    request.setId(data.id);
    request.setGeofenceData(data.geofenceData);
    request.setName(data.name);
    request.setIsActive(data.isActive);

    this.call_grpc("updateGeofenceData", request, on_change, on_err, true); //admin
  }
  removeGeofenceData(id, on_change, on_err) {
    let request = new GeofenceRemoveRequest();
    request.setGeofenceId(id);

    this.call_grpc("removeGeofenceData", request, on_change, on_err, true); //admin
  }

  whitelistUsersOnGeofence(data, on_change, on_err) {
    let request = new GeofenceWhitelistRequest();
    request.setGeofenceId(data.id);
    request.setWhitelistIdsList(data.whitelist_ids);

    this.call_grpc("whitelistUsersOnGeofence", request, on_change, on_err, true); //admin
  }
  blacklistUsersOnGeofence(data, on_change, on_err) {
    let request = new GeofenceBlacklistRequest();
    request.setGeofenceId(data.id);
    request.setBlacklistIdsList(data.blacklist_ids);

    this.call_grpc("blacklistUsersOnGeofence", request, on_change, on_err, true); //admin
  }
  getWhitelistedUsersonGeofence(data, on_change, on_err) {
    let request = new GeofenceUsersRequest();
    request.setGeofenceId(data.id);
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getWhitelistedUsersonGeofence", request, on_change, on_err, true); //admin
  }
  getBlacklistedUsersonGeofence(data, on_change, on_err) {
    let request = new GeofenceUsersRequest();
    request.setGeofenceId(data.id);
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getBlacklistedUsersonGeofence", request, on_change, on_err, true); //admin
  }
  setGeofenceGlobalRule(data, on_change, on_err) {
    let request = new GeofenceGlobalRuleRequest();
    request.setGeofenceId(data.id);
    request.setBlacklistAll(data.blacklistAll);

    this.call_grpc("setGeofenceGlobalRule", request, on_change, on_err, true); //admin
  }

  whitelistClientsOnGeofence(data, on_change, on_err) {
    let request = new GeofenceWhitelistRequest();
    request.setGeofenceId(data.id);
    request.setWhitelistIdsList(data.whitelist_ids);

    this.call_grpc("whitelistClientsOnGeofence", request, on_change, on_err, true); //admin
  }
  blacklistClientsOnGeofence(data, on_change, on_err) {
    let request = new GeofenceBlacklistRequest();
    request.setGeofenceId(data.id);
    request.setBlacklistIdsList(data.blacklist_ids);

    this.call_grpc("blacklistClientsOnGeofence", request, on_change, on_err, true); //admin
  }
  getWhitelistedClientsonGeofence(data, on_change, on_err) {
    let request = new GeofenceUsersRequest();
    request.setGeofenceId(data.id);
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getWhitelistedClientsonGeofence", request, on_change, on_err, true); //admin
  }
  getBlacklistedClientsonGeofence(data, on_change, on_err) {
    let request = new GeofenceUsersRequest();
    request.setGeofenceId(data.id);
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getBlacklistedClientsonGeofence", request, on_change, on_err, true); //admin
  }
  setGeofenceClientGlobalRule(data, on_change, on_err) {
    let request = new GeofenceGlobalRuleRequest();
    request.setGeofenceId(data.id);
    request.setBlacklistAll(data.blacklistAll);

    this.call_grpc("setGeofenceClientGlobalRule", request, on_change, on_err, true); //admin
  }

  rankHands(data, on_change, on_err) {
    let request = new RankHandsRequest();
    let communityCards = data.communityCards.map(communityCard => {
      const card = new Card()
      card.setRank(communityCard.rank)
      card.setSuit(communityCard.suit)
      return card
    })

    let players = data.players.map(player => {
      const cards = player.Cards.map(card => {
        const c = new Card()
        c.setRank(card.rank)
        c.setSuit(card.suit)
        return c
      })
      const Id = player.Id
      player = new Player()
      player.setId(Id)
      player.setCardsList(cards)
      return player
    })

    request.setCommunityCardsList(communityCards)
    request.setPlayersList(players)
    this.call_grpc(
      "rankHands",
      request,
      on_change,
      on_err
    );
  }

  getNewDeck(data, on_change, on_err) {
    let request = new NewDeckRequest();

    this.call_grpc(
      "getShuffledDeck",
      request,
      on_change,
      on_err
    );
  }
  updatePlayerAccountBalance(data, on_change, on_err) {
    let request = new UpdateAccountBalanceRequest();
    request.setUserId(data.user_id);
    request.setCashAmount(data.cash_amount || 0);
    request.setPointsAmount(data.points_amount || 0);
    request.setUpdateMessage(data.update_message);

    this.call_grpc("updatePlayerAccountBalance", request, on_change, on_err, true); //admin
  }

  getPasswordResetLink(email, onResponse, onError) {
    let request = new GetPasswordResetLinkRequest();
    request.setEmail(email);

    this.call_grpc("getPasswordResetLink", request, onResponse, onError);
  }

  fetchSecurityQuestions(data, onResponse, onError) {
    let request = new FetchSecurityQuestionsRequest();
    console.log({data});
    // request.setEmail(data.email);
    request.setUsername(data.username);

    this.call_grpc("fetchSecurityQuestions", request, onResponse, onError);
  }


  getUserSecurityQuestions( onResponse, onError) {
    let request = new FetchSecurityQuestionsRequest();

    this.call_grpc("getUserSecurityQuestions", request, onResponse, onError);
  }




  getGlobalSettings(on_change, on_err) {
    let request = new GlobalSettingsRequest();

    this.call_grpc("getGlobalSettings", request, on_change, on_err, true); //admin
  }


  getUiSettings(key,on_change, on_err) {
    let request = new UiSettingsRequest();
    request.setKey(key)
    this.call_grpc("getUiSettings", request, on_change, on_err, true); //admin
  }
  deleteUiSettings(key,on_change, on_err) {
    let request = new UiSettingsRequest();
    request.setKey(key)
    this.call_grpc("deleteUiSettings", request, on_change, on_err, true); //admin
  }

  getThemes(on_change, on_err) {
    let request = new ThemesRequest();

    this.call_grpc("getThemes", request, on_change, on_err, true); //admin
  }


  getAllUiSettings(on_change, on_err) {
    let request = new UiSettingsRequest();

    this.call_grpc("getAllUiSettings", request, on_change, on_err, true); //admin
  }
  setUiSettings(data, on_change, on_err) {
    let request = new AllUiSettingsRequest();
    request.setJsonEncodedData(JSON.stringify(data));

    this.call_grpc("setUiSettings", request, on_change, on_err, true); //admin
  }


  updateCustomCss(data, on_change, on_err) {
    let request = new CustomCssRequest();
    request.setData(data);

    this.call_grpc("updateCustomCss", request, on_change, on_err, true); //admin
  }

  getCustomCss( on_change, on_err) {
    let request = new CustomCssRequest();
    this.call_grpc("getCustomCss", request, on_change, on_err, true); //admin
  }


  setGlobalSettings(data, on_change, on_err) {
    let request = new GlobalSettingsRequest();
    request.setKey(data.name);
    request.setJsonEncodedValue(JSON.stringify({data:data.value}));

    this.call_grpc("setGlobalSettings", request, on_change, on_err, true); //admin
  }

  setTheme(name,data, on_change, on_err) {
    let request = new ThemesRequest();
    request.setName(name);
    request.setJsonEncodedValue(JSON.stringify(data));
    this.call_grpc("setTheme", request, on_change, on_err, true); //admin
  }

  editTheme(id,name,data, on_change, on_err) {
    let request = new EditThemesRequest();
    request.setId(id);
    request.setName(name);
    request.setJsonEncodedValue(JSON.stringify(data));
    this.call_grpc("editTheme", request, on_change, on_err, true); //admin
  }



  deleteTheme(name, on_change, on_err) {
    let request = new ThemesRequest();
    request.setName(name);
    this.call_grpc("deleteTheme", request, on_change, on_err, true); //admin
  }

  resetPassword(data, onResponse, onError) {
    let request = new ResetPasswordRequest();
    request.setUsername(data.username);
    // request.setEmail(data.email);
    request.setAnswers(data.answers);
    request.setNewPassword(data.newPassword);
    request.setConfirmPassword(data.confirmPassword);

    this.call_grpc("resetPassword", request, onResponse, onError);
  }


  updateSecurityQuestions(data, onResponse, onError) {
    let request = new UpdateSecurityQuestionsRequest();
    request.setPassword(data.password);
    request.setAnswer1(data.answer1);
    request.setAnswer2(data.answer2);
    request.setQuestion1(data.question1);
    request.setQuestion2(data.question2);


    this.call_grpc("updateSecurityQuestions", request, onResponse, onError);
  }


  adminLogin(username, password, device_id, on_response, on_error) {
    let request = new LoginRequest();
    request.setUserName(username);
    request.setPassword(password);
    request.setDeviceId("user.device_id");
    request.setRemoteIp("198.199.81.169");
    // don't need to set user agent, since grpc will set appropriate header
    // request.getExtraHeadersMap().set("HTTP_USER_AGENT", window.navigator.userAgent);
    console.log("login request: ", request);

    this.call_grpc("adminLogin", request, on_response, on_error);
  }

  validateSecurityQuestionsForLogin(username, answers, device_id, geolocationData, on_response, on_error) {
    let request = new ValidateSecurityQuestionsRequest();
    request.setUserName(username);
    request.setAnswers(answers);
    request.setDeviceId("user.device_id");
    request.setRemoteIp("198.199.81.169");
    request.setGeolocationData(geolocationData);


    this.call_grpc("validateSecurityQuestionsForLogin", request, on_response, on_error);
  }

  getTournamentPayoutStructure(tournament_instance_id, on_response, on_error){
    let request = new TournamentDetailsRequest();
    request.setTournamentInstanceId(tournament_instance_id);
    this.call_grpc("tournamentPayoutStructure", request, on_response, on_error);

  }

  /**
   * Client CRUD methods
   */

  getClientData(data, on_change, on_err) {
    let request = new ClientRequest();
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getClientData", request, on_change, on_err, true); //admin
  }
  addClientData(data, on_change, on_err) {
    let request = new ClientAddRequest();
    request.setName(data.name);

    this.call_grpc("addClientData", request, on_change, on_err, true); //admin
  }
  updateClientData(data, on_change, on_err) {
    let request = new ClientUpdateRequest();
    request.setId(data.id);
    request.setName(data.name);

    this.call_grpc("updateClientData", request, on_change, on_err, true); //admin
  }
  removeClientData(id, on_change, on_err) {
    let request = new ClientRemoveRequest();
    request.setClientId(id);

    this.call_grpc("removeClientData", request, on_change, on_err, true); //admin
  }
  /**
   * Component Permission CRUD methods
   */

  getComponentPermissionData(data, on_change, on_err) {
    let request = new ComponentPermissionRequest();
    request.setComponent(data.component);
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getComponentPermissionData", request, on_change, on_err, true); //admin
  }
  addComponentPermissionData(data, on_change, on_err) {
    let request = new ComponentPermissionAddRequest();
    request.setName(data.name);

    this.call_grpc("addComponentPermissionData", request, on_change, on_err, true); //admin
  }
  updateComponentPermissionData(data, on_change, on_err) {
    let request = new ComponentPermissionUpdateRequest();
    request.setId(data.id);
    request.setComponent(data.component);
    request.setRoles(data.roles);

    this.call_grpc("updateComponentPermissionData", request, on_change, on_err, true); //admin
  }
  removeComponentPermissionData(id, on_change, on_err) {
    let request = new ComponentPermissionRemoveRequest();
    request.setComponentPermissionId(id);

    this.call_grpc("removeClientData", request, on_change, on_err, true); //admin
  }
  /**
   * Add Admin Role
   */
  addAdminRole(data, on_change, on_err) {
    let request = new AdminRoleAddRequest();
    request.setAdminId(
      data.admin_id
    );
    request.setRole(data.role);
    this.call_grpc("addAdminRoleData", request, on_change, on_err, true); //admin
  }

  /**
   * Remove Admin Role
   */
  removeAdminRole(data, on_change, on_err) {
    let request = new AdminRoleRemoveRequest();
    request.setAdminId(
      data.admin_id
    );
    request.setRole(data.role);
    this.call_grpc("removeAdminRoleData", request, on_change, on_err, true); //admin
  }
  /**
   * Get Distinct Role
   */
  getAdminRoles(data, on_change, on_err) {
    let request = new AdminUpdateRequest();
    request.setId(
      data.id
    );
    this.call_grpc("getAdminRoles", request, on_change, on_err, true); //admin
  }
  getDistinctRole(data, on_change, on_err) {
    let request = new AdminRoleRequest();
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getDistinctRole", request, on_change, on_err, true); //admin
  }


  /**
   * Admin CRUD Opertions
   */
  getAdmins(data, on_change, on_err) {
    let request = new ActiveUsersRequest();
    request.setUsername(data.username);
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getAdmins", request, on_change, on_err, true); //admin
  }
  addAdminData(data, on_change, on_err) {
    let request = new AdminAddRequest();
    request.setName(data.name);
    request.setUsername(data.username);
    request.setEmail(data.email);
    request.setPassword(data.password);
    this.call_grpc("addAdminData", request, on_change, on_err, true); //admin
  }
  updateAdminData(data, on_change, on_err) {
    let request = new AdminUpdateRequest();
    request.setId(data.id);
    request.setName(data.name);
    request.setUsername(data.username);
    this.call_grpc("updateAdminData", request, on_change, on_err, true); //admin
  }
  removeAdminData(id, on_change, on_err) {
    let request = new AdminRemoveRequest();
    request.setId(id);
    this.call_grpc("removeAdminData", request, on_change, on_err, true); //admin
  }

  updateTournamentTemplate(id , data, on_response, on_error) {
    let request = new UpdateTournamentTemplateRequest();
    request.setTournamentTemplateId(id);
    request.setName(data.name);
    request.setBuyin(data.buyin);
    request.setBuyinChips(data.buyin_chips);
    request.setAddonChips(data.addon_chips);
    request.setMinPrizePoolValue(data.min_prize_pool_value);
    request.setRake(data.rake);
    request.setIsForMoney(data.is_for_money);
    request.setRebuysPermitted(data.rebuys_permitted);
    request.setAddonsPermitted(data.addons_permitted);
    request.setAddonThreshold(data.addon_threshold);
    request.setRebuysRoundStart(data.rebuys_round_start);
    request.setRebuysRoundEnd(data.rebuys_round_end);
    request.setAddonsRoundStart(data.addons_round_start);
    request.setAddonsRoundEnd(data.addons_round_end);
    request.setScheduledBreaks(data.scheduled_breaks);
    request.setTimeLimitSeconds(data.time_limit_seconds);
    request.setPendingTimeoutSeconds(data.pending_timeout_seconds);
    request.setMinPlayersPerTable(data.min_players_per_table);
    request.setMaxPlayersPerTable(data.max_players_per_table);
    request.setSmallBlindMaxValue(data.small_blind_max_value);
    request.setTableTimer(data.table_timer);
    request.setTourPlayersMin(data.tour_players_min);
    request.setTourPlayersMax(data.tour_players_max);
    request.setType(data.tournamentType);
    request.setBlindsIncreaseIntervalSeconds(data.blinds_increase_interval_seconds);
    request.setBlindsIncreaseIntervalRounds(data.blinds_increase_interval_rounds);
    request.setTableType(data.tableType);
    request.setTableMaxNumRaises(data.table_max_num_raises); // default number of maximum raises
    request.setRebalancingTableAlgorithm(data.rebalancing_table_algorithm);
    request.setStatus(data.status);
    request.setUseDecimals(data.use_decimals);
    request.setGameType(data.gameType);
    request.setBlindLevelAndValues(data.blindLevels);
    request.setFlashPrizePoolValues(data.flashPrizePool);
    request.setAdditionalPrizePoolPayoutId(data.additionalPayout);
    request.setAdditionalPayoutPlayer(data.additionalPayoutPlayer);
    request.setPrizePoolPayoutId(data.prizePayout);
    request.setUseAdditionalPayoutOnly(data.useAdditionalPayoutOnly);
    request.setUniqueDeck(data.uniqueDeck);
    request.setInstantPayout(data.instantPayout);
    request.setTournamentImage(data.tournamentImage);
    request.setWildcardsEnabled(data.wildcards_enabled);
    request.setWildcardValue(data.wildcard_value);
    request.setChipsInPenny(data.chips_in_penny);
    request.setPairMixedAddonPlayers(data.pair_mixed_addon_players);
    request.setHardCapEnabled(data.hard_cap_enabled);
    request.setUsernamePrivacy(data.username_privacy);
    request.setRevealCardsAfterAction(data.reveal_cards_after_action);

    console.log("createTournamentTemplate request: ", request);

    this.call_grpc(
      "updateTournament",
      request,
      function (response) {
        console.log("createTournamentTemplate: response: ", response);

        on_response(response);
      },
      on_error,
      true //admin
    );
  }
  removeTournamentTemplate(ids, on_change, on_err){
    let request = new GetTournamentTemplateDetailRequest();
    request.setTournamentTemplateId(ids[0]);

    this.call_grpc("removeTournament", request, on_change, on_err, true);
  }

  simulateGames(tournament_template_id, tournament_limit,addons_amount,numberOfPlayers, on_change, on_err){
    let request = new SimulateGamesRequest();
    request.setTournamentTemplateId(tournament_template_id);
    request.setTournamentLimit(tournament_limit);
    request.setAddonsAmount(addons_amount);
    request.setNoOfPlayers(numberOfPlayers);
    this.call_grpc("simulateGames", request, on_change, on_err, true);

  }
  deletePrizePoolPayout(payout_id, on_change, on_err){
    let request = new DeletePrizePoolStatusRequest();
    request.setPrizePoolPayoutId(payout_id);
    console.log("Request")
    console.log(request)

    this.call_grpc("deletePrizePoolPayout", request, on_change, on_err, true);

  }

  getPendingRequests(data, on_change, on_err){

    let request = new PendingDepositRequest();
    request.setPaginationCurrPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );
    this.call_grpc("getPendingRequest", request, on_change, on_err, true);

  }

  getApprovedRequests(data, on_change, on_err){
    let request = new PendingDepositRequest();
    request.setPaginationCurrPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getApprovedRequest", request, on_change, on_err, true);
  }

  actionOnPendingRequest(cashier_request_id, is_deposit, on_change, on_err){
    let request = new UpdatePendingRequest();
    request.setCashierRequestId(cashier_request_id);
    request.setAction(is_deposit ? "Accept" : '');
    this.call_grpc("actionOnPendingRequest", request, on_change, on_err, true);

  }

  getBotList(data, on_response, on_error) {
    let request = new ActiveUsersRequest();
    request.setUsername(data.username);
    request.setPaginationCurrentPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getBotList", request, on_response, on_error, true); //admin
  }

  createBots(number_of_bots, on_response, on_error) {
    let request = new CreateMultipleUsersRequest();
    request.setNumberOfUsers(number_of_bots);

    this.call_grpc("createMultipleUsers", request, on_response, on_error, true); //admin
  }

  getPlayerTournaments(data, on_response, on_error) {
    // getTournaments
    let request = new PlayerTournamentRequest();
    request.setPaginationCurrPage(
        data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    this.call_grpc("getPlayerTournaments", request, on_response, on_error);
  }

  adminJoinAnyTournament(user_id,limit, on_change, on_err) {
    let request = new AdminJoinAnyTournamentRequest();
    request.setUserId(user_id)
    request.setLimit(limit);
    this.call_grpc("adminJoinAnyTournament", request, on_change, on_err);
  }

  getGeopollList(data, on_response, on_error) {
    let request = new GeopollRequest();

    request.setPaginationCurrPage(
      data.pagination_current_page ? String(data.pagination_current_page) : "1"
    );
    request.setPaginationItemsPerPage(
      data.pagination_items_per_page
        ? String(data.pagination_items_per_page)
        : "10"
    );

    request.setSessionDataId(data.session_id);
    request.setIpAddress(data.ip_address)

    this.call_grpc("getGeopoll", request, on_response, on_error, true); //admin
  }
}

function getExpectedPlayersData(get_status_response) {
  let players = {};
  get_status_response.getPlayersList().forEach(function (grpc_player, index) {
    players[grpc_player.getMd5()] = getExpectedPlayer(grpc_player);
  });

  return players;
}

function getExpectedPlayer(grpc_player) {
  let player_meta = JSON.parse(grpc_player.getMeta() || null);
  let player_cards = JSON.parse(grpc_player.getCards() || null);
  let bet2do = number_exists(player_meta?.bet2do)
    ? parseFloat(player_meta.bet2do)
    : null;
  console.log(grpc_player);
  return {
    meta: player_meta,
    bet2do: bet2do,
    addons_used: grpc_player.getAddonsUsed(),
    is_myturn: Boolean(grpc_player.getIsMyTurn()),
    myturn_start_time: grpc_player.getMyTurnStartTime()
      ? parseInt(grpc_player.getMyTurnStartTime())
      : null,
    chair: number_exists(grpc_player.getChair())
      ? parseInt(grpc_player.getChair())
      : null,
    username: grpc_player.getUsername(),
    id: grpc_player.getUserId(),
    chips: number_exists(grpc_player.getChips())
      ? parseFloat(grpc_player.getChips())
      : null,
    md5: grpc_player.getMd5(),
    cards: player_cards,
  };
}

function parseUser(grpc_user) {
  return {
    id: grpc_user.getId(),
    name: grpc_user.getName(),
    username: grpc_user.getUsername(),
    cachInAccount: grpc_user.getCashInAccount(),
    md5: md5(grpc_user.getId()),
  };
}

export default GrpcClient;
