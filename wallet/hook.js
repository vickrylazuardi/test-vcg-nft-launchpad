import React, { useState, useEffect, useMemo, useCallback } from "react";
import { injected, walletConnect, BSC_RPC } from "./connector";
import { useWeb3React } from "@web3-react/core";
import { getSigner, sign } from "../utils/ethersjs";
import { isBrowser } from "react-device-detect";
import { ethers, utils, providers } from "ethers";
import Cookies from "universal-cookie";
import axios from "axios";
import { API, RPC } from "../utils/globalConstant";
import { useRouter } from "next/router";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
  useWalletClient,
} from "wagmi";

export const MetaMaskContext = React.createContext(null);

export const MetaMaskProvider = ({ children }) => {
  const { activate, account, library, active, deactivate, provider } =
    useWeb3React();
  const { address, connector, isConnected } = useAccount();
  const switchWagmi = useSwitchNetwork();
  const { data: walletClient } = useWalletClient();
  const { connectAsync: connectWagmi, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { chain } = useNetwork();
  const chainId = chain?.id;

  const [isActive, setIsActive] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [shouldDisable, setShouldDisable] = useState(false); // Should disable connect button while connecting to MetaMask
  const [isLoading, setIsLoading] = useState(false);
  const [ethersProvider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [signature, setSignature] = useState(null);

  const cookies = new Cookies();
  const router = useRouter();

  // Init Loading
  useEffect(() => {
    if (isConnected && address) {
      const signatureJWT = cookies.get(address);
      if (signatureJWT === undefined) disconnect();
    }
  }, []);

  // Check when App is Connected or Disconnected to MetaMask
  // const handleIsActive = useCallback(() => {
  //   setIsActive(active);
  // }, [active]);

  const handleWalletModal = async (state) => {
    // console.log("state ===>" + state);
    setWalletModal(state);
  };

  const ethersSigner = () => {
    if (walletClient) {
      const { account, chain, transport } = walletClient;
      const network = {
        chainId: chain.id,
        name: chain.name,
        ensAddress: chain.contracts?.ensRegistry?.address,
      };
      const provider = new providers.Web3Provider(transport, network);
      const signer = provider.getSigner(account.address);
      setSigner(signer);
    } else setSigner(null);
  };

  const signMessage = async (walletId) => {
    try {
      setIsSigned(false);
      const time = new Date().toLocaleString();
      const messageTemplate = `Welcome to VCGamers NFT Marketplace!\n\nClick to sign in and accept the VCGamers Terms of Service: https://www.vcgamers.com/news/help/terms-use-nft/ \n\nThis request will not trigger a blockchain transaction or cost any gas fees.\n\nYour authentication status will reset after 24 hours.\n\nNonce:\n${utils
        .id(time)
        .slice(2)}`;
      // document.getElementById("loading-vcg").classList.add("show");
      sign(messageTemplate).then((res) => {
        if (res.error == undefined) {
          setSignature(res);
          setCookie(walletId, res, 1);
          setCookie(walletId + "-msg", messageTemplate, 1);
          setIsLoading(false);
          setIsSigned(true);
          setShouldDisable(false);
          ethersSigner();
          // document.getElementById("loading-vcg").classList.remove("show");
        } else {
          disconnect();
          setShouldDisable(false);
          setIsLoading(false);
          // document.getElementById("loading-vcg").classList.remove("show");
        }
      });
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

  const switchNetwork = async (network) => {
    setIsLoading(true);
    if (switchWagmi.switchNetworkAsync === undefined) {
      try {
        const chainId = "0x" + 56;
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
                  chainId: "0x38",
                  chainName: "BSC Mainet",
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18,
                  },
                  rpcUrls: ["https://bsc-dataseed.binance.org"] /* ... */,
                  blockExplorerUrls: ["https://bscscan.com/"],
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
    } else {
      await switchWagmi.switchNetworkAsync(56);
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

  // Connect to MetaMask wallet
  const connect = async (providerType, id) => {
    setShouldDisable(true);
    setIsLoading(true);
    try {
      if (providerType === "metaMask") {
        if (isBrowser) {
          if (window?.ethereum?.isMetaMask && !window?.ethereum?.isSafePal) {
            connectWagmi({ connector: connectors[1] }).then((res) => {
              signMessage(res.account);
            });
          } else {
            launch_toast(true, "Please install Metamask Wallet");
            return;
          }
        } else {
          connectWagmi({ connector: connectors[1] }).then((res) => {
            signMessage(res.account);
          });
        }
      } else if (providerType === "safePal") {
        if (isBrowser) {
          if (window?.ethereum?.isSafePal) {
            connectWagmi({ connector: connectors[0] }).then((res) => {
              signMessage(res.account);
            });
          } else {
            launch_toast(true, "Please install SafePal Wallet");
            return;
          }
        } else {
          connectWagmi({ connector: connectors[0] }).then((res) => {
            signMessage(res.account);
          });
        }
      } else if (providerType === "trustWallet") {
        if (isBrowser) {
          if (window?.ethereum?.isTrustWallet) {
            connectWagmi({ connector: connectors[0] }).then((res) => {
              signMessage(res.account);
            });
          } else {
            launch_toast(true, "Please install Trust Wallet");
            return;
          }
        } else {
          connectWagmi({ connector: connectors[0] }).then((res) => {
            signMessage(res.account);
          });
        }
      } else if (providerType === "coinbase") {
        if (isBrowser) {
          if (window?.ethereum?.isCoinbaseWallet) {
            connectWagmi({ connector: connectors[2] }).then((res) => {
              signMessage(res.account);
            });
          } else {
            launch_toast(true, "Please install Coinbase Wallet");
            return;
          }
        } else {
          connectWagmi({ connector: connectors[2] }).then((res) => {
            signMessage(res.account);
          });
        }
      } else if (providerType === "walletConnect") {
        await activate(walletConnect).then(() => {
          setShouldDisable(false);
          localStorage.setItem("providerType", "walletConnect");
          localStorage.setItem("isConnected", true);
          setCookie("providerType", "walletConnect", 1);
          setCookie("isConnected", true, 1);
        });
      } else {
      }
      const provider = new ethers.providers.JsonRpcProvider(BSC_RPC);
      setProvider(provider);
      // setWalletModal(false);
    } catch (error) {
      console.log('Error on connecting: ', error);
    }
  };

  // Disconnect from Metamask wallet
  const disconnect = async () => {
    try {
      await disconnectAsync();
      cookies.remove(address);
      cookies.remove(address + "-msg");
      cookies.remove(address + "-profile");
      setIsSigned(false);
      setSignature(null);
      setSigner(null);
    } catch (error) {
      console.log("Error on disconnnect: ", error);
    }
  };

  const connectContract = (contractAddress, ABI) => {
    return new ethers.Contract(contractAddress, ABI);
  };

  const values = useMemo(
    () => ({
      isActive: isConnected,
      isSigned,
      account: address,
      chainId,
      isLoading,
      walletModal,
      handleWalletModal,
      connect,
      disconnect,
      switchNetwork,
      library,
      shouldDisable,
      connectContract,
      signer,
      signature,
      ethersProvider
    }),
    [
      isConnected,
      isSigned,
      isLoading,
      shouldDisable,
      address,
      chainId,
      walletModal,
      library,
      signer,
      signature, 
      ethersProvider
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
