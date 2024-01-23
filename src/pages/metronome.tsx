import React from "react";
import MetroContextProvider from "@/app/components/MetroContextProvider";
import Metronome from "@/app/components/Metronome";

const App: React.FC = () => {
  return (
    <MetroContextProvider>
      <Metronome />
    </MetroContextProvider>
  );
};

export default App;
