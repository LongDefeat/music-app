import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/app/components/Navigation";

interface Genre {
  name: string;
  description: string;
  characteristics: string[];
  history: string;
  notableArtists: string[];
  sampleTracks: string[];
  relatedGenres: string[];
}

const rockMusic: Genre = {
  name: "Rock",
  description:
    "Rock music is a broad genre of popular music that originated as 'rock and roll' in the United States in the late 1940s and early 1950s. It later developed into a range of different styles in the mid-1960s and later.",
  characteristics: [
    "Strong beat and simple melodies",
    "Emphasis on live performance",
    "Typically based around electric guitar",
    "Common use of the verse-chorus form",
  ],
  history:
    "Originating in the 1950s from roots in blues, jazz, and country music, rock music quickly became popular worldwide. It evolved through various subgenres in subsequent decades.",
  notableArtists: [
    "The Beatles",
    "Led Zeppelin",
    "Pink Floyd",
    "The Rolling Stones",
  ],
  sampleTracks: [
    "https://example.com/track1", // Replace with actual URLs
    "https://example.com/track2",
  ],
  relatedGenres: ["Blues Rock", "Hard Rock", "Punk Rock", "Alternative Rock"],
};

const jazzMusic: Genre = {
  name: "Jazz",
  description:
    "Jazz is a music genre that originated in the African-American communities of New Orleans, United States, in the late 19th and early 20th centuries. It has roots in blues and ragtime and is known for its swing and blue notes.",
  characteristics: [
    "Swing and blue notes",
    "Complex chords and improvisation",
    "Polyrhythms and syncopation",
    "Distinctive tone colors and performance techniques",
  ],
  history:
    "Jazz originated in the late 19th century and was heavily influenced by African musical traditions and European musical techniques. It gave birth to several subgenres and profoundly influenced the music industry.",
  notableArtists: [
    "Louis Armstrong",
    "Miles Davis",
    "Duke Ellington",
    "John Coltrane",
  ],
  sampleTracks: [
    "https://example.com/jazztrack1", // Replace with actual URLs
    "https://example.com/jazztrack2",
  ],
  relatedGenres: ["Bebop", "Swing", "Fusion", "Modal Jazz"],
};
const classicalMusic: Genre = {
  name: "Classical",
  description:
    "Classical music is art music produced or rooted in the traditions of Western culture, encompassing a broad span of time from the 11th century to the present. It includes liturgical music as well as secular music.",
  characteristics: [
    "Complex compositions with sophisticated structures",
    "Predominantly instrumental with a wide variety of instruments",
    "Focus on harmony, melody, and rhythm",
    "Compositions for solo, chamber, and large orchestral groups",
  ],
  history:
    "Classical music has its roots in the traditions of Western culture, including both liturgical (religious) and secular music. While the term is often used to refer to the period from 1750 to 1820 (the Classical period), it has been expanded to include music from the medieval period to modern times.",
  notableArtists: [
    "Ludwig van Beethoven",
    "Wolfgang Amadeus Mozart",
    "Johann Sebastian Bach",
    "Franz Schubert",
  ],
  sampleTracks: [
    "https://example.com/classicaltrack1",
    "https://example.com/classicaltrack2",
  ],
  relatedGenres: ["Baroque", "Romantic", "Contemporary Classical", "Opera"],
};

const GenresPage: React.FC = () => {
  const [genres, setGenres] = useState<Genre[]>([
    rockMusic,
    jazzMusic,
    classicalMusic,
  ]);
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);

  // Fetch genres data from your data source/API
  useEffect(() => {
    // Fetch genres data and set it to state
    // Example: setGenres(fetchGenresData());
  }, []);

  const handleGenreSelect = (genre: Genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div>
      <Navigation />
      <h1>Explore Music Genres</h1>
      <ul>
        {genres.map((genre) => (
          <li key={genre.name} onClick={() => handleGenreSelect(genre)}>
            {genre.name} - {genre.description}
          </li>
        ))}
      </ul>
      {selectedGenre && <GenreDetails genre={selectedGenre} />}
    </div>
  );
};

export default GenresPage;
