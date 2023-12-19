"use client";
import { useRef, useState } from "react";
import { Chord } from "tonal";
export default function Home() {
  const chordInputRef = useRef<HTMLInputElement | null>(null);
  const [notes, setNotes] = useState<string[]>([]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let value = chordInputRef.current?.value ?? undefined;
    if (!value) return;
    console.log(value);
    const form = e.target as HTMLFormElement;
    form.reset();

    const chord = Chord.get(value);
    setNotes(chord.notes);
  }

  return (
    <div className="container">
      <h1>Chord Notes Finder</h1>
      <form id="chord-form" onSubmit={handleSubmit}>
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

      <div id="display-notes">
        {notes.length > 0 && (
          <ul>
            {notes.map((note) => {
              return <li key={note}>{note}</li>;
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
