import React, { useState, useEffect, ChangeEvent } from "react";
import { Chord, Scale } from "tonal";
import Navigation from "@/app/components/Navigation";

import styles from "../app/styles/Songwriting.module.css";

export default function SongwritingTool() {
  const keys: string[] = ["A", "B", "C", "D", "E", "F", "G"];
  const scales: string[] = ["major", "minor"];
  const modes = [
    { name: "Ionian (Major)", value: "major" },
    { name: "Dorian", value: "dorian" },
    { name: "Phrygian", value: "phrygian" },
    { name: "Lydian", value: "lydian" },
    { name: "Mixolydian", value: "mixolydian" },
    { name: "Aeolian (Minor)", value: "minor" },
    { name: "Locrian", value: "locrian" },
  ];

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
    let chordPattern = majorScaleChords;
    if (scaleType !== "major") {
      // Shift chord pattern based on the mode
      const modeIndex = modes.findIndex((mode) => mode.value === scaleType);
      chordPattern = [
        ...majorScaleChords.slice(modeIndex),
        ...majorScaleChords.slice(0, modeIndex),
      ];
    }

    return scale.map((note, index) => `${note} ${chordPattern[index]}`);
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

  const handleSubmitProgression = () => {
    setDisplayedProgression(customProgression.join(" - "));
  };

  return (
    <>
      <Navigation />
      <div className={styles.songwritingTool}>
        <h1>Songwriting Tool</h1>
        <p>
          This page allows you to explore different keys and their respective
          modal chord movements. The following may be useful with generating
          chord structures by your choice or through the generator button below.
        </p>
        <ul>
          <li>
            <strong>Ionian (Major):</strong> Uses the standard major scale chord
            sequence - Major, minor, minor, Major, Major, minor, diminished.
          </li>
          <li>
            <strong>Dorian:</strong> Similar to the minor scale but with a major
            chord on the IV degree.
          </li>
          <li>
            <strong>Phyrigian:</strong> Similar to the minor scale but with a
            diminished chord on the II degree and a major chord on the III
            degree.
          </li>
          <li>
            <strong>Lydian:</strong> Similar to the major scale but with a
            diminished chord on the II degree.
          </li>
          <li>
            <strong>Mixolydian:</strong> Similar to the major scale but with a
            minor chord on the VII degree.
          </li>
          <li>
            <strong>Aeolian (Natural Minor):</strong> Uses the standard minor
            scale chord sequence - minor, diminished, Major, minor, minor,
            Major, Major.
          </li>
          <li>
            <strong>Locrian:</strong> Characterized by a diminished chord on the
            I degree, and major chords on the II and IV degrees.
          </li>
        </ul>

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
            Choose a Scale/Mode:
          </label>
          <select
            id="scale-select"
            className={styles.select}
            value={selectedScale}
            onChange={handleScaleChange}
          >
            {modes.map((mode) => (
              <option key={mode.value} value={mode.value}>
                {mode.name}
              </option>
            ))}
          </select>
        </div>

        {/* Custom Chord Progression */}
        <div>
          <h2 className={styles.sectionTitle}>Customize Chord Progression</h2>
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
