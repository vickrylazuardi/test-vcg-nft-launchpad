import Link from "next/link";
import useMetaMask from "../../wallet/hook";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isMobile, isBrowser } from "react-device-detect";
import React, { useEffect, useState } from "react";
import ToastComponent from "../../components/Common/toastComponent";

export default function Index() {
  const [detailProfileVcg, setDetailProfileVcg] = useState("");
  const [domainOrigin, setDomainOrigin] = useState("");

  const { connect, signature } = useMetaMask();
  const router = useRouter();

  const listWallet = [
    {
      title: "Trust Wallet",
      url: "/images/icon-wallet/wallet-trust.png",
      provider: "trustWallet",
    },
    {
      title: "Metamask",
      url: "/images/icon-wallet/wallet-metamask.png",
      provider: "metaMask",
    },
    {
      title: "SafePal",
      url: "/images/icon-wallet/wallet-safepal.png",
      provider: "safePal",
    },
    {
      title: "Coinbase",
      url: "/images/icon-wallet/wallet-coinbase.png",
      provider:"coinbase"
    },
  ];

  const connectWallet = async (providerType) => {
    if (providerType === "metaMask") {
      // if (isMobile) {
      //   toast.error('Please install metaMask', {
      //     position: toast.POSITION.TOP_RIGHT,
      //   });
      //   return;
      // }
      connect("metaMask", "0X4");
    } else if (providerType === "trustWallet") {
      // if (isBrowser) {
      //   launch_toast(true, "not detect dapp browser");
      //   return;
      // }
      connect("trustWallet", "0X4");
    } else if (providerType === "safePal") {
      // if (isBrowser) {
      //   launch_toast(true, "not detect dapp browser");
      //   return;
      // }
      connect("safePal", "0X4");
    } else if (providerType === "coinbase") {
      // if (isBrowser) {
      //   launch_toast(true, "not detect dapp browser");
      //   return;
      // }
      connect("coinbase", "0X4");
    } else {
      if (isMobile || !window.BinanceChain) {
        launch_toast(true, "Please install Safepal wallet");
        return;
      }
      connect("walletConnect");
    }
  };

  function launch_toast(isError, msg) {
    let x = document.getElementById("toast");
    let text = document.getElementById("toast-text");

    x.style.top = "30px";

    if (isError) {
      x.className = "show failed";
    } else {
      x.className = "show success";
    }

    text.innerHTML = msg;

    setTimeout(function () {
      x.className = x.className.replace("show", "");
      setTimeout(() => {
        text.innerHTML = "";
      }, 1000);
    }, 3000);
  }

  useEffect(() => {
    if (signature) router.back();
  }, [signature]);

  useEffect(() => {
    const domainName = window.location.origin;
    if (domainName) setDomainOrigin(domainName);

    setTimeout(() => {
      const isLogedin = localStorage.getItem("isLogedin");
      const data = localStorage.getItem("profile-data");
      console.log("?ISLOF", isLogedin, data);
      if (isLogedin == "true") {
        setDetailProfileVcg(JSON.parse(data));
      }
    }, 1000);
  }, []);

  return (
    <div id="connect-wallet-page" className="">
      <div className="container py-3 cwp-mobile">
        <p className="font-bold text-center mt-5">
          Connect First, for get it Fast
        </p>
        <div className="grid grid-cols-2 gap-4 mt-5">
          {detailProfileVcg && !detailProfileVcg?.member_wallet ? (
            <div className="connect-wallet-item flex items-center justify-center rounded-lg">
              <div
                className="connect-wallet-item-bundle"
                onClick={() =>
                  (window.location.href = `https://auth.vcg.asia/generate-wallets?ref=${domainOrigin}/auth`)
                }
              >
                <div className="w-full flex justify-center">
                  <img src={"/images/icon-wallet/vcg-wallet.png"} alt="" />
                </div>
                <p className="font-semibold mt-1">VCGamers Wallet</p>
              </div>
            </div>
          ) : (
            ""
          )}
          {listWallet.map((item, idx) => (
            <div
              key={idx}
              className="connect-wallet-item flex items-center justify-center rounded-lg"
            >
              <div
                className="connect-wallet-item-bundle"
                onClick={() => connectWallet(item.provider)}
              >
                <div className="w-full flex justify-center">
                  <img src={item.url} alt="" />
                </div>
                <p className="font-semibold mt-1">{item.title}</p>
              </div>
            </div>
          ))}
          {/* <div className="connect-wallet-item flex items-center justify-center rounded-lg">
						<div className="connect-wallet-item-bundle">
							<div className="w-full flex justify-center">
								<img src="/images/icon-wallet/icon-pancakeswap-square.png" alt=""/>
							</div>
							<p className="font-semibold mt-1">PancakeSwap</p>
						</div>
					</div>
					<div className="connect-wallet-item flex items-center justify-center rounded-lg">
						<div className="connect-wallet-item-bundle">
							<div className="w-full flex justify-center">
								<img src="/images/icon-wallet/icon-indodax-square.png" alt=""/>
							</div>
							<p className="font-semibold mt-1">Indodax</p>
						</div>
					</div>
					<div className="connect-wallet-item flex items-center justify-center rounded-lg">
						<div className="connect-wallet-item-bundle">
							<div className="w-full flex justify-center">
								<img src="/images/icon-wallet/icon-uniswap-square.png" alt=""/>
							</div>
							<p className="font-semibold mt-1">Uniswap</p>
						</div>
					</div>
					<div className="connect-wallet-item flex items-center justify-center rounded-lg">
						<div className="connect-wallet-item-bundle">
							<div className="w-full flex justify-center">
								<img src="/images/icon-wallet/icon-bitmart-square.png" alt=""/>
							</div>
							<p className="font-semibold mt-1 text-center">Bitmart</p>
						</div>
					</div> */}
        </div>
      </div>
      <div className="h-full flex cwp-web">
        <div className="connect-wallet-background">
          <img src="/images/bg-wallet.png" alt="" />
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="connect-wallet-item-bundle text-center">
            <p className="font-bold text-center mt-5 cwpi-title">
              Connect Wallet
            </p>
            <div className="flex justify-center gap-20 mt-5">
              {detailProfileVcg && !detailProfileVcg?.member_wallet ? (
                <div className="connect-wallet-item flex items-center justify-center rounded-lg">
                  <div
                    className="connect-wallet-item-bundle"
                    onClick={() =>
                      (window.location.href = `https://auth.vcg.asia/generate-wallets?ref=${domainOrigin}/auth`)
                    }
                  >
                    <div className="w-full flex justify-center">
                      <img src={"/images/icon-wallet/vcg-wallet.png"} alt="" />
                    </div>
                    <p className="font-semibold mt-1">VCGamers Wallet</p>
                  </div>
                </div>
              ) : (
                ""
              )}
              {listWallet.map((item, idx) => (
                <div
                  key={idx}
                  className="connect-wallet-item flex items-center justify-center rounded-lg"
                >
                  <div
                    className="connect-wallet-item-bundle"
                    onClick={() => connectWallet(item.provider)}
                  >
                    <div className="w-full flex justify-center">
                      <img src={item.url} alt="" />
                    </div>
                    <p className="font-semibold mt-1">{item.title}</p>
                  </div>
                </div>
              ))}
              {/* <div className="connect-wallet-item flex items-center justify-center rounded-lg">
								<div className="connect-wallet-item-bundle">
									<div className="w-full flex justify-center">
										<img src="/images/icon-wallet/icon-pancakeswap-square.png" alt=""/>
									</div>
									<p className="font-semibold mt-3">PancakeSwap</p>
								</div>
							</div>
							<div className="connect-wallet-item flex items-center justify-center rounded-lg">
								<div className="connect-wallet-item-bundle">
									<div className="w-full flex justify-center">
										<img src="/images/icon-wallet/icon-indodax-square.png" alt=""/>
									</div>
									<p className="font-semibold mt-3">Indodax</p>
								</div>
							</div>
							<div className="connect-wallet-item flex items-center justify-center rounded-lg">
								<div className="connect-wallet-item-bundle">
									<div className="w-full flex justify-center">
										<img src="/images/icon-wallet/icon-uniswap-square.png" alt=""/>
									</div>
									<p className="font-semibold mt-3">Uniswap</p>
								</div>
							</div>
							<div className="connect-wallet-item flex items-center justify-center rounded-lg">
								<div className="connect-wallet-item-bundle">
									<div className="w-full flex justify-center">
										<img src="/images/icon-wallet/icon-bitmart-square.png" alt=""/>
									</div>
									<p className="font-semibold mt-3 text-center">Bitmart</p>
								</div>
							</div> */}
            </div>
            <p
              className="font-semibold flex justify-center mt-3"
              onClick={() => router.back()}
            >
              <img
                src="/images/svg/icon-arrow-left.svg"
                className="cursor-pointer"
                alt=""
              />
              <span className="cursor-pointer">Back to Previous Page</span>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
      <ToastComponent />
    </div>
  );
}
