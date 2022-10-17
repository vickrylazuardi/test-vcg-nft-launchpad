import React, { useState } from "react";
import Link from "next/link";
import {isDesktop, isMobile} from "react-device-detect";

export default function MidNavbar(props) {
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

	return (
		<div
			className="mid-nav-container flex items-center px-5"
			style={{flex: "1 1 0%"}}
		>
			<div className="input-wrapper w-full lg:w-2/3 relative">
				<div className="img-wrap absolute top-0 bottom-0 flex items-center left-3">
					<img src="/images/svg/icon-search.svg" alt="search" width={22}/>
				</div>
				<input
					type="text"
					className="w-full p-3 pl-10"
					placeholder="Search Projects"
				/>
			</div>
      {
        isMobile &&
        <div className="market-container pl-5 items-center hidden lg:flex">
          {
            props.account ?
            <div 
              className="profile flex items-center cursor-pointer"
              onClick={() => {
                setDropdown(!dropdown);
                if (dropdown) handleLeave("sub-menu-4");
                else handleEnter("sub-menu-4");
              }}
            >
              <div className="relative sub-menu-container sub-menu-4">
                <div className="sub-menu" style={{minWidth: "110px"}}>
                  <Link href="/profile">
                    <a>Profile</a>
                  </Link>
                  <p className="not-enter" onClick={() => props.disconnect()}>Disconnect</p>
                </div>
              </div>
              <p className="font-semibold text-sm ml-1">
                {props.account.slice(0,6) + "..." + props.account.slice(-6)}
              </p>
              <img src="/images/svg/arrow-down.svg" alt="" className="ml-1" />
            </div> :
            <Link href="/connect-wallet">
              <a>
                <button 
                  className="btn-connect-wallet py-1 px-3 rounded-md"
                >
                  Connect Wallet
                </button>
              </a>
            </Link>
          }
        </div>
      }
		</div>
	);
}
