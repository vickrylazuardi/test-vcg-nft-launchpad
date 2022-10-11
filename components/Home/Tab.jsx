import React, { useState } from "react";
import Slider from "react-slick";
import CardItem from "../Common/CardItem";

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
  const [item] = useState([1, 2, 3, 4, 5, 6]);
  const [tab] = useState([
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
        <Slider {...settings}>
          {
            activeTab == 0 ?
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
            )) : 
            activeTab == 1 ?
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
            )) : 
            activeTab == 2 ?
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
            )) : 
            activeTab == 3 ?
            (
              props?.finish?.length ?
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
              )) : 
              <div style={{height: "372px"}} className="text-center py-24" >
                <img style={{width: "50%"}} src="/images/Sad_Emoji.gif" className="mx-auto" />
                <h2 className="font-semibold pt-3 text-2xl">
                  There are no {activeTab.name} Projects
                </h2>
              </div>
            ) : ""
          }
        </Slider>
      </div>
    </div>
  );
}
