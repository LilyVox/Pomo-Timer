import React from "react";
import { secondsToDuration, minutesToDuration } from "../utils/duration";

export default function PomTimers({ duration, setDuration, isTimerRunning }) {
  const increaseDuration = (event) => {
    let instruct = event.target.closest("button").value;
    let plusOrMinus = instruct.slice(0, 1); // the first character of button's value is p(lus) or m(inus)
    let focusOrBreak = instruct.slice(1); // the rest is either focus or break
    setDuration(({ bDuration, fDuration, focusStatus }) => {
      let increment = focusOrBreak === "focus" ? 5 : 60;
      let product = plusOrMinus === "m" ? -increment : increment;
      let newDur =
        focusOrBreak === "break" ? bDuration + product : fDuration + product;
      return focusOrBreak === "focus"
        ? { bDuration, fDuration: newDur, focusStatus }
        : { bDuration: newDur, fDuration, focusStatus };
    });
  };
  return (
    <div className="row">
      <div className="col">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-focus">
            Focus Duration: {minutesToDuration(duration.fDuration)}
          </span>
          <div className="input-group-append">
            <button
              value="mfocus"
              type="button"
              className="btn btn-dark"
              data-testid="decrease-focus"
              onClick={increaseDuration}
              disabled={isTimerRunning || duration.fDuration <= 5}
            >
              <span className="oi oi-minus" />
            </button>
            <button
              value="pfocus"
              type="button"
              onClick={increaseDuration}
              className="btn btn-dark"
              data-testid="increase-focus"
              disabled={isTimerRunning || duration.fDuration >= 60}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="float-right">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-break">
              Break Duration: {secondsToDuration(duration.bDuration)}
            </span>
            <div className="input-group-append">
              <button
                value="mbreak"
                type="button"
                onClick={increaseDuration}
                className="btn btn-dark"
                data-testid="decrease-break"
                disabled={isTimerRunning || duration.bDuration <= 1 * 60}
              >
                <span className="oi oi-minus" />
              </button>
              <button
                value="pbreak"
                type="button"
                onClick={increaseDuration}
                className="btn btn-dark"
                data-testid="increase-break"
                disabled={isTimerRunning || duration.bDuration >= 15 * 60}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
