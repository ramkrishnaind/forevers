import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./style.module.scss";
function Header() {
  return (
    <header className={styles.container}>
      <img src="/assets/menu-icon.png" className={styles.menu} />
      <Link href="/">
        <img className={styles.logo} src="/assets/mbl-logo.png" />
      </Link>
      <nav>
        <div className={styles.languages} style={{ display: "none" }}>
          <a>বাংলা</a>
          <a>ગુજરાતી</a>
          <a>हिन्दी</a>
          <a>ಕನ್ನಡ</a>
          <a>മലയാളം</a>
          <a>தமிழ்</a>
          <a>తెలుగు</a>
          <a>ଓଡ଼ିଆ</a>
          <a>ENGLISH</a>
          <img src="/assets/fb-logo.jpg" alt="f" className={styles.fb} />
          <img
            src="/assets/twitter-logo.png"
            alt="t"
            className={styles.twitter}
          />
          <img src="/assets/yt-logo.png" alt="f" className={styles.yt} />
        </div>
        <div className={styles.navLinks}>
          <div className={styles.links} style={{ display: "none" }}>
            <Link href="/">
              <a>News</a>
            </Link>
            <Link href="/">
              <a>Videos</a>
            </Link>
            <Link href="/">
              <a>Special</a>
            </Link>
            <Link href="/">
              <a>City</a>
            </Link>
            <Link href="/">
              <a>Sports</a>
            </Link>
            <Link href="/">
              <a>Movies</a>
            </Link>
            <Link href="/">
              <a>Lifestyle</a>
            </Link>
            <Link href="/">
              <a>Auto</a>
            </Link>
            <Link href="/">
              <a>Gadgets</a>
            </Link>
            <Link href="/">
              <a>Coupens</a>
            </Link>
            <img src="/assets/menu.png" className={styles.menu} />
          </div>
          <div className={styles.burger} style={{ display: "none" }}>
            <img src="/assets/icons8-puzzle-48.png" />
            <img src="/assets/icons8-search-50.png" />
            <img src="/assets/icons8-notification-48.png" />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
