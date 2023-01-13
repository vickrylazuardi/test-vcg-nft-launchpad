import React, { useEffect, useState } from "react";
import { FormInputImage } from "../../components/Common/formComponent";

export default function Table4(props) {
  const [category, setCategory] = useState([]);

  function handleAddBoxes() {
    let formDefault = {
      images: "",
      boxName: "",
      price: "",
      supply: "",
      items: [],
      completed: false,
    };

    props.list.boxes.push(formDefault);
    props.setList({ ...props.list });
  }

  function handleInputBoxesImage(file, idx) {
    const index = idx.split("-")[1];
    props.list.boxes[index].images = file;
    props.setList({ ...props.list });
  }

  function handleAddItemsBoxs(idx) {
    let formDefaultItems = {
      category: "",
      qty: 0,
    };

    props.list.boxes[idx].items.push(formDefaultItems);
    props.setList({ ...props.list });
  }

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

  useEffect(() => {
    category.splice(0);
    setCategory([...category]);
    props.list.items.map((item) => {
      const categoryName = item.attribute.category;
      if (!category.includes(categoryName)) {
        category.push(categoryName);
        setCategory([...category]);
      }
    });
  }, [props]);

  return (
    <table className="table-flexible">
      <thead>
        <tr>
          <th>No</th>
          <th style={{ minWidth: "110px" }}>Image Boxes</th>
          <th style={{ minWidth: "300px" }}>Boxes Information</th>
          <th style={{ minWidth: "300px" }}>item</th>
          <th style={{ textAlign: "center", minWidth: "100px" }}>
            <button
              style={{ padding: "5px" }}
              className="btn"
              type="button"
              onClick={handleAddBoxes}
            >
              <img src="/images/svg/icon-plus.svg" alt="" />
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {props?.list?.boxes?.length ? (
          props.list.boxes.map((item, idx) => {
            return (
              <tr key={idx}>
                <td
                  className="text-center"
                  style={{
                    padding: "5px",
                    width: "30px",
                    verticalAlign: "top",
                  }}
                >
                  {idx + 1}
                </td>
                <td style={{ width: "135px", verticalAlign: "top" }}>
                  <FormInputImage
                    cssCustom={"wh-100-100"}
                    result={handleInputBoxesImage}
                    idx={`box-${idx}`}
                    preview={props.list.boxes[idx].images}
                  />
                </td>
                <td style={{ verticalAlign: "top" }}>
                  {props.list.boxes[idx].completed ? (
                    <div>
                      <p className="text-sm font-semibold mb-2">
                        {props.list.boxes[idx].boxName}
                      </p>
                      <p
                        style={{ color: "#E28058" }}
                        className="text-sm font-semibold mb-2"
                      >
                        {props.list.boxes[idx].price}
                      </p>
                      <p
                        style={{ color: "#9AA4BF" }}
                        className="text-sm font-semibold"
                      >
                        {props.list.boxes[idx].supply}
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center">
                        <div
                          className="text-sm font-semibold"
                          style={{ color: "#9AA4BF", width: "60px" }}
                        >
                          <label>Name</label>
                        </div>
                        <div className="wrap-input border-dark flex-1">
                          <input
                            type="text"
                            className="w-full"
                            placeholder="Box Name"
                            value={props.list.boxes[idx].boxName}
                            onChange={(e) => {
                              props.list.boxes[idx].boxName = e.target.value;
                              props.setList({ ...props.list });
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center mt-3">
                        <div
                          className="text-sm font-semibold"
                          style={{ color: "#9AA4BF", width: "60px" }}
                        >
                          <label>Price</label>
                        </div>
                        <div className="wrap-input border-dark flex-1">
                          <input
                            type="text"
                            className="w-full"
                            placeholder="Box Price"
                            value={props.list.boxes[idx].price}
                            onChange={(e) => {
                              if (!/[0-9]/i.test(e.nativeEvent.data))
                                e.target.value = e.target.value.slice(0, -1);
                              if (e.target.value <= 0) e.target.value = "";
                              props.list.boxes[idx].price = e.target.value;
                              props.setList({ ...props.list });
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center mt-3">
                        <div
                          className="text-sm font-semibold"
                          style={{ color: "#9AA4BF", width: "60px" }}
                        >
                          <label>Supply</label>
                        </div>
                        <div className="wrap-input border-dark flex-1">
                          <input
                            type="number"
                            className="w-full"
                            placeholder="Box Supply"
                            value={props.list.boxes[idx].supply}
                            onChange={(e) => {
                              if (!/[0-9]/i.test(e.nativeEvent.data))
                                e.target.value = e.target.value.slice(0, -1);
                              if (e.target.value <= 0) e.target.value = "";
                              props.list.boxes[idx].supply = e.target.value;
                              props.setList({ ...props.list });
                            }}
                          />
                        </div>
                      </div>
                    </>
                  )}
                </td>
                <td style={{ verticalAlign: "top" }}>
                  {props.list.boxes[idx].completed
                    ? props.list.boxes[idx].items
                      ? props.list.boxes[idx].items.map((i, index) => {
                          return (
                            <span key={index} className="boxes-items mr-3">
                              {props.list.boxes[idx].items[index].category} (
                              {props.list.boxes[idx].items[index].qty})
                            </span>
                          );
                        })
                      : ""
                    : props.list.boxes[idx].items
                    ? props.list.boxes[idx].items.map((boxItem, index) => {
                        return (
                          <div
                            key={index}
                            className={`flex ${index == 0 ? "" : "mt-3"}`}
                          >
                            <div
                              style={{ minWidth: "150px" }}
                              className="wrap-input border-dark flex-1 mr-3"
                            >
                              <select
                                className="w-full"
                                value={
                                  props.list.boxes[idx].items[index].category
                                }
                                onChange={(e) => {
                                  if (e.target.value == "new-items")
                                    handleAddItems();
                                  else {
                                    props.list.boxes[idx].items[
                                      index
                                    ].category = e.target.value;
                                    props.setList({ ...props.list });
                                  }
                                }}
                              >
                                <option selected hidden>
                                  Select Category
                                </option>
                                {category.length ? (
                                  category.map((item) => (
                                    <option
                                      key={item}
                                      value={item}
                                      className="text-black"
                                    >
                                      {item}
                                    </option>
                                  ))
                                ) : (
                                  <option
                                    value="new-items"
                                    className="text-black"
                                  >
                                    Add New Item
                                  </option>
                                )}
                              </select>
                            </div>
                            <div className="wrap-input input-qty border-dark mx-3">
                              <button
                                onClick={() => {
                                  props.list.boxes[idx].items[index].qty -= 1;
                                  props.setList({ ...props.list });
                                }}
                                disabled={
                                  props.list.boxes[idx].items[index].qty == 0
                                }
                              >
                                -
                              </button>
                              <input
                                type="number"
                                min={0}
                                value={props.list.boxes[idx].items[index].qty}
                                placeholder="0"
                                onChange={(e) => {
                                  const val = e.target.value.replace(
                                    /[^0-9]/g,
                                    ""
                                  );
                                  if (e.target.value) {
                                    if (e.target.value === "0") {
                                      e.target.value = "";
                                    } else {
                                      e.target.value = val;
                                    }
                                  }
                                  // if (!/[0-9]/i.test(e.nativeEvent.data)) e.target.value = e.target.value.slice(0, -1);
                                  // if (e.target.value <= 0) e.target.value = "";
                                  props.list.boxes[idx].items[index].qty =
                                    e.target.value;
                                  props.setList({ ...props.list });
                                }}
                              />
                              <button
                                onClick={() => {
                                  props.list.boxes[idx].items[index].qty += 1;
                                  props.setList({ ...props.list });
                                }}
                              >
                                +
                              </button>
                            </div>
                            <div>
                              <button
                                style={{ padding: "10px", minWidth: "50px" }}
                                onClick={() => {
                                  props.list.boxes[idx].items.splice(index, 1);
                                  props.setList({ ...props.list });
                                }}
                              >
                                <img src="/images/svg/icon-trash.svg" alt="" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    : ""}

                  {!props.list.boxes[idx].completed && (
                    <button
                      style={{ padding: "10px" }}
                      className="btn btn-gray text-sm mt-3"
                      onClick={() => handleAddItemsBoxs(idx)}
                    >
                      + Add Item
                    </button>
                  )}
                </td>
                <td
                  className="text-center"
                  style={{ padding: "5px", width: "100px" }}
                >
                  {props.list.boxes[idx].completed ? (
                    <>
                      <button
                        style={{ padding: "5px" }}
                        className="btn"
                        onClick={() => {
                          props.list.boxes.splice(idx, 1);
                          props.setList({ ...props.list });
                        }}
                      >
                        <img src="/images/svg/icon-trash.svg" alt="" />
                      </button>
                      <button
                        style={{ padding: "5px" }}
                        className="btn"
                        onClick={() => {
                          props.list.boxes[idx].completed = false;
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
                          props.list.boxes.splice(idx, 1);
                          props.setList({ ...props.list });
                        }}
                      >
                        <img src="/images/svg/icon-times.svg" alt="" />
                      </button>
                      <button
                        style={{ padding: "5px" }}
                        className="btn"
                        onClick={() => {
                          props.list.boxes[idx].completed = true;
                          props.setList({ ...props.list });
                        }}
                        disabled={
                          item.images &&
                          item.boxName &&
                          item.price &&
                          item.supply &&
                          item.items.length &&
                          item.items?.find((item) => {
                            return !item?.category;
                          }) == undefined &&
                          item.items?.find((item) => {
                            return item?.qty < 1;
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
                            item.boxName &&
                            item.price &&
                            item.supply &&
                            item.items.length &&
                            item.items?.find((item) => {
                              return !item?.category;
                            }) == undefined &&
                            item.items?.find((item) => {
                              return item?.qty < 1;
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
                  Please input your team boxes
                </p>
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
