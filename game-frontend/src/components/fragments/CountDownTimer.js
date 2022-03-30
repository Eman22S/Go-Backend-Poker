import React, { useEffect, useState } from "react";

function zeroPad(num, places) {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}

function CountdownTimer(props) {
  const calculateTimeLeft = () => {

    const difference = (props.date && props.timer) ?
      +new Date(props.date * 1000  + (props.timer *  1000)) - +new Date() : 0;
    if (props.date && props.timer && (difference <= 0)) props.timeOut();
    let timeLeft = {};
    timeLeft = {
      minutes: zeroPad(
        Math.max(Math.floor((difference / 1000 / 60) % 60), 0) +  (Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0) * 60),
        2
      ),
      seconds: zeroPad(Math.max(Math.floor((difference / 1000) % 60), 0), 2)
    };

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const countDownTimer = Object.keys(timeLeft)
    .map(interval => timeLeft[interval] || "00")
    .join(":");

  return (
    <div>
      <div className="">
        <div className="most-inner">
          <span
            className={ props.date && props.timer && countDownTimer === "00:00" ? "flash_time blink" : "flash_time"}
          >
            {countDownTimer}
          </span>
        </div>
      </div>{" "}
    </div>
  );
}

export default CountdownTimer;