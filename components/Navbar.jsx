import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isMobile, isBrowser } from 'react-device-detect';
import useMetaMask from "../wallet/hook";
import LoadingVcg from "../components/Common/loadingVcg";
import LeftNavbar from "./LeftNavbar";
import MidNavbar from "./MidNavbar";
import RightNavbar from "./RightNavbar";
import TopNavbar from "./TopNavbar";
import BottomNavMobile from "./BottomNavMobile";

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
    <div id="navbar-container" className="fixed top-0 right-0 left-0 z-50">
      <nav>
        <TopNavbar />
        <div className="bottom-nav-container">
          <div className="container-wrapper  flex items-center justify-between">
            <LeftNavbar />
            <MidNavbar />
            <RightNavbar />
          </div>
        </div>
        <div className="bottom-action-container hidden lg:block">
          <BottomNavMobile />
        </div>
      </nav>
    </div>
  );
}
