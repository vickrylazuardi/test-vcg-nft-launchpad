import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaRegClone } from "react-icons/fa";
import NavbarMobileWithBack from "../../../components/NavbarMobileWithBack";
import { API } from "../../../utils/globalConstant";
import { HiExternalLink } from "react-icons/hi";
import Link from "next/link";
import Cookies from "universal-cookie";

export default function Transaction(props) {
  const router = useRouter();
  const cookies = new Cookies();

  const [isLoading, setIsLoading] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [historyData, setHistoryData] = useState("");
  const [dataTRX, setDataTRX] = useState(null);

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

  const gethistoryTransaction = (id) => {
    setIsLoading(true);
    try {
      axios
        .post(API.launchpad.local + API.launchpad.history.filter, { _id: id })
        .then((res) => {
          if (res.status === 204) {
            return;
          }
          console.log(">>", res.data.data);
          setIsLoading(false);
          setHistoryData(res.data.data.items[0]);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.query) {
      if (router.query.paymentType == "crypto") {
        gethistoryTransaction(router.query.slug);
      }
      if (router.query.paymentType == "fiat") {
        console.log(">>???", cookies.get("detailTRX"));
        setDataTRX(cookies.get("detailTRX")[0]);
      }
      setPaymentType(router.query.paymentType);
    }
  }, [router.query]);

  return (
    <>
      <NavbarMobileWithBack title="Payment" />

      {!isLoading ? (
        <div className="global-container ">
          <div className="container mx-auto pt-0 md:pt-16">
            <div className="flex justify-center">
              <div>
                <div className="card-trx">
                  <div className="trx-top text-center">
                    {router.query.isPaymentSuccess ? (
                      <div>
                        <img
                          className="m-auto"
                          src="/images/vicimon-trx-success.png"
                          alt=""
                        />
                        <p className="my-2 font-bold text-color-light-green">
                          Payment Success!
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="font-bold mb-4">
                          Come on, complete the payment!
                        </p>
                        <p className="font-semibold text-color-grey">
                          {dataTRX?.va_number}
                        </p>
                        <a
                          className="text-color-light-green text-sm font-bold"
                          href="#"
                        >
                          <FaRegClone className="inline mr-2" />
                          Copy
                        </a>
                        <div className="trx-countdown">
                          <div>
                            <p>00</p>
                            <p>Day</p>
                          </div>
                          <div>
                            <p>00</p>
                            <p>Hour</p>
                          </div>
                          <div>
                            <p>00</p>
                            <p>Minute</p>
                          </div>
                          <div>
                            <p>00</p>
                            <p>second</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <img
                    className="w-full"
                    src="/images/trx-barrier.png"
                    alt=""
                  />
                  <div className="trx-center">
                    <p className="font-bold mb-4">Payment Detail</p>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm font-semibold text-color-grey">
                        Payment Method
                      </p>
                      {paymentType ? (
                        paymentType == "crypto" ? (
                          <p className="text-sm font-semibold">
                            VCG
                            <img
                              style={{ width: "20px", aspectRatio: "1/1" }}
                              className="inline ml-2"
                              src="/images/coin-vcg.png"
                              alt=""
                            />
                          </p>
                        ) : paymentType == "fiat" ? (
                          <p className="text-sm font-semibold">
                            {dataTRX?.bank_name}{" "}
                            <img
                              style={{ width: "35px", aspectRatio: "2/1" }}
                              className="inline ml-2"
                              src={dataTRX?.bank_image}
                              alt=""
                            />
                          </p>
                        ) : (
                          "-"
                        )
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm font-semibold text-color-grey">
                        Transaction Hash
                      </p>
                      {paymentType ? (
                        paymentType == "crypto" ? (
                          <a
                            href={`https://testnet.bscscan.com/tx/${historyData.txHash}`}
                            rel="nofollow"
                            target="_blank"
                          >
                            <p className="text-sm font-semibold">
                              {historyData.txHash?.slice(0, 7) +
                                "..." +
                                historyData.txHash?.slice(-7)}
                              <HiExternalLink className="inline ml-1 text-color-light-green" />
                            </p>
                          </a>
                        ) : paymentType == "fiat" ? (
                          <p className="text-sm font-semibold">
                            {dataTRX?.transaction_code}
                          </p>
                        ) : (
                          "-"
                        )
                      ) : (
                        "-"
                      )}
                    </div>

                    {paymentType ? (
                      paymentType == "crypto" ? (
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-sm font-semibold text-color-grey">
                            Transaction Date
                          </p>
                          <p className="text-sm font-semibold">
                            {new Date(historyData.date).toLocaleString()}
                          </p>
                        </div>
                      ) : paymentType == "fiat" ? (
                        <div className="flex justify-between items-center mb-3">
                          <p className="text-sm font-semibold text-color-grey">
                            Transaction Expire
                          </p>
                          <p className="text-sm font-semibold">
                            {new Date(dataTRX?.expire_time).toLocaleString()}
                          </p>
                        </div>
                      ) : (
                        "-"
                      )
                    ) : (
                      ""
                    )}

                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm font-semibold text-color-grey">
                        Total
                      </p>
                      <p className="text-sm font-semibold text-color-light-green">
                        {paymentType
                          ? paymentType == "crypto"
                            ? `${historyData.price} VCG`
                            : paymentType == "fiat"
                            ? `Rp.${dataTRX.total}`
                            : "-"
                          : "-"}
                      </p>
                    </div>
                  </div>
                  {!router.query.isPaymentSuccess && (
                    <>
                      <img
                        className="w-full"
                        src="/images/trx-barrier.png"
                        alt=""
                      />
                      <div className="trx-bottom">
                        <p className="text-sm font-semibold text-color-grey">
                          How to Make Payments
                        </p>
                        <div className="mt-5">
                          {dataTRX?.payment_instruction?.map((item, idx) => {
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
                                      __html:
                                        item.payment_instruction_description,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div
                  style={{ width: "400px" }}
                  className="my-5 grid grid-cols-2 gap-3"
                >
                  <Link href={"/profile/boxes"}>
                    <a>
                      <button
                        className="btn btn-purple-primary w-full text-sm"
                        style={{ padding: "10px" }}
                      >
                        View Box
                      </button>
                    </a>
                  </Link>
                  <Link href={"/profile/history"}>
                    <a>
                      <button
                        className="btn btn-light-green w-full text-sm"
                        style={{ padding: "10px" }}
                      >
                        View Transaction
                      </button>
                    </a>
                  </Link>
                </div>
                <div className="text-center">
                  <Link
                    href={`/detail/${
                      paymentType == "crypto"
                        ? historyData.projectDetail?._id
                        : router.query.slug
                    }`}
                  >
                    <a className="text-sm font-semibold text-color-grey">
                      Back To Project Detail
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="global-container">
          <div className="container mx-auto pt-0 md:pt-16">
            <img
              width={200}
              height={200}
              src="/loaders/loaders.gif"
              className="m-auto"
              alt=""
            />
          </div>
        </div>
      )}
    </>
  );
}
