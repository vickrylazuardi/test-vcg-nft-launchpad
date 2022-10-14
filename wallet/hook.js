import React, { useState, useEffect, useMemo, useCallback } from "react";
import { injected, walletConnect } from "./connector";
import { useWeb3React } from "@web3-react/core";
import { getSigner, sign } from "../utils/ethersjs";
import { ethers, utils } from "ethers";
import Cookies from "universal-cookie";
import axios from "axios";
import { API } from "../utils/globalConstant";

export const MetaMaskContext = React.createContext(null);

export const MetaMaskProvider = ({ children }) => {
  const { activate, account, library, active, deactivate, chainId, provider } =
    useWeb3React();

  const [isActive, setIsActive] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [shouldDisable, setShouldDisable] = useState(false); // Should disable connect button while connecting to MetaMask
  const [isLoading, setIsLoading] = useState(false);
  const [signer, setSigner] = useState(null);

  const cookies = new Cookies();

  // Init Loading
  useEffect(() => {
    async function fetchData() {
      if (account && cookies.get(account) === undefined && !isLoading) {
        setIsLoading(true);
        await signMessage(account);
      }
    }
    fetchData();
  }, [account]);

  useEffect(() => {
    if (sessionStorage.getItem("isConnected")) {
      connect(sessionStorage.getItem("providerType"));
    }
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem("isConnected") && isActive) {
      connect(sessionStorage.getItem("providerType"));
    }
  }, [isActive]);

  // Check when App is Connected or Disconnected to MetaMask
  const handleIsActive = useCallback(() => {
    setIsActive(active);
  }, [active]);

  const handleWalletModal = async (state) => {
    // console.log("state ===>" + state);
    setWalletModal(state);
  };

  const signMessage = async (walletId) => {
    try {
      setIsSigned(false);
      const time = new Date().toLocaleString();
      const messageTemplate = `Welcome to VCGamers NFT Marketplace!\n\nClick to sign in and accept the VCGamers Terms of Service: https://v2.vcgamers.io/marketplace/terms-and-conditions \n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours.\n\nNonce:\n${utils
        .id(time)
        .slice(2)}`;
      // document.getElementById("loading-vcg").classList.add("show");
      sign(messageTemplate).then((res) => {
        if (res.error == undefined) {
          axios
            .post(API.marketplace + API.vcmarket.connect, { wallet: walletId })
            .then((resp) => {
              setCookie(walletId, res, 1);
              setCookie(walletId + "-msg", messageTemplate, 1);
              setCookie(walletId + "-profile", resp.data.data, 1);
              // getCreator(walletId);
              switchActive(true);
              setIsLoading(false);
              setIsSigned(true);
              // document.getElementById("loading-vcg").classList.remove("show");
            });
        } else {
          disconnect();
          setIsLoading(false);
          // document.getElementById("loading-vcg").classList.remove("show");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getCreator = (params) => {
    try {
      axios.post(API.marketplace + API.artist.list, {
        walletAddress : params
      })
      .then(res => {
        if (res.status === 204) document.getElementById('newUser').click();
        else setCookie(params + "-profile", res.data.data.items[0], 1);
      })
    } catch (error) {
      console.log(error);
    }
  };

  const setCookie = async (key, value, expires) => {
    try {
      const d = new Date();
      d.setDate(d.getDate() + expires);
      cookies.set(key, value, { path: "/", expires: d });
    } catch (error) {
      console.log(error);
    }
  };

  const switchActive = async (state) => {
    setIsActive(state);
  };

  const switchNetwork = async (network) => {
    setIsLoading(true);
    try {
      const chainId = "0x" + network.toString(16);
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      });
      setIsLoading(false);
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x61",
                chainName: "Testnet BSC",
                nativeCurrency: {
                  name: "Test BNB",
                  symbol: "tBNB",
                  decimals: 18,
                },
                rpcUrls: ["https://rpc.ankr.com/bsc_testnet_chapel"] /* ... */,
                blockExplorerUrls: ["https://testnet.bscscan.com/"],
              },
            ],
          });
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      }
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   setIsLoading(true);
  //   switchNetwork(chainId);
  // }, [chainId])

  // useEffect(() => {
  //   setIsLoading(true);
  //   switchNetwork(chainId);
  // }, [])

  useEffect(() => {
    handleIsActive();
  }, [handleIsActive]);

  // Connect to MetaMask wallet
  const connect = async (providerType, id) => {
    setShouldDisable(true);
    try {
      if (providerType === "metaMask") {
        await activate(injected).then(() => {
          switchActive(true);
          setShouldDisable(false);
          sessionStorage.setItem("providerType", "metaMask");
          sessionStorage.setItem("isConnected", true);
        });
      } else if (providerType === "safePal") {
        await activate(injected).then(() => {
          switchActive(true);
          setShouldDisable(false);
          sessionStorage.setItem("providerType", "safePal");
          sessionStorage.setItem("isConnected", true);
        });
      }
      if (providerType === "trustWallet") {
        await activate(injected).then(() => {
          switchActive(true);
          setShouldDisable(false);
          sessionStorage.setItem("providerType", "trustWallet");
          sessionStorage.setItem("isConnected", true);
        });
      } else if (providerType === "walletConnect") {
        await activate(walletConnect).then(() => {
          switchActive(true);
          setShouldDisable(false);
          sessionStorage.setItem("providerType", "walletConnect");
          sessionStorage.setItem("isConnected", true);
        });
      } else {
      }
      const signer = await getSigner();
      setSigner(signer);
      setWalletModal(false);
    } catch (error) {
      console.log("Error on connecting: ", error);
    }
  };

  // Disconnect from Metamask wallet
  const disconnect = async () => {
    try {
      await deactivate();
      sessionStorage.removeItem("isConnected");
      sessionStorage.removeItem("providerType");
      cookies.remove(account);
      cookies.remove(account + "-msg");
      cookies.remove(account + "-profile");
      setIsSigned(false);
      switchActive(false);
    } catch (error) {
      console.log("Error on disconnnect: ", error);
    }
  };

  const connectContract = (contractAddress, ABI) => {
    return new ethers.Contract(contractAddress, ABI);
  };

  const values = useMemo(
    () => ({
      isActive,
      isSigned,
      account,
      chainId,
      isLoading,
      walletModal,
      handleWalletModal,
      connect,
      disconnect,
      switchActive,
      switchNetwork,
      library,
      shouldDisable,
      connectContract,
      signer,
    }),
    [
      isActive,
      isSigned,
      isLoading,
      shouldDisable,
      account,
      chainId,
      walletModal,
      library,
      signer,
    ]
  );

  return (
    <MetaMaskContext.Provider value={values}>
      {children}
    </MetaMaskContext.Provider>
  );
};

export default function useMetaMask() {
  const context = React.useContext(MetaMaskContext);
  // console.log(context);
  if (context === undefined) {
    throw new Error(
      "useMetaMask hook must be used with a MetaMaskProvider component"
    );
  }

  return context;
}