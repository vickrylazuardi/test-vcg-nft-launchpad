import React, { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { HiOutlineExternalLink } from "react-icons/hi";
import moment from "moment";

import axios from "axios";
import { API } from "../../utils/globalConstant";
import useMetaMask from "../../wallet/hook";
import Pagination from "../../components/Common/Pagination";

const listTable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export default function ContentActivty(props) {
  const [activeContent, setActiveContent] = useState("sales");

  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyPage, setHistoryPage] = useState({});
  const [historyFilter, setHistoryFilter] = useState({
    sort: { date: -1 },
    limit: 5,
    page: 1,
    address: props.project.address,
  });
  const { account, signer, connectContract } = useMetaMask();

  const getHistoryList = () => {
    setLoading(true);
    try {
      axios
        .post(API.launchpad.local + API.launchpad.history.filter, historyFilter)
        .then((res) => {
          if (res.status === 204) {
            setHistory([]);
            setHistoryPage({});
            setLoading(false);
            return;
          }
          // console.log("history",res);
          setHistory(res.data.data.items);
          paginate(res, historyPage, setHistoryPage);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const changePage = (page) => {
    try {
      historyFilter.page = page;
      setHistoryFilter({ ...historyFilter });
      getHistoryList();
    } catch (error) {
      console.log(error);
    }
  };

  const paginate = async (res, getter, setter) => {
    try {
      let page = {};
      page.currentPage = res.data.data.page;
      page.maxPage = res.data.data.totalPage;
      if (page.currentPage < 4 && page.maxPage > 5) {
        page.listPage = [1, 2, 3, 4, 5];
      } else if (
        page.currentPage >= 4 &&
        page.currentPage + 2 <= page.maxPage
      ) {
        let list = [];
        for (let i = page.currentPage - 2; i <= page.currentPage + 2; i++) {
          list.push(i);
        }
        page.listPage = list;
      } else if (page.maxPage > 5) {
        let list = [];
        for (let i = page.maxPage - 4; i <= page.maxPage; i++) {
          list.push(i);
        }
        page.listPage = list;
      } else {
        let list = [];
        for (let i = 1; i <= page.maxPage; i++) {
          list.push(i);
        }
        page.listPage = list;
      }
      getter = page;
      setter({ ...getter });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (account) {
  //     // historyFilter.owner = account;
  //     setHistoryFilter({ ...historyFilter });
  //     getHistoryList();
  //   }
  // }, [account]);

  useEffect(() => {
    // historyFilter.owner = account;
    setHistoryFilter({ ...historyFilter });
    getHistoryList();
  }, []);

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
          <TableWeb
            loading={loading}
            history={history}
            page={historyPage}
            pageAction={changePage}
          />
          <TableMobile
            history={history}
            page={historyPage}
            pageAction={changePage}
          />
          {history.length > 0 ? (
            <div className="mt-8">
              <Pagination page={historyPage} pageAction={changePage} />
            </div>
          ) : (
            ""
          )}
        </>
      ) : (
        <ContentTimeline project={props.project} />
      )}
    </>
  );
}

function TableWeb(props) {
  // useEffect(() => {
  //   if (props.history) {
  //     console.log("table desktop", props.history);
  //   }
  // }, [props.history]);
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
          {!props.loading ? (
            props.history.length > 0 ? (
              props.history.map((item, idx) => {
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
                        src={item.image}
                        alt=""
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null; // prevents looping
                          currentTarget.src = "/images/Broken-Image.png";
                        }}
                      />{" "}
                      {item.name}
                    </td>
                    <td>
                      <a
                        href={"https://testnet.bscscan.com/tx/" + item.txHash}
                        target="_blank"
                        rel="nofollow"
                      >
                        Sold
                      </a>
                    </td>
                    <td>
                      <strong>{item.price} VCG</strong>
                    </td>
                    <td className="text-color-grey">
                      {item?.projectDetail?.address?.slice(0, 7)} ...{" "}
                      {item?.projectDetail?.address?.slice(-7)}
                      <FiChevronRight className="inline text-white" />{" "}
                      {item?.owner?.slice(0, 7)} ... {item?.owner?.slice(-7)}
                    </td>
                    <td className="text-color-grey">
                      {moment(item.date).local().format("DD MMM YYYY HH:mm")}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="row-dark">
                <td colSpan={6}>
                  <div className="mx-auto my-20 flex flex-col items-center">
                    <img
                      className="mb-5 w-64"
                      src="/images/data-not-found.png"
                      alt=""
                    />
                    <p className="pnd-title font-semibold">No Data Found</p>
                  </div>
                </td>
              </tr>
            )
          ) : (
            <tr className="row-dark">
              <td colSpan={6}>
                <div className="mx-auto my-20 flex flex-col items-center">
                  <img
                    width={150}
                    height={150}
                    className="mb-5"
                    src="/loaders/loaders.gif"
                    alt=""
                  />
                </div>
              </td>
            </tr>
          )}
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
        {props.history.map((item, idx) => {
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
                  src={item.image}
                  alt=""
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/images/Broken-Image.png";
                  }}
                />{" "}
                {item.name}
              </div>
              <div className="flex py-2">
                <div className="w-1/2">
                  <p className="text-xs">Price</p>
                </div>
                <div className="w-1/2">
                  <h6 className="text-xs text-end font-bold">
                    {item.price} VCG
                  </h6>
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
                    {item?.projectDetail?.address?.slice(0, 7)} ...{" "}
                    {item?.projectDetail?.address?.slice(-7)}
                    <FiChevronRight className="inline text-white" />{" "}
                    {item?.owner?.slice(0, 7)} ... {item?.owner?.slice(-7)}
                  </h6>
                </div>
              </div>
              <div className="flex py-2">
                <div className="w-1/2">
                  <p className="text-xs">Date</p>
                </div>
                <div className="w-1/2">
                  <h6 className="text-xs text-end text-color-grey">
                    {moment(item.date).local().format("DD MMM YYYY HH:mm")}{" "}
                    <a
                      href={"https://testnet.bscscan.com/tx/" + item.txHash}
                      target="_blank"
                      rel="nofollow"
                    >
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
  // console.log('in timeline',props);
  return (
    <ul className="proses-listing list-unstyled">
      <li id="process-1" className="list-proses active">
        <span className="date-timeline">
          {moment(props.project.createdAt).local().format("DD MMM YYYY")}
        </span>
        <div className="list-proses-content">
          <h6 className="fw-bold">Approve this item </h6>
          <p className="mb-0">
            To get set up for listings for the first time, you must approve this
            item for sale, which requires a one-time gas fee.
          </p>
        </div>
      </li>
      <li id="process-2" className="list-proses active">
        <span className="date-timeline">
          {moment(props.project.approvedAt).local().format("DD MMM YYYY")}
        </span>
        <div className="list-proses-content">
          <h6 className="fw-bold">Confirm Listing </h6>
          <p className="mb-0">
            Accept the signature request in your wallet and wait for your
            listing to process.
          </p>
        </div>
      </li>
      <li id="process-3" className="list-proses">
        <span className="date-timeline">
          {moment(props.project.startedAt).local().format("DD MMM YYYY")}
        </span>
        <div className="list-proses-content">
          <h6 className="fw-bold">Listing In Process </h6>
          <p className="mb-0">
            Your item listing is being processed, please check the listing
            status regularly.
          </p>
        </div>
      </li>
      <li id="process-3" className="list-proses">
        <span className="date-timeline">
          {moment(props.project.finishedAt).local().format("DD MMM YYYY")}
        </span>
        <div className="list-proses-content">
          <h6 className="fw-bold">Finished Project </h6>
          <p className="mb-0">
            Your item listing is being processed, please check the listing
            status regularly.
          </p>
        </div>
      </li>
    </ul>
  );
}
