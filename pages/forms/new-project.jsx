import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { API } from "../../utils/globalConstant";
import { useEffect } from "react";
import { FormInputImage } from "../../components/Common/formComponent";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import DialogConfirmation from "../../components/Common/DialogConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalConfirmation } from "../../redux/modalReducer";
import useMetaMask from "../../wallet/hook";
import { FiInfo } from "react-icons/fi";

export default function NewProject(props) {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { account, switchActive } = useMetaMask();

  const router = useRouter();

  const modalConfirmationWhenSuccess = {
    loading: false,
    isOpen: true,
    isPlain: false,
    isSuccess: true,
    isFailed: false,
    title: {
      en: "Confirmation",
    },
  };

  const modalConfirmationWhenFailed = {
    loading: false,
    isOpen: true,
    isPlain: false,
    isSuccess: false,
    isFailed: true,
    title: {
      en: "Confirmation",
    },
  };

  const modalConfirmation = {
    loading: false,
    isOpen: true,
    isPlain: true,
    isSuccess: false,
    isFailed: false,
    title: {
      en: "Confirmation",
    },
  };

  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(1);
  const [data, setData] = useState({
    socialMedia: {
      website: "",
      medium: "",
      discord: "",
      telegram: "",
      youtube: "",
    },
    banner: {
      items: {
        images: "",
        url: "",
      },
      playNow: {
        images: "",
        url: "",
      },
    },
    bannerItems:null,
    bannerPlayNow:null
  });
  const [list, setList] = useState({
    // features: [],
    member: [],
    items: [],
    boxes: [],
  });

  const getData = (key, value, status) => {
    try {
      const keys = key.split(".");
      switch (keys[0]) {
        case "socialMedia":
          if (value.length) data.socialMedia[keys[1]] = value;
          else delete data.socialMedia[keys[1]];
          break;
        case "contactEmail":
          if (value.length) {
            data[key] = value;
            data.validEmail = status;
          } else {
            delete data[key];
            delete data.validEmail;
          }
          break;
        case "banner":
          if (value) data.banner[keys[1]] = value;
          break;
        default:
          if (value) data[key] = value;
          else delete data[key];
          break;
      }
      setData({ ...data });
    } catch (error) {
      console.log(error);
    }
  };

  const submitProject = () => {
    try {
      const formData = new FormData();
      const team = {};
      const boxes = {};
      const items = [];
      // const features = [];

      // append information from data var to form data
      for (const key in data) {
        console.log('disini',key,value);
        const value = data[key];
        switch (key) {
          case "socialMedia":
            formData.append(key, JSON.stringify(value));
            break;
          case "banner":
            const bItems = "banner.items";
            const bPlayNow = "banner.playNow";
            
            // banner Items
            try {
              if(value?.items?.images){
                const bItemsImage = new File(
                  [value.items.images],
                  `${bItems}.${value.items.images.type.split("/")[1]}`,
                  {
                    type: value.items.images.type,
                    lastModified: value.items.images.lastModified,
                  }
                );
                formData.append("boxImage", bItemsImage);
              }
            } catch (error) {
              console.log('error parse bannerImage, ',error);
            }
            
            // banner PlayNow
            try {
              if(value?.playNow?.images){
                const imagePlayNow = new File(
                  [value.playNow.images],
                  `${bPlayNow}.${value.playNow.images.type.split("/")[1]}`,
                  {
                    type: value.playNow.images.type,
                    lastModified: value.playNow.images.lastModified,
                  }
                );
                formData.append("boxImage", imagePlayNow);
              }
            } catch (error) {
              console.log('error parse bannerPlayNow, ',error);
            }

            const banner = {
              'items':{
                image:'',
                url: value.items.url
              },
              'playNow':{
                image:'',
                url: value.playNow.url
              }
            }
            formData.append(key,JSON.stringify(banner));
            break;
          default:
            formData.append(key, value);
            break;
        }
      }
      

      // append box info and box image to form data
      list.boxes.map((item) => {
      
        const items = {};
        console.log('itemsimg',item.images);
        const image = new File(
          [item.images],
          `${item.boxName}.${item.images.type.split("/")[1]}`,
          {
            type: item.images.type,
            lastModified: item.images.lastModified,
          }
        );

        item.items.map((el) => {
          items[el.category] = el.qty;
        });

        boxes[item.boxName] = {
          price: item.price,
          stock: item.supply,
          sold: 0,
          image: "",
          items,
          sell: false,
          finalize: false,
        };

        console.log('itemsimg fixed' ,image);
        formData.append("boxImage", image);
      });

      formData.append("boxes", JSON.stringify(boxes));

      // append feature info and feature image to form data
      // list.features.map((item) => {
      //   const image = new File(
      //     [item.images],
      //     `${item.title}.${item.images.type.split("/")[1]}`,
      //     {
      //       type: item.images.type,
      //       lastModified: item.images.lastModified,
      //     }
      //   );

      //   const feature = {
      //     title: item.title,
      //     text: item.description,
      //     image: "",
      //   };

      //   features.push(feature);
      //   formData.append("featureImage", image);
      // });

      // formData.append("additionalInfo", JSON.stringify(features));

      // append team member info and team member image to form data
      list.member.map((item) => {
        const items = {};
        const image = new File(
          [item.images],
          `${item.name}.${item.images.type.split("/")[1]}`,
          {
            type: item.images.type,
            lastModified: item.images.lastModified,
          }
        );

        team[item.name] = {
          position: item.title,
          image: "",
        };

        formData.append("teamImage", image);
      });

      formData.append("team", JSON.stringify(team));

      // append items info and image to form data
      list.items.map((item, idx) => {
        const attr = [];
        const image = new File(
          [item.images],
          `${idx + 1}.${item.images.type.split("/")[1]}`,
          {
            type: item.images.type,
            lastModified: item.images.lastModified,
          }
        );

        Object.keys(item.attribute).map((e) => {
          const value = item.attribute[e];
          const el = {};
          el.trait_type = e;
          el.value = value;
          attr.push(el);
        });

        item.attributes.forEach(item => {
          attr.push(item);
        });

        const nft = {
          name: item.itemName,
          image: "",
          tokenId: idx + 1,
          description: "",
          attributes: attr,
          nftAddress: "",
          projectName: data.name,
        };

        items.push(nft);
        formData.append("itemImage", image);
      });

      formData.append("items", JSON.stringify(items));

      // SEND TO API Create Project 
      axios
        .post(API.launchpad.domain + API.launchpad.project.add, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          dispatch(toggleModalConfirmation(modalConfirmationWhenSuccess));
        })
        .catch((error) => {
          dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
        });
    } catch (error) {
      console.log(error);
      dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
    }
  };

  useEffect(() => {
    if (!account) {
      router.push("/");
    }
  }, [account]);

  return (
    <div style={{ padding: "9rem 0", background: "#1E1E1E" }}>
      <div className="container">
        <div className="navigation-container flex items-center">
          <Link href="/">
            <a className="flex items-center">
              <img src="/images/icon-home.png" alt="" />
              <p className="mx-3 text-sm font-semibold">Launchpad</p>
            </a>
          </Link>
          <img src="/images/svg/arrow-gray.svg" alt="" />
          <p style={{ color: "#E28058" }} className="ml-3 text-sm font-bold">
            Apply Project
          </p>
        </div>

        <p className="info-yellow mt-9">
          <FiInfo className="inline mr-1" />
          VCGamers Launchpad currently support BSC Only
        </p>

        <div className="card-form-launchpad mt-4">
          <div style={{ maxWidth: "400px" }} className="m-auto">
            <div className="stepper-wrapper">
              <div
                className={`stepper-item ${step > 1 ? "completed" : ""} ${
                  step == 1 ? "active" : ""
                }`}
              >
                <div className="step-counter" onClick={() => setStep(1)}>
                  1
                </div>
              </div>
              <div
                className={`stepper-item ${step > 2 ? "completed" : ""} ${
                  step == 2 ? "active" : ""
                }`}
              >
                <div className="step-counter" onClick={() => setStep(2)}>
                  2
                </div>
              </div>
              <div
                className={`stepper-item ${step > 3 ? "completed" : ""} ${
                  step == 3 ? "active" : ""
                }`}
              >
                <div className="step-counter" onClick={() => setStep(3)}>
                  3
                </div>
              </div>
            </div>
          </div>

          {step == 1 && <Step1 data={data} getData={getData} />}

          {step == 2 && <Step2 data={data} getData={getData} />}

          {step == 3 && (
            <Step3
              list={list}
              setList={setList}
              selected={selected}
              setSelected={setSelected}
            />
          )}

          <div className="mt-8 text-right">
            <button
              style={{ padding: "10px 30px" }}
              className="btn btn-gray text-sm mr-3"
              onClick={() => setStep(step - 1)}
              disabled={step == 1}
            >
              Back
            </button>
            {step == 3 ? (
              <button
                style={{ padding: "10px 30px" }}
                className={
                  data.contactName &&
                  data.contactEmail &&
                  data.duration &&
                  data.validEmail &&
                  data.owner &&
                  data.icon &&
                  data.name &&
                  data.desc &&
                  data.startedAt &&
                  list.member.length &&
                  // list.features.length &&
                  list.boxes.length &&
                  list.items.length &&
                  list.member.find((item) => {
                    return !item.completed;
                  }) == undefined &&
                  // list.features.find((item) => {
                  //   return !item.completed;
                  // }) == undefined &&
                  list.boxes.find((item) => {
                    return !item.completed;
                  }) == undefined &&
                  list.items.find((item) => {
                    return !item.completed;
                  }) == undefined
                    ? "btn btn-orange-light text-sm"
                    : "btn btn-disabled text-sm"
                }
                onClick={() => {
                  dispatch(toggleModalConfirmation(modalConfirmation));
                }}
                disabled={
                  data.contactName &&
                  data.contactEmail &&
                  data.duration &&
                  data.validEmail &&
                  data.owner &&
                  data.icon &&
                  data.name &&
                  data.desc &&
                  data.startedAt &&
                  list.member.length &&
                  // list.features.length &&
                  list.boxes.length &&
                  list.items.length &&
                  list.member.find((item) => {
                    return !item.completed;
                  }) == undefined &&
                  // list.features.find((item) => {
                  //   return !item.completed;
                  // }) == undefined &&
                  list.boxes.find((item) => {
                    return !item.completed;
                  }) == undefined &&
                  list.items.find((item) => {
                    return !item.completed;
                  }) == undefined
                    ? false
                    : true
                }
              >
                Submit
              </button>
            ) : (
              <button
                style={{ padding: "10px 30px" }}
                className="btn btn-orange-light text-sm"
                onClick={() => setStep(step + 1)}
                disabled={step == 3}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <button onClick={()=>submitProject() }>xxxxx</button> */}
      {modal.modalConfirmation.isOpen && (
        <DialogConfirmation
          type="Submit"
          message="submit this project?"
          successMessage="You have successfully submitted this project"
          failedMessage="Failed to submit this project"
          redirect="/"
          action={submitProject}
        />
      )}
    </div>
  );
}
