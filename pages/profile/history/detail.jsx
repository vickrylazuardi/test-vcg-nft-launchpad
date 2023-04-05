import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../utils/globalConstant";
import Link from "next/link";
import DashboardSideMenu from "../../../components/Dashboard/DashboardSideMenu";
import { FaChevronDown, FaChevronLeft, FaChevronUp } from "react-icons/fa";

export default function DetailHistory() {
  // const borderBottom = "border-b border-gray-200";
  const [detailItem, setDetailItem] = useState({});
  const router = useRouter();
  const data = router.query;

  const getDetail = (id) => {
    try {
      axios
        .get(API.launchpad.domain + API.launchpad.history.detail, {
          params: { id },
        })
        .then((res) => {
          console.log("??", res);
          if (res.status == 200) setDetailItem(res.data.data);
          else setDetailItem({});
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query.id) {
      getDetail(router.query.id);
    }
  }, [router.query.id]);

  function showAccordion(idx) {
    let element = document.getElementsByClassName("accordion-wrap");

    Object.keys(element).forEach((item, i) => {
      if (i == idx) return;
      element[i].classList.remove("show");
    });

    if (element[idx].classList.contains("show")) {
      element[idx].classList.remove("show");
    } else {
      element[idx].classList.add("show");
    }
  }

  const DetailContent = () => {
    return (
      <>
        <div
          className="mt-3 p-4"
          style={{ background: "#1D2333", borderRadius: 10 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
            <div>
              <div className="mb-4">
                <p className="text-xs font-bold text-color-grey">
                  Detail Transaction
                </p>
                <p className="text-sm font-bold">
                  {detailItem?.paymentDetail
                    ? detailItem?.paymentDetail?.transaction_code
                    : "-"}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-color-grey">
                  Transaction Date
                </p>
                <p className="text-sm font-bold">
                  {new Date(detailItem.date).toLocaleString()}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-color-grey">
                  Total Payment
                </p>
                <p className="text-sm font-bold">
                  {detailItem?.paymentType == "fiat"
                    ? `Rp.${detailItem?.paymentDetail?.total}`
                    : `${detailItem?.price} VCG`}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-color-grey">
                  Transaction Hash
                </p>
                <p className="text-sm font-bold break-all">
                  {detailItem?.txHash}{" "}
                  {detailItem?.txHash != "-" ? (
                    <>
                      <br />
                      <a
                        href={`https://testnet.bscscan.com/tx/${detailItem?.txHash}`}
                        rel="nofollow"
                        target="_blank"
                        style={{ color: "#E28058" }}
                      >
                        View on BSCan
                      </a>
                    </>
                  ) : (
                    ""
                  )}
                </p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <p className="text-xs font-bold text-color-grey">
                  Payment Method
                </p>
                {detailItem?.paymentType == "fiat" ? (
                  <div className="flex mt-1">
                    <div>
                      <img
                        style={{
                          width: 25,
                          height: 25,
                          objectFit: "contain",
                        }}
                        className="mr-2"
                        src={detailItem?.paymentDetail?.bank_image}
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold mt-1">
                        {detailItem?.paymentDetail?.bank_name}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex mt-1">
                    <div>
                      <img
                        style={{
                          width: 20,
                          height: 20,
                          objectFit: "contain",
                        }}
                        className="mr-2 m-auto"
                        src="/images/coin-vcg.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-xs font-semibold mt-0.5">VCG</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-color-grey">Admin Fee</p>
                <p className="text-sm font-bold">
                  {detailItem?.paymentType == "fiat"
                    ? `Rp.${
                        detailItem?.paymentDetail?.total - detailItem?.price
                      }`
                    : "-"}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-color-grey">
                  Payment Code/Virtual Account
                </p>
                <p className="text-sm font-bold">
                  {detailItem?.paymentType == "fiat"
                    ? detailItem?.paymentDetail?.va_number
                    : "-"}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-xs font-bold text-color-grey">Status</p>
                {detailItem?.action == 0 ? (
                  <>
                    {detailItem?.paymentStatus == "paid" ? (
                      <button
                        className="text-xs px-2 py-0.5 rounded-md mr-2"
                        style={{ background: "#86F1DE", color: "#034E40" }}
                        disabled
                      >
                        Purchesed
                      </button>
                    ) : detailItem?.paymentStatus == "unpaid" ? (
                      <button
                        className="text-xs px-2 py-0.5 rounded-md mr-2"
                        style={{ background: "#B5C6FF", color: "#041956" }}
                        disabled
                      >
                        {detailItem?.paymentType == "fiat"
                          ? "Waiting Payment"
                          : "Unpaid"}
                      </button>
                    ) : (
                      <button
                        className="text-xs px-2 py-0.5 rounded-md mr-2"
                        style={{ background: "#86F1DE", color: "#034E40" }}
                        disabled
                      >
                        Purchesed
                      </button>
                    )}
                  </>
                ) : detailItem?.action == 1 ? (
                  <button
                    className="text-xs px-2 py-0.5 rounded-md"
                    style={{ background: "#BFE9F6", color: "#024357" }}
                    disabled
                  >
                    Claim
                  </button>
                ) : (
                  <button
                    className="text-xs px-2 py-0.5 rounded-md"
                    style={{ background: "#F07D59", color: "#4F0B0F" }}
                    disabled
                  >
                    Refund
                  </button>
                )}
              </div>
            </div>
          </div>
          <p className="text-sm mt-4">
            <a href="#" className="font-bold" style={{ color: "#E28058" }}>
              Click here
            </a>{" "}
            to contact our customer service
          </p>
        </div>
        <div
          className="mt-3 p-4"
          style={{ background: "#1D2333", borderRadius: 10 }}
        >
          <p className="text-xs font-bold text-color-grey mb-3">Your box</p>
          <div className="flex flex-wrap">
            <div>
              <img
                className="rounded-md mr-3"
                src={
                  detailItem.image
                    ? detailItem.image
                    : "/images/Broken-Image.png"
                }
                alt=""
                style={{
                  width: "50px",
                  height: "50px",
                  aspectRatio: "1/1",
                  objectFit: "contain",
                }}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "/images/Broken-Image.png";
                }}
              />
            </div>
            <div className="pr-5">
              <p className="text-xs font-semibold" style={{ color: "#E28058" }}>
                {detailItem?.name}
              </p>
              <p className="text-xs font-semibold">{detailItem?.projectName}</p>
            </div>
            <div>
              <p className="text-xs">
                {detailItem?.paymentType == "fiat"
                  ? `Rp.${detailItem?.price / detailItem?.amount}`
                  : `${detailItem?.price / detailItem?.amount} VCG`}{" "}
                x {detailItem?.amount}{" "}
                {detailItem?.amount > 1 ? "Boxes" : "Box"}
              </p>
              <p className="text-xs">
                Total:{" "}
                <strong>
                  {detailItem?.paymentType == "fiat"
                    ? `Rp.${detailItem?.paymentDetail?.total}`
                    : `${detailItem?.price} VCG`}
                </strong>
              </p>
            </div>
          </div>
        </div>
        {detailItem?.paymentDetail && (
          <div
            className="mt-3 p-4"
            style={{ background: "#1D2333", borderRadius: 10 }}
          >
            <p className="text-sm font-semibold text-color-grey">
              How to Make Payments
            </p>
            <div className="mt-5">
              {detailItem?.paymentDetail?.payment_instruction?.map(
                (item, idx) => {
                  return (
                    <div key={idx} className="accordion-wrap py-2">
                      <div
                        className="accordion-trigger cursor-pointer"
                        onClick={() => showAccordion(idx)}
                      >
                        <div className="flex justify-between items-center">
                          <p className="text-sm font-semibold text-color-grey">
                            {item.payment_instruction_name}
                          </p>
                          <div>
                            <FaChevronDown className="chevron-down" />
                            <FaChevronUp className="chevron-up" />
                          </div>
                        </div>
                      </div>
                      <div className="accordion-content">
                        <div
                          className="text-xs font-semibold pl-5 pt-3"
                          dangerouslySetInnerHTML={{
                            __html: item.payment_instruction_description,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      {/* FOR WEB */}
      <div id="profile-launchpad" className="block md:hidden">
        <div className="container mx-auto bundle-pl">
          <div className="container-wrapper grid grid-cols-5 gap-4">
            <DashboardSideMenu />
            <div className="mt-5 col-span-4">
              <p className="text-xs font-bold text-color-grey">
                <FaChevronLeft
                  className="inline mr-1"
                  onClick={() => router.back()}
                />
                Back
              </p>
              <p className="font-bold mt-2">Detail Transaction</p>
              <DetailContent />
            </div>
          </div>
        </div>
      </div>

      {/* FOR MOBILE */}
      <div
        id="project-section-launchpad"
        className="global-container hidden md:block"
      >
        <DetailContent />
        {/* <div className="htr-detail-page-mobile px-3 py-3">
          <div className="w-full flex items-center justify-center mb-2">
            <img
              src={detailItem?.image}
              className="rounded-md"
              alt=""
              style={{
                width: "100px",
                height: "100px",
                objectFit: "contain",
                aspectRatio: "1/1",
              }}
            />
          </div>
          <p className="font-bold htr-box-name text-white">
            {detailItem?.name}
          </p>
          <Link href={`/detail/${detailItem?.projectDetail?._id}`}>
            <a>
              <p className="htr-project-name">{detailItem?.projectName}</p>
            </a>
          </Link>
          <div className="w-full">
            <div className="flex py-2 border-b border-gray-600">
              <p className="flex-1 flex justify-start">Amount Box</p>
              <p className="flex-1 flex justify-end text-green-500">
                {detailItem?.amount > 1
                  ? `${detailItem?.amount} Boxes`
                  : "1 Box"}
              </p>
            </div>
            <div className="flex py-2 border-b border-gray-600">
              <p className="flex-1 flex justify-start">Price</p>
              <p className="flex-1 flex justify-end text-yellow-300">
                {Intl.NumberFormat("en-US").format(Number(detailItem?.price))}{" "}
                VCG
              </p>
            </div>
            <div className="flex py-2 border-b border-gray-600">
              <p className="flex-1 flex justify-start">Date</p>
              <p className="flex-1 flex justify-end">
                {new Date(detailItem?.date).toLocaleString()}
              </p>
            </div>
            <div className="flex py-2 border-b border-gray-600">
              <p className="flex-1 flex justify-start">Transaction Hash</p>
              <p className="flex-1 flex justify-end">
                {detailItem?.txHash?.slice(0, 7) +
                  "..." +
                  detailItem?.txHash?.slice(-7)}
              </p>
            </div>
            <div className="flex py-2 border-b border-gray-600">
              <p className="flex-1 flex justify-start">Action</p>
              {detailItem?.action === 0 ? (
                <button disabled className="buy px-3 rounded-md">
                  Buy
                </button>
              ) : detailItem?.action === 1 ? (
                <button disabled className="claim px-3 rounded-md">
                  Claim
                </button>
              ) : (
                <button disabled className="refund px-3 rounded-md">
                  Refund
                </button>
              )}
            </div>
          </div>
          <div className="btn-floating-mobile py-4 px-3">
            <a
              href={`https://testnet.bscscan.com/tx/${detailItem?.txHash}`}
              rel="nofollow"
              target="_blank"
            >
              <button className="btn-orange-light w-full py-1 font-semibold rounded-md text-white">
                More Details
              </button>
            </a>
          </div>
        </div> */}
      </div>
    </>
  );
}
