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
      attributes: [],
      completed: false,
    };

    props.list.items.push(formDefault);
    props.setList({ ...props.list });
  }

  function handleInputMemberImage(file, idx) {
    props.list.items[idx].images = file;
    props.setList({ ...props.list });
  }

  function handleAttributesItems(idx) {
    let objectDefault = {
      trait_type: "",
      value: "",
    };

    props.list.items[idx].attributes.push(objectDefault);
    props.setList({ ...props.list });
  }

  return (
    <table className="table-flexible">
      <thead>
        <tr>
          <th>No</th>
          <th style={{ minWidth: "110px" }}>Image Item</th>
          <th style={{ minWidth: "350px" }}>Item Name & Supply</th>
          {/* <th style={{ minWidth: "150px" }}>Supply</th> */}
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
                <td style={{ width: "200px" }}>
                  <div className="wrap-input border-dark flex-1">
                    {item.completed ? (
                      <>
                        <p className="text-sm font-semibold">{item.itemName}</p>
                        <p className="text-sm font-semibold text-color-grey mt-1">
                          Supply: {item.supply}
                        </p>
                      </>
                    ) : (
                      <div>
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
                        <div className="wrap-input input-qty border-dark mt-3">
                          <button
                            onClick={() => {
                              item.supply -= 1;
                              props.setList({ ...props.list });
                            }}
                            disabled={item.supply == 0}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min={0}
                            value={item.supply}
                            placeholder="0"
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, "");
                              if (e.target.value) {
                                if (e.target.value === "0") {
                                  e.target.value = "";
                                } else {
                                  e.target.value = val;
                                }
                              }
                              item.supply = e.target.value;
                              props.setList({ ...props.list });
                            }}
                          />
                          <button
                            onClick={() => {
                              if (!item.supply) {
                                item.supply = 0;
                              }

                              let val = parseInt(item.supply) + 1;
                              item.supply = val;
                              props.setList({ ...props.list });
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
                {/* <td>
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
                </td> */}
                <td>
                  <div className="wrap-input border-dark flex-1">
                    {item.completed ? (
                      <>
                        <p className="text-sm font-semibold inline mx-1">
                          Category{" "}
                          <span className="text-color-grey">
                            ({item.attribute.category})
                          </span>
                        </p>
                        <p className="text-sm font-semibold inline mx-1">
                          Rarity{" "}
                          <span className="text-color-grey">
                            ({item.attribute.rarity})
                          </span>
                        </p>
                        {item.attributes
                          ? item.attributes.map((val, idxx) => {
                              return (
                                <p
                                  key={idxx}
                                  className="text-sm font-semibold inline mx-1"
                                >
                                  {val.trait_type}{" "}
                                  <span className="text-color-grey">
                                    ({val.value})
                                  </span>
                                </p>
                              );
                            })
                          : ""}
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 mr-7">
                          <input
                            style={{ minWidth: "150px" }}
                            type="text"
                            className="w-full"
                            rows={3}
                            defaultValue={"Category"}
                            disabled
                          />
                          <input
                            style={{ minWidth: "150px" }}
                            type="text"
                            className="w-full"
                            placeholder="Input Category"
                            value={item.attribute.category}
                            onChange={(e) => {
                              props.list.items[idx].attribute.category =
                                e.target.value;
                              props.setList({ ...props.list });
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-2 mr-7 mt-3">
                          <input
                            style={{ minWidth: "150px" }}
                            type="text"
                            className="w-full"
                            placeholder="Input Category"
                            rows={3}
                            defaultValue={"Rarity"}
                            disabled
                          />
                          <select
                            style={{ minWidth: "150px" }}
                            className="w-full"
                            value={item.attribute.rarity}
                            onChange={(e) => {
                              props.list.items[idx].attribute.rarity =
                                e.target.value;
                              props.setList({ ...props.list });
                            }}
                          >
                            <option className="text-black" selected hidden>
                              Select Rarity
                            </option>
                            <option className="text-black" value="common">
                              Common
                            </option>
                            <option className="text-black" value="uncommon">
                              Uncommon
                            </option>
                            <option className="text-black" value="rare">
                              Rare
                            </option>
                            <option className="text-black" value="special">
                              Special
                            </option>
                          </select>
                        </div>
                        {props.list.items[idx].attributes
                          ? props.list.items[idx].attributes.map(
                              (itemAttr, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="flex items-center mt-3"
                                  >
                                    <div
                                      className="grid grid-cols-2"
                                      style={{ flex: "1" }}
                                    >
                                      <input
                                        style={{ minWidth: "150px" }}
                                        type="text"
                                        className="w-full"
                                        value={itemAttr.trait_type}
                                        placeholder={`Input Stats${index + 2}`}
                                        onChange={(e) => {
                                          props.list.items[idx].attributes[
                                            index
                                          ].trait_type = e.target.value;
                                          props.setList({ ...props.list });
                                        }}
                                      />
                                      <input
                                        style={{ minWidth: "150px" }}
                                        type="text"
                                        className="w-full"
                                        value={itemAttr.value}
                                        placeholder={`Input Value of Stats${
                                          index + 2
                                        }`}
                                        onChange={(e) => {
                                          props.list.items[idx].attributes[
                                            index
                                          ].value = e.target.value;
                                          props.setList({ ...props.list });
                                        }}
                                      />
                                    </div>
                                    <div className="pl-2">
                                      <button
                                        onClick={() => {
                                          props.list.items[
                                            idx
                                          ].attributes.splice(index, 1);
                                          props.setList({ ...props.list });
                                        }}
                                      >
                                        <img
                                          src="/images/svg/icon-trash.svg"
                                          alt=""
                                        />
                                      </button>
                                    </div>
                                  </div>
                                );
                              }
                            )
                          : ""}

                        <button
                          style={{ padding: "10px" }}
                          className="btn btn-gray text-sm mt-3"
                          onClick={() => handleAttributesItems(idx)}
                        >
                          + Add Item
                        </button>
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
                          item.images &&
                          item.itemName &&
                          item.supply &&
                          item.attribute.category &&
                          item.attribute.rarity &&
                          item.attributes?.find((item) => {
                            return !item?.trait_type;
                          }) == undefined &&
                          item.attributes?.find((item) => {
                            return !item?.value;
                          }) == undefined
                            ? false
                            : true
                        }
                      >
                        <img
                          src="/images/svg/icon-check.svg"
                          alt=""
                          style={
                            item.images &&
                            item.itemName &&
                            item.supply &&
                            item.attribute.category &&
                            item.attribute.rarity &&
                            item.attributes?.find((item) => {
                              return !item?.trait_type;
                            }) == undefined &&
                            item.attributes?.find((item) => {
                              return !item?.value;
                            }) == undefined
                              ? {}
                              : { filter: "brightness(0.5)" }
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
