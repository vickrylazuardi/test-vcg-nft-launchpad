import Link from "next/link";
import React from "react";
import { isDesktop, isMobile } from "react-device-detect";

export default function CardItem({ img, title, desc, slug, socmed }) {
  return (
    <>
      {isDesktop && (
        <div id="card-item-container" className="lg:mr-3">
          <div className="img-wrap">
            <img 
              src={img} 
              alt={title} 
              className="object-cover w-56 h-56 rounded-t-xl"
            />
          </div>
          <div className="content-container p-4 lg:p-2">
            <h3 className="font-bold lg:text-xs">{title}</h3>
            <p
              className="text-sm font-semibold mt-1 mb-4 lg:text-xs lg:mb-1"
              style={{ color: "#9AA4BF" }}
            >
              {desc.length > 30 ? `${desc.substring(0, 29)}...` : desc}
            </p>
            <div className="action-container flex justify-between items-center lg:hidden">
              <div className="social flex items-center">
                {
                  socmed?.website ?
                  <a href={socmed.website} rel="nofollow" target="_blank">
                    <img src="/images/svg/icon-gray-web.svg" alt="web vcgamers" />
                  </a> : ""
                }
                {
                  socmed?.discord ?
                  <a href={socmed.discord} rel="nofollow" target="_blank">
                    <img
                      src="/images/svg/icon-gray-discord.svg"
                      alt="discord vcgamers"
                      className="mx-3"
                    />
                  </a> : ""
                }
                {
                  socmed?.telegram ?
                  <a href={socmed.telegram} rel="nofollow" target="_blank">
                    <img src="/images/svg/icon-gray-tele.svg" alt="tele vcgamers" />
                  </a> : ""
                }
              </div>
              <Link href={`/detail/${slug}`}>
                <button
                  className="btn btn-bordered"
                  style={{ padding: "8px 10px" }}
                >
                  View Detail
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {isMobile && (
        <Link
          href={`/detail/${slug}`}
          id="card-item-container"
          className="lg:mr-3"
        >
          <a>
            <div className="img-wrap">
              <img src={img} alt={title} />
            </div>
            <div className="content-container p-4 lg:p-2">
              <h3 className="font-bold lg:text-xs">{title}</h3>
              <p
                className="text-sm font-semibold mt-1 mb-4 lg:text-xs lg:mb-1"
                style={{ color: "#9AA4BF" }}
              >
                {desc.length > 33 ? `${desc.substring(0, 31)}...` : desc}
              </p>
            </div>
          </a>
        </Link>
      )}
    </>
  );
}