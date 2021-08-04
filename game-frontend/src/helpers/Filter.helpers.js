import { game_types, table_types } from "../components/utils/constants";

export const TableTypes = [
    { value: "*", label: "All", filter_value: "*" },
    ...table_types,
];

export const GameTypes = [
    { value: "*", label: "All", filter_value: "*" },
    ...game_types,
];

export const Buyins = [
    { value: { buyin_low: "*", buyin_high: "*" }, label: "All" },
    { value: { buyin_low: "0", buyin_high: "25" }, label: "0-25" },
    { value: { buyin_low: "25", buyin_high: "50" }, label: "25-50" },
    { value: { buyin_low: "50", buyin_high: "100" }, label: "50-100" },
    { value: { buyin_low: "100", buyin_high: "250" }, label: "100-250" },
    { value: { buyin_low: "250", buyin_high: "500" }, label: "250-500" },
    { value: { buyin_low: "500", buyin_high: "1000" }, label: "500-1000" },
    { value: { buyin_low: "1000", buyin_high: "2500" }, label: "1000-2500" },
    { value: { buyin_low: "2500", buyin_high: "5000" }, label: "2500-5000" },
    { value: { buyin_low: "5000", buyin_high: "*" }, label: "5000+" },
];

export const EntryFee = [
    { value: { entry_fee_low: "*", entry_fee_high: "*" }, label: "All" },
  { value: { entry_fee_low: "0", entry_fee_high: "25" }, label: "0-25" },
  { value: { entry_fee_low: "25", entry_fee_high: "50" }, label: "25-50" },
  { value: { entry_fee_low: "50", entry_fee_high: "100" }, label: "50-100" },
  { value: { entry_fee_low: "100", entry_fee_high: "250" }, label: "100-250" },
  { value: { entry_fee_low: "250", entry_fee_high: "500" }, label: "250-500" },
  { value: { entry_fee_low: "500", entry_fee_high: "1000" }, label: "500-1000" },
  { value: { entry_fee_low: "1000", entry_fee_high: "2500" }, label: "1000-2500" },
  { value: { entry_fee_low: "2500", entry_fee_high: "5000" }, label: "2500-5000" },
  { value: { entry_fee_low: "5000", entry_fee_high: "*" }, label: "5000+" },
];

export const Timers = [
    { value: { timer_low: "*", timer_high: "*" }, label: "All" },
    { value: { timer_low: "0", timer_high: "30" }, label: "0-30 seconds" },
    { value: { timer_low: "30", timer_high: "60" }, label: "30-60 seconds" },
    { value: { timer_low: "60", timer_high: "90" }, label: "60-90 seconds" },
    { value: { timer_low: "90", timer_high: "120" }, label: "90-120 seconds" },
    { value: { timer_low: "120", timer_high: "*" }, label: "120+ seconds" },
];