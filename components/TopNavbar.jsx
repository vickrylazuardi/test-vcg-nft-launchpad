import React from "react";

export default function TopNavbar() {
  return (
    <div id="top-navbar">
      <div className="container-wrapper flex justify-between items-center">
        <div className="left flex items-center">
          <a
            href="https://play.google.com/store/apps/details?id=com.vcgamers.apps"
            rel="nofollow"
            target="_blank"
            className="flex items-center text-link"
          >
            Download App{" "}
            <img
              src="/images/svg/icon-download.svg"
              alt="download vcgamers app"
              className="ml-1"
            />
          </a>
          <a
            href="https://discord.com/invite/2ZCcTXx5Vr"
            rel="nofollow"
            target="_blank"
            className="flex items-center text-link ml-8"
          >
            Komunitas
          </a>
          <a
            href="https://career.vcgamers.com/"
            rel="nofollow"
            target="_blank"
            className="flex items-center text-link ml-8"
          >
            Karir
          </a>
        </div>
        <div className="right flex items-center">
          <a
            href="https://app.vcgamers.com/about-us"
            rel="nofollow"
            target="_blank"
            className="flex items-center text-link mr-8"
          >
            Tentang Kami
          </a>
          <a
            href="https://app.vcgamers.com/about-us"
            rel="nofollow"
            target="_blank"
            className="flex items-center text-link mr-8"
          >
            Kebijakan Privacy
          </a>
          <a
            href="https://app.vcgamers.com/terms-conditions"
            rel="nofollow"
            target="_blank"
            className="flex items-center text-link mr-8"
          >
            Syarat Ketentuan
          </a>
          <a
            href="https://app.vcgamers.com/contact-us"
            rel="nofollow"
            target="_blank"
            className="flex items-center text-link"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
}
