import React, { useState } from "react";
import { isMobile } from "react-device-detect";

export default function Products() {
  const [products, setProducts] = useState([
    {
      src: "/images/prod.png",
      title: "Market",
    },
    {
      src: "/images/prod.png",
      title: "Market",
    },
    {
      src: "/images/prod.png",
      title: "Market",
    },
    {
      src: "/images/prod.png",
      title: "Market",
    },
    {
      src: "/images/prod.png",
      title: "Market",
    },
  ]);
  return (
    <>
      <div id="launchpad-products" className="container mt-16 lg:mt-8 lg:py-4">
        <div className="mx-auto">
          <div className="wrapper flex items-center justify-between mb-5">
            <h2 className="font-bold text-2xl lg:mb-0 lg:text-sm">
              VCGamers Products
            </h2>
            <p className="font-bold cursor-pointer lg:text-xs">See All</p>
          </div>
          <div className="item-products-container">
            <div className="banner-wrap w-full">
              <picture>
                <source
                  media="(max-width: 980px)"
                  srcset="/images/banner-mob.png"
                />
                <source
                  media="(min-width: 981px)"
                  srcset="/images/banner-products.png"
                />
                <img
                  src="/images/banner-products.png"
                  alt="VCG"
                  className="w-full"
                />
              </picture>
            </div>
            <div className="item-products-wrap flex justify-between lg:overflow-x-auto">
              {products.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className={
                      idx + 1 != products.length
                        ? "product basis-1/5 mr-5"
                        : "product basis-1/5"
                    }
                  >
                    <div className="w-full relative img-wrap">
                      <img
                        src={item.src}
                        alt="banner vcgamers"
                        className="w-full"
                      />
                    </div>
                    <p className="text-center p-5 w-full lg:text-xs lg:font-semibold">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {isMobile && <div className="bg-black h-24"></div>}
    </>
  );
}
