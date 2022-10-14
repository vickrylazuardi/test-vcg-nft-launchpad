import React from "react";
import useMetaMask from "../wallet/hook";
import LoadingVcg from "../components/Common/loadingVcg";
import LeftNavbar from "./LeftNavbar";
import MidNavbar from "./MidNavbar";
import RightNavbar from "./RightNavbar";
import TopNavbar from "./TopNavbar";
import BottomNavMobile from "./BottomNavMobile";

export default function Navbar() {
  const { account, disconnect, switchActive } = useMetaMask();

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
            <RightNavbar 
              account={account}
              disconnect={handleDisconnect}
            />
          </div>
        </div>
        <div className="bottom-action-container hidden lg:block">
          <BottomNavMobile />
        </div>
      </nav>
    </div>
  );
}
