import React from "react";
import Image from "next/image";
import { isBrowser, isMobile } from "react-device-detect";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  return (
    <div id="launchpad-header">
      <div className="container flex items-start justify-between">
        <div className="left w-1/2 lg:w-full">
          <div className="top-title lg:flex lg:justify-between lg:items-center">
            <div className="inner-top">
              <h1>NFTs Launchpad</h1>
              <div className="flex items-center">
                <p className="small-semibold">Powered by</p>
                <div className="flex items-center ml-2">
                  <Image
                    src="/images/coin-small.png"
                    alt="coin vcgamers"
                    width={20}
                    height={20}
                    loading="lazy"
                  />
                  <p className="text-lg font-semibold ml-1 lg:text-sm">$VCG</p>
                </div>
              </div>
            </div>
            {isMobile && (
              <Image
                src="/images/vicimon-rocket-3d.png"
                alt="coin vcgamers"
                width={116}
                height={116}
                loading="lazy"
              />
            )}
          </div>
          {isBrowser && (
            <p
              className="small-semibold mt-4 w-10/12"
              style={{ color: "#9aa4bf" }}
            >
              $VCG Launchpad will empower crypto currency projects with the
              ability to distribute tokens and raise liquidity. The fundamental
              flaws of existing launchpads is that acquiring enough tokens to
              participate in the ecosystem is prohibitive, and even if you do
              stake the tokens,
            </p>
          )}
          <div
            className={
              isBrowser ? "action-container mt-10" : "action-container mt-3"
            }
          >
            <div className="info-container flex items-center justify-between">
              <div className="item-gray" style={{ width: "32%" }}>
                <p className="font-bold text-lg text-center">55</p>
                <p
                  className="small-semibold text-center"
                  style={{ color: "#9aa4bf" }}
                >
                  Projects Funded
                </p>
              </div>
              <div className="item-gray" style={{ width: "32%" }}>
                <p className="font-bold text-lg text-center">$77.75M</p>
                <p
                  className="small-semibold text-center"
                  style={{ color: "#9aa4bf" }}
                >
                  Creative Work
                </p>
              </div>
              <div className="item-gray" style={{ width: "32%" }}>
                <p className="font-bold text-lg text-center">$77.75M</p>
                <p
                  className="small-semibold text-center"
                  style={{ color: "#9aa4bf" }}
                >
                  Creative Work
                </p>
              </div>
            </div>
            <div className="flex items-center my-5 gap-2">
              <button
                className="btn btn-bordered w-1/2 lg:text-xs"
                style={{ padding: "14px 0" }}
              >
                Get $VCG Now
              </button>
              <button
                className="btn btn-orange-light w-1/2 lg:text-xs"
                onClick={() => router.push("/forms/new-project")}
              >
                Launch Your Project Now
              </button>
            </div>
            <div className="sc-info-container flex items-center justify-between flex-wrap">
              <div className="item-gray flex items-center lg:w-full lg:justify-center">
                <Image
                  src="/images/svg/arrow-bg-left.svg"
                  alt="social vcgamers"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p className="small-semibold ml-1">
                  0xi93294829488141939204823948
                </p>
                <div className="flex items-center ml-2 cursor-pointer">
                  <Image
                    src="/images/svg/copy-green.svg"
                    alt="social vcgamers"
                    width={24}
                    height={24}
                    loading="lazy"
                  />
                  <p
                    className="small-semibold font-bold ml-2"
                    style={{ color: "#40d04f" }}
                  >
                    Copy
                  </p>
                </div>
              </div>
              <div className="flex items-center lg:justify-center lg:w-full lg:mt-4">
                <p className="small-semibold mr-6">Follow Us on</p>
                <div className="social-container flex items-center">
                  <div className="flex items-center">
                    <Image
                      src="/images/twitter-circle.png"
                      alt="social vcgamers"
                      width={39}
                      height={39}
                      loading="lazy"
                      className="cursor-pointer"
                    />
                  </div>
                  <div className="mx-2 cursor-pointer flex items-center">
                    <Image
                      src="/images/medium-circle.png"
                      alt="social vcgamers"
                      width={39}
                      height={39}
                      loading="lazy"
                    />
                  </div>
                  <div className="flex items-center">
                    <Image
                      src="/images/tele-circle.png"
                      alt="social vcgamers"
                      width={33}
                      height={39}
                      loading="lazy"
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isBrowser && (
          <div className="right w-1/2 max-w-content">
            <Image
              src="/images/vicimon-rocket-3d.png"
              alt="vicimon rocket"
              loading="lazy"
              width={488}
              height={488}
            />
          </div>
        )}
      </div>
    </div>
  );
}
