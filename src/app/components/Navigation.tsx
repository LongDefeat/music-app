// components/Navigation.js
import Link from "next/link";
import styles from "../styles/Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/scales" className={styles.navLink}>
            Scales
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/chords" className={styles.navLink}>
            Chords
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/songwriting" className={styles.navLink}>
            Songwriting Tool
          </Link>
        </li>
      </ul>
    </nav>
  );
}
