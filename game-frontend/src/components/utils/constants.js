import { number_exists } from "../../utils/number_utils";

// need to compute card number to support .card_28 kind of classes for allcards image
let card_numbers = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
let card_symbols = ["d", "h", "s", "c"];
const StringCardClasses = {}; // changes cards represented as string like 'Ah' or '5d' to its corresponding card class
let card_class_number = 1;
for (let number of card_numbers) {
  for (let symbol of card_symbols) {
    StringCardClasses[`${number}${symbol}`] = `card_${card_class_number}`;
    card_class_number++;
  }
}
StringCardClasses["back"] = "card_back";

// change number representation of card sent from server to its corresponding card number and symbols
const CardRanks = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
];
const CardSuits = ["c", "s", "h", "d"];

/**
 * Changes card represented as number to its correspondinc card class
 * @param {str} server_card_number : number representation of card
 * @returns {str} : corresponding card class
 */
const numberCardClass = function (server_rank_number, server_suit_number) {
  let card_type = "back"; // default to back

  if (number_exists(server_rank_number) && number_exists(server_suit_number) 
   && server_rank_number >= 0 && server_suit_number >= 0) {
    card_type = `${CardRanks[server_rank_number]}${CardSuits[server_suit_number]}`;
  }

  return StringCardClasses[card_type];
};

//first array element is the picture orientation to use
//2nd element is the class name(s) to assign to the chair for styling
const chairLayouts = {
  2: [
    ["bottom", "right bottom bottom_right"],
    ["bottom", "left bottom bottom_left"],
  ],
  3: [
    ["bottom", "center bottom bottom_center"],
    ["top", "left_top top top_left"],
    ["top", "right_top top top_right"],
  ],
  4: [
    ["bottom", "right bottom bottom_right"],
    ["bottom", "left bottom bottom_left"],
    ["top", "left_top top top_left"],
    ["top", "right_top top top_right"],
  ],
  5: [
    ["bottom", "center bottom bottom_center"],
    ["bottom_left_corner", "far_left bottom bottom_far_left"],
    ["top_left_corner", "top_far_left far_left top_corner"],
    ["top_right_corner", "top_far_right far_right top_corner"],
    ["bottom_right_corner", "far_right bottom bottom_far_right"],
  ],
  6: [
    ["bottom", "right bottom bottom_right"],
    ["bottom", "left bottom bottom_left"],
    ["middle_left", "middle_left middle"],
    ["top_left_corner", "top_far_left far_left top_corner"],
    ["top_right_corner", "top_far_right far_right top_corner"],
    ["middle_right", "middle_right middle"],
  ],
  7: [
    ["bottom", "center bottom bottom_center"],
    ["middle_left", "middle_left middle"],
    ["top_left_corner", "top_far_left far_left top_corner"],
    ["top", "left_top top top_left"],
    ["top", "right_top top top_right"],
    ["top_right_corner", "top_far_right far_right top_corner"],
    ["middle_right", "middle_right middle"],
  ],
  8: [
    ["bottom", "right bottom bottom_right"],
    ["bottom", "left bottom bottom_left"],
    ["middle_left", "middle_left middle"],
    ["top_left_corner", "top_far_left far_left top_corner"],
    ["top", "left_top top"],
    ["top", "right_top top"],
    ["top_right_corner", "top_far_right far_right top_corner"],
    ["middle_right", "middle_right middle"],
  ],
  9: [
    ["bottom", "center bottom bottom_center"],
    ["bottom_left_corner", "far_left bottom bottom_far_left"],
    ["middle_left", "middle_left middle"],
    ["top_left_corner", "top_far_left far_left top_corner"],
    ["top", "left_top top top_left"],
    ["top", "right_top top top_right"],
    ["top_right_corner", "top_far_right far_right top_corner"],
    ["middle_right", "middle_right middle"],
    ["bottom_right_corner", "far_right bottom bottom_far_right"],
  ],
  10: [
    ["bottom", "right bottom bottom_right"],
    ["bottom", "left bottom bottom_left"],
    ["bottom_left_corner", "far_left bottom bottom_far_left"],
    ["middle_left", "middle_left middle"],
    ["top_left_corner", "top_far_left far_left top_corner"],
    ["top", "left_top top top_left"],
    ["top", "right_top top top_right"],
    ["top_right_corner", "top_far_right far_right top_corner"],
    ["middle_right", "middle_right middle"],
    ["bottom_right_corner", "far_right bottom bottom_far_right"],
  ],
};

const chip_denominations = [
  0.01,
  0.05,
  0.1,
  0.25,
  1,
  5,
  10,
  25,
  100,
  500,
  1000,
  5000,
  10000,
  50000,
  100000,
  500000,
]
  .sort()
  .reverse();
const max_chips_to_show_in_pot = 20;
const max_num_chips_to_create_per_user = 10;

const connection_status_legend = { 0: "Good", 1: "Medium", 2: "Poor" };

// table types
const table_types = [
  { value: "NO_LIMIT", label: "No Limit", filter_value: "none" },
  { value: "LIMIT", label: "Limit", filter_value: "fixed" },
  { value: "POT_LIMIT", label: "Pot Limit", filter_value: "pot_limit" },
];

// game types
const game_types = [
  { value: "texas_holdem", label: "Texas Hold'em" },
  { value: "omaha", label: "Omaha" },
  { value: "five_card_stud", label: "Five Card Stud" },
  { value: "five_card_draw", label: "Five Card Draw" },
];

const tournament_types = [
  { value: "SIT_N_GO", label: "Sit & Go" },
  { value: "MULTI_TABLE", label: "Multi Table" },
];

const tournament_states_labels = {
  STATUS_CANCELLED: 'cancelled',
	STATUS_PENDING: 'cancelled',
	STATUS_FINISHED: 'finished',
	STATUS_ACTIVE: 'active',
};

// Key same as backend return: Value same as text for UI
const table_type_labels = {
  NO_LIMIT: "No Limit",
  LIMIT: "Limit",
  POT_LIMIT: "Pot Limit",
};


const join_any_status = {
  DEACTIVATE : 'DEACTIVATE',
	ACTIVATE : 'ACTIVATE'
}
// Key same as backend return: Value same as text for UI
const game_type_labels = {
  any: 'Any',
  texas_holdem: "Texas Hold'em",
  omaha: "Omaha",
  five_card_draw: "Five Card Draw",
  five_card_stud: "Five Card Stud",
};

// Key same as backend return: Value same as text for UI
const game_mode_labels = {
  any: 'Any',
  standard: "Standard",
  single_hand: "Single Hand Mode",
  turbo: "Turbo Mode",
  flash: "Flash Mode",
};



// Tournament Template Buffer Status
const tournament_template_buffer_status = {
  waiting: "WAITING",
  tournament_created: "TOURNAMENT_CREATED",
};

const template_options = {
  name: "name",
  buyin: "buyin",
  buyin_chips: "buyinChips",
  min_prize_pool_value: "minPrizePoolValue",
  rake: "rake",
  is_for_money: "isForMoney",
  rebuys_permitted: "rebuysPermitted",
  addons_permitted: "addonsPermitted",
  addon_threshold: "addonThreshold",
  rebuys_round_start: "rebuysRoundStart",
  rebuys_round_end: "rebuysRoundEnd",
  addons_round_start: "addonsRoundStart",
  addons_round_end: "addonsRoundEnd",
  scheduled_breaks: "scheduledBreaks",
  time_limit_seconds: "timeLimitSeconds",
  pending_timeout_seconds: "pendingTimeoutSeconds",
  min_players_per_table: "minPlayersPerTable",
  max_players_per_table: "maxPlayersPerTable",
  small_blind_starting_value: "smallBlindStartingValue",
  small_blind_max_value: "smallBlindMaxValue",
  table_timer: "tableTimer",
  tour_players_min: "tourPlayersMin",
  tour_players_max: "tourPlayersMax",
  type: "tournamentType",
  blinds_increase_interval_seconds: "blindsIncreaseIntervalSeconds",
  blinds_increase_interval_rounds: "blindsIncreaseIntervalRounds",
  table_type: "tableType",
  table_max_num_raises: "tableMaxNumRaises", // default number of maximum raises
  rebalancing_table_algorithm: "rebalancingTableAlgorithm",
  status: "status",
  use_decimals: "useDecimals",
  game_type: "gameType",
  flash_prize_pool_values: "prizePoolValues",
  blind_level_and_values: "blindLevels",
  addon_chips: "addonChips",
  tournament_image:"tournament_image",
  instant_payout:"instant_payout",
  unique_deck:"unique_deck",
  wildcard_value:"wildcard_value",
  wildcards_enabled:"wildcards_enabled",
  chips_in_penny:"chips_in_penny",
  pair_mixed_addon_players:"pair_mixed_addon_players",
  hard_cap_enabled:"hard_cap_enabled",
  username_privacy:"username_privacy",
  reveal_cards_after_action:"reveal_cards_after_action",
  id: "id"
};

const tour_temp = [
  { value: "name", label: "Name:" },
  { value: "buyin", label: "Buyin:" },
  { value: "buyin_chips", label: "Buyin Chips:" },
  { value: "min_prize_pool_value", label: "Prize Pool" },
  { value: "rake", label: "Rake:" },
  { value: "is_for_money", label: "Is For Money:" },
  { value: "rebuys_permitted", label: "Rebuys Permitted" },
  { value: "addons_permitted", label: "Addons Permitted" },
  { value: "addon_threshold", label: "Addon Threshold" },
  { value: "rebuys_round_start", label: "Rebuys Round Start:" },
  { value: "rebuys_round_end", label: "Rebuys Round End:" },
  { value: "addons_round_start", label: "Addons Round Start:" },
  { value: "addons_round_end", label: "Addons Round End:" },
  { value: "scheduled_breaks", label: "Scheduled Breaks:" },
  { value: "time_limit_seconds", label: "Time Limit (Seconds)" },
  { value: "pending_timeout_seconds", label: "Pending Timeout (Seconds):" },
  { value: "min_players_per_table", label: "Min Players Per Table:" },
  { value: "max_players_per_table", label: "Max Player per Table:" },
  { value: "small_blind_starting_value", label: "Small Blind Starting Value:" },
  { value: "small_blind_max_value", label: "Small Blind Max Value:" },
  { value: "table_timer", label: "Talble Timer:" },
  { value: "tour_players_min", label: "Tour Players Min:" },
  { value: "tour_players_max", label: "Tour Players Max:" },
  { value: "type", label: "Tournament Type:" },
  {
    value: "blinds_increase_interval_seconds",
    label: "Blind Increase (Seconds): ",
  },
  {
    value: "blinds_increase_interval_rounds",
    label: "Blind Increase Interval Rounds:",
  },
  { value: "table_type", label: "Talble Type:" },
  { value: "table_max_num_raises", label: "Table Max Num Raises:" },
  {
    value: "rebalancing_table_algorithm",
    label: "Rebalancing Table Algorithm:",
  },
  { value: "status", label: "Status:" },
  { value: "use_decimals", label: "Use Decimal:" },
  { value: "game_type", label: "Game Type:" },
  { value: "addon_chips", label: "Addon Chips:" },
];

const join_any_limit = [50, 100, 250, 500, 1000, 2500, 5000, 10000];

const font_family = [
  { value: 'Roboto', label:  'Roboto'},
  { value: '"Segoe UI"', label:"Segoe UI"  },
  { value: '"Helvetica Neue"', label:  'Helvetica Neue'},
  { value: 'Arial', label:  'Arial'},
  { value: 'sans-serif', label:'sans-serif'  },
];

export {
  StringCardClasses,
  numberCardClass,
  chairLayouts,
  chip_denominations,
  max_chips_to_show_in_pot,
  max_num_chips_to_create_per_user,
  connection_status_legend,
  table_types,
  game_types,
  tournament_types,
  table_type_labels,
  game_type_labels,
  template_options,
  tour_temp,
  tournament_states_labels,
  tournament_template_buffer_status,
  join_any_limit,
  join_any_status,
  game_mode_labels,
  font_family
};
