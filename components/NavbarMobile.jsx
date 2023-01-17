import React from "react";

export default function NavbarMobile(props) {
  return (
    <>
      <div className="navbar-mobile hidden">
        <div className="logo-wrapper flex items-start cursor-pointer">
          <img width={125} src="/images/logo.png" alt="vcgamers" />
          <div className="flex items-start relative">
            <p className="font-bold text-xs ml-1">LAUNCHPAD</p>
          </div>
        </div>
      </div>
    </>
  );
}
