import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalConfirm } from "../../redux/modalReducer";
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

const modalconfirm = {
  loading: false,
  isOpen: false,
  title: {
    en: "Purchase Confirmation",
  },
  text: {
    en: "",
  },
};

export default function DialogConfirm(props) {
  const modal = useSelector((state) => state.modal.modalconfirm);
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
        style={{ padding: "0", maxWidth: "400px", marginTop: "10%" }}
        variants={animateModal}
      >
        <div className="dialog-dark-body">
          <div className="p-4 pb-1">
            <div className="flex items-center">
              <p className="font-bold mr-auto mt-2">{modal.title.en}</p>
              <img
                width="16"
                height="16"
                className="cursor-pointer"
                src="/images/svg/icon-cross.svg"
                onClick={() => dispatch(toggleModalConfirm(modalconfirm))}
                alt=""
              />
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm font-semibold">{modal.text.en}</p>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                className="btn btn-outline-white"
                style={{ padding: "10px" }}
                onClick={() => dispatch(toggleModalConfirm(modalconfirm))}
              >
                Back
              </button>
              <button
                className="btn btn-light-green"
                style={{ padding: "10px" }}
                onClick={() => props.onContinue()}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
