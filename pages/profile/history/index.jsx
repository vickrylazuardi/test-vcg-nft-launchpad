import Link from "next/link";
import ProfileHeader from "../../../components/Dashboard/ProfileHeader";
import NavigationDashboard from "../../../components/Dashboard/NavigationDashboard";
import DashboardSideMenu from "../../../components/Dashboard/DashboardSideMenu";
import DashboardHistoryTransaction from "../../../components/Dashboard/DashboardHistoryTransaction";
import { toggleNavbar } from "../../../redux/navbarReducer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../utils/globalConstant";
import useMetaMask from "../../../wallet/hook";
import Pagination from "../../../components/Common/Pagination";

export default function Index() {
  const router = useRouter();
  const dispatch = useDispatch();
  const navbarHistory = {
    title: "Detail Transaction",
    status: 6,
  };

  function redirect(id) {
    dispatch(toggleNavbar(navbarHistory));
    router.push(`/profile/history/detail?id=${id}`);
  }

  const [history, setHistory] = useState([]);
  const [historyPage, setHistoryPage] = useState({});
  const [historyFilter, setHistoryFilter] = useState({
    sort: { date: -1 },
    limit: 5,
    page: 1,
  });
  const { account, signer, connectContract } = useMetaMask();

  const getHistoryList = () => {
    try {
      axios
        .post(API.launchpad.local + API.launchpad.history.filter, historyFilter)
        .then((res) => {
          if (res.status === 204) {
            setHistory([]);
            setHistoryPage({});
            return;
          }
          setHistory(res.data.data.items);
          paginate(res, historyPage, setHistoryPage);
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

  const handleHistoryFilter = (page, filter) => {
    try {
      historyFilter.page = 0;
      if (filter == "all") {
      } else {
        historyFilter.paymentStatus = filter;
      }
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

  useEffect(() => {
    if (account) {
      historyFilter.owner = account;
      setHistoryFilter({ ...historyFilter });
      getHistoryList();
    }
  }, [account]);

  useEffect(() => {
    const isLogedin = localStorage.getItem("isLogedin");
    const data = localStorage.getItem("profile-data");
    console.log("?ISLOF", isLogedin, data);
    let profile = null;
    if (isLogedin == "true") {
      console.log("profile", JSON.parse(data));
      profile = JSON.parse(data);

      setTimeout(() => {
        historyFilter.owner = profile.member_wallet;
        setHistoryFilter({ ...historyFilter });
        getHistoryList();
      }, 1000);
    }
  }, []);

  return (
    <div id="profile-launchpad">
      <div className="container mx-auto bundle-pl">
        <div className="navigation-container flex items-center">
          <Link href="/">
            <a className="flex items-center">
              <img src="/images/icon-home.png" alt="" />
            </a>
          </Link>
          <p className="ml-3 text-sm font-bold">My Profile</p>
        </div>
        {/* <ProfileHeader/>
				<NavigationDashboard/> */}
        <div className="container-wrapper grid grid-cols-5 gap-4">
          <DashboardSideMenu />
          <DashboardHistoryTransaction
            history={history}
            historyFilter={historyFilter}
            handleHistoryFilter={handleHistoryFilter}
            page={historyPage}
            pageAction={changePage}
            redirect={redirect}
          />
        </div>
      </div>
      <div className="owned-boxed-list my-2">
        {history.length ? (
          <div className="owned-boxed-item px-3 pb-3 pt-1">
            {history.map((item, index) => (
              <div
                key={index}
                className="obi-list py-2"
                onClick={() => redirect(item._id)}
              >
                <img
                  className="rounded-md mr-3"
                  src={item.image ? item.image : "/images/Broken-Image.png"}
                  alt=""
                  style={{
                    width: "50px",
                    height: "50px",
                    aspectRatio: "1/1",
                    objectFit: "contain",
                  }}
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/images/Broken-Image.png";
                  }}
                />
                <div className="obi-list-detailed" style={{ width: "55%" }}>
                  <p className="font-bold">{item.name}</p>
                  <p className="font-bold text-green-500">
                    {item.amount > 1 ? `${item.amount} Boxes` : "1 Box"}
                  </p>
                  <p className="font-semibold text-gray-400">
                    {item.projectName}
                  </p>
                  <p className="font-semibold text-gray-400">
                    {new Date(item.date).toLocaleString()}
                  </p>
                  {item.paymentType == "fiat" ? (
                    <div className="flex mt-1">
                      <div>
                        <img
                          style={{
                            width: 20,
                            height: 20,
                            objectFit: "contain",
                          }}
                          className="mr-2"
                          src={item.paymentDetail?.bank_image}
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-color-grey">
                          {item.paymentDetail?.bank_name}
                        </p>
                        <p className="text-xs font-bold text-white">
                          Rp. {item.paymentDetail?.total}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex mt-1">
                      <div>
                        <img
                          style={{
                            width: 20,
                            height: 20,
                            objectFit: "contain",
                          }}
                          className="mr-2 m-auto"
                          src="/images/coin-vcg.png"
                          alt=""
                        />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-color-grey">
                          VCG
                        </p>
                        <p className="text-xs font-bold text-white">
                          {item.price}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className="obi-list-detailed flex justify-end"
                  style={{ width: "35%" }}
                >
                  {item.action == 0 ? (
                    <>
                      {/* <button className="buy px-3 py-1 rounded-md">Buy</button> */}
                      {item?.paymentStatus == "paid" ? (
                        <button
                          className="text-xs px-2 py-0.5 rounded-md mr-2"
                          style={{ background: "#86F1DE", color: "#034E40" }}
                          disabled
                        >
                          Purchesed
                        </button>
                      ) : item?.paymentStatus == "unpaid" ? (
                        <button
                          className="text-xs px-2 py-0.5 rounded-md mr-2"
                          style={{ background: "#B5C6FF", color: "#041956" }}
                          disabled
                        >
                          {item?.paymentType == "fiat"
                            ? "Waiting Payment"
                            : "Unpaid"}
                        </button>
                      ) : (
                        <button
                          className="text-xs px-2 py-0.5 rounded-md mr-2"
                          style={{ background: "#86F1DE", color: "#034E40" }}
                          disabled
                        >
                          Purchesed
                        </button>
                      )}
                    </>
                  ) : item.action == 1 ? (
                    <button
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{ background: "#BFE9F6", color: "#024357" }}
                      disabled
                    >
                      Claim
                    </button>
                  ) : (
                    <button
                      className="text-xs px-2 py-0.5 rounded-md"
                      style={{ background: "#F07D59", color: "#4F0B0F" }}
                      disabled
                    >
                      Refund
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="my-16 flex flex-col items-center">
            <img
              className="mb-5 w-64"
              src="/images/data-not-found.png"
              alt=""
            />
            <p className="pnd-title">No Data Found</p>
          </div>
        )}
        {historyPage.currentPage ? (
          <div className="mt-2">
            <Pagination page={historyPage} pageAction={changePage} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
