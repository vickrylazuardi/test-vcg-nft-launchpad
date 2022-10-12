import React from "react";
import { isMobile } from "react-device-detect";

export default function FooterTop() {
  return (
    <div className="footer-top">
      <h4 className="font-bold lg:text-sm">
        VCGamers - Jualan & Belanja Produk Game Online Serta Berbagai Produk
        Digital Terlengkap, Termurah, Aman, dan Cepat!
      </h4>
      <p className="text-sm mt-2 lg:text-xs" style={{ color: "#9AA4BF" }}>
        VCGamers Marketplace merupakan sebuah tempat jual-beli online murah dan
        juga terpercaya yang dapat memenuhi segala kebutuhan gamers di seluruh
        Indonesia. Lakukan transaksi trading atau jual-beli akun, currency,
        e-wallet, game key & gift, item, jasa/joki game, pulsa, skin,
        topup/top-up, dan voucher dengan lebih aman dan nyaman hanya di
        vcgamers.com. Daftar dan buka toko kamu sekarang juga, nikmati berbagai
        keuntungan berjualan produk games dan produk digital lainnya yang hanya
        bisa kamu dapatkan di VCGamers, all about games.
      </p>
      <hr className="my-3" />
      <div className="top-wrapper flex items-start justify-between lg:flex-col">
        <div className="left flex items-start justify-between flex-wrap w-1/3 lg:w-full">
          <div className="link-wrapper">
            <p className="link-title font-bold mt-2">Company</p>
            <a href="/" className="link-text text-sm mt-2">
              About Us
            </a>
            <a href="/" className="link-text text-sm mt-2">
              Career
            </a>
            <a href="/" className="link-text text-sm mt-2">
              Legal
            </a>
            <a href="/" className="link-text text-sm mt-2">
              Roadmap
            </a>
            <a href="/" className="link-text text-sm mt-2">
              Preale Release
            </a>
          </div>
          <div className="link-wrapper">
            <p className="link-title font-bold mt-2">Product</p>
            <a href="/" className="link-text text-sm mt-2">
              VC Market
            </a>
            <a href="/" className="link-text text-sm mt-2">
              $VCG Token
            </a>
            <a href="/" className="link-text text-sm mt-2">
              VC Arena
            </a>
            <a href="/" className="link-text text-sm mt-2">
              VC Goods
            </a>
            <a href="/" className="link-text text-sm mt-2">
              VC News
            </a>
            <a href="/" className="link-text text-sm mt-2">
              VC Launchpad
            </a>
          </div>
          <div className="link-wrapper mt-7">
            <p className="link-title font-bold mt-2">Help</p>
            <a href="/" className="link-text text-sm mt-2">
              Teams Condition
            </a>
            <a href="/" className="link-text text-sm mt-2">
              Privacy
            </a>
            <a href="/" className="link-text text-sm mt-2">
              FAQ
            </a>
            <a href="/" className="link-text text-sm mt-2">
              Seller Center
            </a>
          </div>
          <div className="link-wrapper mt-7">
            <p className="link-title font-bold mt-2">Others</p>
            <a href="/" className="link-text text-sm mt-2">
              Ransverse
            </a>
            <a href="/" className="link-text text-sm mt-2">
              Whitepaper
            </a>
            <a href="/" className="link-text text-sm mt-2">
              Blog
            </a>
          </div>
        </div>
        <div className="mid w-1/3 lg:w-full lg:mt-5">
          <p className="link-title font-bold lg:text-center">
            Join Our Community
          </p>
          <div className="social-container flex items-center mt-3 lg:justify-center">
            <a href="/" className="mr-5">
              <img src="/images/svg/twitter-fill.svg" alt="" />
            </a>
            <a href="/" className="mr-5">
              <img src="/images/svg/instagram-fill.svg" alt="" />
            </a>
            <a href="/" className="mr-5">
              <img src="/images/svg/youtube-fill.svg" alt="" />
            </a>
            <a href="/">
              <img src="/images/svg/discord-fill.svg" alt="" />
            </a>
          </div>
          <p className="link-title font-bold mt-7 lg:text-center">
            Supported by
          </p>
          <div className="supported-container flex items-center mt-3 lg:justify-center">
            <a href="/" className="mr-2">
              <img src="/images/bappebti.png" alt="" />
            </a>
            <a href="/" className="mr-2">
              <img src="/images/kominfo.png" alt="" />
            </a>
            <a href="/">
              <img src="/images/certik.png" alt="" />
            </a>
          </div>
          <p className="link-title font-bold mt-7 lg:text-center">
            Partner Pembayaran
          </p>
          <div
            className="payment-container flex items-center flex-wrap mt-3 lg:justify-center lg:mx-auto"
            style={{ maxWidth: 284 }}
          >
            <a href="/" className="mr-2">
              <img src="/images/payment/alfamart.png" alt="" />
            </a>
            <a href="/" className="mr-2">
              <img src="/images/payment/alfamidi.png" alt="" />
            </a>
            <a href="/" className="mr-2">
              <img src="/images/payment/bni.png" alt="" />
            </a>
            <a href="/" className="mr-2 mt-2">
              <img src="/images/payment/mandiri.png" alt="" />
            </a>
            <a href="/" className="mr-2 mt-2">
              <img src="/images/payment/bca.png" alt="" />
            </a>
            <a href="/" className="mr-2 mt-2">
              <img src="/images/payment/gopay.png" alt="" />
            </a>
          </div>
        </div>
        <div className="right w-1/3 lg:w-full lg:mt-5">
          <div className="img-wrap">
            <img src="/images/vicimon-piala.png" alt="" />
          </div>
          {isMobile && (
            <p className="text-center text-sm font-bold my-2">
              Download Our Apps
            </p>
          )}
          <p
            className="text-center text-sm font-bold my-2 lg:hidden"
            style={{ color: "#9AA4BF" }}
          >
            © 2019 - 2022, VCGamers Indonesia
          </p>
          <div className="img-wrap">
            <img src="/images/download.png" alt="" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
