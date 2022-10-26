import React, { useState } from "react";
import { FormInputImage } from "../../components/Common/formComponent";

export default function Table2(props) {
  function handleAddFeature() {
    let formDefault = {
      images: "",
      title: "",
      description: "",
      completed: false,
    };

    props.list.features.push(formDefault);
    props.setList({ ...props.list });
  }

  function handleInputMemberImage(file, idx) {
    props.list.features[idx].images = file;
    props.setList({ ...props.list });
  }

  return (
    <table className="table-flexible">
      <thead>
        <tr>
          <th>No</th>
          <th style={{ minWidth: "120px" }}>Image Features</th>
          <th style={{ minWidth: "200px" }}>Title</th>
          <th style={{ minWidth: "200px" }}>Description</th>
          <th style={{ textAlign: "center", minWidth: "100px" }}>
            <button
              style={{ padding: "5px" }}
              className="btn"
              type="button"
              onClick={handleAddFeature}
            >
              <img src="/images/svg/icon-plus.svg" alt="" />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {props?.list?.features?.length ? (
          props.list.features.map((item, idx) => {
            return (
              <tr key={idx}>
                <td
                  className="text-center"
                  style={{ padding: "5px", width: "30px" }}
                >
                  {idx + 1}
                </td>
                <td style={{ width: "145px" }}>
                  <FormInputImage
                    cssCustom={"wh-175-100"}
                    result={handleInputMemberImage}
                    idx={idx}
                    preview={item.images}
                  />
                </td>
                <td>
                  <div className="wrap-input border-dark flex-1">
                    {item.completed ? (
                      <p className="text-sm font-semibold">
                        {item.title}
                      </p>
                    ) : (
                      <textarea
                        type="text"
                        className="w-full"
                        placeholder="Input title"
                        rows={3}
                        value={item.title}
                        onChange={(e) => {
                          props.list.features[idx].title = e.target.value;
                          props.setList({ ...props.list });
                        }}
                      ></textarea>
                    )}
                  </div>
                </td>
                <td>
                  <div className="wrap-input border-dark flex-1">
                    {item.completed ? (
                      <p className="text-sm font-semibold">
                        {item.description}
                      </p>
                    ) : (
                      <textarea
                        type="text"
                        className="w-full"
                        placeholder="Input description"
                        rows={3}
                        value={item.description}
                        onChange={(e) => {
                          props.list.features[idx].description = e.target.value;
                          props.setList({ ...props.list });
                        }}
                      ></textarea>
                    )}
                  </div>
                </td>
                <td
                  className="text-center"
                  style={{ padding: "5px", width: "100px" }}
                >
                  {item.completed ? (
                    <>
                      <button
                        style={{ padding: "5px" }}
                        className="btn"
                        onClick={() => {
                          props.list.features.splice(idx, 1);
                          props.setList({ ...props.list });
                        }}
                      >
                        <img src="/images/svg/icon-trash.svg" alt="" />
                      </button>
                      <button
                        style={{ padding: "5px" }}
                        className="btn"
                        onClick={() => {
                          props.list.features[idx].completed = false;
                          props.setList({ ...props.list });
                        }}
                      >
                        <img src="/images/svg/icon-pencil.svg" alt="" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        style={{ padding: "5px" }}
                        className="btn"
                        onClick={() => {
                          props.list.features.splice(idx, 1);
                          props.setList({ ...props.list });
                        }}
                      >
                        <img src="/images/svg/icon-times.svg" alt="" />
                      </button>
                      <button
                        style={{ padding: "5px" }}
                        className="btn"
                        onClick={() => {
                          props.list.features[idx].completed = true;
                          props.setList({ ...props.list });
                        }}
                      >
                        <img src="/images/svg/icon-check.svg" alt="" />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={5}>
              <div className="text-center p-4">
                <img
                  className="mb-3 m-auto"
                  src="/images/vicimon-question.png"
                  alt=""
                />
                <p
                  style={{ color: "#9AA4BF" }}
                  className="text-sm font-semibold"
                >
                  Please input your team features
                </p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
