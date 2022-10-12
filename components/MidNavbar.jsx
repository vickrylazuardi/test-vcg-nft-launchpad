import React from "react";

export default function MidNavbar() {
  return (
    <div
      className="mid-nav-container flex items-center px-5"
      style={{ flex: "1 1 0%" }}
    >
      <div className="input-wrapper w-full relative">
        <div className="img-wrap absolute top-0 bottom-0 flex items-center left-3">
          <img src="/images/svg/icon-search.svg" alt="search" width={22} />
        </div>
        <input type="text" className="w-full p-3 pl-10" />
      </div>
    </div>
  );
}
