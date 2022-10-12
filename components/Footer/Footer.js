import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import Ad from "../Ad/Ad";
import { useRouter } from "next/router";
function Footer() {
  const [slugChanged, setSlugChanged] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;
  React.useEffect(() => {
    debugger;
    !window.adsbygoogle
      ? (window.adsbygoogle = window.adsbygoogle || []).push({})
      : console.log("Adsbygoogle already exists");
    setSlugChanged(true);
    setTimeout(() => {
      setSlugChanged(false);
    }, 10);
  }, [id]);
  return (
    <>
      <div className={`${styles.container}`}>
       {!slugChanged && (
           <Ad
            currentPath={`above footer sections`}
            dataAdSlot={"5280195617"}
            // className="hidden md:hidden"
          /> 
        )}
        <div className={`${styles.links} md:flex-row`}>
          <Link href="/about">
            <a className="py-3 md:py-0 text-[.8rem] md:text-base">About Us</a>
          </Link>
          <Link href="/privacy">
            <a className="py-3 md:py-0 text-[.8rem] md:text-base">
              Privacy Policy
            </a>
          </Link>
          <Link href="/disclaimer">
            <a className="py-3 md:py-0 text-[.8rem] md:text-base">Disclaimer</a>
          </Link>
          <Link href="/contact">
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
