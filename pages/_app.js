import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Layout from "../components/Layout/Layout";
import LayoutDashboard from "../components/Layout/LayoutDashboard";
import LayoutWallet from "../components/Layout/LayoutWallet";
import "../styles/globals.scss";
import "../styles/index.scss";

import Web3 from "web3";
import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import useMetaMask, { MetaMaskProvider } from "../wallet/hook";

function MyApp({ Component, pageProps, router }) {
  function getLibrary(provider) {
    return new Web3(provider);
  };

	if (router.pathname.startsWith("/profile/")) {
		return (
			<React.StrictMode>
				<Web3ReactProvider getLibrary={getLibrary}>
					<MetaMaskProvider>
						<LayoutDashboard>
							<Component {...pageProps} />
						</LayoutDashboard>
					</MetaMaskProvider>
				</Web3ReactProvider>
			</React.StrictMode>
		);
	} else if (router.pathname === "/connect-wallet") {
		return (
			<React.StrictMode>
				<Web3ReactProvider getLibrary={getLibrary}>
					<MetaMaskProvider>
						<LayoutWallet>
							<Component {...pageProps} />
						</LayoutWallet>
					</MetaMaskProvider>
				</Web3ReactProvider>
			</React.StrictMode>
		);
	} else {
		return (
			<React.StrictMode>
				<Web3ReactProvider getLibrary={getLibrary}>
					<MetaMaskProvider>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</MetaMaskProvider>
				</Web3ReactProvider>
			</React.StrictMode>
		);
	};
}

export default MyApp;
