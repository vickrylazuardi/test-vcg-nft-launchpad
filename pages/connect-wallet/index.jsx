import Link from "next/link";
import useMetaMask from "../../wallet/hook";
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isMobile, isBrowser } from 'react-device-detect';
import React, { useEffect } from "react";

export default function Index() {
	const { connect, signature } = useMetaMask();
	const router = useRouter();

	const listWallet = [
		{
			title: "Trust Wallet",
			url: "/images/icon-wallet/wallet-trust.png",
			provider:"trustWallet"
		},
		{
			title: "Metamask",
			url: "/images/icon-wallet/wallet-metamask.png",
			provider:"metaMask"
		},
		{
			title: "SafePal",
			url: "/images/icon-wallet/wallet-safepal.png",
			provider:"safePal"
		},
	];

  const connectWallet = async (providerType) => {
    // console.log(providerType);
    if (providerType === 'metaMask') {
      // if (isMobile) {
      //   toast.error('Please install metaMask', {
      //     position: toast.POSITION.TOP_RIGHT,
      //   });
      //   return;
      // }
      if (window.ethereum) connect('metaMask', '0X4');
			else alert("You don't have or Nonactivated Metamask Wallet Extension");
    } else if (providerType === 'trustWallet') {
      if (isBrowser) {
        toast.error('not detect dapp browser', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      connect('trustWallet', '0X4');
    } else if (providerType === 'safePal') {
      if (isBrowser) {
        toast.error('not detect dapp browser', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      connect('safePal', '0X4');
    } else {
      if (isMobile || !window.BinanceChain) {
        toast.error('Please install Safepal wallet', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      connect('walletConnect');
    }
  };

	useEffect(() => {
		if (signature) router.back();
	}, [signature]);

	return (
		<div id="connect-wallet-page" className="">
			<div className="container py-3 cwp-mobile">
				<p className="font-bold text-center mt-5">Connect First, for get it Fast</p>
				<div className="grid grid-cols-2 gap-4 mt-5">
					{
						listWallet.map((item, idx) => (
							<div key={idx} className="connect-wallet-item flex items-center justify-center rounded-lg">
								<div 
									className="connect-wallet-item-bundle"
									onClick={() => connectWallet(item.provider)}
								>
									<div className="w-full flex justify-center">
										<img src={item.url} alt=""/>
									</div>
									<p className="font-semibold mt-1">{item.title}</p>
								</div>
							</div>
						))
					}
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
					<img src="/images/bg-wallet.png" alt=""/>
				</div>
				<div className="flex-1 flex items-center justify-center">
					<div className="connect-wallet-item-bundle text-center">
						<p className="font-bold text-center mt-5 cwpi-title">Connect Wallet</p>
						<div className="flex justify-center gap-20 mt-5">
							{
								listWallet.map((item, idx) => (
									<div key={idx} className="connect-wallet-item flex items-center justify-center rounded-lg">
										<div 
											className="connect-wallet-item-bundle"
											onClick={() => connectWallet(item.provider)}
										>
											<div className="w-full flex justify-center">
												<img src={item.url} alt=""/>
											</div>
											<p className="font-semibold mt-1">{item.title}</p>
										</div>
									</div>
								))
							}
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
						<Link href="/">
							<p className="font-semibold flex justify-center mt-3">
								<img src="/images/svg/icon-arrow-left.svg" className="cursor-pointer" alt=""/>
								<span className="cursor-pointer">Back to Previous Page</span>
							</p>
						</Link>
					</div>
				</div>
			</div>
			<ToastContainer />
		</div>
	);
}
