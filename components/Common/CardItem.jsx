import moment from "moment";
import Link from "next/link";
import React, { useEffect } from "react";
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
  kyc,
}) {
  const [emblemKYC, setEmblemKYC] = useState("/images/kyc-check.png");
  const [isKYC, setIsKYC] = useState(true);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [eventRun, setEventRun] = useState(0);

  const countDown = (ilo_start, ilo_end) => {
    // console.log("COUNT", ilo_start, ilo_end);
    // Set the date we're counting down to
    let countDownDate = new Date(ilo_start).getTime();
    // Update the count down every 1 second d
    let x = setInterval(function () {
      // Get today's date and time
      let now = new Date().getTime();

      // Find the distance between now and the count down date
      let distance = countDownDate - now;
      // TODO:if you have next coundownt, unremark this
      if (distance < 0) {
        countDownDate = new Date(ilo_end).getTime();
        //  countDownDate = new Date('May 11, 2022 12:30:00 UTC').getTime();
        distance = countDownDate - now;
        setEventRun(1);
        if (distance < 0) {
          setEventRun(2);
        }
      }

      // Time calculations for days, hours, minutes and seconds
      let d = Math.floor(distance / (1000 * 60 * 60 * 24));
      let h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let s = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(d);
      setHours(h);
      setMinutes(m);
      setSeconds(s);

      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    }, 1000);
  };

  useEffect(() => {
    // console.log(title, startedAt, finishedAt);
    countDown(
      moment(startedAt).utc().format("MMM DD, YYYY HH:mm:ss UTC"),
      moment(finishedAt).utc().format("MMM DD, YYYY HH:mm:ss UTC")
    ); // untuk remote config
  }, []);

  return (
    <>
      {/* {isDesktop && ( */}
      <div
        id="card-item-container"
        className={isCardDark ? "card-project card-bg-dark" : "card-project"}
      >
        <Link href={`/detail/${slug}`}>
          <div className="img-wrap cursor-pointer relative">
            <div
              className={`label-status ${
                eventRun == 0 ? "soon" : eventRun == 1 ? "ongoing" : "ended"
              }`}
            >
              <div className="label-status-info">
                <p>
                  {eventRun == 0
                    ? "Soon"
                    : eventRun == 1
                    ? "On Going"
                    : "Ended"}
                </p>
              </div>
              <div className="label-status-count">
                <p>{`${days}:${hours}:${minutes}:${seconds}`}</p>
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
            {kyc.status && (
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
            {moment(startedAt).utc().format("DD MMM YYYY")}{" "}
            <HiChevronDoubleRight className="inline mx-1" />
            {moment(finishedAt).utc().format("DD MMM YYYY")}
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
