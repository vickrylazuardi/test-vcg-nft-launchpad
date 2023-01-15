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
            <a
              href="https://app.vcgamers.com/about-us"
              className="link-text text-sm mt-2"
            >
              About Us
            </a>
            <a
              href="https://career.vcgamers.com/"
              className="link-text text-sm mt-2"
            >
              Career
            </a>
            {/* <a href="/" className="link-text text-sm mt-2">
              Legal
            </a> */}
            <a
              href="https://whitepaper.vcgamers.com/roadmap"
              className="link-text text-sm mt-2"
            >
              Roadmap
            </a>
            {/* <a href="/" className="link-text text-sm mt-2">
              Preale Release
            </a> */}
          </div>
          <div className="link-wrapper">
            <p className="link-title font-bold mt-2">Product</p>
            <a
              href="https://vcgamers.com/market"
              target="_blank"
              rel="nofollow"
              className="link-text text-sm mt-2"
            >
              Marketplace
            </a>
            <a
              href="https://vcgamers.com/token"
              target="_blank"
              rel="nofollow"
              className="link-text text-sm mt-2"
            >
              $VCG Token
            </a>
            <a
              href="https://arena.vcgamers.com"
              target="_blank"
              rel="nofollow"
              className="link-text text-sm mt-2"
            >
              Arena
            </a>
            <a
              href="https://vcgamers.com/goods"
              target="_blank"
              rel="nofollow"
              className="link-text text-sm mt-2"
            >
              Merchandise
            </a>
            <a
              href="https://vcgamers.com/news-landing"
              target="_blank"
              rel="nofollow"
              className="link-text text-sm mt-2"
            >
              News
            </a>
            <a href="/" className="link-text text-sm mt-2">
              Launchpad
            </a>
            <a
              href="https://hub.vcgamers.com/"
              target="_blank"
              rel="nofollow"
              className="link-text text-sm mt-2"
            >
              Social Hub
            </a>
          </div>
          <div className="link-wrapper mt-7">
            <p className="link-title font-bold mt-2">Help</p>
            <a
              href="https://vcgamers.com/news/help/faq-launchpad/"
              target="_blank"
              className="link-text text-sm mt-2"
            >
              <div className="flex gap-1">
                <span> Terms Condition </span>
                {/* <img
                  style={{ height: "24px", width: "auto", marginTop: "-4px" }}
                  src="/images/soon.gif"
                ></img> */}
              </div>
            </a>
            <a
              href="https://vcgamers.com/news/help/faq-launchpad/"
              target="_blank"
              className="link-text text-sm mt-2"
            >
              <div className="flex gap-1">
                <span>Privacy </span>
                {/* <img
                  style={{ height: "24px", width: "auto", marginTop: "-4px" }}
                  src="/images/soon.gif"
                ></img> */}
              </div>
            </a>
            <a
              href="https://vcgamers.com/news/help/faq-launchpad/"
              target="_blank"
              className="link-text text-sm mt-2"
            >
              <div className="flex gap-1">
                <span>FAQ </span>
                {/* <img
                  style={{ height: "24px", width: "auto", marginTop: "-4px" }}
                  src="/images/soon.gif"
                ></img> */}
              </div>
            </a>

            {/* <a href="/" className="link-text text-sm mt-2">
              Seller Center
            </a> */}
          </div>
          <div className="link-wrapper mt-7">
            <p className="link-title font-bold mt-2">Others</p>
            <a
              href="https://ransverse.vcgamers.com/"
              target="_blank"
              rel="nofollow"
              className="link-text text-sm mt-2"
            >
              Ransverse
            </a>
            <a
              href="https://whitepaper.vcgamers.com/"
              target="_blank"
              rel="nofollow"
              className="link-text text-sm mt-2"
            >
              Whitepaper
            </a>
            <a
              href="https://vcgamers.com/news/"
              target="_blank"
              rel="nofollow"
              className="link-text text-sm mt-2"
            >
              Blog
            </a>
          </div>
        </div>
        <div className="mid w-1/3 lg:w-full lg:mt-5">
          <p className="link-title font-bold lg:text-center">
            Join Our Community
          </p>
          <div className="social-container flex items-center mt-3 lg:justify-center">
            <a
              href="https://twitter.com/vcgamers_io"
              target="_blank"
              rel="nofollow"
              className="mr-5"
            >
              <img src="/images/svg/twitter-fill.svg" alt="twitter" />
            </a>
            <a
              href="https://www.instagram.com/vcgamers.id/"
              target="_blank"
              rel="nofollow"
              className="mr-5"
            >
              <img src="/images/svg/instagram-fill.svg" alt="instagram" />
            </a>
            <a
              href="https://www.youtube.com/channel/UC2B68_8tR2lXW8BJxqNXAMA"
              target="_blank"
              rel="nofollow"
              className="mr-5"
            >
              <img src="/images/svg/youtube-fill.svg" alt="youtube" />
            </a>
            <a
              href="https://discord.com/invite/2ZCcTXx5Vr"
              target="_blank"
              rel="nofollow"
            >
              <img src="/images/svg/discord-fill.svg" alt="discord" />
            </a>
          </div>
          <p className="link-title font-bold mt-7 lg:text-center">
            Supported by
          </p>
          <div className="supported-container flex items-center mt-3 lg:justify-center">
            <a
              href="https://www.bappebti.go.id/"
              target="_blank"
              rel="nofollow"
              className="mr-2"
            >
              <img src="/images/bappebti.png" alt="bappepti" />
            </a>
            <a
              href="https://www.kominfo.go.id/"
              target="_blank"
              rel="nofollow"
              className="mr-2"
            >
              <img src="/images/kominfo.png" alt="kominfo" />
            </a>
            <a
              href="https://www.certik.com/projects/vcgamers"
              target="_blank"
              rel="nofollow"
            >
              <img src="/images/certik.png" alt="certik" />
            </a>
          </div>
          <p className="link-title font-bold mt-7 lg:text-center">
            Partner Pembayaran
          </p>
          <div
            className="payment-container flex items-center flex-wrap mt-3 lg:justify-center lg:mx-auto"
            style={{ maxWidth: 284 }}
          >
            <a
              href="https://alfamart.co.id/"
              rel="nofollow"
              target="_blank"
              className="mr-2"
            >
              <img src="/images/payment/alfamart.png" alt="alfamart" />
            </a>
            <a
              href="https://alfamidiku.com/"
              rel="nofollow"
              target="_blank"
              className="mr-2"
            >
              <img src="/images/payment/alfamidi.png" alt="alfamidi" />
            </a>
            <a
              href="https://www.bni.co.id/id-id/"
              rel="nofollow"
              target="_blank"
              className="mr-2"
            >
              <img src="/images/payment/bni.png" alt="bni" />
            </a>
            <a
              href="https://bankmandiri.co.id/"
              rel="nofollow"
              target="_blank"
              className="mr-2 mt-2"
            >
              <img src="/images/payment/mandiri.png" alt="mandiri" />
            </a>
            <a
              href="https://www.bca.co.id/id/individu"
              rel="nofollow"
              target="_blank"
              className="mr-2 mt-2"
            >
              <img src="/images/payment/bca.png" alt="bca" />
            </a>
            <a
              href="https://gopay.co.id/"
              rel="nofollow"
              target="_blank"
              className="mr-2 mt-2"
            >
              <img src="/images/payment/gopay.png" alt="gopay" />
            </a>
          </div>
        </div>
        <div className="right w-1/3 lg:w-full lg:mt-5">
          <div className="img-wrap">
            <img src="/images/vicimon-piala.png" alt="trophy" />
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
