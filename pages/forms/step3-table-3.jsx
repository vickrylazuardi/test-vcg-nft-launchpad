import React, { useState } from "react";
import { FormInputImage } from "../../components/Common/formComponent";

export default function Table3(props) {
  function handleAddItems() {
    let formDefault = {
      images: "",
      itemName: "",
      supply: "",
      attribute: {
        category: "",
        rarity: "",
      },
      completed: false,
    };

    props.list.items.push(formDefault);
    props.setList({ ...props.list });
  }

  function handleInputMemberImage(file, idx) {
    props.list.items[idx].images = file;
    props.setList({ ...props.list });
  }

  return (
    <table className="table-flexible">
      <thead>
        <tr>
          <th>No</th>
          <th style={{ minWidth: "110px" }}>Image Item</th>
          <th style={{ minWidth: "350px" }}>Item Name</th>
          <th style={{ minWidth: "150px" }}>Supply</th>
          <th style={{ minWidth: "150px" }}>Attribute</th>
          <th style={{ textAlign: "center", minWidth: "100px" }}>
            <button
              style={{ padding: "5px" }}
              className="btn"
              type="button"
              onClick={handleAddItems}
            >
              <img src="/images/svg/icon-plus.svg" alt="" />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.list.items.length == 0 ? (
          <tr>
            <td colSpan={6}>
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
                  Please input your team items
                </p>
              </div>
            </td>
          </tr>
        ) : (
          props.list.items.map((item, idx) => {
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
                    preview={props.list.items[idx].images}
                  />
                </td>
                <td>
                  <div className="wrap-input border-dark flex-1">
                    {props.list.items[idx].completed ? (
                      <p className="text-sm font-semibold">
                        {props.list.items[idx].itemName}
                      </p>
                    ) : (
                      <textarea
                        type="text"
                        className="w-full"
                        placeholder="Input full name"
                        rows={3}
                        value={props.list.items[idx].itemName}
                        onChange={(e) => {
                          props.list.items[idx].itemName = e.target.value;
                          props.setList({ ...props.list });
                        }}
                      ></textarea>
                    )}
                  </div>
                </td>
                <td>
                  <div className="wrap-input border-dark flex-1">
                    {props.list.items[idx].completed ? (
                      <p className="text-sm font-semibold">
                        {props.list.items[idx].supply}
                      </p>
                    ) : (
                      <input
                        style={{ minWidth: "150px" }}
                        type="text"
                        className="w-full"
                        placeholder="Input full name"
                        value={props.list.items[idx].supply}
                        onChange={(e) => {
                          props.list.items[idx].supply = e.target.value;
                          props.setList({ ...props.list });
                        }}
                      />
                    )}
                  </div>
                </td>
                <td>
                  <div className="wrap-input border-dark flex-1">
                    {props.list.items[idx].completed ? (
                      <p className="text-sm font-semibold">
                        {props.list.items[idx].attribute.category + ","}
                        {props.list.items[idx].attribute.rarity}
                      </p>
                    ) : (
                      <>
                        <input
                          style={{ minWidth: "150px" }}
                          type="text"
                          className="w-full"
                          placeholder="Input Category"
                          rows={3}
                          value={props.list.items[idx].attribute.category}
                          onChange={(e) => {
                            props.list.items[idx].attribute.category =
                              e.target.value;
                            props.setList({ ...props.list });
                          }}
                        />
                        <select
                          style={{ minWidth: "150px" }}
                          className="w-full mt-3"
                          value={props.list.items[idx].attribute.rarity}
                          onChange={(e) => {
                            props.list.items[idx].attribute.rarity =
                              e.target.value;
                            props.setList({ ...props.list });
                          }}
                        >
                          <option selected>Select Rarity</option>
                          <option value="one">One</option>
                          <option value="two">Two</option>
                          <option value="three">Three</option>
                        </select>
                      </>
                    )}
                  </div>
                </td>
                <td
                  className="text-center"
                  style={{ padding: "5px", width: "100px" }}
                >
                  {props.list.items[idx].completed ? (
                    <>
                      <button
                        style={{ padding: "5px" }}
                        className="btn"
                        onClick={() => {
                          props.list.items.splice(idx, 1);
                          props.setList({ ...props.list });
                        }}
                      >
                        <img src="/images/svg/icon-trash.svg" alt="" />
                      </button>
                      <button
                        style={{ padding: "5px" }}
                        className="btn"
                        onClick={() => {
                          props.list.items[idx].completed = false;
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
                          props.list.items.splice(idx, 1);
                          props.setList({ ...props.list });
                        }}
                      >
                        <img src="/images/svg/icon-times.svg" alt="" />
                      </button>
                      <button
                        style={{ padding: "5px" }}
                        className="btn"
                        onClick={() => {
                          props.list.items[idx].completed = true;
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
        )}
      </tbody>
    </table>
  );
}
