import React from "react";
import Link from "next/link";

export default function RightNavbar(props) {
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
  return (
    <div className="right-nav-container flex items-center">
      {/* <div className="market-container flex items-center pr-5">
        <div className="img-wrap">
          <img src="/images/svg/icon-notif.svg" alt="notification" />
        </div>
        <div className="img-wrap mx-6">
          <img src="/images/svg/icon-wishlist.svg" alt="wishlist" />
        </div>
        <div className="img-wrap">
          <img src="/images/svg/icon-cart.svg" alt="cart" />
        </div>
      </div> */}
      <div className="profile-store flex items-center">
        {/* <div className="store flex items-center cursor-pointer">
          <div className="mask mask-hexagon relative avatar-container cursor-pointer">
            <div className="mask mask-hexagon avatar-wrap grid place-items-center">
              <img
                src="/images/item1.png"
                alt="product market"
                className="mask mask-hexagon"
              />
            </div>
          </div>
          <p className="font-semibold text-sm ml-1">Toko</p>
        </div> */}
        {props.account ? (
          <div
            className="profile flex items-center cursor-pointer ml-4"
            onMouseEnter={() => handleEnter("sub-menu-4")}
            onMouseLeave={() => handleLeave("sub-menu-4")}
          >
            {/* <div className="mask mask-hexagon relative avatar-container cursor-pointer">
              <div className="mask mask-hexagon avatar-wrap grid place-items-center">
                <img
                  src="/images/item1.png"
                  alt="product market"
                  className="mask mask-hexagon"
                />
              </div>
            </div> */}
            <div className="relative sub-menu-container sub-menu-4">
              <div className="sub-menu">
                {
                  // props?.router?.slice("/")[1] ?
                  // <Link href="/">
                  //   <a>Home</a>
                  // </Link> :
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                }
                <p className="not-enter" onClick={() => props.disconnect()}>
                  Disconnect
                </p>
              </div>
            </div>
            <div
              className="mask mask-hexagon profile-pict-container relative m-auto"
              style={{ width: "30px", height: "30px" }}
            >
              <div
                className="mask mask-hexagon profile-wrap"
                style={{ background: "#3f485f" }}
              >
                <img
                  width={10}
                  src={
                    props?.creatorImage?.length
                      ? props?.creatorImage
                      : "/images/default-avatar.png"
                  }
                  className="mask mask-hexagon object-contain h-full w-full"
                />
              </div>
            </div>
            <p className="font-semibold text-sm ml-1">
              {props.account.slice(0, 7) + "..." + props.account.slice(-7)}
            </p>
            <img src="/images/svg/arrow-down.svg" alt="" className="ml-1" />
          </div>
        ) : (
          <>
            <Link href="/connect-wallet">
              <a>
                <button
                  className="btn btn-connect-wallet-dark text-sm font-semibold mr-3"
                  style={{ padding: "10px 16px" }}
                >
                  Connect Wallet
                </button>
              </a>
            </Link>
            {/* <Link href="#">
              <a>
                <button
                  className="btn btn-light-green text-sm font-semibold"
                  style={{
                    padding: "10px 16px",
                    border: "none",
                    minWidth: "120px",
                  }}
                >
                  Login
                </button>
              </a>
            </Link> */}
          </>
        )}
      </div>
    </div>
  );
}
