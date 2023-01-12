import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { isBrowser, isMobile } from "react-device-detect";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoRocketOutline } from "react-icons/io5";

export default function HeaderCenter(props) {
  const router = useRouter();

  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText(
        "0x1F36FB2D91d9951Cf58aE4c1956C0b77e224F1E9"
      );
      toast.info("NFT Collection Address Copied to Clipboard!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="launchpad-header">
      {/* FOR MOBILE ANIMATION */}
      <div
        style={{ height: "180px", justifyContent: "center" }}
        className="relative hidden md:flex"
      >
        <img
          width={156}
          height={1365}
          className="absolute image-absolute-up-and-down "
          src="/images/vicimon-rocket-3d.png"
          alt=""
        />
      </div>
      {/* /FOR MOBILE ANIMATION */}
      <div className="text-center container mt-4 relative">
        <h2 className="text-4xl md:text-lg font-bold">
          Welcome to VCGamers Launchpad
        </h2>
        <div className="flex justify-center items-center mt-2 md:mt-0">
          <p className="small-semibold text-color-grey">Powered by</p>
          <div className="flex items-center ml-2">
            <Image
              src="/images/coin-small.png"
              alt="coin vcgamers"
              width={20}
              height={20}
              loading="lazy"
            />
            <p
              className="text-lg font-semibold ml-1 lg:text-sm"
              style={{ color: "#FFC107" }}
            >
              $VCG
            </p>
          </div>
        </div>
        <p
          className="font-semibold mt-5 text-lg md:text-xs"
          style={{ lineHeight: "130%" }}
        >
          Connects exciting games to the community.
          <br /> A place for innovative and rewarding gaming experience.
        </p>
        <button
          style={{ padding: "10px 16px", maxWidth: "560px" }}
          className="btn btn-orange-light text-xs relative mt-5 md:w-full lg:w-auto"
          onClick={() => {
            if (props.account) {
              router.push("/forms/new-project");
            } else {
              router.push("/connect-wallet");
            }
          }}
        >
          <IoRocketOutline className="inline text-2xl mr-1" /> Launch Your
          Project Now
        </button>
        <div className="info-container flex items-center justify-center gap-5 mt-5">
          <div
            className="item-gray text-center w-1/2"
            style={{ maxWidth: "270px" }}
          >
            {props.totalProject ? (
              <p className="font-bold text-lg">{props.totalProject}</p>
            ) : (
              <div className="spinner-border animate-spin inline-block w-5 h-5 border-t-4 border-l-4 rounded-full" />
            )}
            <p className="small-semibold" style={{ color: "#9aa4bf" }}>
              Projects Funded
            </p>
          </div>
          <div
            className="item-gray text-center w-1/2"
            style={{ maxWidth: "270px" }}
          >
            {props.totalFunded ? (
              <p className="font-bold text-lg">${props.totalFunded}</p>
            ) : (
              <div className="spinner-border animate-spin inline-block w-5 h-5 border-t-4 border-l-4 rounded-full" />
            )}
            <p
              className="small-semibold text-center"
              style={{ color: "#9aa4bf" }}
            >
              Creative Work
            </p>
          </div>
        </div>

        {/* IMAGE ANIMATION FOR WEB */}
        <img
          width={234}
          height={234}
          className="absolute left-0 image-absolute-up-and-down md:hidden lg:block"
          src="/images/vicimon-vr-3d.png"
          alt=""
        />
        <img
          width={255}
          height={255}
          className="absolute right-0 image-absolute-up-and-down md:hidden lg:block"
          src="/images/vicimon-rocket-3d.png"
          alt=""
        />
      </div>

      <ToastContainer />
    </div>
  );
}
