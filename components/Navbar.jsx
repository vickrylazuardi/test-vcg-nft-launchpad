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
import { useRouter } from "next/router";

export default function Navbar(props) {
  const { account, disconnect, switchActive } = useMetaMask();
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const router = useRouter();

  const [detailProfile, setDetailProfile] = useState("");
  const [detailProfileVcg, setDetailProfileVcg] = useState("");
  const [isLogin, setIsLogin] = useState("");

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
    setIsLogin("");
  };

  const handleLogout = () => {
    setIsLogin("");
    router.push(`/auth?logout=${cookies.get("tokenVcg")}`);
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
      const cookieProfile = cookies.get(account + "-profile");
      setDetailProfile(cookieProfile);
      setIsLogin("accountWeb3");
    }
  }, [account]);

  useEffect(() => {
    setTimeout(() => {
      const isLogedin = cookies.get("isLogedin");
      const data = cookies.get("profile-data");
      console.log("?ISLOF", isLogedin, data);
      if (isLogedin == "true") {
        setDetailProfileVcg(data);
        setIsLogin("accountWeb2");
      }
    }, 1000);
  }, []);

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
              {isLogin == "accountWeb2" ? (
                <RightNavbar
                  isLogin={isLogin}
                  // detailProfile={detailProfile}
                  account={account}
                  disconnect={handleLogout}
                  // detailProfileVcg={detailProfileVcg}
                  profileName={detailProfileVcg?.member_name}
                  profileImg={detailProfileVcg?.member_photo}
                />
              ) : (
                <RightNavbar
                  isLogin={isLogin}
                  // detailProfile={detailProfile}
                  account={account}
                  disconnect={handleDisconnect}
                  // detailProfileVcg={detailProfileVcg}
                  profileName={detailProfile?.name}
                  profileImg={"-"}
                />
              )}
            </div>
          </div>
          {/* <div className="bottom-action-container hidden lg:block">
          <BottomNavMobile />
        </div> */}

          <NavbarMobile />
        </nav>
      </div>

      {!props.noneBtmNav && (
        <NavigationBottomMobile
          account={account}
          disconnect={handleDisconnect}
        />
      )}

      {modal.modalNewUser.isOpen && <DialogNewUser />}
      <ToastComponent />
    </>
  );
}
