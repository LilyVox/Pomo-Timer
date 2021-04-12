import React from "react";
import { minutesToDuration, secondsToDuration } from "../utils/duration";

export default function PomProgress({
  timeElapsed,
  setTimeElapsed,
  duration,
  setDuration,
  isTimerRunning,
}) {
  const { bDuration, fDuration, focusStatus } = duration;
  const timeRemaining =
    focusStatus < 2 ? fDuration * 60 - timeElapsed : bDuration - timeElapsed;
  const pauseThing = <h3>PAUSED</h3>;
  let displayBar =
    focusStatus < 2
      ? (timeElapsed / (fDuration * 60)) * 100
      : (timeElapsed / bDuration) * 100;

  if (displayBar === 100) {
    setTimeElapsed(0);
		new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`).play();
    if (focusStatus === 2) {
      setDuration({ bDuration, fDuration, focusStatus: 1 });
    } else {
      setDuration({ bDuration, fDuration, focusStatus: 2 });
    }
  }
  displayBar = Math.round(displayBar);
  return (
    !!focusStatus && (
      <div>
        <div className="row mb-2">
          <div className="col">
            <h2 data-testid="session-title">
              {focusStatus < 2
                ? `Focusing for ${minutesToDuration(fDuration)} minutes`
                : `On Break for ${secondsToDuration(bDuration)} minutes`}
            </h2>
            <p className="lead" data-testid="session-sub-title">
              {`${secondsToDuration(timeRemaining)} remaining`}
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            {!isTimerRunning ? pauseThing : null}
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={displayBar} 
                style={{ width: (displayBar += "%") }} 
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
}
