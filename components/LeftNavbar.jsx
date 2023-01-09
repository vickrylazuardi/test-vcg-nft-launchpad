import React from "react";

export default function LeftNavbar() {
  const handleEnter = (el) => {
    let elm = document.querySelector(`.${el}`);
    if (el == "sub-sub-menu-1") {
      let htt = document.querySelector(".how-to-text");
      htt.style.background = "#4b546a";
    }
    elm.classList.add("active");
  };
  const handleLeave = (el) => {
    let elm = document.querySelector(`.${el}`);
    if (el == "sub-sub-menu-1") {
      let htt = document.querySelector(".how-to-text");
      htt.style.background = null;
    }
    elm.classList.remove("active");
  };
  const primaryMenu = (event) => {
    let elm = document.querySelector(".primary-menu-container");

    if (event == "click") {
      elm.style.display = "block";
    } else {
      elm.style.display = "none";
    }
  };
  return (
    <div className="left-navbar-container flex items-center">
      <div className="logo-wrapper flex items-start cursor-pointer">
        <img src="/images/logo.png" alt="vcgamers" />
        <div
          className="flex items-start relative"
          onClick={() => primaryMenu("click")}
        >
          <p className="font-bold text-sm ml-1" style={{ color: "#9AA4BF" }}>
            LAUNCHPAD
          </p>
          <img src="/images/svg/arrow-down.svg" alt="" className="ml-1" />
          <div
            className="primary-menu-container absolute"
            onMouseLeave={() => primaryMenu("out")}
          >
            <div className="dropdown-content">
              <ul>
                <li className="market">
                  <a
                    href="https://app.vcgamers.com/"
                    className="flex items-center"
                  >
                    <img
                      src="/images/svg/menu-nav-market.svg"
                      alt="Marketplace"
                      className="mr-1"
                    />
                    Marketplace
                  </a>
                </li>
                <li className="hub">
                  <a
                    href="https://hub.vcgamers.com/"
                    className="flex items-center"
                  >
                    <img
                      src="/images/svg/menu-nav-hub.svg"
                      alt="Social Hub"
                      className="mr-1"
                    />
                    Hub
                  </a>
                </li>
                <li className="arena">
                  <a
                    href="https://app.vcgamers.com/coming-soon-arena"
                    className="flex items-center"
                  >
                    <img
                      src="/images/svg/menu-nav-arena.svg"
                      alt="Arena Games"
                      className="mr-1"
                    />
                    Arena
                  </a>
                </li>
                <li className="token">
                  <a
                    href="https://vcgamers.com/token"
                    className="flex items-center"
                  >
                    <img
                      src="/images/svg/menu-nav-token.png"
                      alt="VCG Token VCGamers"
                      className="mr-1"
                    />
                    VCG Token
                  </a>
                </li>
                <li className="news">
                  <a
                    href="https://vcgamers.com/news/"
                    className="flex items-center"
                  >
                    <img
                      src="/images/svg/menu-nav-news.png"
                      alt="News from VCGamers"
                      className="mr-1"
                    />
                    News
                  </a>
                </li>
                <li className="merch">
                  <a
                    href="https://lynk.id/vcgoods"
                    className="flex items-center"
                  >
                    <img
                      src="/images/svg/menu-nav-merch.svg"
                      alt="Good merchandise"
                      className="mr-1"
                    />
                    Merchandise
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ul className="flex items-center ml-7">
        <li>
          <a href="/" className="text-link semibold flex">
            Home
          </a>
        </li>
        <li>
          <a href="/our-services" className="text-link semibold flex">
            Our Services
          </a>
        </li>
        <li>
          <a href="#" className="text-link semibold flex">
            FAQ
          </a>
        </li>
        {/* <li
          onMouseEnter={() => handleEnter("sub-menu-1")}
          onMouseLeave={() => handleLeave("sub-menu-1")}
        >
          <div className="flex items-center">
            <p className="text-link semibold">Tutorial</p>
            <img src="/images/svg/arrow-down.svg" alt="" className="ml-1" />
            <div className="absolute sub-menu-container sub-menu-1">
              <div className="sub-menu">
                <p
                  className="how-to-text"
                  onMouseEnter={() => handleEnter("sub-sub-menu-1")}
                >
                  How To{" "}
                  <img
                    src="/images/svg/arrow-down.svg"
                    alt="arrow"
                    className="rotate-img"
                  />
                </p>
                <a href="https://vcgamers.com/news/help/faq-token/" className="not-enter">
                  FAQ
                </a>
              </div>
              <div
                className="sub-sub-menu-container sub-sub-menu-1"
                onMouseLeave={() => handleLeave("sub-sub-menu-1")}
              >
                <div className="sub-sub-menu">
                  <a href="https://vcgamers.com/news/cara-membeli-vcg-token-di-pancakeswap/" target="_blank" rel="follow" title="tutorial pancake swap">Pancake Swap</a>
                  <a href="https://vcgamers.com/news/cara-membeli-vcg-token-di-uniswap/" target="_blank" rel="follow" title="tutorial uniswap">Uniswap</a>
                  <a href="https://vcgamers.com/news/cara-membeli-vcg-token-di-indodax/" target="_blank" rel="follow" title="tutorial indodax">Indodax</a>
                </div>
              </div>
            </div>
          </div>
        </li> */}
        {/* <li
          onMouseEnter={() => handleEnter("sub-menu-2")}
          onMouseLeave={() => handleLeave("sub-menu-2")}
        >
          <div className="flex items-center">
            <p className="text-link semibold">Features</p>
            <img src="/images/svg/arrow-down.svg" alt="" className="ml-1" />
            <div className="absolute sub-menu-container sub-menu-2">
              <div className="sub-menu">
                <a href="https://token.vcgamers.com/staking" target="_blank" rel="follow">Staking</a>
                <a href="https://ransverse.vcgamers.com" target="_blank" rel="follow">Ransverse</a>
                <a href="#" style={{position:'relative'}}>NFT Marketplace<img style={{height:'38px',width:'auto',right:'0',top:'-10px',position:'absolute'}} src="/images/soon.gif"></img></a>
                <a href="/">NFT Launchpad</a>
              </div>
            </div>
          </div>
        </li> */}
        {/* <li>
          <div className="flex items-center">
            <a href="https://www.dextools.io/app/bsc/pair-explorer/0xae3691adfec53fe142ae0595f91811b1113d886f" target="_blank" rel="nofolow"><p className="text-link semibold">Chart</p></a>
          </div>
        </li> */}
        {/* <li
          onMouseEnter={() => handleEnter("sub-menu-3")}
          onMouseLeave={() => handleLeave("sub-menu-3")}
        >
          <div className="flex items-center">
            <p className="text-link semibold">Other</p>
            <img src="/images/svg/arrow-down.svg" alt="" className="ml-1" />
            <div className="absolute sub-menu-container sub-menu-3">
              <div className="sub-menu">
                <a href="https://vcgamers.com/token#tokenomics" target="_blank" rel="follow">Tokenomic</a>
                <a href="https://whitepaper.vcgamers.com/" target="_blank" rel="follow">Whitepaper</a>
                <a href="https://vcgamers.com/token#token-investors" target="_blank" rel="follow">Audit</a>
              </div>
            </div>
          </div>
        </li> */}
      </ul>
    </div>
  );
}
