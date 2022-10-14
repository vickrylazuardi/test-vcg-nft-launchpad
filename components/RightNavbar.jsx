import React from "react";

export default function RightNavbar() {
  return (
    <div className="right-nav-container flex items-center">
      <div className="market-container flex items-center pr-5">
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
      <div className="profile-store flex items-center">
        <div className="store flex items-center cursor-pointer">
          <div className="mask mask-hexagon relative avatar-container cursor-pointer">
            <div className="mask mask-hexagon avatar-wrap grid place-items-center">
              <img
                src="/images/item1.png"
                alt="product market"
                className="mask mask-hexagon"
              />
            </div>
          </div>
          <p className="font-semibold text-sm ml-1">Toko</p>
        </div>
        <div className="profile flex items-center cursor-pointer ml-4">
          <div className="mask mask-hexagon relative avatar-container cursor-pointer">
            <div className="mask mask-hexagon avatar-wrap grid place-items-center">
              <img
                src="/images/item1.png"
                alt="product market"
                className="mask mask-hexagon"
              />
            </div>
          </div>
          <p className="font-semibold text-sm ml-1">John Doe</p>
        </div>
      </div>
    </div>
  );
}
