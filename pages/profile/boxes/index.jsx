import Link from "next/link";
import ProfileHeader from "../../../components/Dashboard/ProfileHeader";
import NavigationDashboard from "../../../components/Dashboard/NavigationDashboard";
import DashboardSideMenu from "../../../components/Dashboard/DashboardSideMenu";
import DashboardOwnedBox from "../../../components/Dashboard/DashboardOwnedBox";
import {useSelector, useDispatch} from "react-redux";
import {toggleModalConfirmation, toggleModalClaimable} from "../../../redux/modalReducer";
import {toggleNavbar} from "../../../redux/navbarReducer";
import {useRouter} from "next/router";
import React, { useEffect, useState } from "react";
import useMetaMask from "../../../wallet/hook";
import axios from "axios";
import { API } from "../../../utils/globalConstant";
import { BigNumber } from "ethers";
import abiLaunchpad from '../../../abi/launchpad.json';
import Pagination from "../../../components/Common/Pagination";
import DialogConfirmation from "../../../components/Common/DialogConfirmation";
import DialogClaimable from "../../../components/Common/DialogClaimable";

export default function Index() {
	const modal = useSelector((state) => state.modal);
	const dispatch = useDispatch();
	const router = useRouter();
	const dataModal = {
		modalConfirmation: {
			loading: false,
			isOpen: true,
			isPlain: true,
			isSuccess: false,
			title: {
				en: "Confirmation",
			}
		},
	}

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

	const modalConfirmationLoading = {
		loading: false,
		isOpen: true,
		isPlain: true,
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

	const navbarDetailClaim = {
		title: "Box Name",
		status: 4,
	};
	const navbarDetailRefund = {
		title: "Box Name",
		status: 5,
	};

	const toggleNavbarActions = (params, e) => {
		if (params === 4) {
			// e.stopPropagation();
			dispatch(toggleNavbar(navbarDetailClaim))
			// router.push("/profile/boxes/claim?=boxes123")
		} else if (params === 5) {
			dispatch(toggleNavbar(navbarDetailRefund))
			// router.push("/profile/boxes/refund?=boxes123")
		}else if (params === 99) {
			// e.stopPropagation();
			dispatch(toggleModalConfirmation(dataModal.modalConfirmation))
		}
	}

	const [boxes, setBoxes] = useState([]);
	const [boxesPage, setBoxesPage] = useState({});
	const [boxesFilter, setBoxesFilter] = useState({
		amount: {$ne: 0},
		limit: 5,
		page: 1
	});
	const [modalMessage, setModalMessage] = useState({});
  const [claimReward, setClaimReward] = useState([]);
	const [claimData, setClaimData] = useState({});
  const [itemURI, setItemURI] = useState({});
  const { account, signer, connectContract } = useMetaMask();

	const getBoxesList = () => {
		try {
			axios.post(API.launchpad.local + API.launchpad.item.filter, boxesFilter)
      .then(res => {
        if (res.status === 204) {
					setBoxes([]);
					setBoxesPage({});
					return;
				}
        setBoxes(res.data.data.items);
				paginate(res, boxesPage, setBoxesPage);
      })
		} catch (error) {
			console.log(error);
		}
	};

	const changePage = (page) => {
		try {
			boxesFilter.page = page;
			setBoxesFilter({...boxesFilter});
			getBoxesList();
		} catch (error) {
			console.log(error);
		}
	};

	const paginate = async (res, getter, setter) => {
    try {
      let page = {};
      page.currentPage = res.data.data.page;
      page.maxPage = res.data.data.totalPage;
      if (page.currentPage < 4 && page.maxPage > 5) {
        page.listPage = [1, 2, 3, 4, 5]
      } else if (page.currentPage >= 4 && page.currentPage + 2 <= page.maxPage) {
        let list = [];
        for (let i = page.currentPage - 2; i <= page.currentPage + 2; i++) {
          list.push(i);
        };
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
      setter({...getter});
    } catch (error) {
      console.log(error);
    }
  };

	const modalClaim = (data) => {
    try {
      modalMessage.type = "Claim";
			modalMessage.amount = data.amount;
			modalMessage.message = "claim this box?";
			modalMessage.successMessage = "You have successfully claimed this box";
			modalMessage.failedMessage = "Failed to claim this box";
			setModalMessage({...modalMessage});
			setClaimData({
				name: data.name, 
				amount: data.amount, 
				project: data.projectDetail
			});
    } catch (error) {
      console.log(error);
    }
  };

	const claim = () => {
		try {
			claimBox(claimData.name, claimData.amount, claimData.project);
		} catch (error) {
			console.log(error);
		}
	}

	const claimBox = async (box, amount, project) => {
    try {
      const boxIds = Object.keys(project.boxes);
      const boxId = boxIds.indexOf(box) + 1;
      const randomList = [];

      for (let i = 0; i < amount; i++) {
        const random = Math.floor((Math.random() * 100000000000) + 1);
        randomList.push(random);
      }
      
      const launchpadContract = connectContract(
        project.address,
        abiLaunchpad
      );

      const claim = await launchpadContract
        .connect(signer)
        .claimBox(boxId, amount, randomList);

      claim.hash;
      claim.wait().then(async (res) => {
        const reward = res.events.at(-1).args.reward;
        reward.forEach(async e => {
          const id = BigNumber.from(e).toNumber();
          claimReward.push(id);
          if (itemURI[id] == undefined) {
            await axios.post(API.launchpad.local + API.launchpad.nft.detail, {
              projectDetail: project._id,
              tokenId: id
            }).then((response) => {
              const data = response.data.data
              itemURI[id] = data;
              setItemURI({...itemURI});
              axios.post(API.launchpad.local + API.launchpad.ownedNft.claim, {
                name: data.name,
                owner: account,
                tokenId: data.tokenId, 
                nftAddress: data.nftAddress,
                nftDetail: data._id,
                projectName: project.name,
                projectDetail: project._id
              });
            })
          }
        });
        setClaimReward([...claimReward]);
        if (res.status == 1) {
          axios.post(API.launchpad.local + API.launchpad.item.claim, {
            owner: account,
            itemName: box,
            amount: amount,
            projectName: project.name,
            projectDetail: project._id
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
        }
      });
    } catch (error) {
      console.log(error);
      dispatch(toggleModalConfirmation(modalConfirmationWhenFailed));
    }
  };

	const reload = () => {
    try {
      setTimeout(() => {
        getBoxesList();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

	useEffect(() => {
		if (account) {
			boxesFilter.owner = account;
			setBoxesFilter({...boxesFilter});
			getBoxesList();
		}
	}, [account]);

	return (
		<div id="profile-launchpad">
			<div className="container mx-auto bundle-pl">
				<div className="navigation-container flex items-center">
					<Link href="/">
						<a className="flex items-center">
							<img src="/images/icon-home.png" alt=""/>
						</a>
					</Link>
					<p className="ml-3 text-sm font-bold">My Profile</p>
				</div>
				{/* <ProfileHeader/>
				<NavigationDashboard/> */}
				<div className="container-wrapper grid grid-cols-5 gap-4">
					<DashboardSideMenu/>
					<DashboardOwnedBox
						modalClaim={modalClaim}
						claim={claim}
						modalMessage={modalMessage}
						claimReward={claimReward}
						itemURI={itemURI}
						boxes={boxes}
						page={boxesPage}
						pageAction={changePage}
					/>
				</div>
			</div>
			<div className="owned-boxed-list my-2">
				{
					boxes.length ?
					<div className="owned-boxed-item px-3 pb-3 pt-1">
						{
							boxes.map((item, idx) => (
								<div 
									key={idx} 
									onClick={() => {
										if (!item.projectDetail.boxes[item.itemName].finalize) return
										dispatch(toggleModalConfirmation(modalConfirmationLoading))
										modalClaim({
											type: "claim",
											name: item.itemName, 
											amount: item.amount,
											projectDetail: item.projectDetail
										})
									}} 
									disabled={!item.projectDetail.boxes[item.itemName].finalize}
									className="obi-list mt-2 py-2"
								>
									<img 
										className="rounded-md mr-3" 
										src={item.image}
										alt=""
										style={{
											width: "75px",
											height: "75px",
											aspectRatio: "1/1",
											objectFit: "contain"
										}}
									/>
									<div className="obi-list-detailed">
										<p className="font-bold">
											{item.itemName}
											{item.amount > 1 ? ` [${item.amount}]` : ""}
										</p>
										<p className="font-semibold text-gray-400">{item.projectName}</p>
									</div>
									<div className="obi-list-detailed flex justify-end">
										<button disabled className="claim px-2 py-0.5 rounded-md">Claim</button>
									</div>
								</div>
							))
						}
					</div> :
					<div className="my-16 flex flex-col items-center">
						<img className="mb-5 w-64" src="/images/data-not-found.png" alt=""/>
						<p className="pnd-title">No Data Found</p>
					</div>
				}
				{
					boxesPage.currentPage ?
					<div className="mt-2">
						<Pagination
							page={boxesPage}
							pageAction={changePage}
						/>
					</div> : ""
				}
			</div>
			
			{
				modal.modalConfirmation.isOpen && 
				<DialogConfirmation
          type={modalMessage.type}
          amount={modalMessage.amount}
          message={modalMessage.message}
          successMessage={modalMessage.successMessage}
          failedMessage={modalMessage.failedMessage}
          action={claim}
        />
			}
			{
				modal.modalClaimable.isOpen && 
				<DialogClaimable
          reward={claimReward}
          uri={itemURI}
        />
			}
		</div>
	)
}
