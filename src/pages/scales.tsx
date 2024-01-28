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

  return (
    <>
      <Navigation />
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>All Scales</h1>
        {Object.entries(categorizedScales).map(([category, scales]) => (
          <div key={category} className={styles.categoryDiv}>
            <h2 className={styles.categoryTitle}>{category}</h2>
            <ul className={styles.ulNoBullets}>
              {scales.map((scale: string) => (
                <li key={scale}>{scale}</li>
              ))}
            </ul>
          </div>
        ))}
        <Link href="/">Back to Home</Link>
      </div>
    </>
  );
};

export default ScalesPage;
