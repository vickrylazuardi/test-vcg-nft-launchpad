import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalNewUser } from "../redux/modalReducer";
import useMetaMask from "../wallet/hook";
import LeftNavbar from "./LeftNavbar";
import MidNavbar from "./MidNavbar";
import RightNavbar from "./RightNavbar";
import TopNavbar from "./TopNavbar";
import BottomNavMobile from "./BottomNavMobile";
import NavbarMobile from "./NavbarMobile";
import NavigationBottomMobile from "./NavigationBottomMobile";
import DialogNewUser from "./Common/DialogNewUser";
import Cookies from "universal-cookie";
import axios from "axios";
import { API } from "../utils/globalConstant";
import ToastComponent from "./Common/toastComponent";

export default function Navbar() {
  const { account, disconnect, switchActive } = useMetaMask();
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const cookies = new Cookies();

  // const [detailProfile, setDetailProfile] = useState();

  const modalNewUser = {
    loading: false,
    isOpen: true,
    title: {
      en: "Information New User",
    },
  };

  const handleDisconnect = () => {
    switchActive(false);
    disconnect();
  };

  const getCreator = (params) => {
    try {
      axios
        .post(API.marketplace + API.artist.list, {
          walletAddress: params,
        })
        .then((res) => {
          if (res.status === 204) dispatch(toggleModalNewUser(modalNewUser));
          else setCookie(params + "-profile", res.data.data.items[0], 1);
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

  useEffect(() => {
    if (account) {
      getCreator(account);
      // const cookieProfile = cookies.get(account + "-profile");
      // setDetailProfile(cookieProfile)
      // console.log(">>", cookieProfile);
    }
  }, [account]);

  useEffect(() => {
    if (modal.modalNewUser.isOpen) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "auto";
    }
  });
  return (
    <>
      <div id="navbar-container" className="fixed top-0 right-0 left-0 z-50">
        <nav>
          <TopNavbar />
          <div className="bottom-nav-container block md:hidden">
            <div className="container-wrapper  flex items-center justify-between">
              <LeftNavbar />
              {/* <MidNavbar 
              account={account}
              disconnect={handleDisconnect}
            /> */}
              <RightNavbar account={account} disconnect={handleDisconnect} />
            </div>
          </div>
          {/* <div className="bottom-action-container hidden lg:block">
          <BottomNavMobile />
        </div> */}

          <NavbarMobile />
        </nav>
      </div>
      <NavigationBottomMobile account={account} disconnect={handleDisconnect} />

      {modal.modalNewUser.isOpen && <DialogNewUser />}
      <ToastComponent />
    </>
  );
}
