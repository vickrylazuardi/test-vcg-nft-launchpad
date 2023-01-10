import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import { API } from "../utils/globalConstant";
import CardItem from "../components/Common/CardItem";
import styled from "styled-components";
import Slider from "react-slick";
import HeaderCenter from "../components/Home/HeaderCenter";

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
          limit: 10,
          status: 1
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
          approved: 1,
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
          approved: 1,
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
    getListProject()
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
      <HeaderCenter totalProject={totalProject} totalFunded={totalFunded} />
      <div id="launchpad-tab" className="container mt-14 md:pb-10">
        <div>
          <p className="text-lg font-bold pb-5">Featured Projects</p>
          <div className="item-tab-container mt-5">
            {trending?.length ? (
              <StyledSlider {...settings}>
                {trending?.map((item, idx) => (
                  <div key={idx} className="card-wrap">
                    <CardItem
                      img={item.banner}
                      title={item.name}
                      desc={item.desc}
                      slug={item._id}
                      socmed={item.socialMedia}
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
          <p className="text-lg font-bold pb-5">Project List</p>
          <div className="item-tab-container mt-5">
            {listProject?.length ? (
              <StyledSlider {...settings}>
                {listProject?.map((item, idx) => (
                  <div key={idx} className="card-wrap">
                    <CardItem
                      img={item.banner}
                      title={item.name}
                      desc={item.desc}
                      slug={item._id}
                      socmed={item.socialMedia}
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
    </div>
  );
}
