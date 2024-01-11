import { slide as Menu } from "react-burger-menu";
import Link from "next/link";
import styles from "../styles/Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div id="logo">Logo Here</div>
      <div className={styles.burgerIcon}></div>
      <Menu right>
        <div className={styles.burgerIcon}>
          <img src="/path-to-hamburger-icon.png" alt="Menu" />
        </div>
        <Link href="/" passHref className={styles.navLink}>
          Home
        </Link>
        <Link href="/scales" passHref className={styles.navLink}>
          Scales
        </Link>
        <Link href="/chords" passHref className={styles.navLink}>
          Chords
        </Link>
        <Link href="/songwriting" passHref className={styles.navLink}>
          Songwriting Tool
        </Link>
        <Link href="/melody" passHref className={styles.navLink}>
          Melody Generator
        </Link>
      </Menu>
    </nav>
  );
}
