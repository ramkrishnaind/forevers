import Head from "next/head";
import Link from "next/link";
// import searchIcon from "../../public/search-icon.svg";
import { AppContext } from "../../app/state/contexts/AppContext";
import { useState, useContext, useEffect, useRef } from "react";
import useOutside from "../../hooks/useOutside";
import useOutsideSearch from "../../hooks/useOutsideSearch";
import styles from "./style.module.scss";
import getWindowDimensions from "../../hooks/useWindowDimensions";
export default function Home({ width = 59 }) {
  const { height, width: widthScreen } = getWindowDimensions();
  const [state, dispatch] = useContext(AppContext);
  const [navbar, setNavbar] = useState(false);
  const [searchClick, setSearchClick] = useState(false);
  const [searchClickMob, setSearchClickMob] = useState(false);
  const [search, setSearch] = useState("");
  const [dotClicked, setDotClicked] = useState(false);
  const [extraCategories, setExtraCategories] = useState(false);
  const [navbarRight, setNavbarRight] = useState(false);
  const [categories, setCategories] = useState([]);
  const cat = state.categories;
  const wrapperRef = useRef(null);
  const wrapperSearchRefMob = useRef(null);
  const wrapperSearchRef = useRef(null);
  const dotsRef = useRef(null);
  const searchRef = useRef(null);
  const searchRefMob = useRef(null);
  console.log("widthScreen", widthScreen);
  useEffect(() => {
    setCategories(state.categories);
  }, [state.categories]);
  const clickedOut = useOutside(
    wrapperRef,
    dotsRef,
    searchRef,
    extraCategories,
    dotClicked
  );
  const clickedOutSearch = useOutsideSearch(
    wrapperSearchRef,
    searchRef,
    searchClick
  );
  const clickedOutSearchMobile = useOutsideSearch(
    wrapperSearchRefMob,
    searchRefMob,
    searchClickMob
  );
  debugger;
  console.log("extra", extraCategories);
  return (
    <div className="md:max-w-7xl ">
      <Head>
        {/* <title>Create Next Responsive Navbar With Tailwind CSS</title> */}
        {/* <meta
          name="description"
          content="Create Next JS Responsive Menu with Tailwind CSS"
        /> */}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav
        className={`w-full relative z-10 bg-black shadow md:w-[${width}rem]`}
      >
        <div className="justify-between sticky top-0  px-2 mx-auto md:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <div className=" md:flex mr-2 items-center">
                <Link href="/" className="hidden ">
                  <img
                    className={`hidden md:block md:h-10 ${styles.logo}`}
                    src="/assets/mbl-logo.png"
                  />
                </Link>
                <div className="hidden rounded-lg h-[1.5rem] align-middle md:flex bg-red-500 w-15 px-2 text-orange-200">
                  Earn Coin
                </div>
              </div>

              <div className="flex md:hidden items-center">
                <div className="md:hidden">
                  <button
                    className="p-2  text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                    onClick={() => {
                      setNavbar(!navbar);
                      setNavbarRight(false);
                    }}
                  >
                    {navbar ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
                {clickedOutSearchMobile && (
                  <>
                    <Link href="/">
                      <img
                        className={`${styles.logo} h-7`}
                        src="/assets/mbl-logo.png"
                      />
                    </Link>
                    <div className="text-xs md:hidden rounded-lg py-1 align-middle flex bg-red-500 w-15 px-2 text-orange-200">
                      Earn Coin
                    </div>
                  </>
                )}
              </div>
              {!clickedOutSearchMobile && (
                <div className="w-100 flex items-center">
                  <div
                    className={`flex-1 flex items-center justify-self-center md:pb-0 md:mt-0`}
                  >
                    <input
                      className="rounded-lg md:w-[20rem] px-3 py-[.1rem]"
                      ref={wrapperSearchRefMob}
                    />
                    <div
                      className="md:flex md:flex-col h-100 ml-3 cursor-pointer justify-between flex-1"
                      onClick={(e) => {
                        debugger;
                        // setExtraCategories(true);
                        setSearchClickMob(true);
                        // setNavbar(false);
                        // setNavbarRight(false);
                        // setExtraCategories(!extraCategories);
                        // setDotClicked(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="white"
                        class="bi bi-search"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
              {clickedOutSearchMobile && (
                <div
                  ref={searchRefMob}
                  className="md:hidden md:flex-col h-100 ml-3 cursor-pointer justify-between flex-1"
                  onClick={() => {
                    // setNavbar(false);
                    // setNavbarRight(false);
                    // setExtraCategories(!extraCategories);
                    // setDotClicked(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
              )}

              <div className="md:hidden">
                <button
                  className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => {
                    setNavbarRight(!navbarRight);
                    setNavbar(false);
                  }}
                >
                  {navbarRight ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          {!clickedOutSearch && (
            <div>
              <div
                className={`flex-1 flex items-center justify-self-center pb-3 md:pb-0 md:mt-0`}
              >
                <input
                  className="rounded-lg md:w-[20rem] px-3 py-[.1rem]"
                  ref={wrapperSearchRef}
                />
                <div
                  className="md:flex hidden md:flex-col h-100 ml-3 cursor-pointer justify-between flex-1"
                  onClick={(e) => {
                    debugger;
                    setExtraCategories(true);
                    setSearchClick(true);
                    // setNavbar(false);
                    // setNavbarRight(false);
                    // setExtraCategories(!extraCategories);
                    // setDotClicked(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    class="bi bi-search"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </div>
              </div>
            </div>
          )}
          {clickedOutSearch && (
            <>
              <div>
                <div
                  className={`flex-1 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${
                    navbar ? "block" : "hidden"
                  }`}
                >
                  <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                    {categories.length > 0 &&
                      (widthScreen < 768
                        ? categories
                        : categories.slice(0, 4)
                      ).map((item, index) => (
                        <li className="text-white" key={index}>
                          <Link href="/">
                            <a className="text-base capitalize">
                              {item.toLowerCase()}
                            </a>
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div>
                <div
                  ref={wrapperRef}
                  className={`flex-1 fixed top-[5rem] bg-black min-w-[15rem] pl-5 overflow-auto max-h-[52rem] justify-self-center pb-3 md:pb-0 md:mt-0 ${
                    extraCategories && !clickedOut ? "block" : "hidden"
                  }`}
                >
                  <ul className="items-center justify-center">
                    {categories.length > 0 &&
                      categories.slice(4).map((item, index) => (
                        <li className="text-white py-1 my-3" key={index}>
                          <Link href="/">
                            <a className="text-base capitalize">
                              {item.toLowerCase()}
                            </a>
                          </Link>
                        </li>
                      ))}
                    {/* <li className="text-white">
                  <Link href="/blogs">
                    <a>Blogs</a>
                  </Link>
                </li>
                <li className="text-white">
                  <Link href="/about">
                    <a>About US</a>
                  </Link>
                </li>
                <li className="text-white">
                  <Link href="/contact">
                    <a>Contact US</a>
                  </Link>
                </li> */}
                  </ul>
                </div>
              </div>
              {categories.length > 4 && (
                <div
                  ref={dotsRef}
                  className="md:flex md:flex-col h-100 ml-3 cursor-pointer justify-between flex-1 hidden"
                  onClick={() => {
                    setNavbar(false);
                    setNavbarRight(false);
                    setExtraCategories(!extraCategories);
                    setDotClicked(true);
                  }}
                >
                  <div className={`${styles.dot} my-[.15rem]`}></div>
                  <div className={`${styles.dot} my-[.15rem]`}></div>
                  <div className={`${styles.dot} my-[.15rem]`}></div>
                </div>
              )}

              <div
                ref={searchRef}
                className="md:flex hidden md:flex-col h-100 ml-3 cursor-pointer justify-between flex-1"
                onClick={() => {
                  setSearchClick(true);

                  // setNavbar(false);
                  // setNavbarRight(false);
                  // setExtraCategories(!extraCategories);
                  // setDotClicked(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </>
          )}
          <div>
            <div
              className={` flex-col justify-self-center pb-3 mt-0 md:block md:pb-0 ${
                navbarRight ? "block" : "hidden"
              }`}
            >
              <ul className=" flex flex-col md:border-l-2 md:pl-2 border-orange-500 justify-end items-end space-y-8 md:flex md:space-y-0">
                <li className="text-white">
                  <Link href="/">
                    <a className="text-base capitalize text-right">Login</a>
                  </Link>
                </li>
                <li className="text-white">
                  <Link href="/">
                    <a className="text-base capitalize  text-right">Signup</a>
                  </Link>
                </li>

                {/* <li className="text-white">
                  <Link href="/blogs">
                    <a>Blogs</a>
                  </Link>
                </li>
                <li className="text-white">
                  <Link href="/about">
                    <a>About US</a>
                  </Link>
                </li>
                <li className="text-white">
                  <Link href="/contact">
                    <a>Contact US</a>
                  </Link>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* <div className="flex justify-center items-center mt-8">
        <h1 className="text-2xl font-bold text-purple-500">
          Create Responsive Navbar Menu in Next js with Tailwind CSS
        </h1>
      </div> */}
    </div>
  );
}
