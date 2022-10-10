import React from "react";
import Image from "next/image";
import { isDesktop, isMobile } from "react-device-detect";

export default function Market() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div id="launchpad-market" className="mt-16 lg:mt-4">
      <div className="container mx-auto">
        <div className="wrapper flex items-center justify-between mb-5">
          <h2 className="font-bold text-2xl lg:text-sm">Marketplace</h2>
          <button className="font-bold cursor-pointer lg:text-xs">
            See All
          </button>
        </div>
        <div className="item-container overflow-x-auto flex justify-between">
          {arr.map((res) => (
            <div className="item-market-brand cursor-pointer">
              <div className="mask mask-hexagon relative brand-container">
                <div
                  className="mask mask-hexagon brand-wrap grid place-items-center"
                  style={{ backgroundImage: "url('/images/bgavatar.png')" }}
                >
                  <img
                    src="/images/item1.png"
                    alt="product market"
                    className="mask mask-hexagon"
                  />
                </div>
              </div>
              <p className="text-sm font-bold text-center mt-2 lg:text-xs">
                Metal Slug
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
