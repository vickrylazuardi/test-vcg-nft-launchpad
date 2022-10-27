import Link from "next/link";
import React, { useState } from "react";
import axios from "axios";
import { API } from "../../utils/globalConstant";
import { useEffect } from "react";
import { FormInputImage } from "../../components/Common/formComponent";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";
import DialogConfirmation from "../../components/Common/DialogConfirmation";
import { useDispatch, useSelector } from "react-redux";
import {toggleModalConfirmation} from "../../redux/modalReducer";

export default function NewProject(props) {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const modalConfirmationWhenSuccess = {
		loading: false,
		isOpen: true,
		isPlain: false,
		isSuccess: true,
		isFailed: false,
		title: {
			en: "Confirmation",
		}
	};

  const modalConfirmationWhenFailed = {
		loading: false,
		isOpen: true,
		isPlain: false,
		isSuccess: false,
		isFailed: true,
		title: {
			en: "Confirmation",
		}
	};

  const modalConfirmation = {
    loading: false,
    isOpen: true,
    isPlain: true,
    isSuccess: false,
    isFailed: false,
    title: {
      en: "Confirmation",
    }
  }

  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState(1);
  const [data, setData] = useState({ socialMedia: {} });
  const [list, setList] = useState({ features: [], member: [], items: [], boxes: [] });

  const getData = (key, value, status) => {
    try {
      const keys = key.split(".");
      switch (keys[0]) {
        case "socialMedia":
          if (value.length) data.socialMedia[keys[1]] = value;
          else delete(data.socialMedia[keys[1]]);
          break;
        case "contactEmail":
          if (value.length) {
            data[key] = value;
            data.validEmail = status;
          } else {
            delete(data[key]);
            delete(data.validEmail);
          }
          break;
        default:
          if (value) data[key] = value;
          else delete(data[key]);
          break;
      }
      setData({...data});
    } catch (error) {
      console.log(error);
    }
  };

  const submitProject = () => {
    try {
      // const formData = new FormData();
      // for (const key in data) {
      //   const value = nftData[key];
      //   switch (key) {
      //     case "name":
      //       formData.append(key, value);
      //       break;
      //     case "description":
      //       formData.append(key, value);
      //       break;
      //     case "tokenId":
      //       formData.append(key, value);
      //       break;
      //     case "attributes":
      //       const attribute = value.filter(findNotEmptyAttribute);
      //       formData.append(key, JSON.stringify(attribute));
      //       break;
      //     case "owner":
      //       formData.append(key, JSON.stringify(value));
      //       break;
      //     case "creator":
      //       formData.append(key, JSON.stringify(value));
      //       break;
      //     case "category":
      //       formData.append(key, value);
      //       break;
      //     case "collectionId":
      //       formData.append(key, value);
      //       break;
      //     case "supply":
      //       formData.append(key, value);
      //       break;
      //     case "external_url":
      //       formData.append(key, value);
      //       break;
      //     case "royalty":
      //       formData.append(key, value);
      //       break;
      //     case "image":
      //       formData.append(key, value);
      //       break;
      //     default:
      //       break;
      //   }
      // };
      
      // axios.post(API.local + API.metadata.create, formData, {
      //   headers : {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // })
      setTimeout(() => {
        dispatch(toggleModalConfirmation(modalConfirmationWhenSuccess));
      }, 3000);
    } catch (error) {
      console.log(error);
      dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
    }
  }

  console.log(data);
  console.log(list);

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

        <div className="card-form-launchpad mt-9">
          <div style={{ maxWidth: "400px" }} className="m-auto">
            <div className="stepper-wrapper">
              <div
                className={`stepper-item ${step > 1 ? "completed" : ""} ${
                  step == 1 ? "active" : ""
                }`}
                onClick={() => setStep(1)}
              >
                <div className="step-counter">1</div>
              </div>
              <div
                className={`stepper-item ${step > 2 ? "completed" : ""} ${
                  step == 2 ? "active" : ""
                }`}
                onClick={() => setStep(2)}
              >
                <div className="step-counter">2</div>
              </div>
              <div
                className={`stepper-item ${step > 3 ? "completed" : ""} ${
                  step == 3 ? "active" : ""
                }`}
                onClick={() => setStep(3)}
              >
                <div className="step-counter">3</div>
              </div>
            </div>
          </div>

          {
            step == 1 && 
            <Step1 
              data={data}
              getData={getData} 
            />
          }

          {
            step == 2 && 
            <Step2 
              data={data}
              getData={getData} 
            />
          }

          {
            step == 3 && 
            <Step3 
              list={list}
              setList={setList}
              selected={selected}
              setSelected={setSelected} 
            />
          }

          <div className="mt-8 text-right">
            <button
              style={{ padding: "10px 30px" }}
              className="btn btn-gray text-sm mr-3"
              onClick={() => setStep(step - 1)}
              disabled={step == 1}
            >
              Back
            </button>
            {
              step == 3 ?
              <button
                style={{ padding: "10px 30px" }}
                className={
                  data.contactName && data.contactEmail && data.duration && 
                  data.validEmail && data.owner && data.icon && 
                  data.name && data.desc && data.startedAt && 
                  list.member.length && list.boxes.length && list.items.length &&
                  list.member.find((item) => {return !item.completed}) == undefined &&
                  list.features.find((item) => {return !item.completed}) == undefined &&
                  list.boxes.find((item) => {return !item.completed}) == undefined &&
                  list.items.find((item) => {return !item.completed}) == undefined ?
                  "btn btn-orange-light text-sm" : "btn btn-disabled text-sm"
                }
                onClick={() => {
                  dispatch(toggleModalConfirmation(modalConfirmation))
                }}
                disabled={
                  data.contactName && data.contactEmail && data.duration && 
                  data.validEmail && data.owner && data.icon && 
                  data.name && data.desc && data.startedAt && 
                  list.member.length && list.boxes.length && list.items.length &&
                  list.member.find((item) => {return !item.completed}) == undefined &&
                  list.features.find((item) => {return !item.completed}) == undefined &&
                  list.boxes.find((item) => {return !item.completed}) == undefined &&
                  list.items.find((item) => {return !item.completed}) == undefined ?
                  false : true
                }
              >
                Submit
              </button> :
              <button
                style={{ padding: "10px 30px" }}
                className="btn btn-orange-light text-sm"
                onClick={() => setStep(step + 1)}
                disabled={step == 3}
              >
                Next
              </button>
            }
          </div>
        </div>
      </div>
      {
        modal.modalConfirmation.isOpen && 
        <DialogConfirmation
          type="Submit"
          message="submit this project?"
          successMessage="You have successfully submitted this project"
          failedMessage="Failed to submit this project"
          redirect="/"
          action={submitProject}
        />
      }
    </div>
  );
}
