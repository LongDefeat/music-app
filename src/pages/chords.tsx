import React, { useState, useEffect, MouseEvent } from "react";
import { Chord } from "tonal";
import Navigation from "@/app/components/Navigation";
import styles from "../app/styles/Chords.module.css";

interface ChordsByRoot {
  [key: string]: string[];
}

interface TooltipPosition {
  top: number;
  left: number;
}

export default function ChordExplorer() {
  const [chordsByRoot, setChordsByRoot] = useState<ChordsByRoot>({});
  const [hoveredChord, setHoveredChord] = useState<string>("");
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    top: 0,
    left: 0,
  });

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

    const generatedChords: ChordsByRoot = rootNotes.reduce(
      (acc: ChordsByRoot, root: string) => {
        acc[root] = chordTypes.map((type) => `${root}${type}`);
        return acc;
      },
      {}
    );

    setChordsByRoot(generatedChords);
  }, []);

  const handleMouseEnter = (e: MouseEvent<HTMLLIElement>, chord: string) => {
    setHoveredChord(Chord.get(chord).notes.join(", "));
    const tooltipOffset = { x: 20, y: 20 };
    setTooltipPosition({
      top: e.clientY + tooltipOffset.y,
      left: e.clientX + tooltipOffset.x,
    });
  };

  const handleMouseLeave = () => {
    setHoveredChord("");
  };

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <div className={styles.chordExplorer}>
          <h1 className={styles.pageTitle}>Chord Explorer</h1>
          {Object.entries(chordsByRoot).map(([root, chords]) => (
            <div key={root} className={styles.chordSection}>
              <h2>{root} Chords</h2>
              <ul>
                {chords.map((chord, index) => (
                  <li
                    key={index}
                    onMouseEnter={(e) => handleMouseEnter(e, chord)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {chord}
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {hoveredChord && (
            <div
              className={styles.tooltip}
              style={{
                top: `${tooltipPosition.top}px`,
                left: `${tooltipPosition.left}px`,
              }}
            >
              {hoveredChord}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
