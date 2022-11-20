import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import CardItem from "../Common/CardItem";
import styled from "styled-components";

export default function Tab(props) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const StyledSlider = styled(Slider)`
    .slick-track {
      margin-left: 0;
      margin-right: 0;
    }
  `;

  const [tab, setTab] = useState([
    {
      tab: 0,
      name: "Trending",
    },
    {
      tab: 1,
      name: "Coming Soon",
    },
    {
      tab: 2,
      name: "On Going",
    },
    {
      tab: 3,
      name: "Finished",
    },
  ]);
  const [activeTab, setActive] = useState(0);

  return (
    <div id="launchpad-tab" className="container mt-14">
      <div className="tab-action-container flex items-center overflow-x-auto pb-2">
        {tab.map((item) => (
          <button
            key={item}
            className={
              item.tab == activeTab
                ? "btn mr-10 lg:text-xs lg:mr-3 active-tab"
                : "btn mr-10 lg:text-xs lg:mr-3 "
            }
            style={{ minWidth: "max-content" }}
            onClick={() => setActive(item.tab)}
          >
            {item.name}
          </button>
        ))}
      </div>
      <div className="item-tab-container mt-5">
        {
          activeTab == 0 ?
          (
            props?.trending?.length ?
            <StyledSlider {...settings}>
              {
                props?.trending?.map((item, idx) => (
                  <div key={idx} className="card-wrap">
                    <CardItem
                      img={item.banner}
                      title={item.name}
                      desc={item.desc}
                      slug={item._id}
                      socmed={item.socialMedia}
                    />
                  </div>
                ))
              }
            </StyledSlider> : 
            <div className="mx-auto my-20 flex flex-col items-center">
              <img className="mb-5 w-64" src="/images/data-not-found.png" alt=""/>
              <p className="pnd-title font-semibold">No Data Found</p>
            </div>
          ) :
          activeTab == 1 ?
          (
            props?.soon?.length ?
            <StyledSlider {...settings}>
              {
                props?.soon?.map((item, idx) => (
                  <div key={idx} className="card-wrap">
                    <CardItem
                      img={item.banner}
                      title={item.name}
                      desc={item.desc}
                      slug={item._id}
                      socmed={item.socialMedia}
                    />
                  </div>
                ))
              }
            </StyledSlider> : 
            <div className="mx-auto my-20 flex flex-col items-center">
              <img className="mb-5 w-64" src="/images/data-not-found.png" alt=""/>
              <p className="pnd-title font-semibold">No Data Found</p>
            </div>
          ) :
          activeTab == 2 ?
          (
            props?.ongoing?.length ?
            <StyledSlider {...settings}>
              {
                props?.ongoing?.map((item, idx) => (
                  <div key={idx} className="card-wrap">
                    <CardItem
                      img={item.banner}
                      title={item.name}
                      desc={item.desc}
                      slug={item._id}
                      socmed={item.socialMedia}
                    />
                  </div>
                ))
              }
            </StyledSlider> : 
            <div className="mx-auto my-20 flex flex-col items-center">
              <img className="mb-5 w-64" src="/images/data-not-found.png" alt=""/>
              <p className="pnd-title font-semibold">No Data Found</p>
            </div>
          ) :
          activeTab == 3 ?
          (
            props?.finish?.length ?
            <StyledSlider {...settings}>
              {
                props.finish.map((item, idx) => (
                  <div key={idx} className="card-wrap">
                    <CardItem
                      img={item.banner}
                      title={item.name}
                      desc={item.desc}
                      slug={item._id}
                      socmed={item.socialMedia}
                    />
                  </div>
                ))
              }
            </StyledSlider> : 
            <div className="mx-auto my-20 flex flex-col items-center">
              <img className="mb-5 w-64" src="/images/data-not-found.png" alt=""/>
              <p className="pnd-title font-semibold">No Data Found</p>
            </div>
          ) : ""
        }
      </div>
    </div>
  );
}
