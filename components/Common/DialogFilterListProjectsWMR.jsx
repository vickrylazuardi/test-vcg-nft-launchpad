import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalFilterListProjectsWMR } from "../../redux/modalReducer";
const { motion } = require("framer-motion");

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};
const animateModal = {
  hidden: {
    y: "100vh",
    opacity: 0,
  },
  visible: {
    y: "40px",
    opacity: 1,
    transition: { delay: 0.5 },
  },
};

const modalFilterListProjectsWMR = {
  loading: false,
  isOpen: false,
  title: {
    en: "Filter",
  },
};

export default function DialogFilterListProjectsWMR(props) {
  console.log(">>", props);
  const modal = useSelector((state) => state.modal.modalFilterListProjectsWMR);
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
        className="dialog-dark-content content-btm-on-mobile rounded-xl"
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
                onClick={() =>
                  dispatch(
                    toggleModalFilterListProjectsWMR(modalFilterListProjectsWMR)
                  )
                }
                alt=""
              />
            </div>
          </div>
          <div className="p-4">
            <div className="mb-6">
              <p className="text-xs font-semibold mb-2">Status</p>
              <div className="">
                {props.listStatus.map((item, idx) => {
                  return (
                    <button
                      key={idx}
                      className={`select-tab-orange default-grey mr-2 text-xs ${
                        props.statusSelected == item.value ? "active" : ""
                      }`}
                      style={{ minWidth: "45px" }}
                      onClick={() => {
                        props.setStatusSelected(item.value);
                        props.handleSelectStatus(item.value);
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="mb-6">
              <p className="text-xs font-semibold mb-2">KYC</p>
              <div className="flex justify-between items-center">
                <p className="text-xs font-semibold text-color-grey">
                  {props.kycSelected ? "Show KYC Only" : "Show All"}
                </p>
                <label className="switch-input">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      props.setKycSelected(e.target.checked);
                      props.handleChangekyc(e.target.checked);
                    }}
                    checked={props.kycSelected}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="btn btn-outline-white text-xs w-1/4"
                onClick={() => props.handleReset()}
              >
                Reset
              </button>
              <button className="btn btn-purple-primary text-xs w-3/4">
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
