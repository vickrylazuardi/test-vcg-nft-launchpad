import React from "react";

export default function TopNavbar() {
  return (
    <div id="top-navbar">
      <div className="container-wrapper flex justify-between items-center">
        <div className="left flex items-center">
          <a href="/" className="flex items-center text-link">
            Download App{" "}
            <img
              src="/images/svg/icon-download.svg"
              alt="download vcgamers app"
              className="ml-1"
            />
          </a>
          <a href="/" className="flex items-center text-link ml-8">
            Komunitas
          </a>
          <a href="/" className="flex items-center text-link ml-8">
            Karir
          </a>
        </div>
        <div className="right flex items-center">
          <a href="/" className="flex items-center text-link mr-8">
            Tentang Kami
          </a>
          <a href="/" className="flex items-center text-link mr-8">
            Kebijakan Privacy
          </a>
          <a href="/" className="flex items-center text-link mr-8">
            Syarat Ketentuan
          </a>
          <a href="/" className="flex items-center text-link mr-8">
            Sitemap
          </a>
          <a href="/" className="flex items-center text-link">
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
}
