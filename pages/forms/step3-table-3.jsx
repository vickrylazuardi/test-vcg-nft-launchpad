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
        {props?.list?.items?.length ? (
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
                    preview={item.images}
                  />
                </td>
                <td>
                  <div className="wrap-input border-dark flex-1">
                    {item.completed ? (
                      <p className="text-sm font-semibold">
                        {item.itemName}
                      </p>
                    ) : (
                      <input
                        type="text"
                        className="w-full"
                        placeholder="Input full name"
                        value={item.itemName}
                        onChange={(e) => {
                          props.list.items[idx].itemName = e.target.value;
                          props.setList({ ...props.list });
                        }}
                      ></input>
                    )}
                  </div>
                </td>
                <td>
                  <div className="wrap-input border-dark flex-1">
                    {item.completed ? (
                      <p className="text-sm font-semibold">
                        {item.supply}
                      </p>
                    ) : (
                      <input
                        style={{ minWidth: "150px" }}
                        type="text"
                        className="w-full"
                        placeholder="Input full name"
                        value={item.supply}
                        onChange={(e) => {
                          if (!/[0-9]/i.test(e.nativeEvent.data)) e.target.value = e.target.value.slice(0, -1);
                          if (e.target.value <= 0) e.target.value = "";
                          props.list.items[idx].supply = e.target.value;
                          props.setList({ ...props.list });
                        }}
                      />
                    )}
                  </div>
                </td>
                <td>
                  <div className="wrap-input border-dark flex-1">
                    {item.completed ? (
                      <p className="text-sm font-semibold">
                        {item.attribute.category + ","}
                        {item.attribute.rarity}
                      </p>
                    ) : (
                      <>
                        <input
                          style={{ minWidth: "150px" }}
                          type="text"
                          className="w-full"
                          placeholder="Input Category"
                          rows={3}
                          value={item.attribute.category}
                          onChange={(e) => {
                            props.list.items[idx].attribute.category =
                              e.target.value;
                            props.setList({ ...props.list });
                          }}
                        />
                        <select
                          style={{ minWidth: "150px" }}
                          className="w-full mt-3"
                          value={item.attribute.rarity}
                          onChange={(e) => {
                            props.list.items[idx].attribute.rarity =
                              e.target.value;
                            props.setList({ ...props.list });
                          }}
                        >
                          <option className="text-black" selected hidden>Select Rarity</option>
                          <option className="text-black" value="common">Common</option>
                          <option className="text-black" value="uncommon">Uncommon</option>
                          <option className="text-black" value="rare">Rare</option>
                          <option className="text-black" value="special">Special</option>
                        </select>
                      </>
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
                        disabled={
                          item.images && item.itemName && item.supply && 
                          item.attribute.category && item.attribute.rarity ? 
                          false : true
                        }
                      >
                        <img 
                          src="/images/svg/icon-check.svg" 
                          alt="" 
                          style={
                            item.images && item.itemName && item.supply && 
                            item.attribute.category && item.attribute.rarity ? 
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
        )}
      </tbody>
    </table>
  );
}
