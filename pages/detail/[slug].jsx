import React, { useEffect, useState } from "react";
import axios from "axios";
import { ethers } from "ethers";
import Slider from "react-slick";
import Link from "next/link";
import { useRouter } from 'next/router'
import { API } from "../../utils/globalConstant";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isDesktop, isMobile } from "react-device-detect";
import useMetaMask, { MetaMaskProvider } from "../../wallet/hook";
import ItemLaunchpad from "../../components/Common/ItemLaunchpad";
import { vcgEnableTokenTestnet } from "../../utils/contractConfig";
import abiLaunchpad from '../../abi/launchpad.json';
import LoadingVcg from "../../components/Common/loadingVcg";

export default function _slug() {
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
          slidesToShow: 2.2,
          slidesToScroll: 2,
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

  const [project, setProject] = useState({});
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState({});
  const [ownedBox, setOwnedBox] = useState({});
  const { account, signer, connect, disconnect, switchActive, connectContract } = useMetaMask();

  const router = useRouter();
  const data = router.query;

  const connectWallet = async (providerType) => {
    // console.log(providerType);
    if (providerType === 'metaMask') {
      // if (isMobile) {
      //   toast.error('Please install metaMask', {
      //     position: toast.POSITION.TOP_RIGHT,
      //   });
      //   return;
      // }
      connect('metaMask', '0X4');
    } else if (providerType === 'trustWallet') {
      if (isBrowser) {
        toast.error('not detect dapp browser', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      connect('trustWallet', '0X4');
    } else if (providerType === 'safePal') {
      if (isBrowser) {
        toast.error('not detect dapp browser', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      connect('safePal', '0X4');
    } else {
      if (isMobile || !window.BinanceChain) {
        toast.error('Please install Safepal wallet', {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      connect('walletConnect');
    }
  };

  const handleDisconnect = () => {
    switchActive(false);
    disconnect();
  };

  const getTokenBalance = async () => {
    try {
      const tokenContract = connectContract(
        vcgEnableTokenTestnet.address,
        vcgEnableTokenTestnet.abi
      );
      const bal = await tokenContract.connect(signer).balanceOf(account);
      setBalance(Number(ethers.utils.formatEther(bal)));
    } catch (error) {
      console.log(error);
    }
  };

  const getDetailProject = (id) => {
    try {
      axios.get(API.launchpad.local + API.launchpad.project.detail, {
        params: {id}
      })
      .then(res => {
        if (res.status === 204) return;
        setProject(res.data.data);
      })
    } catch (error) {
      console.log(error);
    }
  };

  const getOwnedBox = async () => {
    try {
      const boxIds = Object.keys(project.boxes);
      boxIds.forEach(async (box, idx) => {
        if (account) {
          const launchpadContract = connectContract(
            project.address,
            abiLaunchpad
          );
          
          const owned = await launchpadContract
            .connect(signer)
            .balanceOf(account, idx + 1);
    
          ownedBox[box] = Number(owned);
          setOwnedBox({...ownedBox});
        } else {
          ownedBox[box] = 0;
          setOwnedBox({...ownedBox});
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkAllowance = async (box, amount, price) => {
    try {
      // document.getElementById("loading-vcg").classList.add("show");
      const tokenContract = connectContract(
        vcgEnableTokenTestnet.address,
        vcgEnableTokenTestnet.abi
      );

      const getAllowance = await tokenContract
        .connect(signer)
        .allowance(account, project.address);

      const allowance = Number(ethers.utils.formatEther(getAllowance));
      if (allowance > (Number(price) * amount)) buyBox(box, amount);
      else setAllowance(box, amount);
    } catch (error) {
      console.log(error);
    }
  };

  const setAllowance = async (box, amount) => {
    try {
      const tokenContract = connectContract(
        vcgEnableTokenTestnet.address,
        vcgEnableTokenTestnet.abi
      );
      
      const totalSupply = await tokenContract.connect(signer).totalSupply();
      const tx = await tokenContract
        .connect(signer)
        .approve(project.address, totalSupply);

      tx.wait().then((res) => {
        if (res.status == 1) buyBox(box, amount);
      });
    } catch (error) {
      console.log(error);
      // document.getElementById("loading-vcg").classList.remove("show");
      toast.error("Enable Token - Request was rejected", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const buyBox = async (box, amount) => {
    try {
      const boxIds = Object.keys(project.boxes);
      const boxId = boxIds.indexOf(box) + 1;
      
      const launchpadContract = connectContract(
        project.address,
        abiLaunchpad
      );

      const buy = await launchpadContract
        .connect(signer)
        .buyBox(boxId, amount, vcgEnableTokenTestnet.address);

      buy.hash;
      buy.wait().then((res) => {
        if (res.status == 1) {
          axios.post(API.launchpad.local + API.launchpad.project.buy, {
            id: project._id,
            box,
            amount: Number(amount),
            price: project.boxes[box].price * Number(amount)
          })
          .then(res => {
            if (res.status === 204) return;
            setProject(res.data.data);
          });
          axios.post(API.launchpad.local + API.launchpad.item.buy, {
            owner: account,
            itemName: box,
            amount,
            projectName: project.name,
            projectDetail: project._id
          });
        }
        // document.getElementById("loading-vcg").classList.remove("show");
        toast.success("Buy Box successfull!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      });
    } catch (error) {
      console.log(error);
      // document.getElementById("loading-vcg").classList.remove("show");
      toast.error("Buy Box - Request was rejected", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const finalizeBox = async (box) => {
    try {
      // document.getElementById("loading-vcg").classList.add("show");
      const boxIds = Object.keys(project.boxes);
      const boxId = boxIds.indexOf(box) + 1;
      
      const launchpadContract = connectContract(
        project.address,
        abiLaunchpad
      );

      const finalize = await launchpadContract
        .connect(signer)
        .finalizeBox(boxId);

      finalize.hash;
      finalize.wait().then((res) => {
        if (res.status == 1) {
          axios.post(API.launchpad.local + API.launchpad.project.finalize, {
            id: project._id,
            box
          })
          .then(res => {
            if (res.status === 204) return;
            setProject(res.data.data);
            // document.getElementById("loading-vcg").classList.remove("show");
            toast.success("Finalize Box successfull!", {
              position: toast.POSITION.TOP_RIGHT,
            });
          })
        }
      })
    } catch (error) {
      console.log(error);
      // document.getElementById("loading-vcg").classList.remove("show");
      toast.error("Finalize Box - Request was rejected", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const claimBox = async (box) => {
    try {
      // document.getElementById("loading-vcg").classList.add("show");
      const boxIds = Object.keys(project.boxes);
      const boxId = boxIds.indexOf(box) + 1;
      
      const launchpadContract = connectContract(
        project.address,
        abiLaunchpad
      );

      const claim = await launchpadContract
        .connect(signer)
        .claimBox(boxId, ownedBox[box]);

      claim.hash;
      claim.wait().then((res) => {
        if (res.status == 1) {
          axios.post(API.launchpad.local + API.launchpad.item.claim, {
            owner: account,
            itemName: box,
            amount: ownedBox[box],
            projectName: project.name,
            projectDetail: project._id
          });
          // axios.post(API.local + API.collections.fromLaunchpad, {
          //   collectionName: project.name,
          //   nftAddress: project.address,
          //   icon: project.icon,
          //   creator: "62f22a02a4fc9cd053b69da0",
          //   category: "62f4d4c9b6265d7d3844c86e",
          // }).then(res => {
          //   const itemArray = Object.keys(project.boxes[box].items);
          //   const itemAmount = Object.values(project.boxes[box].items);
          //   for (let i = 0; i < itemArray.length; i++) {
          //     const name = itemArray[i];
          //     const amount = itemAmount[i];
          //     axios.post(API.local + API.metadata.fromLaunchpad, {
          //       collectionId: res.data.data._id,
          //       tokenId: i + 1 + "",
          //       creator: "62f22a02a4fc9cd053b69da0",
          //       category: "62f4d4c9b6265d7d3844c86e",
          //       images: {nft: {url: "ipfs://QmZYr9C5Pp6zs3bjejm1N2KhjV25PMwaiKscBXkEmkfXU5"}},
          //       metadataName: name,
          //       name,
          //       nftAddress: project.address,
          //       owner: account,
          //       amount: ownedBox[box] * amount
          //     });
          //     axios.post(API.launchpad.local + API.launchpad.item.claimed, {
          //       name,
          //       amount,
          //       owner: account,
          //       nftAddress: project.address,
          //       projectName: project.name,
          //       projectDetail: project._id
          //     });
          //   }
          // })
          reload();
          // document.getElementById("loading-vcg").classList.remove("show");
          toast.success("Claim Box successfull!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      });
    } catch (error) {
      console.log(error);
      // document.getElementById("loading-vcg").classList.remove("show");
      toast.error("Claim Box - Request was rejected", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const reload = () => {
    try {
      getDetailProject(data.slug);
      getTokenBalance();
      getOwnedBox();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data.slug) {
      getDetailProject(data.slug);
    }
  }, [data]);

  useEffect(() => {
    if (account && signer && project.name) {
      getTokenBalance();
      getOwnedBox();
    }
  }, [project, account, signer]);

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
          <p className="ml-3 text-sm font-bold">{project?.name}</p>
        </div>

        {/* HEADER */}
        <div className="content-header flex items-start justify-between my-10 lg:mt-0 lg:flex-col">
          <div className="left flex items-start lg:flex-col lg:items-center">
            <div className="mask mask-hexagon profile-pict-container relative">
              <div
                className="mask mask-hexagon profile-wrap"
                style={{ backgroundImage: `url(${project?.banner})`, backgroundSize: "contain" }}
              >
                <img
                  src={project?.icon}
                  alt={project?.name}
                  className="mask mask-hexagon object-contain h-full w-full"
                />
              </div>
            </div>
            <div className="content-text ml-3 lg:ml-0">
              <h2 className="text-4xl font-bold lg:text-center lg:text-lg">
                {project?.name}
              </h2>
              <p style={{ maxWidth: 492 }} className="font-semibold my-3">
                {project?.desc}
              </p>
              <p className="font-bold">Start at {new Date(project?.startedAt).toUTCString()}</p>
              <div className="social-container mt-3 flex items-center lg:my-3">
                <p className="font-semibold lg:text-sm">
                  Find out more about this project
                </p>
                <div className="social flex items-center ml-5">
                  {
                    project?.socialMedia?.website ?
                    <a href={project?.socialMedia?.website} rel="nofollow" target="_blank">
                      <img
                        src="/images/svg/icon-gray-web.svg"
                        alt="web vcgamers"
                        className="cursor-pointer"
                      />
                    </a> : ""
                  }
                  {
                    project?.socialMedia?.discord ?
                    <a href={project?.socialMedia?.discord} rel="nofollow" target="_blank">
                      <img
                        src="/images/svg/icon-gray-discord.svg"
                        alt="web vcgamers"
                        className="mx-4 cursor-pointer"
                      />
                    </a> : ""
                  }
                  {
                    project?.socialMedia?.telegram ?
                    <a href={project?.socialMedia?.telegram} rel="nofollow" target="_blank">
                      <img
                        src="/images/svg/icon-gray-tele.svg"
                        alt="web vcgamers"
                        className="cursor-pointer"
                      />
                    </a> : ""
                  }
                </div>
              </div>
            </div>
          </div>
          <div
            className="right youtube-container overflow-hidden lg:hidden"
            style={{ borderRadius: 10 }}
          >
            {
              project?.socialMedia?.youtube ?
              <iframe
                width={590}
                height={332}
                src={`https://www.youtube.com/embed/${project.socialMedia.youtube.split("/").at(-1)}`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe> : ""
            }
          </div>
          {isMobile && (
            <div
              className="right youtube-container overflow-hidden w-full"
              style={{ borderRadius: 10 }}
            >
              {
                project?.socialMedia?.youtube ?
                <iframe
                  width="100%"
                  height={185}
                  src={`https://www.youtube.com/embed/${project.socialMedia.youtube.split("/").at(-1)}`}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe> : ""
              }
            </div>
          )}
        </div>
        {/* /HEADER */}

        {/* ITEMS */}
        <div className="item-launchpad">
          <h2 className="font-bold text-2xl mb-3 lg:text-base">Items</h2>
          <div className="item-wrapper">
            <Slider {...settingsItems}>
              {
                project.boxes ?
                Object.keys(project.boxes).map((item, idx) => {
                  const value = project.boxes[item];
                  const owned = ownedBox[item];
                  return (
                    <div key={idx} className="wrapper">
                      <ItemLaunchpad 
                        name={item}
                        data={value}
                        owned={owned}
                        project={project}
                        account={account}
                        claim={claimBox}
                        buy={checkAllowance}
                        finalize={finalizeBox}
                        connect={connectWallet}
                      />
                    </div>
                  )
                }) : ""
              }
            </Slider>
          </div>
        </div>
        {/* /ITEMS */}

        {/* FEATURES SLIDERS */}
        <div className="features-container my-20 lg:mb-6">
          <Slider {...settings}>
            {
              project.additionalInfo ?
              Object.keys(project.additionalInfo).map((item, idx) => {
                const value = project?.additionalInfo[item];
                return (
                  <div key={idx} className="item-feature">
                    <div className="inner-feature flex items-start justify-between gap-14 lg:flex-col">
                      <div className="img-wrap w-1/2 lg:w-full">
                        <img
                          src={value.image}
                          alt="feature"
                          className="lg:w-10/12 lg:mx-auto mr-10 rounded-xl"
                        />
                      </div>
                      <div className="features-desc w-1/2 lg:w-full">
                        <h3 className="text-2xl font-bold lg:text-base lg:my-3">
                          {item}
                        </h3>
                        <p className="mt-5 font-semibold lg:text-sm lg:mt-0">
                          {value.text}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              }) : ""
            }
          </Slider>
        </div>
        {/* /FEATURES SLIDER */}

        {/* TEAMS */}
        <div className="teams-section">
          <h2 className="font-bold text-2xl mb-3 lg:text-base">Teams</h2>
          <div className="item-wrapper">
            <Slider {...settingsTeams}>
              {
                project.team ?
                Object.keys(project.team).map((item, idx) => {
                  const value = project?.team[item];
                  return (
                    <div key={idx} className="item-team" style={{ maxWidth: 150 }}>
                      <div className="img-wrap overflow-hidden">
                        <img
                          src={value.image}
                          alt="home"
                          style={{width: "150px", height: "150px"}}
                          className="object-cover mx-auto rounded-full"
                        />
                      </div>
                      <h4 className="font-bold text-center mt-5 mb-1 lg:text-sm">
                        {item}
                      </h4>
                      <p
                        className="text-sm font-semibold text-center uppercase"
                        style={{ color: " #9aa4bf" }}
                      >
                        {value.position}
                      </p>
                      <div className="social flex justify-center gap-5 mt-3">
                        {
                          value?.socialMedia?.linkedin ?
                          <a 
                            href={
                              value?.socialMedia?.linkedin.substr(0,8) == "https://" ?
                              value?.socialMedia?.linkedin :
                              `https://${value?.socialMedia?.linkedin}`
                            } 
                            rel="nofollow" 
                            target="_blank"
                          >
                            <img
                              src="/images/svg/icon-linkedin.svg"
                              alt="web vcgamers"
                              className="cursor-pointer"
                            />
                          </a> : ""
                        }
                        {
                          value?.socialMedia?.telegram ?
                          <a 
                            href={
                              value?.socialMedia?.telegram.substr(0,8) == "https://" ?
                              value?.socialMedia?.telegram :
                              `https://${value?.socialMedia?.telegram}`
                            } 
                            rel="nofollow" 
                            target="_blank"
                          >
                            <img
                              src="/images/svg/icon-gray-tele.svg"
                              alt="web vcgamers"
                              className="cursor-pointer"
                            />
                          </a> : ""
                        }
                        {
                          value?.socialMedia?.discord ?
                          <a 
                            href={
                              value?.socialMedia?.discord.substr(0,8) == "https://" ?
                              value?.socialMedia?.discord :
                              `https://${value?.socialMedia?.discord}`
                            } 
                            rel="nofollow" 
                            target="_blank"
                          >
                            <img
                              src="/images/svg/icon-gray-discord.svg"
                              alt="web vcgamers"
                              className="cursor-pointer"
                            />
                          </a> : ""
                        }
                      </div>
                    </div>
                  )
                }) : ""
              }
            </Slider>
          </div>
        </div>
        {/* /TEAMS */}
      </div>
    </div>
  );
}
