import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isMobile, isBrowser } from 'react-device-detect';
import useMetaMask from "../wallet/hook";
import LoadingVcg from "../components/Common/loadingVcg";

export default function Navbar() {
  const { account, connect, disconnect, switchActive } = useMetaMask();

  const connectWallet = async (providerType) => {
    // console.log(providerType);
    if (providerType === 'metaMask') {
      // if (isMobile) {
      //   toast.error('Please install metaMask', {
      //     position: toast.POSITION.TOP_RIGHT,
      //   });
      //   return;
      // }
      connect('metaMask', '0X4');
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

  const handleDisconnect = () => {
    switchActive(false);
    disconnect();
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1>Navbar</h1>
        {
          account ?
          <button 
            className="btn btn-orange-light"
            onClick={() => handleDisconnect()}
          >
            Disconnect Wallet
          </button> :
          <button 
            className="btn btn-purple-primary"
            onClick={() => connectWallet("metaMask")}
          >
            Connect Wallet
          </button>
        }
      </div>
      <ToastContainer />
    </div>
  );
}
