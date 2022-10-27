import React, { useState } from "react";
import { FormInputImage } from "../../components/Common/formComponent";

export default function Table1(props) {
  function handleAddMamber() {
    let formDefault = {
      images: "",
      name: "",
      title: "",
      completed: false,
    };

    props.list.member.push(formDefault);
    props.setList({ ...props.list });
  }

  function handleInputMemberImage(file, idx) {
    props.list.member[idx].images = file;
    props.setList({ ...props.list });
  }

  return (
    <table className="table-flexible">
      <thead>
        <tr>
          <th>No</th>
          <th style={{ minWidth: "110px" }}>Image Profile</th>
          <th style={{ minWidth: "200px" }}>Full Name</th>
          <th style={{ minWidth: "200px" }}>Title</th>
          <th style={{ textAlign: "center", minWidth: "100px" }}>
            <button
              style={{ padding: "5px" }}
              className="btn"
              type="button"
              onClick={handleAddMamber}
            >
              <img src="/images/svg/icon-plus.svg" alt="" />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {props?.list?.member?.length ? (
          props.list.member.map((item, idx) => {
            return (
              <tr key={idx}>
                <td
                  className="text-center"
                  style={{ padding: "5px", width: "30px" }}
                >
                  {idx + 1}
                </td>
                <td style={{ width: "135px" }}>
                  <FormInputImage
                    cssCustom={"wh-100-100"}
                    result={handleInputMemberImage}
                    idx={idx}
                    preview={item.images}
                  />
                </td>
                <td>
                  <div className="wrap-input border-dark flex-1">
                    {item.completed ? (
                      <p className="text-sm font-semibold">
                        {item.name}
                      </p>
                    ) : (
                      <textarea
                        type="text"
                        className="w-full"
                        placeholder="Input full name"
                        rows={3}
                        value={item.name}
                        onChange={(e) => {
                          props.list.member[idx].name = e.target.value;
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
                          props.list.member[idx].title = e.target.value;
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
                          props.list.member.splice(idx, 1);
                          props.setList({ ...props.list });
                        }}
                      >
                        <img src="/images/svg/icon-trash.svg" alt="" />
                      </button>
                      <button
                        style={{ padding: "5px" }}
                        className="btn"
                        onClick={() => {
                          props.list.member[idx].completed = false;
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
                          props.list.member.splice(idx, 1);
                          props.setList({ ...props.list });
                        }}
                      >
                        <img src="/images/svg/icon-times.svg" alt="" />
                      </button>
                      <button
                        style={{ padding: "5px" }}
                        className="btn"
                        onClick={() => {
                          props.list.member[idx].completed = true;
                          props.setList({ ...props.list });
                        }}
                        disabled={
                          item.images && item.name && 
                          item.title ? false : true
                        }
                      >
                        <img 
                          alt="" 
                          src="/images/svg/icon-check.svg" 
                          style={
                            item.images && item.name && item.title ?
                            {} : {filter: "brightness(0.5)"}
                          }
                        />
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
                  Please input your team member
                </p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
