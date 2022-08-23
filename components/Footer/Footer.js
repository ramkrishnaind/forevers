import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
function Footer() {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.links} flex-col md:flex-row`}>
        <Link href="/">
          <a className="py-3 md:py-0">About Us</a>
        </Link>
        <Link href="/">
          <a className="py-3 md:py-0">Privacy Policy</a>
        </Link>
        <Link href="/">
          <a className="py-3 md:py-0">Disclaimer</a>
        </Link>
        <Link href="/">
          <a className="py-3 md:py-0">Contact Us</a>
        </Link>
      </div>
      <p>Copyright &copy; 2022 | FOREVERS.IN | All Rights Are Reserved</p>
    </div>
  );
}

export default Footer;
