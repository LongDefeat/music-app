"use client";

import { useRef, useState } from "react";
import { Chord } from "tonal";
import errorStyles from "./styles/ErrorMessage.module.css";
import styles from "./styles/Home.module.css";

export default function Home() {
  const chordInputRef = useRef<HTMLInputElement | null>(null);
  const [notes, setNotes] = useState<string[]>([]);
  const [chordName, setChordName] = useState<string>("");
  const [chordType, setChordType] = useState<string>("");
  const [error, setError] = useState<string>("");

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

  return (
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
            <ul className={styles.ulNoBullets}>
              {notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
