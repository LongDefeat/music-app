"use client";

import { useRef, useState } from "react";
import { Chord, Scale } from "tonal";
import errorStyles from "./styles/ErrorMessage.module.css";
import styles from "./styles/Home.module.css";
import Navigation from "./components/Navigation";

export default function Home() {
  const chordInputRef = useRef<HTMLInputElement | null>(null);
  const [notes, setNotes] = useState<string[]>([]);
  const [chordName, setChordName] = useState<string>("");
  const [chordType, setChordType] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [scaleName, setScaleName] = useState<string[]>([]);
  const [scaleNotes, setScaleNotes] = useState<string[]>([]);
  const [scaleAliases, setScaleAliases] = useState<string[]>([]);
  const [scaleDegrees, setScaleDegrees] = useState<string[]>([]);

  const scaleInputRef = useRef<HTMLInputElement | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let value = chordInputRef.current?.value.trim();

    if (!value) {
      setError("Please enter a valid chord");
      return;
    }

    const chord = Chord.get(value);
    console.log(chord);

    if (chord.empty) {
      setError(`'${value}' is an invalid chord. Please try again.`);
      setNotes([]);
      setChordType("");
    } else {
      setNotes(chord.notes);
      setChordType(chord.type);
      setChordName(chord.name);
      setError("");
    }

    const form = e.target as HTMLFormElement;
    form.reset();
  }

  function handleSubmitForScale(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    let value = scaleInputRef.current?.value.trim();
    if (!value) {
      setError("Please enter a valid scale.");
      return;
    }

    const scale = Scale.get(value);

    if (scale.empty) {
      setError(`'${value}' is an invalid scale. Please try again.`);
      setScaleNotes([]);
      setScaleName("");
      setScaleAliases([]);
      setScaleDegrees([]); // Reset scale degrees
    } else {
      setScaleNotes(scale.notes);
      setScaleName(scale.name);
      setScaleAliases(scale.aliases);
      setError("");

      // Compute and set scale degrees
      const degrees = scale.notes.map((_, index) => `${index + 1}`);
      setScaleDegrees(degrees);
    }

    const form = e.target as HTMLFormElement;
    form.reset();
  }

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Chord Notes Finder</h1>
        <form className={styles.chordForm} onSubmit={handleSubmit}>
          <label htmlFor="chord-input">Enter a chord (e.g., Cmaj7):</label>
          <input
            type="text"
            ref={chordInputRef}
            id="chord-input"
            placeholder="e.g., Cmaj7"
            required
          />
          <button type="submit">Find Notes</button>
        </form>

        {error && <p className={errorStyles.error}>{error}</p>}

        <div id={styles.displayNotes}>
          {notes.length > 0 && (
            <>
              <p>
                Chord: <strong>{chordName.toUpperCase()}</strong>
              </p>
              <p>
                Chord Type: <strong>{chordType.toUpperCase()}</strong>
              </p>
              <ul className={styles.notesList}>
                {notes.map((note, index) => (
                  <li className={styles.notesListItem} key={index}>
                    <span className={styles.noteName}>{note}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <form className={styles.scaleForm} onSubmit={handleSubmitForScale}>
          <label htmlFor="scale-input">Enter a scale (e.g., C major):</label>
          <input
            type="text"
            ref={scaleInputRef}
            id="scale-input"
            placeholder="e.g., C major"
            required
          />
          <button type="submit">Find Scale</button>
        </form>

        <div id={styles.displayScale}>
          {scaleNotes.length > 0 && (
            <>
              <p>
                Scale: <strong>{scaleName.toUpperCase()}</strong>
              </p>
              {scaleAliases.length > 0 && (
                <p>
                  Aliases: <strong>{scaleAliases.join(", ")}</strong>
                </p>
              )}
              <ul className={styles.notesList}>
                {scaleNotes.map((note, index) => (
                  <li key={index} className={styles.notesListItem}>
                    <span className={styles.noteName}>{note}</span>
                    <span className={styles.noteDegree}>
                      Degree: {scaleDegrees[index]}
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* ... rest of the component ... */}
      </div>
    </>
  );
}
