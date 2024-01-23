import React from "react";

interface TickerProps {
  isPlaying: boolean;
}

const Ticker: React.FC<TickerProps> = ({ isPlaying }) => {
  return <div>{isPlaying ? "Ticking..." : "Paused"}</div>;
};

export default Ticker;
