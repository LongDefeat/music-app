import React, { useContext } from "react";
import * as Tone from "tone";
import { MetroContext } from "./MetroContextProvider";
import ControlCenter from "./ControlCenter";
import Ticker from "./Ticker";
import Navigation from "@/app/components/Navigation";

const Metronome: React.FC = () => {
  const metroContext = useContext(MetroContext);

  const startMetronome = async () => {
    // Ensures the audio context is started as a result of user interaction
    await Tone.start();

    if (!metroContext.isPlaying) {
      metroContext.setIsPlaying(true);
      Tone.Transport.start();
      // Add additional logic for scheduling metronome ticks
    }
  };

  const stopMetronome = () => {
    if (metroContext.isPlaying) {
      metroContext.setIsPlaying(false);
      Tone.Transport.stop();
      // Additional stopping logic if necessary
    }
  };

  return (
    <>
      <Navigation />
      <h1>Metronome</h1>
      <div>
        {metroContext.showMetronome && (
          <Ticker isPlaying={metroContext.isPlaying} />
        )}
        <ControlCenter onStart={startMetronome} onStop={stopMetronome} />
      </div>
    </>
  );
};

export default Metronome;
