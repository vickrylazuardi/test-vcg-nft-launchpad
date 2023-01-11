import React, { useEffect, useState } from "react";

function FormInputImage(props) {
  const [projectImage, setProjectImage] = useState("");

  function handleInputProject(file) {
    if (
      file[0] &&
      file[0].type.split("/")[0] == "image" &&
      file[0].size <= 10485760
    ) {
      document
        .getElementById(`border-${props.idx}`)
        .classList.remove("!border-rose-600");
      let filePreview = URL.createObjectURL(file[0]);
      setProjectImage(filePreview);
      props.result(file[0], props.idx);
    } else {
      document
        .getElementById(`border-${props.idx}`)
        .classList.add("!border-rose-600");
      props.result("", props.idx);
    }
  }

  useEffect(() => {
    if (props.preview) {
      let preview = URL.createObjectURL(props.preview);
      setProjectImage(preview);
    } else {
      setProjectImage("");
    }
  }, [props]);

  return (
    <div
      id={`border-${props.idx}`}
      className={`input-image flex items-center justify-center ${
        props.cssCustom ? props.cssCustom : ""
      }`}
    >
      {projectImage ? (
        <div className="preview-image">
          <img className="img-preview" src={projectImage} alt="" />
          <div
            className="action-edit"
            onClick={() =>
              document
                .getElementById(
                  props.idx
                    ? `input-img-project-${props.idx}`
                    : "input-img-project"
                )
                .click()
            }
          >
            <img className="m-auto" src="/images/svg/icon-edit.svg" alt="" />
          </div>
        </div>
      ) : (
        <div
          className="triger-input-image"
          onClick={() =>
            document
              .getElementById(
                props.idx
                  ? `input-img-project-${props.idx}`
                  : "input-img-project"
              )
              .click()
          }
        >
          <img
            className="m-auto"
            src="/images/svg/icon-upload-cloud.svg"
            alt=""
          />
          <p>Upload Image</p>
          <p>(Max. 10 MB)</p>
        </div>
      )}
      <input
        id={props.idx ? `input-img-project-${props.idx}` : "input-img-project"}
        type="file"
        className="hidden"
        accept="image/*,video/*"
        onChange={(e) => handleInputProject(e.target.files)}
      />
    </div>
  );
}

function FormInputBanner(props) {
  const [projectImage, setProjectImage] = useState("");

  function handleInputProject(file) {
    if (
      file[0] &&
      file[0].type.split("/")[0] == "image" &&
      file[0].size <= 10485760
    ) {
      document
        .getElementById(`border-${props.idx}`)
        .classList.remove("!border-rose-600");
      let filePreview = URL.createObjectURL(file[0]);
      setProjectImage(filePreview);
      props.result(file[0], props.idx);
    } else {
      document
        .getElementById(`border-${props.idx}`)
        .classList.add("!border-rose-600");
      props.result("", props.idx);
    }
  }

  useEffect(() => {
    if (props.preview) {
      let preview = URL.createObjectURL(props.preview);
      setProjectImage(preview);
    } else {
      setProjectImage("");
    }
  }, [props]);

  return (
    <div
      id={`border-${props.idx}`}
      className={`input-image for-banner flex items-center justify-center ${
        props.cssCustom ? props.cssCustom : ""
      }`}
    >
      {projectImage ? (
        <div className="preview-image flex items-center justify-center">
          <img className="img-preview" src={projectImage} alt="" />
          <div
            className="triger-input-image banner-edit absolute"
            onClick={() =>
              document
                .getElementById(
                  props.idx
                    ? `input-img-project-${props.idx}`
                    : "input-img-project"
                )
                .click()
            }
          >
            <img
              className="m-auto mb-1"
              src="/images/svg/icon-upload-cloud-white.svg"
              alt=""
            />
            <p className="font-semibold">Change Banner</p>
            <p>1130 x 330px size minimum</p>
          </div>
        </div>
      ) : (
        <div
          className="triger-input-image"
          onClick={() =>
            document
              .getElementById(
                props.idx
                  ? `input-img-project-${props.idx}`
                  : "input-img-project"
              )
              .click()
          }
        >
          <img
            className="m-auto mb-3"
            src="/images/svg/icon-upload-cloud.svg"
            alt=""
          />
          <p>Upload Banner</p>
          <p>1130 x 330px size minimum</p>
        </div>
      )}
      <input
        id={props.idx ? `input-img-project-${props.idx}` : "input-img-project"}
        type="file"
        className="hidden"
        accept="image/*,video/*"
        onChange={(e) => handleInputProject(e.target.files)}
      />
    </div>
  );
}

export { FormInputImage, FormInputBanner };
