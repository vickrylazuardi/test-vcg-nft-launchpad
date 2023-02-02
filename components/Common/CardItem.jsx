import moment from "moment";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { isDesktop, isMobile } from "react-device-detect";
import { BiMask } from "react-icons/bi";
import { HiChevronDoubleRight } from "react-icons/hi";
import { MdMonitor, MdSmartphone, MdWebAsset } from "react-icons/md";

export default function CardItem({
  img,
  title,
  desc,
  slug,
  socmed,
  isCardDark,
  startedAt,
  finishedAt,
  totalFundRaised,
}) {
  const [emblemKYC, setEmblemKYC] = useState("/images/kyc-check.png");
  const [isKYC, setIsKYC] = useState(true);

  return (
    <>
      {/* {isDesktop && ( */}
      <div
        id="card-item-container"
        className={isCardDark ? "card-project card-bg-dark" : "card-project"}
      >
        <Link href={`/detail/${slug}`}>
          <div className="img-wrap cursor-pointer relative">
            <div className="label-status soon">
              <div className="label-status-info">
                <p>Status</p>
              </div>
              <div className="label-status-count">
                <p>Countdown</p>
              </div>
            </div>
            <img
              src={img}
              alt={title}
              className="object-cover rounded-t-xl w-full"
              style={{
                aspectRatio: "1/1",
                objectFit: "cover",
              }}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = "/images/Broken-Image.png";
              }}
            />
          </div>
        </Link>
        <div className="content-container p-4 lg:p-2">
          <h3 className="font-bold lg:text-xs max-1-line">
            {isKYC && (
              <img
                className="mr-1"
                style={{ display: "inline" }}
                width={18}
                height={20}
                src={emblemKYC}
                alt=""
                onMouseEnter={() =>
                  setEmblemKYC("/images/kyc-check-orange.png")
                }
                onMouseLeave={() => setEmblemKYC("/images/kyc-check.png")}
              />
            )}
            {title}
          </h3>
          <p className="text-xs font-semibold text-color-grey max-1-line mt-2">
            <span className="mr-1">Action,</span>
            <span className="mr-1">Shooter</span>
          </p>
          <div className="text-lg mt-1">
            <MdMonitor className="inline text-color-grey mr-1" />
            <MdSmartphone className="inline text-color-grey mr-1" />
            <MdWebAsset className="inline text-color-grey mr-1" />
            <BiMask className="inline text-color-grey mr-1" />
          </div>
          <p className="mt-2 text-xs font-semibold text-color-grey">
            {moment(startedAt).local().format("DD MMM YYYY")}{" "}
            <HiChevronDoubleRight className="inline mx-1" />
            {moment(finishedAt).local().format("DD MMM YYYY")}
          </p>
          <div className="price-wrap mt-4 mb-2">
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs font-semibold text-color-grey">Sold item</p>
              <p className="text-xs font-semibold text-color-grey">50/70</p>
            </div>
            <div className="price-bar">
              <div
                className={
                  (10 / 50) * 100 == 100
                    ? "price-inner-bar full"
                    : "price-inner-bar"
                }
                style={{
                  width: `${(10 / 50) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
        <div className="footer-card">
          <div className="grid grid-cols-2 md:grid-cols-1 md:gap-y-2">
            <div>
              <p className="text-sm font-bold text-color-grey mb-1">
                Funds Raised
              </p>
              <p className="text-sm font-bold">${totalFundRaised}</p>
            </div>
            <div>
              <p className="text-sm font-bold text-color-grey mb-1">
                Contributors
              </p>
              <p className="text-sm font-bold">131</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
