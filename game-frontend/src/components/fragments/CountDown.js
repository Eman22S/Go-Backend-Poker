import React from "react";

//!! Has no effect or purpose at all for now
function CountDown({ player, ...props }) {
    let styles = { visibility: player.is_myturn ? "visible" : "hidden" };

    return (
        <div
            className="countdown label notice"
            id={`countdown_${player.md5}`}
            style={styles}
        >
            {0}
        </div>
    );
}

export default CountDown;
