import React, { useState, useEffect } from "react";
import { Chord } from "tonal";
import styles from "/styles/Chords.module.css";

export default function ChordExplorer() {
  const [chordsByRoot, setChordsByRoot] = useState({});

  useEffect(() => {
    const rootNotes = [
      "C",
      "C#",
      "D",
      "D#",
      "E",
      "F",
      "F#",
      "G",
      "G#",
      "A",
      "A#",
      "B",
    ];
    const chordTypes = [
      "maj",
      "min",
      "dim",
      "aug",
      "7",
      "m7",
      "maj7",
      "dim7",
      "m7b5",
    ];

    const generatedChords = rootNotes.reduce((acc, root) => {
      acc[root] = chordTypes.map((type) => `${root}${type}`);
      return acc;
    }, {});

    setChordsByRoot(generatedChords);
  }, []);

  const renderChordSection = (root, chords) => (
    <div key={root} className="chordSection">
      <h2>{root} Chords</h2>
      <ul>
        {chords.map((chord: string, index: string) => (
          <li key={index}>{chord}</li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="chordExplorer">
      <h1>Chord Explorer</h1>
      {Object.entries(chordsByRoot).map(([root, chords]) =>
        renderChordSection(root, chords)
      )}
    </div>
  );
}
