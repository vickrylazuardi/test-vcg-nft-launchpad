import axios from "axios";
import React, { useEffect, useState } from "react";
// import Header from "../components/Home/Header";
import { API } from "../utils/globalConstant";
import CardItem from "../components/Common/CardItem";
import styled from "styled-components";
import Slider from "react-slick";
import HeaderCenter from "../components/Home/HeaderCenter";
import useMetaMask from "../wallet/hook";
import { isDesktop, isMobile } from "react-device-detect";
import Link from "next/link";

const StyledSlider = styled(Slider)`
  .slick-track {
    margin-left: 0;
    margin-right: 0;
  }
`;

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
  ],
};

export default function Home() {
  const [totalFunded, setTotalFunded] = useState(null);
  const [totalProject, setTotalProject] = useState(null);
  const [trending, setTrending] = useState(null);
  const [listProject, setListProject] = useState(null);
  const [ongoing, setOngoing] = useState([]);
  const [soon, setSoon] = useState([]);
  const [finish, setFinish] = useState([]);
  const [faq, setFaq] = useState(null);

  const { account, switchActive } = useMetaMask();

  const launchpadInfo = () => {
    try {
      axios
        .get(API.launchpad.local + API.launchpad.info.totalFunded)
        .then((res) => {
          if (res.status === 204) setTotalFunded(0);
          else handleCurrency(res.data.data.totalFunded + "");
        });
      axios
        .get(API.launchpad.local + API.launchpad.info.totalProject)
        .then((res) => {
          if (res.status === 204) setTotalProject(0);
          else setTotalProject(res.data.data.totalProject);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrency = (params) => {
    try {
      if (params > 1e12)
        setTotalFunded(
          params.slice(0, -12) + "." + params.slice(-12, -10) + "T"
        );
      else if (params > 1e9)
        setTotalFunded(params.slice(0, -9) + "." + params.slice(-9, -7) + "B");
      else if (params > 1e6)
        setTotalFunded(params.slice(0, -6) + "." + params.slice(-6, -4) + "M");
      else if (params > 1e3)
        setTotalFunded(params.slice(0, -3) + "." + params.slice(-3, -1) + "K");
      else setTotalFunded(params);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrending = () => {
    try {
      axios
        .post(API.launchpad.local + API.launchpad.project.filter, {
          limit: 10,
          status: 1,
          approved: true,
          sort: { trending: -1 },
        })
        .then((res) => {
          if (res.status === 204) return;
          setTrending(res.data.data.items);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getListProject = () => {
    try {
      axios
        .post(API.launchpad.local + API.launchpad.project.filter, {
          limit: 20,
          status: 1,
          approved: true,
          sort: {},
        })
        .then((res) => {
          if (res.status === 204) return;
          setListProject(res.data.data.items);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getOngoing = () => {
    try {
      axios
        .post(API.launchpad.local + API.launchpad.project.filter, {
          startedAt: { $lte: new Date() },
          limit: 10,
          status: 1,
          approved: true,
          approved: 1,
        })
        .then((res) => {
          if (res.status === 204) return;
          setOngoing(res.data.data.items);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getSoon = () => {
    try {
      axios
        .post(API.launchpad.local + API.launchpad.project.filter, {
          startedAt: { $gt: new Date() },
          limit: 10,
          status: 0,
          approved: true,
        })
        .then((res) => {
          if (res.status === 204) return;
          setSoon(res.data.data.items);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getFinish = () => {
    try {
      axios
        .post(API.launchpad.local + API.launchpad.project.filter, {
          finishedAt: { $lte: new Date() },
          limit: 10,
          status: 2,
          approved: true,
        })
        .then((res) => {
          if (res.status === 204) return;
          setFinish(res.data.data.items);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getFaq = () => {
    try {
      axios.post(API.launchpad.local + API.launchpad.faq.list).then((res) => {
        if (res.status === 204) return;
        setFaq(res.data.data.items);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    launchpadInfo();
    getTrending();
    getListProject();
    // getOngoing();
    // getSoon();
    // getFinish();
    // getFaq();
  }, []);

  const bgPage = {
    backgroundImage: `url('/images/bg.png')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div id="home" className="global-container">
      <HeaderCenter
        account={account}
        totalProject={totalProject}
        totalFunded={totalFunded}
      />
      <div id="launchpad-tab" className="container mt-14 md:pb-10">
        <div>
          <div className="flex justify-between items-center pr-16 pb-5">
            <p className="text-lg font-bold">Featured Projects</p>
            <Link href="/projects/Featured">
              <a className="text-sm font-bold" style={{ color: "#E28058" }}>
                See All
              </a>
            </Link>
          </div>
          <div className="item-tab-container mt-5">
            {trending?.length ? (
              <StyledSlider {...settings}>
                {trending?.map((item, idx) => (
                  <div key={idx} className="card-wrap">
                    <CardItem
                      img={item.banner ? item.banner : item.icon}
                      title={item.name}
                      desc={item.desc}
                      slug={item._id}
                      socmed={item.socialMedia}
                      startedAt={item.startedAt}
                      finishedAt={item.finishedAt}
                      totalFundRaised={item.totalFundRaised}
                      kyc={item.kyc}
                    />
                  </div>
                ))}
              </StyledSlider>
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
        <div className="mt-10">
          <div className="flex justify-between items-center pb-5 pr-16">
            <p className="text-lg font-bold">Project List</p>
            <Link href="/projects/Project-List">
              <a className="text-sm font-bold" style={{ color: "#E28058" }}>
                See All
              </a>
            </Link>
          </div>
          <div className="item-tab-container mt-5">
            {listProject?.length ? (
              <StyledSlider {...settings}>
                {listProject?.map((item, idx) => (
                  <div key={idx} className="card-wrap">
                    <CardItem
                      img={item.banner ? item.banner : item.icon}
                      title={item.name}
                      desc={item.desc}
                      slug={item._id}
                      socmed={item.socialMedia}
                      startedAt={item.startedAt}
                      finishedAt={item.finishedAt}
                      totalFundRaised={item.totalFundRaised}
                      kyc={item.kyc}
                    />
                  </div>
                ))}
              </StyledSlider>
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
      <div id="home-htb" className="container mt-14 lg:mt-6 lg:px-0 hidden">
        <h2 className="text-lg font-bold lg:text-sm mb-4 lg:px-5">
          How To Buy
        </h2>
        {/* <a href="https://vcgamers.com/news/crypto" target="_blank" rel='nofollow'> */}
        <div className="flex justify-center relative w-full">
          <iframe
            width="100%"
            style={{ aspectRatio: "2/1" }}
            src="https://www.youtube.com/embed/YPXswO_yUBQ"
            title="YouTube How To Buy"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        {/* </a> */}
      </div>
    </div>
  );
}
