import React from "react";
import { useLocation } from "react-router-dom";

import UserTournaments from "./UserTournaments";
import TableHisotories from "./TableHistories";
import HandHistory from "./HandHistory";

export default function GameplayHistories({ ...props }) {
  const location = useLocation();

  // get tournament or gameplay history id from url parameters
  const query = new URLSearchParams(location.search);
  const tournament_instance_id = query.get("tid");
  const gameplay_history_id = query.get("gid");

  if (gameplay_history_id) {
    return <HandHistory gameplay_history_id={gameplay_history_id} />;
  } else if (tournament_instance_id) {
    return <TableHisotories tournament_instance_id={tournament_instance_id} />;
  }

  return <UserTournaments />;
}
