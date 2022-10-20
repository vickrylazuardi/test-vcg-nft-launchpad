import Link from "next/link";
import ProfileHeader from "../../../components/Dashboard/ProfileHeader";
import NavigationDashboard from "../../../components/Dashboard/NavigationDashboard";
import DashboardSideMenu from "../../../components/Dashboard/DashboardSideMenu";
import DashboardOwnedNft from "../../../components/Dashboard/DashboardOwnedNft";
import {useSelector, useDispatch} from "react-redux";
import {toggleModalConfirmation} from "../../../redux/modalReducer";
import {toggleNavbar} from "../../../redux/navbarReducer";
import {useRouter} from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../utils/globalConstant";
import useMetaMask from "../../../wallet/hook";

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
			e.stopPropagation();
			dispatch(toggleNavbar(navbarDetailClaim))
			router.push("/profile/boxes/claim?=boxes123")
		} else if (params === 5) {
			dispatch(toggleNavbar(navbarDetailRefund))
			router.push("/profile/boxes/refund?=boxes123")
		}else if (params === 99) {
			e.stopPropagation();
			dispatch(toggleModalConfirmation(dataModal.modalConfirmation))
		}
	}

	const [nft, setNft] = useState([]);
	const [nftPage, setNftPage] = useState({});
	const [nftFilter, setNftFilter] = useState({
		limit: 5,
		page: 1
	})
  const { account, signer, connectContract } = useMetaMask();

	const getNftList = () => {
		try {
			axios.post(API.launchpad.local + API.launchpad.ownedNft.filter, nftFilter)
      .then(res => {
        if (res.status === 204) {
					setNft([]);
					setNftPage({});
					return;
				}
        setNft(res.data.data.items);
				paginate(res, nftPage, setNftPage);
      })
		} catch (error) {
			console.log(error);
		}
	};

	const changePage = (page) => {
		try {
			nftFilter.page = page;
			setNftFilter({...nftFilter});
			getNftList();
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

	useEffect(() => {
		if (account) {
			nftFilter.owner = account;
			setNftFilter({...nftFilter});
			getNftList();
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
					<DashboardOwnedNft
						nft={nft}
						page={nftPage}
						pageAction={changePage}
					/>
				</div>
			</div>
			<div className="owned-boxed-list">
				<div className="owned-boxed-item p-3 mt-2">
					<p className="font-bold">Project Name</p>
					<div onClick={(e) => toggleNavbarActions(5, e)} className="obi-list mt-2 py-2">
						<img className="rounded-md mr-3" src="https://placeimg.com/160/160/arch" alt=""/>
						<div className="obi-list-detailed">
							<p className="font-bold">Box Name</p>
						</div>
						<div className="obi-list-detailed flex justify-end">
							<button className="refund px-2 py-0.5 rounded-md">Refund</button>
						</div>
					</div>
					<div onClick={(e) => toggleNavbarActions(4, e)} className="obi-list mt-2 py-2">
						<img className="rounded-md mr-3" src="https://placeimg.com/160/160/arch" alt=""/>
						<div className="obi-list-detailed">
							<p className="font-bold">Box Name</p>
						</div>
						<div className="obi-list-detailed flex justify-end">
							<button className="claim px-2 py-0.5 rounded-md">Claim</button>
						</div>
					</div>
				</div>
				<div className="owned-boxed-item p-3 mt-2">
					<p className="font-bold">Project Indonesia</p>
					<div className="obi-list mt-2 py-2">
						<img className="rounded-md mr-3" src="https://placeimg.com/160/160/arch" alt=""/>
						<div className="obi-list-detailed">
							<p className="font-bold">Box Name</p>
						</div>
						<div className="obi-list-detailed flex justify-end">
							<button className="refund px-2 py-0.5 rounded-md">Refund</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
