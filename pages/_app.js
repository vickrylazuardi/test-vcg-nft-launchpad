import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import {Provider} from "react-redux";
import {store} from "../redux/store";

import Layout from "../components/Layout/Layout";
import LayoutDashboard from "../components/Layout/LayoutDashboard";
import LayoutWallet from "../components/Layout/LayoutWallet";
import "../styles/globals.scss";
import "../styles/index.scss";

import Web3 from "web3";
import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import useMetaMask, { MetaMaskProvider } from "../wallet/hook";
import LayoutNoFooterWMR from "../components/Layout/LayoutNoFooterWMR";

function MyApp({ Component, pageProps, router }) {
  function getLibrary(provider) {
    return new Web3(provider);
  };

	if (router.pathname.split("/")[1] === "profile") {
		return (
			<React.StrictMode>
				<Web3ReactProvider getLibrary={getLibrary}>
					<MetaMaskProvider>
						<Provider store={store}>
							<LayoutDashboard>
								<Component {...pageProps} />
							</LayoutDashboard>
						</Provider>
					</MetaMaskProvider>
				</Web3ReactProvider>
			</React.StrictMode>
		);
	} else if (router.pathname === "/connect-wallet") {
		return (
			<React.StrictMode>
				<Web3ReactProvider getLibrary={getLibrary}>
					<MetaMaskProvider>
						<Provider store={store}>
							<LayoutWallet>
								<Component {...pageProps} />
							</LayoutWallet>
						</Provider>
					</MetaMaskProvider>
				</Web3ReactProvider>
			</React.StrictMode>
		);
	}else if (router.pathname === "/our-services") {
		return (
			<React.StrictMode>
				<Web3ReactProvider getLibrary={getLibrary}>
					<MetaMaskProvider>
						<Provider store={store}>
							<LayoutNoFooterWMR>
								<Component {...pageProps} />
							</LayoutNoFooterWMR>
						</Provider>
					</MetaMaskProvider>
				</Web3ReactProvider>
			</React.StrictMode>
		);
	} else {
		return (
			<React.StrictMode>
				<Web3ReactProvider getLibrary={getLibrary}>
					<MetaMaskProvider>
						<Provider store={store}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</Provider>
					</MetaMaskProvider>
				</Web3ReactProvider>
			</React.StrictMode>
		);
	};
}

export default MyApp;
