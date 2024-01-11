import React, { useState, ChangeEvent } from "react";
import { Scale } from "tonal";
import Navigation from "@/app/components/Navigation";

import styles from "../app/styles/Songwriting.module.css";

type NoteDuration = "whole" | "half" | "quarter";
type RestDuration = "whole rest" | "half rest" | "quarter rest";
type MelodyElement = { note?: string; duration: NoteDuration | RestDuration };

interface MelodyNote {
  note: string;
  duration: NoteDuration;
}

const MelodyGenerator: React.FC = () => {
  const [melody, setMelody] = useState<MelodyNote[]>([]);
  const [selectedKey, setSelectedKey] = useState<string>("C");
  const [selectedScale, setSelectedScale] = useState<string>("major");
  const melodyLength: number = 8;

  const scaleNotes: string[] = Scale.get(
    `${selectedKey} ${selectedScale}`
  ).notes;
  const noteDurations: NoteDuration[] = ["whole", "half", "quarter"];
  const restDurations: RestDuration[] = [
    "whole rest",
    "half rest",
    "quarter rest",
  ];
  const newMelody: MelodyElement[] = [];

  const keys: string[] = [
    "A",
    "A#",
    "Bb",
    "B",
    "C",
    "C#",
    "Db",
    "D",
    "D#",
    "Eb",
    "E",
    "F",
    "F#",
    "Gb",
    "G",
    "G#",
    "Ab",
  ];

  const scales: string[] = ["major", "minor"]; // Add more scales as desired

  const generateMelody = (): void => {
    const scaleNotes: string[] = Scale.get(
      `${selectedKey} ${selectedScale}`
    ).notes;
    const durations: NoteDuration[] = [
      "whole",
      "half",
      "quarter",
      "eighth",
      "rest",
    ];
    const newMelody: MelodyNote[] = [];

    for (let i = 0; i < melodyLength; i++) {
      const isRest: boolean = Math.random() < 0.3; // 30% chance for a rest
      if (isRest) {
        const randomDurationIndex: number = Math.floor(
          Math.random() * restDurations.length
        );
        newMelody.push({ duration: restDurations[randomDurationIndex] });
      } else {
        const randomNoteIndex: number = Math.floor(
          Math.random() * scaleNotes.length
        );
        const randomDurationIndex: number = Math.floor(
          Math.random() * noteDurations.length
        );
        newMelody.push({
          note: scaleNotes[randomNoteIndex],
          duration: noteDurations[randomDurationIndex],
        });
      }
    }

    setMelody(newMelody);
  };

  const handleKeyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedKey(e.target.value);
  };

  const handleScaleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedScale(e.target.value);
  };

  return (
    <>
      <Navigation />
      <div className={styles.songwritingTool}>
        <h1>Melody Generator</h1>
        <div>
          <label className={styles.label} htmlFor="key-select">
            Choose a Key:
          </label>
          <select
            id="key-select"
            className={styles.select}
            value={selectedKey}
            onChange={handleKeyChange}
          >
            {keys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={styles.label} htmlFor="scale-select">
            Choose a Scale:
          </label>
          <select
            id="scale-select"
            className={styles.select}
            value={selectedScale}
            onChange={handleScaleChange}
          >
            {scales.map((scale) => (
              <option key={scale} value={scale}>
                {scale}
              </option>
            ))}
          </select>
        </div>
        <button className={styles.button} onClick={generateMelody}>
          Generate Melody
        </button>
        <div className={styles.melodyDisplay}>
          {melody.map((element, index) => (
            <div key={index} className={styles.note}>
              {element.note ? element.note : "Rest"}
              <span className={styles.duration}>({element.duration})</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MelodyGenerator;
