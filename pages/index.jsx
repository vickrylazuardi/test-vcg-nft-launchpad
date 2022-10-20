import Web3 from "web3";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../components/Home/Header";
import Market from "../components/Home/Market";
import Products from "../components/Home/Products";
import { API } from "../utils/globalConstant";
import Image from "next/image";
import { isDesktop, isMobile } from "react-device-detect";
import Tab from "../components/Home/Tab";

export default function Home() {
  const [totalFunded, setTotalFunded] = useState(null);
  const [totalProject, setTotalProject] = useState(null);
  const [trending, setTrending] = useState(null);
  const [ongoing, setOngoing] = useState([]);
  const [soon, setSoon] = useState([]);
  const [finish, setFinish] = useState([]);
  const [faq, setFaq] = useState(null);

  const launchpadInfo = () => {
    try {
      axios.get(API.launchpad.local + API.launchpad.info.totalFunded)
      .then(res => {
        if (res.status === 204) setTotalFunded(0);
        else handleCurrency(res.data.data.totalFunded + "");
      });
      axios.get(API.launchpad.local + API.launchpad.info.totalProject)
      .then(res => {
        if (res.status === 204) setTotalProject(0);
        else setTotalProject(res.data.data.totalProject);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleCurrency = (params) => {
    try {
      if (params > 1e12) setTotalFunded(params.slice(0,-12)+"."+params.slice(-12,-10)+"T");
      else if (params > 1e9) setTotalFunded(params.slice(0,-9)+"."+params.slice(-9,-7)+"B");
      else if (params > 1e6) setTotalFunded(params.slice(0,-6)+"."+params.slice(-6,-4)+"M");
      else if (params > 1e3) setTotalFunded(params.slice(0,-3)+"."+params.slice(-3,-1)+"K");
      else setTotalFunded(params);
    } catch (error) {
      console.log(error);
    }
  };

  const getTrending = () => {
    try {
      axios.post(API.launchpad.local + API.launchpad.project.filter, {
        limit: 10,
        status: 1,
        sort: {trending: -1}
      })
      .then(res => {
        if (res.status === 204) return;
        setTrending(res.data.data.items);
      })
    } catch (error) {
      console.log(error);
    }
  };

  const getOngoing = () => {
    try {
      axios.post(API.launchpad.local + API.launchpad.project.filter, {
        startedAt: {$lte : new Date()},
        limit: 10,
        status: 1,
        approved: true,
      })
      .then(res => {
        if (res.status === 204) return;
        setOngoing(res.data.data.items);
      })
    } catch (error) {
      console.log(error);
    }
  };

  const getSoon = () => {
    try {
      axios.post(API.launchpad.local + API.launchpad.project.filter, {
        startedAt: {$gt : new Date()},
        limit: 10,
        status: 0,
        approved: true,
      })
      .then(res => {
        if (res.status === 204) return;
        setSoon(res.data.data.items);
      })
    } catch (error) {
      console.log(error);
    }
  };

  const getFinish = () => {
    try {
      axios.post(API.launchpad.local + API.launchpad.project.filter, {
        finishedAt: {$lte : new Date()},
        limit: 10,
        status: 2,
        approved: true,
      })
      .then(res => {
        if (res.status === 204) return;
        setFinish(res.data.data.items);
      })
    } catch (error) {
      console.log(error);
    }
  };

  const getFaq = () => {
    try {
      axios.post(API.launchpad.local + API.launchpad.faq.list)
      .then(res => {
        if (res.status === 204) return;
        setFaq(res.data.data.items);
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    launchpadInfo();
    getTrending();
    getOngoing();
    getSoon();
    getFinish();
    getFaq();
  }, []);

  const bgPage = {
    backgroundImage: `url('/images/bg.png')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <div id="home" className="global-container" style={bgPage}>
      <Header 
        totalProject={totalProject} 
        totalFunded={totalFunded} 
      />
      <Tab 
        trending={trending}
        ongoing={ongoing}
        soon={soon}
        finish={finish}
      />
      {/* <Market /> */}
      <div id="home-htb" className="container mt-14 lg:mt-6 lg:px-0">
        <h2 className="font-bold text-2xl lg:text-sm mb-4 lg:px-5">
          How To Buy
        </h2>
        <a href="https://vcgamers.com/news/crypto" target="_blank" rel='nofollow'>
        <div className="relative w-full" style={{ minHeight: 150 }}>
          {isDesktop && (
            <img
              src="/images/banner-htb.png"
              alt=""
              className="rounded-xl h-auto w-full"
            />
          )}
          {isMobile && (
            <Image
              src="/images/banner-htb-mob.png"
              alt="banner how to buy"
              layout="fill"
              objectFit="cover"
              loading="lazy"
            />
          )}
        </div>
        </a>
      </div>
      {/* <Products /> */}
    </div>
  );
}
