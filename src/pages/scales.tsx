import { Scale } from "tonal";
import Link from "next/link";
import React from "react";
import Navigation from "@/app/components/Navigation";

import styles from "../app/styles/Scales.module.css";

interface CategorizedScales {
  [category: string]: string[];
}

export default function ScalesPage() {
  // Fetch all scales
  const scales: string[] = Scale.names();

  // Example categorization with TypeScript notation
  const categorizedScales: CategorizedScales = scales.reduce(
    (acc: CategorizedScales, scale: string) => {
      // Your categorization logic
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
}
