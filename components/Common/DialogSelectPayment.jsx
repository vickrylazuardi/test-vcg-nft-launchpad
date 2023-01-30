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
                <div className="payment-items flex items-center">
                  <img
                    className="img-payment"
                    src="/images/Broken-Image.png"
                    alt=""
                  />
                  <div className="mx-3">
                    <p className="title-payment mb-1">BUSD</p>
                    <p className="subtitle-payment">1.310.12413532</p>
                  </div>
                  <div className="ml-auto">
                    <FaChevronRight className="text-color-grey" />
                  </div>
                </div>
              </div>
              <div className="list-payment">
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
              </div>
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
