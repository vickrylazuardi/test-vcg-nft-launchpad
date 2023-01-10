import React, { useEffect, useState } from "react";
import axios from "axios";
import { BigNumber, ethers } from "ethers";
import Slider from "react-slick";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleModalConfirmation,
  toggleModalClaimable,
} from "../../redux/modalReducer";
import { API } from "../../utils/globalConstant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isDesktop, isMobile } from "react-device-detect";
import useMetaMask, { MetaMaskProvider } from "../../wallet/hook";
import ItemLaunchpad from "../../components/Common/ItemLaunchpad";
import DialogConfirmation from "../../components/Common/DialogConfirmation";
import { vcgEnableToken } from "../../utils/contractConfig";
import abiLaunchpad from "../../abi/launchpad.json";
import styled from "styled-components";
import DialogClaimable from "../../components/Common/DialogClaimable";
import ContentActivty from "../../components/Detail/contentActivty";
import ContentTournament from "../../components/Detail/contentTournament";
import ItemLaunchpadv2 from "../../components/Common/ItemLaunchpadv2";
import { FiPlay } from "react-icons/fi";
import ContentTeams from "../../components/Detail/contentTeams";
import ContentItems from "../../components/Detail/contentItems";

export default function _slug() {
  const modal = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const modalConfirmationWhenSuccess = {
    loading: false,
    isOpen: true,
    isPlain: false,
    isSuccess: true,
    isFailed: false,
    title: {
      en: "Confirmation",
    },
  };

  const modalConfirmationWhenFailed = {
    loading: false,
    isOpen: true,
    isPlain: false,
    isSuccess: false,
    isFailed: true,
    title: {
      en: "Confirmation",
    },
  };

  const modalConfirmation = {
    loading: false,
    isOpen: false,
    isPlain: false,
    isSuccess: false,
    isFailed: false,
    title: {
      en: "Confirmation",
    },
  };

  const modalClaimableItem = {
    loading: true,
    isOpen: true,
    showItem: false,
    title: {
      en: "Confirmation",
    },
  };

  const bgPage = {
    backgroundImage: `url('/images/bg.png')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    paddingTop: "9rem",
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

  const StyledSlider = styled(Slider)`
    .slick-track {
      margin-left: 0;
      margin-right: 0;
    }
  `;

  const listContent = [
    "Minting",
    "Activity",
    "Items",
    "Tournament",
    "Plat Now",
    "Teams",
  ];

  const [activeContent, setActiveContent] = useState(listContent[0]);
  const [itemList, setItemList] = useState(null);
  const [project, setProject] = useState({});
  const [balance, setBalance] = useState(null);
  const [ownedBox, setOwnedBox] = useState({});
  const [dataModal, setDataModal] = useState({});
  const [modalMessage, setModalMessage] = useState({});
  const [claimReward, setClaimReward] = useState([]);
  const [itemURI, setItemURI] = useState({});
  const [isShowMoreDesc, setisShowMoreDesc] = useState(false);
  const [page, setPage] = useState({});
  const [filter, setFilter] = useState({
    attributes: {},
  });
  const [emblemKYC, setEmblemKYC] = useState("/images/KYC-Default.png");
  const { account, chainId, signer, connectContract } = useMetaMask();

  const router = useRouter();
  const data = router.query;

  const getTokenBalance = async () => {
    try {
      const tokenContract = connectContract(
        vcgEnableToken.address,
        vcgEnableToken.abi
      );
      const bal = await tokenContract.connect(signer).balanceOf(account);
      setBalance(Number(ethers.utils.formatEther(bal)));
    } catch (error) {
      console.log(error);
    }
  };

  const getDetailProject = (id) => {
    try {
      axios
        .get(API.launchpad.local + API.launchpad.project.detail, {
          params: { id },
        })
        .then((res) => {
          if (res.status === 204) return;
          setProject(res.data.data);
          getItems(res.data.data.address);
        });
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
          setOwnedBox({ ...ownedBox });
          // console.log('owned',owned);
        } else {
          ownedBox[box] = 0;
          setOwnedBox({ ...ownedBox });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const checkAllowance = async (box, amount, price) => {
    try {
      if (chainId != 56) {
        dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
        return;
      }
      const tokenContract = connectContract(
        vcgEnableToken.address,
        vcgEnableToken.abi
      );

      const getAllowance = await tokenContract
        .connect(signer)
        .allowance(account, project.address);

      const allowance = Number(ethers.utils.formatEther(getAllowance));
      if (allowance > Number(price) * amount) buyBox(box, amount);
      else setAllowance(box, amount);
    } catch (error) {
      console.log(error);
    }
  };

  const setAllowance = async (box, amount) => {
    try {
      const tokenContract = connectContract(
        vcgEnableToken.address,
        vcgEnableToken.abi
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
      dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
    }
  };

  const buyBox = async (box, amount) => {
    try {
      const boxIds = Object.keys(project.boxes);
      const boxId = boxIds.indexOf(box) + 1;

      const launchpadContract = connectContract(project.address, abiLaunchpad);

      const buy = await launchpadContract
        .connect(signer)
        .buyBox(boxId, amount, vcgEnableToken.address);

      buy.hash;
      buy
        .wait()
        .then(async (res) => {
          if (res.status == 1) {
            axios
              .post(API.launchpad.local + API.launchpad.project.buy, {
                id: project._id,
                box,
                amount: Number(amount),
                price: project.boxes[box].price * Number(amount),
              })
              .then((res) => {
                if (res.status === 204) return;
                setProject(res.data.data);
              });
            axios.post(API.launchpad.local + API.launchpad.item.buy, {
              owner: account,
              itemName: box,
              amount: Number(amount),
              image: project.boxes[box].image,
              projectName: project.name,
              projectDetail: project._id,
            });
            axios.post(API.launchpad.local + API.launchpad.history.add, {
              name: box,
              image: project.boxes[box].image,
              amount: Number(amount),
              price: project.boxes[box].price * Number(amount),
              action: 0,
              owner: account,
              txHash: res.transactionHash,
              projectName: project.name,
              projectDetail: project._id,
            });
          }
        })
        .finally(() => {
          reload();
          dispatch(toggleModalConfirmation(modalConfirmationWhenSuccess));
        });
    } catch (error) {
      console.log(error);
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
    }
  };

  const finalizeBox = async (box) => {
    try {
      const boxIds = Object.keys(project.boxes);
      const boxId = boxIds.indexOf(box) + 1;

      const launchpadContract = connectContract(project.address, abiLaunchpad);

      const finalize = await launchpadContract
        .connect(signer)
        .finalizeBox(boxId);

      finalize.hash;
      finalize.wait().then((res) => {
        if (res.status == 1) {
          axios
            .post(API.launchpad.local + API.launchpad.project.finalizeBox, {
              id: project._id,
              box,
            })
            .then((res) => {
              if (res.status === 204) return;
              setProject(res.data.data);
              reload();
              dispatch(toggleModalConfirmation(modalConfirmationWhenSuccess));
            });
        }
      });
    } catch (error) {
      console.log(error);
      dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
    }
  };

  const claimBox = async (box, amount) => {
    try {
      claimReward.splice(0);
      setClaimReward([...claimReward]);
      const boxIds = Object.keys(project.boxes);
      const boxId = boxIds.indexOf(box) + 1;
      const randomList = [];

      for (let i = 0; i < amount; i++) {
        const random = Math.floor(Math.random() * 100000000000 + 1);
        randomList.push(random);
      }

      const launchpadContract = connectContract(project.address, abiLaunchpad);

      const claim = await launchpadContract
        .connect(signer)
        .claimBox(boxId, amount, randomList);

      claim.hash;
      claim.wait().then(async (res) => {
        const reward = res.events.at(-1).args.reward;
        reward.forEach(async (e) => {
          const id = BigNumber.from(e).toNumber();
          claimReward.push(id);
          if (itemURI[id] == undefined) {
            await axios
              .post(API.launchpad.local + API.launchpad.nft.detail, {
                projectDetail: project._id,
                tokenId: id,
              })
              .then((response) => {
                const data = response.data.data;
                itemURI[id] = data;
                setItemURI({ ...itemURI });
                axios.post(API.launchpad.local + API.launchpad.ownedNft.claim, {
                  name: data.name,
                  owner: account,
                  tokenId: data.tokenId,
                  nftAddress: data.nftAddress,
                  nftDetail: data._id,
                  projectName: project.name,
                  projectDetail: project._id,
                });
              });
          }
        });
        setClaimReward([...claimReward]);
        if (res.status == 1) {
          axios.post(API.launchpad.local + API.launchpad.item.claim, {
            owner: account,
            itemName: box,
            amount: amount,
            projectName: project.name,
            projectDetail: project._id,
          });
          axios.post(API.launchpad.local + API.launchpad.history.add, {
            name: box,
            image: project.boxes[box].image,
            amount: Number(amount),
            price: 0,
            action: 1,
            owner: account,
            txHash: res.transactionHash,
            projectName: project.name,
            projectDetail: project._id,
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
          dispatch(toggleModalConfirmation(modalConfirmation));
          dispatch(toggleModalClaimable(modalClaimableItem));
        }
      });
    } catch (error) {
      console.log(error);
      dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
    }
  };

  const setModal = (data) => {
    try {
      switch (data.type) {
        case "buy":
          modalMessage.type = "Buy";
          modalMessage.amount = data.amount;
          modalMessage.message = "buy this box?";
          modalMessage.successMessage = "You have successfully bought this box";
          modalMessage.failedMessage = "Failed to buy this box";
          setModalMessage({ ...modalMessage });
          break;
        case "claim":
          modalMessage.type = "Claim";
          modalMessage.amount = data.amount;
          modalMessage.message = "claim this box?";
          modalMessage.successMessage =
            "You have successfully claimed this box";
          modalMessage.failedMessage = "Failed to claim this box";
          setModalMessage({ ...modalMessage });
          break;
        case "finalize":
          modalMessage.type = "Finalize";
          modalMessage.message = "finalize this project?";
          modalMessage.successMessage =
            "You have successfully finalized this box";
          modalMessage.failedMessage = "Failed to finalize this box";
          setModalMessage({ ...modalMessage });
          break;
        default:
          break;
      }
      for (const key in data) {
        dataModal[key] = data[key];
      }
      setDataModal({ ...dataModal });
    } catch (error) {
      console.log(error);
    }
  };

  const actionModal = () => {
    try {
      switch (dataModal.type) {
        case "buy":
          checkAllowance(dataModal.name, dataModal.amount, dataModal.price);
          break;
        case "claim":
          claimBox(dataModal.name, dataModal.amount);
          break;
        case "finalize":
          finalizeBox(dataModal.name);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const reload = () => {
    try {
      setTimeout(() => {
        getDetailProject(data.slug);
        getTokenBalance();
        getOwnedBox();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const getItems = async (nftAddress) => {
    try {
      if (!nftAddress) {
        return;
      }
      const { data } = await axios.post(API.marketplace + API.land.list, {
        nftAddress,
        page: 1,
        limit: 12,
      });
      if (data.data) {
        setItemList(data.data?.items);
        paginate(data, page, setPage);
      } else {
        setItemList([]);
        setPage({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFilterItems = async (page) => {
    try {
      if (page) {
        filter.page = page;
        (filter.limit = 12), (filter.nftAddress = project.address);
        setFilter({ ...filter });
      }
      const { data } = await axios.post(
        API.marketplace + API.land.list,
        filter
      );
      if (data) {
        setItemList(data.data?.items);
        paginate(data, page, setPage);
      } else {
        setItemList([]);
        setPage({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  const paginate = async (data, getter, setter) => {
    try {
      let page = {};
      page.currentPage = data.data.page;
      page.maxPage = data.data.totalPage;
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
    if (data.slug) {
      getDetailProject(data.slug);
    }
  }, [data]);

  useEffect(() => {
    if (account && signer && project.name) {
      getTokenBalance();
      getOwnedBox();
      setTimeout(() => {
        reload();
      }, 60000);
    }
  }, [project, account, signer]);

  return (
    <div id="detailPage" className="global-container">
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
        <div className="content-header gap-x-4 flex items-start md:items-center justify-between mt-10 mb-5 lg:mt-0 lg:flex-col">
          <div className="left flex items-start lg:flex-col lg:items-center">
            <div className="relative">
              <img
                className="absolute right-0 w-8 z-10"
                style={{
                  marginRight: "-5px",
                }}
                src={emblemKYC}
                alt=""
                onMouseEnter={() =>
                  setEmblemKYC("/images/KYC-Default-white.png")
                }
                onMouseLeave={() => setEmblemKYC("/images/KYC-Default.png")}
              />
              <div className="mask mask-hexagon profile-pict-container relative">
                <div
                  className="mask mask-hexagon profile-wrap"
                  style={{ background: "#3f485f" }}
                >
                  <img
                    src={project?.icon}
                    alt={project?.name}
                    className="mask mask-hexagon object-contain h-full w-full"
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null; // prevents looping
                      currentTarget.src = "/images/Broken-Image.png";
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="content-text ml-3 lg:ml-0">
              <h2 className="text-2xl font-bold lg:text-center lg:text-lg">
                {project?.name}
              </h2>
              <div className="hidden md:block text-center my-3">
                <button
                  className="btn btn-outline-orange-light mr-2 text-sm"
                  style={{ padding: "10px 16px" }}
                >
                  Watch Trailer
                </button>
                <button
                  className="btn btn-orange-light text-sm"
                  style={{ padding: "10px 16px" }}
                >
                  <FiPlay className="inline mr-1 text-base" />
                  Play Now
                </button>
              </div>
              <div className="my-3 text-left md:text-center">
                <p
                  style={{ maxWidth: 492 }}
                  className={`text-sm text-color-grey font-semibold ${
                    isShowMoreDesc ? "" : "max-3-line"
                  }`}
                >
                  {project?.desc}
                </p>
                {project?.desc?.length > 237 && (
                  <p
                    className="text-sm font-bold cursor-pointer"
                    style={{ color: "#E28058" }}
                    onClick={() => setisShowMoreDesc(!isShowMoreDesc)}
                  >
                    {isShowMoreDesc ? "See Less" : "See More"}
                  </p>
                )}
              </div>

              <p className="font-bold text-left md:text-center">
                Start at :{" "}
                <span className="font-semibold">
                  {new Date(project?.startedAt).toLocaleString()}
                </span>
              </p>
              <p className="font-bold text-left md:text-center mt-2">
                Finish at :{" "}
                <span className="font-semibold">
                  {new Date(project?.startedAt).toLocaleString()}
                </span>
              </p>
              <div
                style={{ borderTop: "1px solid #3F485F" }}
                className="social-container mt-3 grid grid-cols-2 md:grid-cols-1 lg:my-3 py-2"
              >
                <p className="font-semibold text-color-grey lg:text-sm text-left md:text-center">
                  Find out more about this project
                </p>
                <div className="social flex items-center justify-left md:justify-center gap-4">
                  {project?.socialMedia?.website ? (
                    <a
                      href={project?.socialMedia?.website}
                      rel="nofollow"
                      target="_blank"
                    >
                      <img
                        src="/images/svg/icon-gray-web.svg"
                        alt="web vcgamers"
                        className="cursor-pointer"
                      />
                    </a>
                  ) : (
                    ""
                  )}
                  {project?.socialMedia?.discord ? (
                    <a
                      href={project?.socialMedia?.discord}
                      rel="nofollow"
                      target="_blank"
                    >
                      <img
                        src="/images/svg/icon-gray-discord.svg"
                        alt="web vcgamers"
                        className="cursor-pointer"
                      />
                    </a>
                  ) : (
                    ""
                  )}
                  {project?.socialMedia?.telegram ? (
                    <a
                      href={project?.socialMedia?.telegram}
                      rel="nofollow"
                      target="_blank"
                    >
                      <img
                        src="/images/svg/icon-gray-tele.svg"
                        alt="web vcgamers"
                        className="cursor-pointer"
                      />
                    </a>
                  ) : (
                    ""
                  )}
                  {project?.socialMedia?.youtube ? (
                    <a
                      href={project?.socialMedia?.youtube}
                      rel="nofollow"
                      target="_blank"
                    >
                      <img
                        src="/images/svg/youtube-fill.svg"
                        alt="web vcgamers"
                        className="cursor-pointer"
                        style={{ width: "22px" }}
                      />
                    </a>
                  ) : (
                    ""
                  )}
                  {/* {
                    project?.socialMedia?.medium ?
                    <a href={project?.socialMedia?.medium} rel="nofollow" target="_blank">
                      <img
                        src="/images/svg/icon-gray-tele.svg"
                        alt="web vcgamers"
                        className="cursor-pointer"
                      />
                    </a> : ""
                  } */}
                </div>
              </div>
              <button
                className="btn btn-orange-light mt-3 block md:hidden"
                style={{ padding: "10px 16px" }}
              >
                <FiPlay className="inline mr-1 text-base" />
                Play Now
              </button>
            </div>
          </div>
          <div
            className="right youtube-container overflow-hidden lg:hidden"
            style={{ borderRadius: 10, flex: "1" }}
          >
            {project?.socialMedia?.youtube ? (
              <iframe
                style={{ aspectRatio: "2/1" }}
                className="w-full"
                src={`https://www.youtube.com/embed/${project?.video
                  ?.split("/")
                  .at(-1)}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              ""
            )}
          </div>
        </div>
        {/* /HEADER */}

        <nav className="navigation-tabs-content mt-3 mb-10">
          <div className="nav nav-tabs" role="tablist">
            {listContent.map((item, idx) => {
              if (item == "Teams" && !project.team) {
                return;
              }
              return (
                <div
                  key={idx}
                  className={`nav-link text-center ${
                    activeContent == item ? "active" : ""
                  }`}
                  type="button"
                  onClick={() => setActiveContent(item)}
                >
                  <p className="mb-0 font-bold">{item}</p>
                </div>
              );
            })}
          </div>
        </nav>

        {/* Minting Content */}
        {activeContent == listContent[0] && (
          <div className="item-launchpad">
            <div className="item-wrapper grid gap-x-6 gap-y-6 grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
              {project.boxes
                ? Object.keys(project.boxes).map((item, idx) => {
                    const value = project.boxes[item];
                    const owned = ownedBox[item];
                    return (
                      <div key={idx} className="">
                        <ItemLaunchpadv2
                          name={item}
                          data={value}
                          owned={owned}
                          project={project}
                          account={account}
                          action={setModal}
                        />
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        )}
        {/* /Minting Content */}

        {/* Activty Content */}
        {activeContent == listContent[1] && <ContentActivty />}
        {/* /Activty Content */}

        {/* Items Content */}
        {activeContent == listContent[2] && (
          <ContentItems
            dataItems={itemList}
            page={page}
            getFilterItems={getFilterItems}
          />
        )}
        {/* /items Content */}

        {/* Items Content */}
        {activeContent == listContent[3] && <ContentTournament />}
        {/* /items Content */}

        {/* Play Now Content */}
        {activeContent == listContent[4] && (
          <img className="w-full" src="/images/banner-crossout-2.png" alt="" />
        )}
        {/* /Play Now Content */}

        {/* Teams Content */}
        {activeContent == listContent[5] && project.team && (
          <ContentTeams project={project} />
        )}
        {/* /Teams Content */}
      </div>
      {modal.modalConfirmation.isOpen && (
        <DialogConfirmation
          type={modalMessage.type}
          amount={modalMessage.amount}
          message={modalMessage.message}
          successMessage={modalMessage.successMessage}
          failedMessage={modalMessage.failedMessage}
          action={actionModal}
        />
      )}
      {modal.modalClaimable.isOpen && (
        <DialogClaimable reward={claimReward} uri={itemURI} />
      )}
    </div>
  );
}
