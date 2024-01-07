import React, { useState } from "react";
import { Scale } from "tonal";

const MelodyGenerator: React.FC = () => {
  const [melody, setMelody] = useState<string[]>([]);
  const scaleKey: string = "C";
  const scaleType: string = "major";
  const melodyLength: number = 8;

  const generateMelody = (): void => {
    const scaleNotes: string[] = Scale.get(`${scaleKey} ${scaleType}`).notes;
    const newMelody: string[] = [];

    for (let i = 0; i < melodyLength; i++) {
      const randomIndex: number = Math.floor(Math.random() * scaleNotes.length);
      newMelody.push(scaleNotes[randomIndex]);
    }

    setMelody(newMelody);
  };

  return (
    <div>
      <h1>Melody Generator</h1>
      <button onClick={generateMelody}>Generate Melody</button>
      <div>Melody: {melody.join(" ")}</div>
    </div>
  );
};

export default MelodyGenerator;
