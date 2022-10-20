import Link from "next/link";
import React, { useState } from "react";
import { FormInputImage } from "../../components/Common/formComponent";
import Step1 from "./step-1";
import Step2 from "./step-2";
import Step3 from "./step-3";

export default function NewProject(props) {
  const [step, setStep] = useState(1);

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

          {step == 1 && <Step1 />}

          {step == 2 && <Step2 />}

          {step == 3 && <Step3 />}

          <div className="mt-8 text-right">
            <button
              style={{ padding: "10px 30px" }}
              className="btn btn-gray text-sm mr-3"
              onClick={() => setStep(step - 1)}
              disabled={step == 1}
            >
              Back
            </button>
            <button
              style={{ padding: "10px 30px" }}
              className="btn btn-orange-light text-sm"
              onClick={() => setStep(step + 1)}
              disabled={step == 3}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
