import React from "react";

export default function MidNavbar() {
  return (
    <div
      className="mid-nav-container flex items-center px-5"
      style={{ flex: "1 1 0%" }}
    >
      <div className="input-wrapper w-full lg:w-2/3 relative">
        <div className="img-wrap absolute top-0 bottom-0 flex items-center left-3">
          <img src="/images/svg/icon-search.svg" alt="search" width={22} />
        </div>
        <input
          type="text"
          className="w-full p-3 pl-10"
          placeholder="Search Projects"
        />
      </div>
      <div className="market-container pl-5 items-center hidden lg:flex">
        <div className="img-wrap">
          <img src="/images/svg/icon-notif.svg" alt="notification" />
        </div>
        <div className="img-wrap mx-6">
          <img src="/images/svg/icon-wishlist.svg" alt="wishlist" />
        </div>
        <div className="img-wrap">
          <img src="/images/svg/icon-cart.svg" alt="cart" />
        </div>
      </div>
    </div>
  );
}
