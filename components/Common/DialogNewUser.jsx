import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaGlobeAsia,
  FaInstagram,
  FaTelegram,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
const { motion } = require("framer-motion");
import Cookies from "universal-cookie";
import { toggleModalNewUser } from "../../redux/modalReducer";
import useMetaMask from "../../wallet/hook";
import { FormInputImage } from "./formComponent";
import axios from "axios";
import { API } from "../../utils/globalConstant";

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

const modalNewUser = {
  loading: false,
  isOpen: false,
  title: {
    en: "Information New User",
  },
};

export default function DialogNewUser(props) {
  const { account } = useMetaMask();
  const cookies = new Cookies();
  const dispatch = useDispatch();

  const [dataProfile, setDataProfile] = useState(null);

  const handleChangeDataProfile = (key, value, status) => {
    try {
      const keys = key.split(".");
      switch (keys[0]) {
        case "socialMedia":
          if (value.length) dataProfile.socialMedia[keys[1]] = value;
          else dataProfile.socialMedia[keys[1]] = value;
          break;
        case "email":
          if (value.length) {
            dataProfile[key] = value;
            dataProfile.validEmail = status;
          } else {
            delete dataProfile[key];
            delete dataProfile.validEmail;
          }
          break;
        default:
          if (value) dataProfile[key] = value;
          else delete dataProfile[key];
          break;
      }

      setDataProfile({ ...dataProfile });
    } catch (error) {
      console.log(error);
    }
  };

  function handleInputImage(file) {
    handleChangeDataProfile("image", file);
  }

  function handleSaveProfile() {
    let pass = true;

    resetValidationText();

    if (!dataProfile.name) {
      document.getElementById("name-warning").classList.remove("hidden");
      launch_toast(true, "Please fill the Name!");
      document.getElementById("input-name").focus();
      pass = false;
    }
    if (!dataProfile.description) {
      document.getElementById("desc-warning").classList.remove("hidden");
      launch_toast(true, "Please fill the Description!");
      document.getElementById("input-desc").focus();
      pass = false;
    }
    if (!dataProfile.email) {
      document.getElementById("email-warning").classList.remove("hidden");
      launch_toast(true, "Please fill the Email!");
      document.getElementById("input-email").focus();
      pass = false;
    }

    if (dataProfile.validEmail == false) {
      launch_toast(true, "Please fill a valid Email!");
      document.getElementById("input-email").focus();
      pass = false;
    }

    if (
      !dataProfile.socialMedia.website &&
      !dataProfile.socialMedia.instagram &&
      !dataProfile.socialMedia.telegram &&
      !dataProfile.socialMedia.facebook
    ) {
      document.getElementById("social-warning").classList.remove("hidden");
      launch_toast(true, "Please fill at least 1 Social Media Account!");
      document.getElementById("input-url").focus();
      pass = false;
    }

    if (pass) {
      resetValidationText();

      const body = {
        wallet_id: account,
        key_id: "",
        name: dataProfile.name,
        email: dataProfile.email,
        phone: dataProfile.phone || "",
        youtube: dataProfile.youtube || "",
        social_media: dataProfile.socialMedia,
      };

      axios.post(API.ransverse + API.vcmarket.update, body).then((res) => {
        if (res.data.status) {
          launch_toast(false, "Update Profile successfull!");
          setCookie(account + "-profile", dataProfile, 1);
          dispatch(toggleModalNewUser(modalNewUser));
        }
      });
      axios.post(API.local + API.artist.add, {
        name: dataProfile.name,
        bio: dataProfile.description,
        email: dataProfile.email,
        walletAddress: dataProfile.wallet_id ? dataProfile.wallet_id : account,
        phoneNumber: dataProfile.phone || null,
        youtube: dataProfile.youtube || "",
        socialMedia: dataProfile.socialMedia,
      });
    }
  }

  function resetValidationText() {
    document.getElementById("name-warning").classList.add("hidden");
    document.getElementById("desc-warning").classList.add("hidden");
    document.getElementById("email-warning").classList.add("hidden");
    document.getElementById("social-warning").classList.add("hidden");
  }

  function launch_toast(isError, msg) {
    let x = document.getElementById("toast");
    let text = document.getElementById("toast-text");

    x.style.top = "30px";

    if (isError) {
      x.className = "show failed";
    } else {
      x.className = "show success";
    }

    text.innerHTML = msg;

    setTimeout(function () {
      x.className = x.className.replace("show", "");
      setTimeout(() => {
        text.innerHTML = "";
      }, 1000);
    }, 3000);
  }

  const setCookie = async (key, value, expires) => {
    try {
      const d = new Date();
      d.setDate(d.getDate() + expires);
      cookies.set(key, value, { path: "/", expires: d });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (account) {
      const cookieProfile = cookies.get(account + "-profile");
      if (cookieProfile) {
        setDataProfile({
          ...cookieProfile,
          socialMedia: {
            website: "",
            instagram: "",
            telegram: "",
            facebook: "",
          },
        });
      }
    }
  }, [account]);

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
        variants={animateModal}
      >
        <div className="dialog-dark-body">
          <p className="text-xl font-bold mb-10">
            Hello, Welcome to NFT Marketplace. Please complete your Profile.
          </p>
          {dataProfile && (
            <div>
              <div className="wrap-input">
                <label className="label-input">Creator’s Name*</label>
                <input
                  id="input-name"
                  type="text"
                  maxLength={100}
                  className="w-full"
                  placeholder="Input Your Creator Name"
                  value={dataProfile.name ?? ""}
                  onChange={(e) =>
                    handleChangeDataProfile("name", e.target.value)
                  }
                />
                <p
                  className="mt-2 text-sm font-semibold hidden text-rose-600"
                  id="name-warning"
                >
                  Please input your creator name
                </p>
              </div>
              <div className="wrap-input mt-8">
                <label className="label-input">Describe your Profile*</label>
                <input
                  id="input-desc"
                  type="text"
                  maxLength={100}
                  className="w-full"
                  placeholder="Input Your Profile Description"
                  value={dataProfile.description ?? ""}
                  onChange={(e) =>
                    handleChangeDataProfile("description", e.target.value)
                  }
                />
                <p
                  className="mt-2 text-sm font-semibold hidden text-rose-600"
                  id="desc-warning"
                >
                  Please input your profile description
                </p>
              </div>
              <div className="wrap-input mt-8">
                <label className="label-input">Email*</label>
                <input
                  id="input-email"
                  type="text"
                  maxLength={100}
                  className={
                    dataProfile?.validEmail == undefined
                      ? "w-full"
                      : dataProfile?.validEmail
                      ? "w-full"
                      : "w-full !border-rose-600"
                  }
                  placeholder="Input Your Profile Description"
                  value={dataProfile.email ?? ""}
                  onChange={(e) => {
                    const at = e.target.value.indexOf("@");
                    const dot = e.target.value.lastIndexOf(".");
                    if (
                      at < 1 ||
                      dot < at + 2 ||
                      dot + 2 >= e.target.value.length
                    ) {
                      handleChangeDataProfile("email", e.target.value, false);
                    } else {
                      handleChangeDataProfile("email", e.target.value, true);
                    }
                  }}
                />
                <p className="text-xs font-semibold text-color-grey mt-2">
                  This information will not be shown to the public
                </p>
                <p
                  className="mt-2 text-sm font-semibold hidden text-rose-600"
                  id="email-warning"
                >
                  Please input your email
                </p>
              </div>
              <div className="wrap-input mt-8">
                <label className="label-input">Phone Number</label>
                <input
                  type="text"
                  maxLength={100}
                  className="w-full"
                  placeholder="Input Your Phone Number"
                  value={dataProfile.phone ?? ""}
                  onChange={(e) =>
                    handleChangeDataProfile("phone", e.target.value)
                  }
                />
                <p className="text-xs font-semibold text-color-grey mt-2">
                  This information will not be shown to the public
                </p>
              </div>
              <div className="wrap-input mt-8">
                <label className="label-input">
                  Embed Video Link (Youtube)
                </label>
                <input
                  type="text"
                  maxLength={100}
                  className="w-full"
                  placeholder="Input Your Youtube Video/Channel"
                  value={dataProfile.youtube ?? ""}
                  onChange={(e) =>
                    handleChangeDataProfile("youtube", e.target.value)
                  }
                />
              </div>
              <div className="mt-8">
                <p className="text-sm font-semibold mb-1">
                  Upload Photo Profile
                </p>
                <p className="text-sm font-semibold text-color-grey mb-2">
                  File types supported: JPG, PNG, GIF.
                </p>
                <FormInputImage
                  preview={dataProfile.image}
                  result={handleInputImage}
                />
              </div>
              <div className="wrap-input mt-10">
                <label className="label-input">
                  Social Media (You can fill or leave it blank)
                </label>
                <div className="input-group">
                  <div
                    className="input-label-icon"
                    style={{ borderRadius: "5px 0px 0px 0px" }}
                  >
                    <label htmlFor="input-url">
                      <FaGlobeAsia className="text-base text-color-grey m-auto" />
                    </label>
                  </div>
                  <input
                    style={{ borderRadius: "0px 5px 0px 0px" }}
                    type="text"
                    id="input-url"
                    placeholder="Link to Creator Website"
                    value={dataProfile.socialMedia.website ?? ""}
                    onChange={(e) =>
                      handleChangeDataProfile(
                        "socialMedia.website",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="input-group">
                  <div
                    className="input-label-icon"
                    style={{ borderRadius: "5px 0px 0px 0px" }}
                  >
                    <label htmlFor="input-url">
                      <FaInstagram className="text-base text-color-grey m-auto" />
                    </label>
                  </div>
                  <input
                    style={{ borderRadius: "0px 5px 0px 0px" }}
                    type="text"
                    id="input-insta"
                    placeholder="Link to Creator Instagram"
                    value={dataProfile.socialMedia.instagram ?? ""}
                    onChange={(e) =>
                      handleChangeDataProfile(
                        "socialMedia.instagram",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="input-group">
                  <div
                    className="input-label-icon"
                    style={{ borderRadius: "0px" }}
                  >
                    <label htmlFor="input-tele">
                      <FaTelegram className="text-base text-color-grey m-auto" />
                    </label>
                  </div>
                  <input
                    style={{ borderRadius: "0px" }}
                    type="text"
                    id="input-tele"
                    placeholder="Link to Creator Telegram"
                    value={dataProfile.socialMedia.telegram ?? ""}
                    onChange={(e) =>
                      handleChangeDataProfile(
                        "socialMedia.telegram",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="input-group">
                  <div
                    className="input-label-icon"
                    style={{ borderRadius: "0px" }}
                  >
                    <label htmlFor="input-tele">
                      <FaFacebook className="text-base text-color-grey m-auto" />
                    </label>
                  </div>
                  <input
                    style={{ borderRadius: "0px" }}
                    type="text"
                    id="input-face"
                    placeholder="Link to Creator Facebook"
                    value={dataProfile.socialMedia.facebook ?? ""}
                    onChange={(e) =>
                      handleChangeDataProfile(
                        "socialMedia.facebook",
                        e.target.value
                      )
                    }
                  />
                </div>
                <p
                  className="mt-2 text-sm font-semibold hidden text-rose-600"
                  id="social-warning"
                >
                  Please input one of your social media
                </p>
              </div>
              <div className="mt-14 flex justify-between items-center">
                <p className="text-lg font-bold">*Required</p>
                <button
                  style={{ padding: "10px 30px" }}
                  className="btn btn-orange-light text-sm"
                  onClick={() => handleSaveProfile()}
                >
                  Save Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
