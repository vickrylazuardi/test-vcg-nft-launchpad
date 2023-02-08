import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function RightNavbar(props) {
  const router = useRouter();

  console.log(">>>", router);

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
                <div className="dropdown-profile" style={{ cursor: "default" }}>
                  <div
                    className="p-4"
                    style={{ borderBottom: "1px solid #3f485f" }}
                  >
                    <div className="flex">
                      <Link href={"/profile"}>
                        <a>
                          <div
                            className="mask mask-hexagon profile-pict-container relative m-auto mr-2"
                            style={{ width: "30px", height: "30px" }}
                          >
                            <div
                              className="mask mask-hexagon profile-wrap"
                              style={{ background: "#3f485f" }}
                            >
                              <img
                                width={10}
                                src={"/images/default-avatar.png"}
                                className="mask mask-hexagon object-contain h-full w-full"
                              />
                            </div>
                          </div>
                        </a>
                      </Link>
                      <div>
                        <Link href={"/profile"}>
                          <a>
                            <p className="text-sm font-semibold">
                              {props.detailProfile?.name}
                            </p>
                          </a>
                        </Link>
                        <p className="font-semibold text-sm text-color-grey">
                          {props.account.slice(0, 7) +
                            "..." +
                            props.account.slice(-7)}
                          <span
                            className="font-medium text-sm text-red-600 ml-2 cursor-pointer"
                            style={{ textDecoration: "underline" }}
                            onClick={() => props.disconnect()}
                          >
                            Disconnect
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <Link href={"/profile"}>
                      <a>
                        <h6 className="text-sm font-semibold cursor-pointer mb-3 text-color-grey">
                          My Profile
                        </h6>
                      </a>
                    </Link>
                    <h6
                      className="text-sm font-semibold cursor-pointer text-red-600"
                      onClick={() => props.disconnect()}
                    >
                      Disconnect
                    </h6>
                  </div>
                </div>
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
                  src={"/images/default-avatar.png"}
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
            <Link href={`https://auth.vcg.asia/?ref=http://localhost:3000`}>
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
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
