import Header from "../components/Home/Header";
import Market from "../components/Home/Market";
import Products from "../components/Home/Products";
import Image from "next/image";
import { isDesktop, isMobile } from "react-device-detect";
import Tab from "../components/Home/Tab";

export default function Home() {
  const bgPage = {
    backgroundImage: `url('/images/bg.png')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div id="home" className="global-container" style={bgPage}>
      <Header />
      <Tab />
      <Market />
      <div id="home-htb" className="container mt-14 lg:mt-6 lg:px-0">
        <h2 className="font-bold text-2xl lg:text-sm mb-4 lg:px-5">
          Marketplace
        </h2>
        <div className="relative w-full" style={{ minHeight: 150 }}>
          {isDesktop && (
            <img
              src="/images/banner-htb.png"
              alt=""
              className="rounded-xl h-auto w-full"
            />
          )}
          {isMobile && (
            <Image
              src="/images/banner-htb-mob.png"
              alt="banner how to buy"
              layout="fill"
              objectFit="cover"
              loading="lazy"
            />
          )}
        </div>
      </div>
      <Products />
    </div>
  );
}
