import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import Ad from "../Ad/Ad";
function Footer() {
  return (
    <>
      <Ad
        currentPath={`above footer sections`}
        dataAdSlot={"9786571390"}
        className="hidden md:hidden"
      />
      <div className={`${styles.container}`}>
        <div className={`${styles.links} md:flex-row`}>
          <Link href="/">
            <a className="py-3 md:py-0 text-[.8rem] md:text-base">About Us</a>
          </Link>
          <Link href="/">
            <a className="py-3 md:py-0 text-[.8rem] md:text-base">
              Privacy Policy
            </a>
          </Link>
          <Link href="/">
            <a className="py-3 md:py-0 text-[.8rem] md:text-base">Disclaimer</a>
          </Link>
          <Link href="/">
            <a className="py-3 md:py-0 text-[.8rem] md:text-base">Contact Us</a>
          </Link>
        </div>
        <p className="text-[.8rem] md:text-base">
          Copyright &copy; 2022 | FOREVERS.IN | All Rights Are Reserved
        </p>
      </div>
    </>
  );
}

export default Footer;
