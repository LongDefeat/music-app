import React from "react";

interface ScaleDegreePageProps {
  scale: string;
}

const ScaleDegreePage: React.FC<ScaleDegreePageProps> = ({ scale }) => {
  const scaleDegrees = ["I", "II", "III", "IV", "V", "VI", "VII"];
  const noteNames = ["C", "D", "E", "F", "G", "A", "B"];

  return (
    <div>
      <h1>{scale} Scale Degrees</h1>
      <ul>
        {scaleDegrees.map((degree, index) => (
          <li key={index}>
            {degree} - {noteNames[index]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ScaleDegreePage;
