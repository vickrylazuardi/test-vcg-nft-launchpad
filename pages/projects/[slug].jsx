import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import NavbarMobileWithBack from "../../components/NavbarMobileWithBack";
import SelectInput from "../../components/Common/SelectInput";
import { API } from "../../utils/globalConstant";
import CardItem from "../../components/Common/CardItem";
import axios from "axios";
import Pagination from "../../components/Common/Pagination";
import DialogFilterListProjectsWMR from "../../components/Common/DialogFilterListProjectsWMR";
import { useDispatch, useSelector } from "react-redux";
import { toggleModalFilterListProjectsWMR } from "../../redux/modalReducer";
import moment from "moment";

const listStatus = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Coming Soon",
    value: "coming-soon",
  },
  {
    label: "On Going",
    value: "on-going",
  },
  {
    label: "Finished",
    value: "finished",
  },
];

const listTypePayment = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Crypto",
    value: "crypto",
  },
  {
    label: "Fiat",
    value: "fiat",
  },
];

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const optionsSort = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "popular", label: "Popular" },
  // FIXME : perlu difine berapa periode waktu sebelum finish soon
  // { value: "finish-soon", label: "Finish Soon" },
];

const modalFilterListProjectsWMR = {
  loading: false,
  isOpen: true,
  title: {
    en: "Filter",
  },
};

export default function Projects(props) {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const router = useRouter();
  const [textSlug, setTextSlug] = useState("");
  const [statusSelected, setStatusSelected] = useState("all");
  // const [typePaymentSelected, setTypePaymentSelected] = useState("all");
  const [sortSelected, setsortSelected] = useState({
    value: "newest",
    label: "Newest",
  });
  const [kycSelected, setKycSelected] = useState(false);

  const [loading, setLoading] = useState(false);
  const [listProject, setListProject] = useState(null);
  const [listProjectPage, setListProjectPage] = useState({});
  const [listProjectFilter, setListProjectFilter] = useState({
    limit: 20,
    approved: true,
    page: 1,
    sort: { date: -1 },
  });

  function handleChangeGenre(val) {
    console.log(">>>", val);
  }

  const getListProject = () => {
    setLoading(true);
    try {
      axios
        .post(
          API.launchpad.local + API.launchpad.project.filter,
          listProjectFilter
        )
        .then((res) => {
          if (res.status === 204) {
            setListProject([]);
            setListProjectPage({});
            setLoading(false);
            return;
          }
          setListProject(res.data.data.items);
          paginate(res, listProjectPage, setListProjectPage);
          setLoading(false);
        });
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

  const changePage = (page) => {
    try {
      listProjectPage.page = page;
      setListProjectFilter({ ...listProjectFilter, ...listProjectPage });
    } catch (error) {
      console.log(error);
    }
  };

  function handleSelectStatus(val) {
    switch (val) {
      case "all":
        listProjectFilter.limit = 20;
        listProjectFilter.page = 1;
        listProjectFilter.approved = true;
        delete listProjectFilter["startedAt"];
        delete listProjectFilter["finishedAt"];
        setListProjectFilter({ ...listProjectFilter });

        break;
      case "coming-soon":
        listProjectFilter.limit = 20;
        listProjectFilter.page = 1;
        listProjectFilter.approved = true;
        listProjectFilter.startedAt = { $gt: new Date() };
        delete listProjectFilter["finishedAt"];
        setListProjectFilter({ ...listProjectFilter });

        break;
      case "on-going":
        listProjectFilter.limit = 20;
        listProjectFilter.page = 1;
        listProjectFilter.approved = true;
        listProjectFilter.startedAt = { $lte: new Date() };
        delete listProjectFilter["finishedAt"];
        setListProjectFilter({ ...listProjectFilter });

        break;
      case "finished":
        listProjectFilter.limit = 20;
        listProjectFilter.page = 1;
        listProjectFilter.approved = true;
        listProjectFilter.finishedAt = { $lte: new Date() };
        delete listProjectFilter["startedAt"];
        setListProjectFilter({ ...listProjectFilter });

        break;

      default:
        break;
    }
  }

  function handleSelectSort(val) {
    setsortSelected(val);
    switch (val.value) {
      case "newest":
        listProjectFilter.sort = { date: -1 };
        setListProjectFilter({ ...listProjectFilter });
        break;
      case "oldest":
        listProjectFilter.sort = { date: 1 };
        setListProjectFilter({ ...listProjectFilter });
        break;
      case "popular":
        listProjectFilter.sort = { trending: -1 };
        setListProjectFilter({ ...listProjectFilter });
        break;

      default:
        break;
    }
  }

  function handleChangekyc(val) {
    if (val) {
      listProjectFilter.kyc = { status: true };
      setListProjectFilter({ ...listProjectFilter });
    } else {
      delete listProjectFilter["kyc"];
      setListProjectFilter({ ...listProjectFilter });
    }
  }

  function handleReset() {
    setsortSelected({
      value: "newest",
      label: "Newest",
    });
    setKycSelected(false);
    setStatusSelected("all");
    setListProjectFilter({
      limit: 20,
      page: 1,
      approved: true,
      sort: { date: -1 },
    });
  }

  useEffect(() => {
    if (router.query.slug) {
      let slug = router.query.slug.split("-");
      let text = "";

      slug.forEach((item) => {
        text += " " + item;
      });
      setTextSlug(text);
    } else {
      setTextSlug("List Projects");
    }
  }, []);

  useEffect(() => {
    if (listProjectFilter) {
      getListProject();
    }
  }, [listProjectFilter]);

  return (
    <>
      <NavbarMobileWithBack
        title={textSlug}
        isFilterSort={true}
        optionsSort={optionsSort}
        onChangeSort={handleSelectSort}
        sortSelected={sortSelected}
        modalFilterListProjectsWMR={modalFilterListProjectsWMR}
        dispatch={dispatch}
        toggleModalFilterListProjectsWMR={toggleModalFilterListProjectsWMR}
      />

      <div className="global-container">
        <div className="container mx-auto mt-0 md:mt-16">
          <div className="navigation-container flex items-center">
            <Link href="/">
              <a className="flex items-center">
                <img src="/images/icon-home.png" alt="" />
                <p className="mx-3 text-sm font-semibold">Launchpad</p>
              </a>
            </Link>
            <img src="/images/svg/arrow-gray.svg" alt="" />
            <p className="ml-3 text-sm font-bold text-color-primary">
              {textSlug}
            </p>
          </div>
          <div className="mt-5">
            <div className="flex justify-between items-center md:hidden">
              <h1 className="text-2xl font-bold lg:text-lg">{textSlug}</h1>
              <SelectInput
                className="label-dark w-40"
                label="Sort"
                placeholder="Select Sort"
                options={optionsSort}
                defaultValue={sortSelected}
                onChange={handleSelectSort}
              />
            </div>
            <div className="flex gap-4 mt-6">
              <div className="w-1/4 block md:hidden">
                <div className="card-dark">
                  <p className="font-bold mb-5">Filter</p>
                  <div className="">
                    <p className="text-sm font-semibold text-color-grey">
                      Status
                    </p>
                    {listStatus.map((item, idx) => {
                      return (
                        <div key={idx}>
                          <div className="radio-item">
                            <input
                              type="radio"
                              id={item.value}
                              name="select_status"
                              value={item.value}
                              onChange={(e) => {
                                setStatusSelected(e.target.value);
                                handleSelectStatus(e.target.value);
                              }}
                              checked={statusSelected == item.value}
                            />
                            <label htmlFor={item.value}>{item.label}</label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-color-grey">KYC</p>
                    <div className="wrap-switch-input flex items-center mt-2">
                      <label className="switch-input">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            setKycSelected(e.target.checked);
                            handleChangekyc(e.target.checked);
                          }}
                          checked={kycSelected}
                        />
                        <span className="slider"></span>
                      </label>
                      <p className="text-sm font-semibold text-color-grey px-2">
                        {kycSelected ? "Show KYC Only" : "Show All"}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5">
                    <p
                      className="text-sm font-semibold text-center cursor-pointer"
                      style={{ color: "#6B9AD1" }}
                      onClick={() => handleReset()}
                    >
                      Reset Filter
                    </p>
                  </div>
                  {/* <div className="mt-5">
                    <p className="text-sm font-semibold text-color-grey">
                      Payment Support
                    </p>
                    {listTypePayment.map((item, idx) => {
                      return (
                        <div key={idx}>
                          <div className="radio-item">
                            <input
                              type="radio"
                              id={item.value}
                              name="select_type_payment"
                              value={item.value}
                              onChange={(e) =>
                                setTypePaymentSelected(e.target.value)
                              }
                              checked={typePaymentSelected == item.value}
                            />
                            <label htmlFor={item.value}>{item.label}</label>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <br /> */}
                  {/* <div className="mt-5">
                    <SelectInput
                      label="Genre"
                      options={options}
                      placeholder="Selecttttt"
                      onChange={handleChangeGenre}
                    />
                  </div> */}
                  {/* <div className="mt-8">
                    <SelectInput
                      label="Platform"
                      options={options}
                      placeholder="Selecttttt"
                      onChange={handleChangeGenre}
                    />
                  </div> */}
                </div>
              </div>
              <div className="w-3/4 md:w-full">
                <div>
                  {loading ? (
                    <div className="text-center">
                      <img
                        width={200}
                        height={200}
                        src="/loaders/loaders.gif"
                        className="m-auto"
                        alt=""
                      />
                    </div>
                  ) : listProject?.length > 0 ? (
                    <>
                      <div className="item-wrapper grid gap-4 grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                        {listProject?.map((item, idx) => {
                          console.log(">>>", item);
                          return (
                            <div key={idx} className="card-wrap">
                              <CardItem
                                img={item.banner ? item.banner : item.icon}
                                title={item.name}
                                desc={item.desc}
                                slug={item._id}
                                socmed={item.socialMedia}
                                isCardDark={true}
                                startedAt={item.startedAt}
                                finishedAt={item.finishedAt}
                                totalFundRaised={item.totalFundRaised}
                                kyc={item.kyc}
                              />
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-8">
                        <Pagination
                          page={listProjectPage}
                          pageAction={changePage}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="mx-auto my-20 flex flex-col items-center">
                      <img
                        className="mb-5 w-64"
                        src="/images/data-not-found.png"
                        alt=""
                      />
                      <p className="pnd-title font-semibold">No Data Found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {modal.modalFilterListProjectsWMR.isOpen && (
        <DialogFilterListProjectsWMR
          listStatus={listStatus}
          statusSelected={statusSelected}
          setStatusSelected={setStatusSelected}
          handleSelectStatus={handleSelectStatus}
          setKycSelected={setKycSelected}
          handleChangekyc={handleChangekyc}
          kycSelected={kycSelected}
          handleReset={handleReset}
        />
      )}
    </>
  );
}
