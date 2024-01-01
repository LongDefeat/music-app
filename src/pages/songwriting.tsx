import React, { useState, useEffect, ChangeEvent } from "react";
import { Chord, Scale } from "tonal";
import Navigation from "@/app/components/Navigation";

import styles from "../app/styles/Songwriting.module.css";

export default function SongwritingTool() {
  const keys: string[] = ["A", "B", "C", "D", "E", "F", "G"];
  const scales: string[] = ["major", "minor"];

  const majorScaleChords: string[] = [
    "major",
    "minor",
    "minor",
    "major",
    "major",
    "minor",
    "diminished",
  ];
  const minorScaleChords: string[] = [
    "minor",
    "diminished",
    "major",
    "minor",
    "minor",
    "major",
    "major",
  ];

  const [selectedKey, setSelectedKey] = useState<string>("C");
  const [selectedScale, setSelectedScale] = useState<string>("major");
  const [availableChords, setAvailableChords] = useState<string[]>([]);
  const [customProgression, setCustomProgression] = useState<string[]>(
    new Array(4).fill("")
  );

  const [displayedProgression, setDisplayedProgression] = useState<string>("");

  useEffect(() => {
    const chords = getChordsInScale(selectedKey, selectedScale);
    setAvailableChords(chords);
  }, [selectedKey, selectedScale]);

  const getChordsInScale = (key: string, scaleType: string): string[] => {
    const scaleChords =
      scaleType === "major" ? majorScaleChords : minorScaleChords;
    const scale = Scale.get(`${key} ${scaleType}`).notes;

    return scale.map((note, index) => {
      const chordType = scaleChords[index];
      return `${note} ${chordType}`;
    });
  };

  const generateProgressionSuggestion = () => {
    const suggestion = [];
    for (let i = 0; i < 4; i++) {
      const randomChord =
        availableChords[Math.floor(Math.random() * availableChords.length)];
      suggestion.push(randomChord);
    }
    setDisplayedProgression(suggestion.join(" - "));
  };

  const handleKeyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedKey(e.target.value);
  };

  const handleScaleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedScale(e.target.value);
  };

  const handleChordChange = (chordIndex: number, chord: string) => {
    const newProgression = [...customProgression];
    newProgression[chordIndex] = chord;
    setCustomProgression(newProgression);
  };

  const handleSubmit = () => {
    const chords = getChordsInScale(selectedKey, selectedScale);
    setAvailableChords(chords);
    setCustomProgression(new Array(4).fill("")); // Optional: Reset custom progression
  };

  const handleSubmitProgression = () => {
    setDisplayedProgression(customProgression.join(" - "));
  };

  return (
    <>
      <Navigation />
      <div className={styles.songwritingTool}>
        <h1>Songwriting Tool</h1>

        {/* Key and Scale Selection */}
        <div className={styles.section}>
          <label className={styles.label} htmlFor="key-select">
            Choose a Key:
          </label>
          <select
            id="key-select"
            value={selectedKey}
            onChange={handleKeyChange}
            className={styles.select}
          >
            {keys.map((key) => (
              <option key={key} value={key}>
                {key}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.section}>
          <label className={styles.label} htmlFor="scale-select">
            Choose a Scale:
          </label>
          <select
            id="scale-select"
            value={selectedScale}
            onChange={handleScaleChange}
            className={styles.select}
          >
            {scales.map((scale) => (
              <option key={scale} value={scale}>
                {scale}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className={styles.button}>
          <button className={`${styles.button} ${styles.generateChords}`}>
            Generate Chords
          </button>
        </div>

        {/* Custom Chord Progression */}
        <div>
          <h2>Customize Chord Progression</h2>
          {customProgression.map((chord, index) => (
            <div key={index}>
              <label className={styles.label}>Chord {index + 1}:</label>
              <select
                value={chord}
                className={styles.select}
                onChange={(e) => handleChordChange(index, e.target.value)}
              >
                ∫<option value="">Select a Chord</option>
                {availableChords.map((availableChord, idx) => (
                  <option key={idx} value={availableChord}>
                    {availableChord}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            className={`${styles.button} ${styles.generateChords}`}
            onClick={handleSubmitProgression}
          >
            Submit Progression
          </button>
          <button
            className={`${styles.button} ${styles.generateChords}`}
            onClick={generateProgressionSuggestion}
          >
            Generate Progression
          </button>
        </div>
        {/* Display Selected Progression */}
        {displayedProgression && (
          <div className={styles.displayedProgression}>
            <strong>Chord Progression: </strong> {displayedProgression}
          </div>
        )}
      </div>
    </>
  );
}
