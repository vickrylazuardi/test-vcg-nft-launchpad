import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { isBrowser, isMobile } from "react-device-detect";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Header(props) {
  const router = useRouter();
  console.log("project",props.totalProject);
  
  const copyToClipboard = () => {
    try {
      navigator.clipboard.writeText("0x1F36FB2D91d9951Cf58aE4c1956C0b77e224F1E9");
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
      <div className="container flex items-start justify-between">
        <div className="left w-1/2 lg:w-full">
          <div className="top-title lg:flex lg:justify-between lg:items-center">
            <div className="inner-top">
              <h1>Launchpad</h1>
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
            <div className="info-container flex items-center justify-between gap-5">
              <div className="item-gray text-center" style={{ width: "50%" }}>
                {
                  props.totalProject ?
                  <p className="font-bold text-lg">
                    {props.totalProject}
                  </p> :
                  <div class="spinner-border animate-spin inline-block w-5 h-5 border-t-4 border-l-4 rounded-full"/>
                }
                <p
                  className="small-semibold"
                  style={{ color: "#9aa4bf" }}
                >
                  Projects Funded
                </p>
              </div>
              <div className="item-gray text-center" style={{ width: "50%" }}>
                {
                  props.totalFunded!=null ?
                  <p className="font-bold text-lg">
                    ${props.totalFunded}
                  </p> :
                  <div class="spinner-border animate-spin inline-block w-5 h-5 border-t-4 border-l-4 rounded-full"/>
                }
                <p
                  className="small-semibold text-center"
                  style={{ color: "#9aa4bf" }}
                >
                  Creative Work
                </p>
              </div>
              {/* <div className="item-gray" style={{ width: "32%" }}>
                <p className="font-bold text-lg text-center">$77.75M</p>
                <p
                  className="small-semibold text-center"
                  style={{ color: "#9aa4bf" }}
                >
                  Creative Work
                </p>
              </div> */}
            </div>
            <div className="flex items-center my-5 gap-2">
              <button
                className="btn btn-bordered w-1/2 lg:text-xs"
                style={{ padding: "14px 0" }}
              >
                <a 
                  href="https://pancakeswap.finance/swap?outputCurrency=0x1F36FB2D91d9951Cf58aE4c1956C0b77e224F1E9" 
                  rel="nofollow" 
                  target="_blank"
                >
                  <p>
                    Get $VCG Now
                  </p>
                </a>
              </button>
              <button
                className="btn btn-orange-light w-1/2 lg:text-xs relative"
                onClick={() => router.push("/forms/new-project")}
              >
                Launch Your Project Now
              </button>
            </div>
            <div className="sc-info-container flex items-center justify-between flex-wrap">
              <div className="item-gray flex items-center lg:w-full lg:justify-center">
                <Image
                  // src="/images/svg/arrow-bg-left.svg"
                  src="/images/coin-blink.gif"
                  alt="social vcgamers"
                  width={29}
                  height={29}
                  loading="lazy"
                />
                <p className="small-semibold ml-1">
                  {/* 0xi93294829488141939204823948 */}
                  0x1F36FB2D91d9951Cf58aE4c1956C...
                </p>
                <div className="flex items-center ml-2 cursor-pointer" onClick={copyToClipboard}>
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
                  <a href="https://twitter.com/vcgamers_io" rel="nofollow" target="_blank">
                    <div className="flex items-center">
                      <Image
                        src="/images/twitter-circle.png"
                        alt="social vcgamers"
                        width={39}
                        height={39}
                        loading="lazy"
                      />
                    </div>
                  </a>
                  {/* <a href="https://medium.com" rel="nofollow" target="_blank">
                    <div className="mx-2 cursor-pointer flex items-center">
                      <Image
                        src="/images/medium-circle.png"
                        alt="social vcgamers"
                        width={39}
                        height={39}
                        loading="lazy"
                      />
                    </div>
                  </a> */}
                  <a href="https://t.me/vcgamers_io" rel="nofollow" target="_blank">
                    <div className="flex items-center">
                      <Image
                        src="/images/tele-circle.png"
                        alt="social vcgamers"
                        width={33}
                        height={39}
                        loading="lazy"
                      />
                    </div>
                  </a>
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
      <ToastContainer />
    </div>
  );
}
