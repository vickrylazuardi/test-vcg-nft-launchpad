import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalSelectPayment } from "../../redux/modalReducer";
const { motion } = require("framer-motion");

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const animateModal = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "40px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const modalSelectPayment = {
  loading: false,
  isOpen: false,
  title: {
    en: "Choose Payment Method",
  },
};

export default function DialogSelectPayment(props) {
  const modal = useSelector((state) => state.modal.modalSelectPayment);
  const dispatch = useDispatch();

  return (
    <motion.div
      className="dialog-dark"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="dialog-dark-content rounded-xl"
        style={{ padding: "0", maxWidth: "500px" }}
        variants={animateModal}
      >
        <div className="dialog-dark-body">
          <div className="p-4">
            <div className="flex items-center">
              <img
                width="16"
                height="16"
                className="cursor-pointer"
                src="/images/svg/icon-cross.svg"
                onClick={() =>
                  dispatch(toggleModalSelectPayment(modalSelectPayment))
                }
                alt=""
              />
              <p className="font-bold mx-3">{modal.title.en}</p>
              <p className="font-bold text-sm text-color-grey ml-auto">
                Admin Fee
              </p>
            </div>
          </div>
          <div className="p-4">
            <div className="warp-list-payment">
              <div className="list-payment">
                <p className="type-payment">Crypto</p>
                <div
                  className="payment-items flex items-center cursor-pointer"
                  onClick={() => {
                    let payment = {
                      payment_method_name: "VCG",
                      payment_method_image: "/images/coin-vcg.png",
                    };
                    props.handleSelectPayment(payment, "crypto");
                  }}
                >
                  <img
                    className="img-payment"
                    src="/images/coin-vcg.png"
                    alt=""
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/images/Broken-Image.png";
                    }}
                  />
                  <div className="mx-3">
                    <p className="title-payment mb-1">VCG</p>
                    {/* <p className="subtitle-payment">0.4120944812</p> */}
                  </div>
                  <div className="ml-auto">
                    <FaChevronRight className="ml-auto text-color-grey inline" />
                  </div>
                </div>
              </div>
              {props.listPayment
                ? props.listPayment.map((item, idx) => {
                    return (
                      <div className="list-payment" key={idx}>
                        <p className="type-payment">
                          {item.payment_method_category_name}
                        </p>
                        {item.payment_method_detail.map((payment, index) => {
                          if (payment.payment_method_status == "Aktif") {
                            return (
                              <div
                                className="payment-items flex items-center cursor-pointer"
                                key={index}
                                onClick={() => {
                                  console.log("SELECT", payment);
                                  props.handleSelectPayment(payment, "fiat");
                                }}
                              >
                                <img
                                  className="img-payment"
                                  src={
                                    payment.payment_method_image
                                      ? payment.payment_method_image
                                      : "/images/Broken-Image.png"
                                  }
                                  onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src =
                                      "/images/Broken-Image.png";
                                  }}
                                  alt=""
                                />
                                <div className="mx-3">
                                  <p className="title-payment mb-1">
                                    {payment.payment_method_name}
                                  </p>
                                  {payment.cashback ? (
                                    <p className="subtitle-payment text-promo">
                                      Potential Cashback Rp{payment.cashback}
                                    </p>
                                  ) : (
                                    ""
                                  )}
                                </div>
                                <div className="ml-auto">
                                  {payment.payment_fee_text != "0" ? (
                                    <p className="admin-fee inline mx-2">
                                      + Rp{payment.payment_fee_text}
                                    </p>
                                  ) : (
                                    <p className="admin-fee free inline mx-2">
                                      Free
                                    </p>
                                  )}
                                  <FaChevronRight className="text-color-grey inline" />
                                </div>
                              </div>
                            );
                          } else {
                            return "";
                          }
                        })}
                      </div>
                    );
                  })
                : ""}
              {/* <div className="list-payment">
                <p className="type-payment">Instant Payment</p>
                <div className="payment-items flex items-center">
                  <img
                    className="img-payment"
                    src="/images/Broken-Image.png"
                    alt=""
                  />
                  <div className="mx-3">
                    <p className="title-payment mb-1">
                      VC Coin:{" "}
                      <strong className="text-color-light-green">
                        Rp. 1000
                      </strong>
                    </p>
                    <p className="subtitle-payment text-promo">
                      Get cashback 10.000 VC Poin
                    </p>
                  </div>
                  <div className="ml-auto">
                    <p className="admin-fee free inline mx-2">Free</p>
                    <FaChevronRight className="ml-auto text-color-grey inline" />
                  </div>
                </div>
              </div>
              <div className="list-payment">
                <p className="type-payment">Virtual Account</p>
                <div className="payment-items flex items-center">
                  <img
                    className="img-payment"
                    src="/images/Broken-Image.png"
                    alt=""
                  />
                  <div className="mx-3">
                    <p className="title-payment mb-1">
                      Mandiri Virtual Account
                    </p>
                  </div>
                  <div className="ml-auto">
                    <p className="admin-fee inline mx-2">+ Rp4.400</p>
                    <FaChevronRight className="ml-auto text-color-grey inline" />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
          {/* <p className="text-xl font-bold mb-10">
            Hello, Welcome to NFT Marketplace. Please complete your Profile.
          </p> */}
        </div>
      </motion.div>
    </motion.div>
  );
}
