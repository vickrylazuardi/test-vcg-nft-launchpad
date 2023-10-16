import MidNavbar from "../../MidNavbar";
import RightNavbar from "../../RightNavbar";
import TopNavbar from "../../TopNavbar";
import useMetaMask from "../../../wallet/hook";
import BottomNavMobileDashboard from "./BottomNavMobileDashboard";
// import LeftNavbarDashboard from "./LeftNavbarDashboard";
import LeftNavbarDashboard from "../../LeftNavbar";
import { isDesktop, isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import { toggleNavbar } from "../../../redux/navbarReducer";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function NavbarDashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isSigned, account, disconnect, isActive, connect } =
    useMetaMask();
  const navData = useSelector((state) => state.navbarMob.dataNavbar);

  const cookies = new Cookies();

  const [detailProfile, setDetailProfile] = useState("");
  const [detailProfileVcg, setDetailProfileVcg] = useState("");
  const [isLogin, setIsLogin] = useState("");

  const navbarPlain = {
    title: "Launchpad",
    status: 0,
  };
  const navbarDetailProject = {
    title: "Ragnarok X Next Generation",
    status: 2,
  };
  const toggleNavbarActions = (params, e) => {
    if (params === 0) {
      dispatch(toggleNavbar(navbarPlain));
    }
  };
  const toggleNavbarRedirect = () => {
    if (navData.status === 1 || navData.status === 2) {
      dispatch(toggleNavbar(navbarPlain));
      router.push("/profile/projects");
    } else if (navData.status === 3) {
      dispatch(toggleNavbar(navbarDetailProject));
      router.push("/profile/projects/detail?=ragnarok2");
    } else if (navData.status === 4 || navData.status === 5) {
      dispatch(toggleNavbar(navbarPlain));
      router.push("/profile/boxes");
    } else if (navData.status === 6) {
      dispatch(toggleNavbar(navbarPlain));
      router.push("/profile/history");
    } else if (navData.status === 0) {
      dispatch(toggleNavbar(navbarPlain));
      router.push("/profile");
    }
  };

  const [dropdown, setDropdown] = useState(false);
  const handleEnter = (el) => {
    let elm = document.querySelector(`.${el}`);
    if (el == "sub-sub-menu-1") {
      let htt = document.querySelector(".how-to-text");
      htt.style.background = "#4b546a";
    }
    elm.classList.add("active");
  };
  const handleLeave = (el) => {
    let elm = document.querySelector(`.${el}`);
    if (el == "sub-sub-menu-1") {
      let htt = document.querySelector(".how-to-text");
      htt.style.background = null;
    }
    elm.classList.remove("active");
  };

  const handleDisconnect = () => {
    disconnect();
    setIsLogin("");
  };

  const handleLogout = () => {
    setIsLogin("");
    router.push(`/auth?logout=${cookies.get("tokenVcg")}`);
    disconnect();
  };

  function handleConnectWallet(wallet) {
    console.log("??", account);
    connect("metaMask", "0X4");
  }

  useEffect(() => {
    setTimeout(() => {
      const isLogedin = localStorage.getItem("isLogedin");
      const data = localStorage.getItem("profile-data");
      // console.log("?ISLOF", isLogedin, data);
      if (isLogedin == "true") {
        setDetailProfileVcg(JSON.parse(data));
        setIsLogin("accountWeb2");
      } else {
        if (account) {
          const profileAccount = localStorage.getItem(account + "-profile");
          setDetailProfile(JSON.parse(profileAccount));
          setIsLogin("accountWeb3");
        }
      }
    }, 1000);
  }, [isSigned, account]);

  return (
    <div id="navbar-container" className="sticky top-0 right-0 left-0 z-50">
      {isDesktop && (
        <nav>
          <TopNavbar />
          <div className="bottom-nav-container">
            <div className="container-wrapper  flex items-center justify-between">
              <LeftNavbarDashboard />
              <MidNavbar />
              {isLogin == "accountWeb2" ? (
                <RightNavbar
                  isLogin={isLogin}
                  isActive={isActive}
                  profileInfo={detailProfileVcg}
                  account={detailProfileVcg?.member_wallet}
                  handleLogout={handleLogout}
                  handleDisconnect={handleDisconnect}
                  profileName={detailProfileVcg?.member_name}
                  profileImg={detailProfileVcg?.member_photo}
                  handleConnectWallet={handleConnectWallet}
                />
              ) : (
                <RightNavbar
                  isLogin={isLogin}
                  profileInfo={detailProfile}
                  account={account}
                  handleDisconnect={handleDisconnect}
                  isActive={isActive}
                  profileName={detailProfile?.name}
                  profileImg={"-"}
                />
              )}
            </div>
          </div>
          <div className="bottom-action-container hidden lg:block">
            <BottomNavMobileDashboard />
          </div>
        </nav>
      )}
      {isMobile && router.pathname === "/profile" && (
        <div className="dashboard-navbar-mobile flex">
          <div className="flex-1 flex items-center px-2">
            <span className="font-bold">Profile</span>
          </div>
          <div className="flex-1 flex items-center justify-end px-2">
            {account ? (
              <div
                className="profile flex items-center cursor-pointer"
                onClick={() => {
                  setDropdown(!dropdown);
                  if (dropdown) handleLeave("sub-menu-4");
                  else handleEnter("sub-menu-4");
                }}
              >
                <div className="relative sub-menu-container sub-menu-4">
                  <div className="sub-menu" style={{ minWidth: "110px" }}>
                    <Link href="/">
                      <a>Home</a>
                    </Link>
                    <p className="not-enter" onClick={() => disconnect()}>
                      Disconnect
                    </p>
                  </div>
                </div>
                <p className="font-semibold text-sm ml-1">
                  {account.slice(0, 6) + "..." + account.slice(-6)}
                </p>
                <img src="/images/svg/arrow-down.svg" alt="" className="ml-1" />
              </div>
            ) : (
              <Link href="/connect-wallet">
                <a>
                  <button className="btn-connect-wallet font-semibold px-3 py-0.5 rounded-md">
                    Connect Wallet
                  </button>
                </a>
              </Link>
            )}
          </div>
        </div>
      )}
      {isMobile &&
        router.pathname.split("/")[1] == "profile" &&
        router.pathname.split("/").length > 2 && (
          <div className="dashboard-navbar-mobile-launchpad">
            <div className="dnml-top flex">
              <div className="flex-1 flex items-center px-2">
                <img
                  onClick={toggleNavbarRedirect}
                  src="/images/svg/chevron-left-bold.svg"
                  alt=""
                />
                <span className="font-bold ml-2">{navData.title}</span>
              </div>
              {navData.status === 0 && (
                <div className="flex-1 flex items-center justify-end px-2">
                  <img src="/images/svg/icon-search.svg" alt="" />
                </div>
              )}
            </div>
            {navData.status === 0 && (
              <div className="dnml-bottom">
                <Link href="/profile/projects">
                  <div
                    onClick={(e) => toggleNavbarActions(0, e)}
                    className={
                      router.pathname === "/profile/projects"
                        ? "dnml-bottom-tab active"
                        : "dnml-bottom-tab"
                    }
                  >
                    <span>Projects</span>
                  </div>
                </Link>
                <Link href="/profile/boxes">
                  <div
                    onClick={(e) => toggleNavbarActions(0, e)}
                    className={
                      router.pathname === "/profile/boxes"
                        ? "dnml-bottom-tab active"
                        : "dnml-bottom-tab"
                    }
                  >
                    <span>Owned Box</span>
                  </div>
                </Link>
                <Link href="/profile/nft">
                  <div
                    onClick={(e) => toggleNavbarActions(0, e)}
                    className={
                      router.pathname === "/profile/nft"
                        ? "dnml-bottom-tab active"
                        : "dnml-bottom-tab"
                    }
                  >
                    <span>Owned NFT</span>
                  </div>
                </Link>
                <Link href="/profile/history">
                  <div
                    onClick={(e) => toggleNavbarActions(0, e)}
                    className={
                      router.pathname === "/profile/history"
                        ? "dnml-bottom-tab active"
                        : "dnml-bottom-tab"
                    }
                  >
                    <span>History</span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        )}
    </div>
  );
}
