import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import PomTimers from "./PomTimers";
import PomControls from "./PomControls";
import PomProgress from "./PomProgress";

function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const initDuration = { bDuration: 300, fDuration: 25, focusStatus: 0 };
  const [duration, setDuration] = useState(initDuration);
  // bDuration is in seconds fDuration is in minutes
  // focus status codes: 0 means paused, 1 means focus and 2 means break

  useInterval(
    () => {
      // this counts once per tick
      setTimeElapsed(timeElapsed + 1);
    },
    // this sets how long one tick is
    isTimerRunning ? 1000 : null
  );
  function stopHandler() {
    setIsTimerRunning(false);
    setDuration(initDuration);
    setTimeElapsed(0);
  }
  function playPause() {
    if (!timeElapsed)
      setDuration({
        bDuration: duration.bDuration,
        fDuration: duration.fDuration,
        focusStatus: 1,
      });
    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div className="pomodoro">
      <PomTimers
        duration={duration}
        setDuration={setDuration}
        isTimerRunning={isTimerRunning}
      />
      <PomControls
        isTimerRunning={isTimerRunning}
        playPause={playPause}
        stopHandler={stopHandler}
      />
      <PomProgress
        timeElapsed={timeElapsed}
        setTimeElapsed={setTimeElapsed}
        duration={duration}
        setDuration={setDuration}
        isTimerRunning={isTimerRunning}
      />
    </div>
  );
}

export default Pomodoro;
