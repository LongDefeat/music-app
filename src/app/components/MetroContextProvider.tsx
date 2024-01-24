import React, { createContext, useState, useEffect } from "react";
import * as Tone from "tone";

export const MetroContext = createContext({});

const MetroContextProvider: React.FC = ({ children }) => {
  const [bpm, setBpm] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying) {
      Tone.Transport.bpm.value = bpm;
      Tone.Transport.start();
    } else {
      Tone.Transport.stop();
    }
  }, [isPlaying, bpm]);

  const playSound = (time: number) => {
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C3", "8n", time);
  };

  useEffect(() => {
    const repeatId = Tone.Transport.scheduleRepeat(playSound, "4n");
    return () => {
      Tone.Transport.clear(repeatId);
    };
  }, []);

  const value = { bpm, setBpm, isPlaying, setIsPlaying };

  return (
    <MetroContext.Provider value={value}>{children}</MetroContext.Provider>
  );
};

export default MetroContextProvider;
