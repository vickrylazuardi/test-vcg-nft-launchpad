import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalSendOTP } from "../../redux/modalReducer";
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

const modalSendOTP = {
  loading: false,
  isOpen: false,
  title: {
    en: "OTP Verification",
  },
};

const number = "0877218391374";

export default function DialogSendOTP(props) {
  const modal = useSelector((state) => state.modal.modalSendOTP);
  const dispatch = useDispatch();

  const [isSend, setIsSend] = useState(false);
  const [valueOTP, setValueOTP] = useState({
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  });

  function handleChange(key, event) {
    valueOTP[key] = event.target.value;
    setValueOTP({ ...valueOTP });
  }

  const inputfocus = (elmnt) => {
    if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
      const next = elmnt.target.tabIndex - 2;
      if (next > -1) {
        elmnt.target.form.elements[next].focus();
      }
    } else {
      const next = elmnt.target.tabIndex;
      if (next < Object.keys(valueOTP).length) {
        elmnt.target.form.elements[next].focus();
      }
    }
  };

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
                onClick={() => dispatch(toggleModalSendOTP(modalSendOTP))}
                alt=""
              />
            </div>
          </div>
          <div className="p-4">
            <div className="text-center">
              <img
                src="/images/img-phone-lock.png"
                className="m-auto mb-4"
                alt=""
              />
              {isSend ? (
                <>
                  <p className="text-sm font-semibold mb-4">
                    Please Enter 6-digits OTP Code that sent to <br /> {number}
                  </p>
                  <form className="flex justify-center gap-3">
                    {Object.keys(valueOTP).map((item, idx) => {
                      return (
                        <input
                          key={idx}
                          name={`otp${idx + 1}`}
                          type="text"
                          autoComplete="off"
                          className="input-border-bottom text-center font-bold"
                          style={{ maxWidth: "40px" }}
                          value={valueOTP[`otp${idx + 1}`]}
                          onChange={(e) => handleChange(`otp${idx + 1}`, e)}
                          tabIndex={`${idx + 1}`}
                          maxLength="1"
                          onKeyUp={(e) => inputfocus(e)}
                        />
                      );
                    })}
                  </form>
                </>
              ) : (
                <>
                  <p className="text-sm font-semibold mb-4">
                    You need to verification Phone number first before continue
                    launchpad payment. Confirm your phone Number:
                  </p>
                  <input
                    className="input-border-bottom text-center font-bold"
                    type="text"
                    disabled
                    defaultValue={number}
                    style={{ width: "230px" }}
                  />
                </>
              )}
            </div>
            <div className="mt-4">
              {isSend ? (
                <>
                  <button
                    className="btn btn-light-green w-full"
                    style={{ padding: "5px 10px" }}
                    disabled={Object.keys(valueOTP).find(
                      (item) => valueOTP[item] == ""
                    )}
                    onClick={() => props.onVerification()}
                  >
                    Verification
                  </button>
                  <p className="text-xs mt-4 cursor-pointer text-center">Resend code in 59s</p>
                </>
              ) : (
                <button
                  className="btn btn-light-green w-full"
                  style={{ padding: "5px 10px" }}
                  onClick={() => setIsSend(true)}
                >
                  Send Code
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
