import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";

const listTable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export default function ContentActivty(props) {
  return (
    <>
      <TableWeb />
      <TableMobile />
    </>
  );
}

function TableWeb(props) {
  return (
    <div className="block md:hidden">
      <table className="table-dark-light w-full">
        <thead>
          <tr>
            <th>Item</th>
            <th>Event</th>
            <th>Price</th>
            <th>
              From <FiChevronRight className="inline" /> To
            </th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {listTable.map((item, idx) => {
            return (
              <tr key={idx} className={idx % 2 ? "row-light" : "row-dark"}>
                <td>
                  <img
                    className="inline"
                    width={30}
                    style={{
                      objectFit: "contain",
                      aspectRatio: "1/1",
                      borderRadius: "50%",
                    }}
                    src="/images/Broken-Image.png"
                    alt=""
                  />{" "}
                  Item {item}
                </td>
                <td>Sold</td>
                <td>
                  <strong>20.000 VCG</strong>
                </td>
                <td className="text-color-grey">
                  0x99...1232 <FiChevronRight className="inline text-white" />{" "}
                  0x99...1222
                </td>
                <td className="text-color-grey">3 Mar 2022 12:03</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function TableMobile(props) {
  return (
    <div className="hidden md:block">
      <div
        className="table-mobile"
        style={{ marginLeft: "-20px", marginRight: "-20px" }}
      >
        {listTable.map((item, idx) => {
          return (
            <div
              key={idx}
              style={
                idx == 0
                  ? { borderTop: "1px solid #3f485f" }
                  : { borderTop: "none" }
              }
              className={
                idx % 2 ? "py-2 px-3 row-dark" : "py-2 px-3  row-light"
              }
            >
              <div className="text-sm mb-2">
                <img
                  className="inline"
                  width={30}
                  style={{
                    objectFit: "contain",
                    aspectRatio: "1/1",
                    borderRadius: "50%",
                  }}
                  src="/images/Broken-Image.png"
                  alt=""
                />{" "}
                Item {item}
              </div>
              <div className="flex py-2">
                <div className="w-1/2">
                  <p className="text-xs">Price</p>
                </div>
                <div className="w-1/2">
                  <h6 className="text-xs text-end font-bold">20.000 VCG</h6>
                </div>
              </div>
              <div className="flex py-2">
                <div className="w-1/2">
                  <p className="text-xs">Event</p>
                </div>
                <div className="w-1/2">
                  <h6 className="text-xs text-end text-white">Sold</h6>
                </div>
              </div>
              <div className="flex py-2">
                <div className="w-1/2">
                  <p className="text-xs">
                    From <FiChevronRight className="inline" /> To
                  </p>
                </div>
                <div className="w-1/2">
                  <h6 className="text-xs text-end text-color-grey">
                    0x99...1232 <FiChevronRight className="inline text-white" />{" "}
                    0x99...1222
                  </h6>
                </div>
              </div>
              <div className="flex py-2">
                <div className="w-1/2">
                  <p className="text-xs">Date</p>
                </div>
                <div className="w-1/2">
                  <h6 className="text-xs text-end text-color-grey">
                    3 Mar 2022 12:03{" "}
                    <a href="#">
                      <HiOutlineExternalLink
                        className="inline text-base"
                        style={{ color: "#8865FE" }}
                      />
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
