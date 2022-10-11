import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Layout from "../components/Layout";
import "../styles/globals.scss";
import "../styles/index.scss";

import Web3 from "web3";
import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import useMetaMask, { MetaMaskProvider } from "../wallet/hook";

function MyApp({ Component, pageProps }) {
  function getLibrary(provider) {
    return new Web3(provider);
  };

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
}

export default MyApp;
