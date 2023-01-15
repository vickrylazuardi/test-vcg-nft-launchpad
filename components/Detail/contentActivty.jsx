import React from "react";
import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";

const listTable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export default function ContentActivty(props) {
  const [activeContent, setActiveContent] = useState("sales");

  return (
    <>
      <div className="mb-7">
        <button
          className={`select-tab-orange mr-3 ${
            activeContent == "sales" ? "active" : ""
          }`}
          onClick={() => setActiveContent("sales")}
        >
          Sales
        </button>
        <button
          className={`select-tab-orange mr-3 ${
            activeContent == "timeline" ? "active" : ""
          }`}
          onClick={() => setActiveContent("timeline")}
        >
          Timeline
        </button>
      </div>

      {activeContent == "sales" ? (
        <>
          <TableWeb />
          <TableMobile />
        </>
      ) : (
        <ContentTimeline />
      )}
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

function ContentTimeline(props) {
  return (
    <ul className="proses-listing list-unstyled">
      <li id="process-1" className="list-proses active">
        <span className="date-timeline">30 Apr 2022</span>
        <div className="list-proses-content">
          <h6 className="fw-bold">Approve this item </h6>
          <p className="mb-0">
            To get set up for listings for the first time, you must approve this
            item for sale, which requires a one-time gas fee.
          </p>
        </div>
      </li>
      <li id="process-2" className="list-proses active">
        <span className="date-timeline">30 Apr 2022</span>
        <div className="list-proses-content">
          <h6 className="fw-bold">Confirm Listing </h6>
          <p className="mb-0">
            Accept the signature request in your wallet and wait for your
            listing to process.
          </p>
        </div>
      </li>
      <li id="process-3" className="list-proses">
        <span className="date-timeline">30 Apr 2022</span>
        <div className="list-proses-content">
          <h6 className="fw-bold">Listing In Process </h6>
          <p className="mb-0">
            Your item listing is being processed, please check the listing
            status regularly.
          </p>
        </div>
      </li>
    </ul>
  );
}
