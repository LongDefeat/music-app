const GenreDetails: React.FC<GenreDetailsProps> = ({ genre }) => {
  return (
    <div>
      <h2>{genre.name}</h2>
      <p>{genre.description}</p>

      <h3>Characteristics</h3>
      <ul>
        {genre.characteristics.map((char, index) => (
          <li key={index}>{char}</li>
        ))}
      </ul>

      <h3>Historical Background</h3>
      <p>{genre.history}</p>

      <h3>Notable Artists</h3>
      <ul>
        {genre.notableArtists.map((artist, index) => (
          <li key={index}>{artist}</li>
        ))}
      </ul>

      <h3>Sample Tracks</h3>
      {genre.sampleTracks.map((track, index) => (
        <div key={index}>
          {/* Replace with an audio player component */}
          <audio controls src={track}></audio>
        </div>
      ))}

      <h3>Related Genres</h3>
      <ul>
        {genre.relatedGenres.map((relatedGenre, index) => (
          <li key={index}>{relatedGenre}</li>
        ))}
      </ul>
    </div>
  );
};
