import React, { useContext } from "react";
import { MetroContext } from "./MetroContextProvider";
import {
  BPMBarContainer,
  BPMAdjustmentButton,
  BPMDisplay,
} from "./BPMBar.styles"; // Import the styled components

interface BPMBarProps {
  onTempoChange: (tempo: number) => void;
}

const BPMBar: React.FC<BPMBarProps> = ({ onTempoChange }) => {
  const { bpm } = useContext(MetroContext);

  return (
    <BPMBarContainer>
      <BPMAdjustmentButton onClick={() => onTempoChange(bpm - 1)}>
        <SubtractLineIcon size={40} />
      </BPMAdjustmentButton>
      <BPMDisplay>{bpm}</BPMDisplay>
      <BPMAdjustmentButton onClick={() => onTempoChange(bpm + 1)}>
        <AddLineIcon size={40} />
      </BPMAdjustmentButton>
    </BPMBarContainer>
  );
};

export default BPMBar;
