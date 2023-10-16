import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Provider } from "react-redux";
import { store } from "../redux/store";

import Layout from "../components/Layout/Layout";
import LayoutDashboard from "../components/Layout/LayoutDashboard";
import LayoutWallet from "../components/Layout/LayoutWallet";
import "../styles/globals.scss";
import "../styles/index.scss";

import React from "react";
import Web3 from "web3";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { mainnet, bsc } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { Web3ReactProvider } from "@web3-react/core";
import useMetaMask, { MetaMaskProvider } from "../wallet/hook";
import LayoutNoFooterWMR from "../components/Layout/LayoutNoFooterWMR";
import LayoutEmptyWMR from "../components/Layout/LayoutEmptyWMR";

function MyApp({ Component, pageProps, router }) {
  const { chains, publicClient } = configureChains([bsc], [publicProvider()]);
  const config = createConfig({
    autoConnect: true,
    publicClient,
    connectors: [
      new InjectedConnector({ chains }),
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: { appName: "VCG NFT Launchpad" },
      }),
    ],
  });

  function getLibrary(provider) {
    return new Web3(provider);
  }

  if (router.pathname.split("/")[1] === "profile") {
    return (
      <React.StrictMode>
        <WagmiConfig config={config}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <MetaMaskProvider>
              <Provider store={store}>
                <LayoutDashboard>
                  <Component {...pageProps} />
                </LayoutDashboard>
              </Provider>
            </MetaMaskProvider>
          </Web3ReactProvider>
        </WagmiConfig>
      </React.StrictMode>
    );
  } else if (
    router.pathname.split("/")[1] === "detail" ||
    router.pathname.split("/")[1] === "projects"
  ) {
    return (
      <React.StrictMode>
        <WagmiConfig config={config}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <MetaMaskProvider>
              <Provider store={store}>
                <LayoutEmptyWMR>
                  <Component {...pageProps} />
                </LayoutEmptyWMR>
              </Provider>
            </MetaMaskProvider>
          </Web3ReactProvider>
        </WagmiConfig>
      </React.StrictMode>
    );
  } else if (
    router.pathname === "/connect-wallet" ||
    router.pathname === "/auth"
  ) {
    return (
      <React.StrictMode>
        <WagmiConfig config={config}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <MetaMaskProvider>
              <Provider store={store}>
                <LayoutWallet>
                  <Component {...pageProps} />
                </LayoutWallet>
              </Provider>
            </MetaMaskProvider>
          </Web3ReactProvider>
        </WagmiConfig>
      </React.StrictMode>
    );
  } else if (router.pathname === "/our-services") {
    return (
      <React.StrictMode>
        <WagmiConfig config={config}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <MetaMaskProvider>
              <Provider store={store}>
                <LayoutNoFooterWMR>
                  <Component {...pageProps} />
                </LayoutNoFooterWMR>
              </Provider>
            </MetaMaskProvider>
          </Web3ReactProvider>
        </WagmiConfig>
      </React.StrictMode>
    );
  } else {
    return (
      <React.StrictMode>
        <WagmiConfig config={config}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <MetaMaskProvider>
              <Provider store={store}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </Provider>
            </MetaMaskProvider>
          </Web3ReactProvider>
        </WagmiConfig>
      </React.StrictMode>
    );
  }
}

export default MyApp;
