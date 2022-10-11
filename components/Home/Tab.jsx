import React, { useState } from "react";
import Slider from "react-slick";
import CardItem from "../Common/CardItem";

export default function Tab() {
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
          <div className="card-wrap">
            <CardItem
              img={"/images/item1.png"}
              title={"Metal Slug"}
              desc={"Call of Duty adalah waralaba permainan video penembak"}
              slug={"metal-slug1"}
            />
          </div>
          <div className="card-wrap">
            <CardItem
              img={"/images/item1.png"}
              title={"Metal Slug"}
              desc={"Call of Duty adalah waralaba permainan video penembak"}
              slug={"metal-slug2"}
            />
          </div>
          <div className="card-wrap">
            <CardItem
              img={"/images/item1.png"}
              title={"Metal Slug"}
              desc={"Call of Duty adalah waralaba permainan video penembak"}
              slug={"metal-slug3"}
            />
          </div>
          <div className="card-wrap">
            <CardItem
              img={"/images/item1.png"}
              title={"Metal Slug"}
              desc={"Call of Duty adalah waralaba permainan video penembak"}
              slug={"metal-slug4"}
            />
          </div>
          <div className="card-wrap">
            <CardItem
              img={"/images/item1.png"}
              title={"Metal Slug"}
              desc={"Call of Duty adalah waralaba permainan video penembak"}
              slug={"metal-slug5"}
            />
          </div>
          <div className="card-wrap">
            <CardItem
              img={"/images/item1.png"}
              title={"Metal Slug"}
              desc={"Call of Duty adalah waralaba permainan video penembak"}
              slug={"metal-slug6"}
            />
          </div>
        </Slider>
      </div>
    </div>
  );
}
