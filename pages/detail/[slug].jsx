import React, { useEffect, useState } from "react";
import axios from "axios";
import { BigNumber, ethers } from "ethers";
import Slider from "react-slick";
import Link from "next/link";
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from "react-redux";
import { toggleModalConfirmation, toggleModalClaimable } from "../../redux/modalReducer";
import { API } from "../../utils/globalConstant";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isDesktop, isMobile } from "react-device-detect";
import useMetaMask, { MetaMaskProvider } from "../../wallet/hook";
import ItemLaunchpad from "../../components/Common/ItemLaunchpad";
import DialogConfirmation from "../../components/Common/DialogConfirmation";
import { vcgEnableTokenTestnet } from "../../utils/contractConfig";
import abiLaunchpad from '../../abi/launchpad.json';
import DialogClaimable from "../../components/Common/DialogClaimable";

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
		}
	};

  const modalConfirmationWhenFailed = {
		loading: false,
		isOpen: true,
		isPlain: false,
		isSuccess: false,
		isFailed: true,
		title: {
			en: "Confirmation",
		}
	};

  const modalConfirmation = {
		loading: false,
		isOpen: false,
		isPlain: false,
		isSuccess: false,
		isFailed: false,
		title: {
			en: "Confirmation",
		}
	};
  
	const modalClaimableItem = {
		loading: true,
		isOpen: true,
		showItem: false,
		title: {
			en: "Confirmation",
		}
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

  const [project, setProject] = useState({});
  const [balance, setBalance] = useState(null);
  const [amount, setAmount] = useState({});
  const [ownedBox, setOwnedBox] = useState({});
  const [dataModal, setDataModal] = useState({});
  const [modalMessage, setModalMessage] = useState({});
  const { account, signer, connectContract } = useMetaMask();

  const router = useRouter();
  const data = router.query;

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
      dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
      // document.getElementById("loading-vcg").classList.remove("show");
      // toast.error("Enable Token - Request was rejected", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
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
        reload();
        dispatch(toggleModalConfirmation(modalConfirmationWhenSuccess));
        // document.getElementById("loading-vcg").classList.remove("show");
        // toast.success("Buy Box successfull!", {
        //   position: toast.POSITION.TOP_RIGHT,
        // });
      });
    } catch (error) {
      console.log(error);
      dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
      // document.getElementById("loading-vcg").classList.remove("show");
      // toast.error("Buy Box - Request was rejected", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
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
        .finalizeBox();

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
            reload();
            dispatch(toggleModalConfirmation(modalConfirmationWhenSuccess));
            // document.getElementById("loading-vcg").classList.remove("show");
            // toast.success("Finalize Box successfull!", {
            //   position: toast.POSITION.TOP_RIGHT,
            // });
          })
        }
      })
    } catch (error) {
      console.log(error);
      dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
      // document.getElementById("loading-vcg").classList.remove("show");
      // toast.error("Finalize Box - Request was rejected", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
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
      claim.wait().then(async (res) => {
        console.log(res);
        const reqId = res.events[1].args.requestId;
        const listen = await launchpadContract.connect(signer);
        const request = listen.filters.claimed(BigNumber.from(reqId));
        listen.once(request, (requestId, reward, event) => {
          console.log("reqId -> ", requestId);
          console.log("reward -> ", reward);
          console.log("event -> ", event);
        });
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
          dispatch(toggleModalConfirmation(modalConfirmation));
          dispatch(toggleModalClaimable(modalClaimableItem));
          // document.getElementById("loading-vcg").classList.remove("show");
          // toast.success("Claim Box successfull!", {
          //   position: toast.POSITION.TOP_RIGHT,
          // });
        }
      });
    } catch (error) {
      console.log(error);
      dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
      // document.getElementById("loading-vcg").classList.remove("show");
      // toast.error("Claim Box - Request was rejected", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }
  };

  const setModal = (data) => {
    try {
      switch (data.type) {
        case "buy":
          modalMessage.type = "Buy";
          modalMessage.message = "buy this box?";
          modalMessage.successMessage = "You have successfully bought this box";
          modalMessage.failedMessage = "Failed to buy this box";
          setModalMessage({...modalMessage});
          break;
        case "claim":
          modalMessage.type = "Claim";
          modalMessage.message = "claim this box?";
          modalMessage.successMessage = "You have successfully claimed this box";
          modalMessage.failedMessage = "Failed to claim this box";
          setModalMessage({...modalMessage});
          break;
        case "finalize":
          modalMessage.type = "Finalize";
          modalMessage.message = "finalize this project?";
          modalMessage.successMessage = "You have successfully finalized this box";
          modalMessage.failedMessage = "Failed to finalize this box";
          setModalMessage({...modalMessage});
          break;
        default:
          break;
      };
      for (const key in data) {
        dataModal[key] = data[key];
      };
      setDataModal({...dataModal});
    } catch (error) {
      console.log(error);
    }
  }

  const actionModal = () => {
    try {
      switch (dataModal.type) {
        case "buy":
          checkAllowance(dataModal.name, dataModal.amount, dataModal.price);
          break;
        case "claim":
          claimBox(dataModal.name);
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
  }

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
              <p className="font-bold">Start at {new Date(project?.startedAt).toLocaleString()}</p>
              <div className="social-container mt-3 flex items-center lg:my-3">
                <p className="font-semibold lg:text-sm">
                  Find out more about this project
                </p>
                <div className="social flex items-center gap-4 ml-5">
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
                        className="cursor-pointer"
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
                  {
                    project?.socialMedia?.youtube ?
                    <a href={project?.socialMedia?.youtube} rel="nofollow" target="_blank">
                      <img
                        src="/images/svg/youtube-fill.svg"
                        alt="web vcgamers"
                        className="cursor-pointer"
                      />
                    </a> : ""
                  }
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
                src={`https://www.youtube.com/embed/${project.video.split("/").at(-1)}`}
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
                  src={`https://www.youtube.com/embed/${project.video.split("/").at(-1)}`}
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
                        action={setModal}
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
              project.additionalInfo.map((item, idx) => {
                return (
                  <div key={idx} className="item-feature">
                    <div className="inner-feature flex items-start justify-between gap-14 lg:flex-col">
                      <div className="img-wrap w-1/2 lg:w-full">
                        <img
                          src={item.image}
                          alt="feature"
                          className="lg:w-10/12 lg:mx-auto mr-10 rounded-xl"
                        />
                      </div>
                      <div className="features-desc w-1/2 lg:w-full">
                        <h3 className="text-2xl font-bold lg:text-base lg:my-3">
                          {item.title}
                        </h3>
                        <p className="mt-5 font-semibold lg:text-sm lg:mt-0">
                          {item.text}
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
        {
          project.team ?
          <div className="teams-section">
            <h2 className="font-bold text-2xl mb-3 lg:text-base">Teams</h2>
            <div className="item-wrapper">
              <Slider {...settingsTeams}>
                {
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
                      </div>
                    )
                  })
                }
              </Slider>
            </div>
          </div> : ""
        }
        {/* /TEAMS */}
      </div>
      {
        modal.modalConfirmation.isOpen && 
        <DialogConfirmation
          type={modalMessage.type}
          message={modalMessage.message}
          successMessage={modalMessage.successMessage}
          failedMessage={modalMessage.failedMessage}
          action={actionModal}
        />
      }
      {modal.modalClaimable.isOpen && <DialogClaimable/>}
    </div>
  );
}
