import React from "react";

export default function BottomNavMobile() {
  const btnLink = {
    padding: 10,
    fontWeight: "unset",
    fontSize: 14,
    minWidth: "max-content",
    marginRight: 10,
  };
  return (
    <div className="bottom-nav-mobile">
      <div className="container-inner flex overflow-x-auto pb-2">
        <button
          className="btn btn-gray flex items-center active"
          style={btnLink}
        >
          <img src="/images/svg/icon-home.svg" alt="home" className="mr-1" />{" "}
          Home
        </button>
        <a href="https://vcgamers.com/news/help/faq-token/" rel="nofollow" target="_blank">
          <button className="btn btn-gray flex items-center" style={btnLink}>
            <img
              src="/images/svg/icon-tutorial.svg"
              alt="home"
              className="mr-1"
            />{" "}
            Tutorial
          </button>
        </a>
        <a href="https://whitepaper.vcgamers.com/" rel="nofollow" target="_blank">
          <button className="btn btn-gray flex items-center" style={btnLink}>
            <img
              src="/images/svg/icon-whitepaper.svg"
              alt="home"
              className="mr-1"
            />{" "}
            Whitepaper
          </button>
        </a>
        {/* <button className="btn btn-gray flex items-center" style={btnLink}>
          <img
            src="/images/svg/icon-features.svg"
            alt="home"
            className="mr-1"
          />{" "}
          Features
        </button> */}
      </div>
    </div>
  );
}
