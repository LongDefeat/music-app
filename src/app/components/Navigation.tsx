import { slide as Menu } from "react-burger-menu";
import Link from "next/link";
import Image from "next/image";
import { RiMenu3Line } from "react-icons/ri"; // Correct import for hamburger menu icon

import styles from "../styles/Navigation.module.css";

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <div id="logo">
        <Image src="/music-logo.png" alt="logo" width={200} height={100} />
      </div>
      <div className={styles.burgerIcon}>
        <RiMenu3Line size={30} />
      </div>
      <Menu right>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <Link href="/scales" className={styles.navLink}>
          Scales
        </Link>
        <Link href="/chords" className={styles.navLink}>
          Chords
        </Link>
        <Link href="/songwriting" className={styles.navLink}>
          Songwriting Tool
        </Link>
        <Link href="/melody" className={styles.navLink}>
          Melody Generator
        </Link>
      </Menu>
    </nav>
  );
}
