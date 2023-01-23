import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalConfirmPrivacyPolicy } from "../../redux/modalReducer";
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

const modalconfirmPrivacyPolicy = {
  loading: false,
  isOpen: false,
  title: {
    en: "Privacy Policy",
  },
  text: {
    en: "",
  },
};

export default function DialogConfirmPrivacyPolicy(props) {
  const modal = useSelector((state) => state.modal.modalconfirmPrivacyPolicy);
  const dispatch = useDispatch();

  const [isPermision, setIsPermision] = useState(false);

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
        style={{ padding: "0", maxWidth: "400px" }}
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
                    toggleModalConfirmPrivacyPolicy(modalconfirmPrivacyPolicy)
                  )
                }
                alt=""
              />
            </div>
          </div>
          <div className="p-4">
            <div className="overflow-scroll" style={{ maxHeight: "400px" }}>
              {/* <p className="text-sm font-semibold">{modal.text.en}</p> */}
              <div
                className="text-xs font-semibold"
                dangerouslySetInnerHTML={{
                  __html: modal.text.en,
                }}
              ></div>
            </div>
            <div className="flex items-center justify-between pt-4">
              <p className="text-sm font-bold">
                I agree with VCGamers Launchpad’s Privacy Policy
              </p>
              <input
                type="checkbox"
                style={{ width: "15px", height: "15px" }}
                value={isPermision}
                onChange={(e) => setIsPermision(e.target.checked)}
              ></input>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <button
                className="btn btn-outline-white"
                style={{ padding: "10px" }}
                onClick={() =>
                  dispatch(
                    toggleModalConfirmPrivacyPolicy(modalconfirmPrivacyPolicy)
                  )
                }
              >
                Cancel
              </button>
              <button
                className="btn btn-light-green"
                style={{ padding: "10px" }}
                disabled={!isPermision}
                onClick={() => props.onConfirm()}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
