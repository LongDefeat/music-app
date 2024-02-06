import { Scale } from "tonal";
import Link from "next/link";
import React from "react";
import Navigation from "@/app/components/Navigation";

import styles from "../app/styles/Scales.module.css";

interface CategorizedScales {
  [category: string]: string[];
}

const ScalesPage: React.FC = () => {
  const scales: string[] = Scale.names();

  const categorizedScales: CategorizedScales = scales.reduce(
    (acc: CategorizedScales, scale: string) => {
      const category: string = scale.includes("major") ? "Major" : "Minor";
      if (!acc[category]) acc[category] = [];
      acc[category].push(scale);
      return acc;
    },
    {}
  );
  const handleScaleClick = (scale: string) => {
    // Redirect to the page that demonstrates the scale degrees in C major
    window.location.href = `/scale-degrees?scale=${scale}&key=C`;
  };

  const renderScaleLinks = () => {
    return Object.entries(categorizedScales).map(([category, scales]) => (
      <div key={category} className={styles.categoryDiv}>
        <h2 className={styles.categoryTitle}>{category}</h2>
        <ul className={styles.ulNoBullets}>
          {scales.map((scale: string) => (
            <li key={scale}>
              <button onClick={() => handleScaleClick(scale)}>{scale}</button>
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>All Scales</h1>
        {renderScaleLinks()}
        <Link href="/">Back to Home</Link>
      </div>
    </>
  );
};

export default ScalesPage;
