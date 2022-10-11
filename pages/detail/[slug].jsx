import React, { useState } from "react";
import Slider from "react-slick";
import Link from "next/link";
import { isDesktop, isMobile } from "react-device-detect";
import ItemLaunchpad from "../../components/Common/ItemLaunchpad";

export default function _slug() {
  const [features, setFeatures] = useState([1, 2]);
  const [teams, setTeams] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  const [items, setItems] = useState([
    {
      progress: 30,
    },
    {
      progress: 50,
    },
    {
      progress: 50,
    },
    {
      progress: 100,
    },
    {
      progress: 30,
    },
    {
      progress: 30,
    },
    {
      progress: 30,
    },
  ]);
  const bgPage = {
    backgroundImage: `url('/images/bg.png')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    paddingTop: "7rem",
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const settingsItems = {
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
  const settingsTeams = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    responsive: [
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };
  return (
    <div id="detailPage" className="global-container" style={bgPage}>
      <div className="container mx-auto">
        <div className="navigation-container flex items-center">
          <Link href="/">
            <a className="flex items-center">
              <img src="/images/icon-home.png" alt="" />
              <p className="mx-3 text-sm font-semibold">Launchpad</p>
            </a>
          </Link>
          <img src="/images/svg/arrow-gray.svg" alt="" />
          <p className="ml-3 text-sm font-bold">Metal Slug</p>
        </div>

        {/* HEADER */}
        <div className="content-header flex items-start justify-between my-10 lg:mt-0 lg:flex-col">
          <div className="left flex items-start lg:flex-col lg:items-center">
            <div className="mask mask-hexagon profile-pict-container relative">
              <div
                className="mask mask-hexagon profile-wrap"
                style={{ backgroundImage: "url('/images/bgavatar-dark.png')" }}
              >
                <img
                  src="/images/item1.png"
                  alt=""
                  className="mask mask-hexagon"
                />
              </div>
            </div>
            <div className="content-text ml-3 lg:ml-0">
              <h2 className="text-4xl font-bold lg:text-center lg:text-lg">
                Metal Slug
              </h2>
              <p style={{ maxWidth: 492 }} className="font-semibold my-3">
                Crossout adalah permainan video pertempuran kendaraan gratis
                yang dikembangkan oleh Targem Games dan diterbitkan oleh Gaijin
                Entertainment untuk Android, Windows, PlayStation 4, Xbox One.
              </p>
              <p className="font-bold">Start at 5 January 2022 13:00 UTC</p>
              <div className="social-container mt-3 flex items-center lg:my-3">
                <p className="font-semibold lg:text-sm">
                  Find out more about this project
                </p>
                <div className="social flex items-center ml-5">
                  <img
                    src="/images/svg/icon-gray-web.svg"
                    alt="web vcgamers"
                    className="cursor-pointer"
                  />
                  <img
                    src="/images/svg/icon-gray-discord.svg"
                    alt="web vcgamers"
                    className="mx-4 cursor-pointer"
                  />
                  <img
                    src="/images/svg/icon-gray-tele.svg"
                    alt="web vcgamers"
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="right youtube-container overflow-hidden lg:w-full"
            style={{ borderRadius: 10 }}
          >
            {isDesktop && (
              <iframe
                width={590}
                height={332}
                src="https://www.youtube.com/embed/NvhyQkp0g8Y"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            )}
          </div>
        </div>
        {/* /HEADER */}

        {/* ITEMS */}
        <div className="item-launchpad">
          <h2 className="font-bold text-2xl mb-3 lg:text-base">Items</h2>
          <div className="item-wrapper">
            <Slider {...settingsItems}>
              {items.map((l) => (
                <div className="wrapper">
                  <ItemLaunchpad progress={l.progress} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        {/* /ITEMS */}

        {/* FEATURES SLIDERS */}
        <div className="features-container my-20 lg:mb-6">
          <Slider {...settings}>
            {features.map((res) => (
              <div className="item-feature">
                <div className="inner-feature flex items-start justify-between lg:flex-col">
                  <div className="img-wrap w-1/2 lg:w-full">
                    <img
                      src="/images/feature.png"
                      alt="feature"
                      className="lg:w-10/12 lg:mx-auto"
                    />
                  </div>
                  <div className="features-desc w-1/2 lg:w-full">
                    <h3 className="text-2xl font-bold lg:text-base lg:my-3">
                      Core Features
                    </h3>
                    <p className="mt-5 font-semibold lg:text-sm lg:mt-0">
                      $VCG Launch Pad will empower crypto currency projects with
                      the ability to distribute tokens and raise liquidity. The
                      fundamental flaws of existing launchpads is that acquiring
                      enough tokens to participate in the ecosystem is
                      prohibitive, and even if you do stake the tokens,
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        {/* /FEATURES SLIDER */}

        {/* TEAMS */}
        <div className="teams-section">
          <h2 className="font-bold text-2xl mb-3 lg:text-base">Teams</h2>
          <div className="item-wrapper">
            <Slider {...settingsTeams}>
              {teams.map((item) => (
                <div className="item-team" style={{ maxWidth: 150 }}>
                  <div className="img-wrap overflow-hidden rounded-full">
                    <img
                      src="/images/team.png"
                      alt="home"
                      width="150"
                      height="150"
                      className="mx-auto"
                    />
                  </div>
                  <h4 className="font-bold text-center mt-5 mb-1 lg:text-sm">
                    John Doe
                  </h4>
                  <p
                    className="text-sm font-semibold text-center uppercase"
                    style={{ color: " #9aa4bf" }}
                  >
                    CEO
                  </p>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        {/* /TEAMS */}
      </div>
    </div>
  );
}
