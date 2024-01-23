import React, { useContext } from "react";
import { MetroContext } from "./MetroContextProvider";
import styles from "@/app/styles/ControlCenter.module.css";

interface ControlCenterProps {
  onStart: () => void;
  onStop: () => void;
}

const ControlCenter: React.FC<ControlCenterProps> = ({ onStart, onStop }) => {
  const { bpm, setBpm, isPlaying } = useContext(MetroContext);

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(e.target.value));
  };

  const togglePlay = () => {
    if (isPlaying) {
      onStop(); // Stop the metronome
    } else {
      onStart(); // Start the metronome
    }
  };

  return (
    <div className={styles.controlCenterContainer}>
      <input
        type="number"
        value={bpm}
        onChange={handleBpmChange}
        className={styles.bpmInput}
      />
      <button onClick={togglePlay} className={styles.playButton}>
        {isPlaying ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default ControlCenter;
