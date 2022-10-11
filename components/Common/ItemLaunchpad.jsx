import React from "react";

export default function ItemLaunchpad({ progress }) {
  return (
    <div id="item-launchpad">
      <div className="img-wrap">
        <img src="/images/item-launchpad.png" alt="web vcgamers" />
      </div>
      <div className="content-item p-4">
        <h3 className="font-bold mb-1">Small Box</h3>
        <div className="content-show">
          <div className="pre-item">
            <p className="pre-title">Crossout</p>
            <p>1</p>
          </div>
          <div className="pre-item">
            <p className="pre-title">Deadly Weapon</p>
            <p>1</p>
          </div>
        </div>
        <div className="see-btn flex items-center justify-center cursor-pointer">
          <p
            className="text-sm font-semibold mr-2"
            style={{ color: "#9aa4bf" }}
          >
            See More
          </p>
          <img
            src="/images/svg/arrow-small.svg"
            alt="web vcgamers"
            className="cursor-pointer"
          />
        </div>
        <div className="price-wrap mt-3">
          <div className="price flex items-center justify-between">
            <p className="title font-semibold text-sm">Price</p>
            <p className="font-semibold text-sm" style={{ color: "#40d04f" }}>
              99 BNB
            </p>
          </div>
          <div className="price-bar">
            <div
              className={
                progress === 100 ? "price-inner-bar full" : "price-inner-bar"
              }
            ></div>
          </div>
        </div>
        <div className="percentage-wrap mt-3 flex items-center justify-between">
          <p className="font-bold text-sm">{progress}%</p>
          <p className="font-bold text-sm">6/20 Boxes</p>
        </div>
        <div className="btn-wrap mt-3">
          <button
            className={
              progress === 100
                ? "btn btn-disabled w-full"
                : "btn btn-purple-primary w-full"
            }
          >
            Buy Item
          </button>
        </div>
      </div>
    </div>
  );
}
