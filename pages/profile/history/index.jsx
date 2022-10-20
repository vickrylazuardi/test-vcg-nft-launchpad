import Link from "next/link";
import ProfileHeader from "../../../components/Dashboard/ProfileHeader";
import NavigationDashboard from "../../../components/Dashboard/NavigationDashboard";
import DashboardSideMenu from "../../../components/Dashboard/DashboardSideMenu";
import DashboardHistoryTransaction from "../../../components/Dashboard/DashboardHistoryTransaction";
import {toggleNavbar} from "../../../redux/navbarReducer";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../utils/globalConstant";
import useMetaMask from "../../../wallet/hook";

export default function Index() {
	const router = useRouter();
	const dispatch = useDispatch();
	const navbarHistory = {
		title: "Detail Transaction",
		status: 6,
	};

	function redirect() {
		dispatch(toggleNavbar(navbarHistory))
		router.push("/profile/history/detail?=boxname123");
	}

	const [history, setHistory] = useState([]);
	const [historyPage, setHistoryPage] = useState({});
	const [historyFilter, setHistoryFilter] = useState({
		sort: {date: -1},
		limit: 5,
		page: 1
	})
  const { account, signer, connectContract } = useMetaMask();

	const getHistoryList = () => {
		try {
			axios.post(API.launchpad.local + API.launchpad.history.filter, historyFilter)
      .then(res => {
        if (res.status === 204) {
					setHistory([]);
					setHistoryPage({});
					return;
				}
        setHistory(res.data.data.items);
				paginate(res, historyPage, setHistoryPage);
      })
		} catch (error) {
			console.log(error);
		}
	};

	const changePage = (page) => {
		try {
			historyFilter.page = page;
			setHistoryFilter({...historyFilter});
			getHistoryList();
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
			historyFilter.owner = account;
			setHistoryFilter({...historyFilter});
			getHistoryList();
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
					<DashboardHistoryTransaction
						history={history}
						page={historyPage}
						pageAction={changePage}
					/>
				</div>
			</div>
			<div className="owned-boxed-list">
				<div className="owned-boxed-item p-3 mt-2">
					<p className="font-bold">History Name</p>
					<div onClick={redirect} className="obi-list mt-2 py-2">
						<img className="rounded-md mr-3" src="https://placeimg.com/160/160/arch" alt=""/>
						<div className="obi-list-detailed">
							<p className="font-bold">Box Name</p>
						</div>
					</div>
					<div className="obi-list mt-2 py-2">
						<img className="rounded-md mr-3" src="https://placeimg.com/160/160/arch" alt=""/>
						<div className="obi-list-detailed">
							<p className="font-bold">Box Name</p>
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
					</div>
				</div>
			</div>
		</div>
	)
}
