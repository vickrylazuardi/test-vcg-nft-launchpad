import React, { useEffect } from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { FiRepeat, FiStopCircle } from "react-icons/fi";
import { FaChevronRight } from "react-icons/fa";
import { IoRocketOutline } from "react-icons/io5";
import { BsBoxSeam } from "react-icons/bs";

export default function RightNavbar(props) {
  const router = useRouter();

  const [domainOrigin, setDomainOrigin] = useState("");

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

  function showAccordion() {
    let element = document.getElementById("balance-accordion");

    if (element.classList.contains("show")) {
      element.classList.remove("show");
    } else {
      element.classList.add("show");
    }
  }

  useEffect(() => {
    const domainName = window.location.origin;
    if (domainName) setDomainOrigin(domainName);
  }, []);

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
        {props.isLogin ? (
          <>
            {props.profileInfo?.member_wallet_type == "generate" ? (
              <></>
            ) : !props.account || !props.isActive ? (
              <button
                className="btn btn-connect-wallet-dark text-sm font-semibold mr-1"
                style={{ padding: "10px 16px" }}
                onClick={() => {
                  if (
                    !props.isActive &&
                    props.account &&
                    props.profileInfo?.member_wallet_type != "generate"
                  ) {
                    props.handleConnectWallet(props.account);
                  } else {
                    router.push("/connect-wallet");
                  }
                }}
              >
                Connect Wallet
              </button>
            ) : (
              ""
            )}
            <div
              className="relative profile flex items-center cursor-pointer ml-4"
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
              <div className="sub-menu-container sub-menu-4">
                <div className="sub-menu">
                  <div
                    className="dropdown-profile"
                    style={{ cursor: "default", background: "#1D2333" }}
                  >
                    <div
                      className="p-4"
                      style={{ borderBottom: "1px solid #3f485f" }}
                    >
                      <div className="flex">
                        <Link href={"/profile"}>
                          <a>
                            <div
                              className="mask mask-hexagon profile-pict-container relative m-auto mr-2"
                              style={{ width: "40px", height: "40px" }}
                            >
                              <div
                                className="mask mask-hexagon profile-wrap"
                                style={{
                                  background: "#3f485f",
                                  width: "40px",
                                  height: "40px",
                                }}
                              >
                                <img
                                  width={10}
                                  src={
                                    props.profileImg
                                      ? props.profileImg
                                      : "/images/default-avatar.png"
                                  }
                                  className="mask mask-hexagon object-cover h-full w-full"
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src =
                                      "/images/default-avatar.png";
                                  }}
                                />
                              </div>
                            </div>
                          </a>
                        </Link>
                        <div className="flex items-center">
                          <div>
                            <Link href={"/profile"}>
                              <a>
                                <p className="text-sm font-semibold">
                                  {props.profileName}
                                </p>
                              </a>
                            </Link>
                            {props.account && (
                              <p className="font-semibold text-xs text-color-grey">
                                {props.account.slice(0, 7) +
                                  "..." +
                                  props.account.slice(-7)}
                                {props.profileInfo?.member_wallet_type !=
                                  "generate" && (
                                  <span
                                    style={{ textDecoration: "underline" }}
                                    className={`font-medium text-xs ${
                                      props.isActive
                                        ? "text-red-600"
                                        : "text-green-500"
                                    } ml-2 cursor-pointer`}
                                    onClick={() => {
                                      if (props.isActive) {
                                        props.handleDisconnect();
                                      } else {
                                        props.handleConnectWallet();
                                      }
                                    }}
                                  >
                                    {props.isActive ? "Disconnect" : "Connect"}
                                  </span>
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="p-4"
                      style={{ borderBottom: "1px solid #3f485f" }}
                    >
                      <Link href={"/profile"}>
                        <a>
                          <h6 className="text-sm font-semibold cursor-pointer mb-3 text-color-grey">
                            <IoRocketOutline className="inline mr-1" />
                            Project
                          </h6>
                        </a>
                      </Link>
                      <Link href={"/profile/boxes"}>
                        <a>
                          <h6 className="text-sm font-semibold cursor-pointer mb-3 text-color-grey">
                            <BsBoxSeam className="inline mr-1" />
                            Owned Box
                          </h6>
                        </a>
                      </Link>
                      <Link href={"/profile/history"}>
                        <a>
                          <h6 className="text-sm font-semibold cursor-pointer mb-3 text-color-grey">
                            <FiRepeat className="inline mr-1" />
                            History Transaction
                          </h6>
                        </a>
                      </Link>
                      <div id="balance-accordion" className="accordion-wrap">
                        <div
                          className="accordion-trigger cursor-pointer"
                          onClick={() => showAccordion(0)}
                        >
                          <h6 className="text-sm font-semibold cursor-pointer text-color-grey">
                            <FiStopCircle className="inline mr-1" />
                            Balance
                            <FaChevronRight
                              className="text-xs inline ml-1 mt-1"
                              style={{ float: "right" }}
                            />
                          </h6>
                        </div>
                        <div className="accordion-content">
                          <div
                            className="mt-3"
                            style={{
                              background: "#252C3E",
                              padding: 10,
                              borderRadius: 5,
                            }}
                          >
                            <div className="flex">
                              <div>
                                <img
                                  className="mt-1"
                                  style={{ width: 16, aspectRatio: 1 / 1 }}
                                  src="/images/coin-vcg.png"
                                  alt=""
                                />
                              </div>
                              <div className="mx-2 mr-5">
                                <p className="text-sm font-semibold text-color-grey">
                                  VCG
                                </p>
                                <p className="text-sm font-semibold">
                                  0.231241241
                                </p>
                              </div>
                              <div className="flex gap-4">
                                <img
                                  src="/images/svg/wallet-received.svg"
                                  alt=""
                                />
                                <img src="/images/svg/wallet-send.svg" alt="" />
                              </div>
                            </div>
                          </div>
                          <div
                            className="mt-3"
                            style={{
                              background: "#252C3E",
                              padding: 10,
                              borderRadius: 5,
                            }}
                          >
                            <div className="flex">
                              <div>
                                <img
                                  className="mt-1"
                                  style={{ width: 16, aspectRatio: 1 / 1 }}
                                  src="/images/coin-vcg.png"
                                  alt=""
                                />
                              </div>
                              <div className="mx-2 mr-5">
                                <p className="text-sm font-semibold text-color-grey">
                                  VCG
                                </p>
                                <p className="text-sm font-semibold">
                                  0.231241241
                                </p>
                              </div>
                              <div className="flex gap-4">
                                <img
                                  src="/images/svg/wallet-received.svg"
                                  alt=""
                                />
                                <img src="/images/svg/wallet-send.svg" alt="" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h6
                        className="text-sm font-semibold cursor-pointer text-red-600"
                        onClick={() => {
                          if (props.isLogin == "accountWeb2") {
                            props.handleLogout();
                          } else {
                            props.handleDisconnect();
                          }
                        }}
                      >
                        {props.isLogin == "accountWeb2"
                          ? "Logout"
                          : "Disconnect"}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="mask mask-hexagon profile-pict-container relative m-auto"
                style={{ width: "40px", height: "40px" }}
              >
                <div
                  className="mask mask-hexagon profile-wrap"
                  style={{
                    background: "#3f485f",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  <img
                    src={
                      props.profileImg
                        ? props.profileImg
                        : "/images/default-avatar.png"
                    }
                    className="mask mask-hexagon object-cover h-full w-full"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/images/default-avatar.png";
                    }}
                  />
                </div>
              </div>
              <div>
                <p className="font-semibold text-sm ml-1">
                  {props.profileName}
                </p>
                {props.account && (
                  <p className="font-semibold text-color-grey text-xs ml-1">
                    {props.account.slice(0, 7) +
                      "..." +
                      props.account.slice(-7)}
                  </p>
                )}
              </div>
              <img src="/images/svg/arrow-down.svg" alt="" className="ml-1" />
            </div>
          </>
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
            <Link href={`https://auth.vcg.asia/?ref=${domainOrigin}/auth`}>
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
