import Link from "next/link";
import React from "react";

export default function NavigationBottomMobile(props) {
  return (
    <div className="navigation-bottom-mobile hidden md:block fixed bottom-0 w-full">
      <div className="flex justify-between">
        <Link href="/index-revamp">
          <a className="text-center px-3">
            <img
              className="m-auto"
              src="/images/svg/icon-home-grey.svg"
              alt=""
            />
            <p className="text-xs">Home</p>
          </a>
        </Link>
        <Link href="/our-services">
          <a className="text-center px-3">
            <img
              className="m-auto mb-2"
              src="/images/svg/icon-rocket.svg"
              alt=""
            />
            <p className="text-xs">Our Services</p>
          </a>
        </Link>
        <Link href={props.account ? "/profile" : "/connect-wallet"}>
          <a className="text-center px-3">
            <div
              className="mask mask-hexagon profile-pict-container relative m-auto mb-2"
              style={{ width: "20px", height: "20px" }}
            >
              <div
                className="mask mask-hexagon profile-wrap"
                style={{ background: "#3f485f" }}
              >
                <img
                  width={10}
                  src="/images/default-avatar.png"
                  className="mask mask-hexagon object-contain h-full w-full"
                />
              </div>
            </div>
            <p className="text-xs">
              {props.account
                ? props.account.slice(0, 4) + "..." + props.account.slice(-4)
                : "Account"}
            </p>
          </a>
        </Link>
      </div>
    </div>
  );
}
