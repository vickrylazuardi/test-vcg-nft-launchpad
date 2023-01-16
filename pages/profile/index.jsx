import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {useRouter} from "next/router";
import useMetaMask from "../../wallet/hook";
import { API, CONTRACT_LAUNCHPAD_FACTORY} from "../../utils/globalConstant";
import { BigNumber } from "ethers";
import abiLaunchpadFactory from '../../abi/launchpad_factory.json';
import {isDesktop, isMobile} from "react-device-detect";
import ProfileHeader from "../../components/Dashboard/ProfileHeader";
import NavigationDashboard from "../../components/Dashboard/NavigationDashboard";
import DashboardSideMenu from "../../components/Dashboard/DashboardSideMenu";
import DashboardProjects from "../../components/Dashboard/DashboardProjects";
import ProfileHeaderMobile from "../../components/Dashboard/ProfileHeaderMobile";
import { vcgEnableTokenTestnet } from "../../utils/contractConfig";

export default function Index() {
	const marginMobile = {
		marginTop: "-90px",
	};

	const [project, setProject] = useState([]);
	const [projectPage, setProjectPage] = useState({});
	const [projectFilter, setProjectFilter] = useState({
		limit: 5,
		page: 1
	})
  const { account, signer, connectContract } = useMetaMask();

	const getProjectList = () => {
		try {
			axios.post(API.launchpad.local + API.launchpad.project.filter, projectFilter)
      .then(res => {
        if (res.status === 204) {
					setProject([]);
					setProjectPage({});
					return;
				}
        setProject(res.data.data.items);
				paginate(res, projectPage, setProjectPage);
      })
		} catch (error) {
			console.log(error);
		}
	};

	const changePage = (page) => {
		try {
			projectFilter.page = page;
			setProjectFilter({...projectFilter});
			getProjectList();
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

	const approve = async (item, id, approved) => {
		// return;
		try {
			const launchpadContract = connectContract(
				CONTRACT_LAUNCHPAD_FACTORY,
				// "0x6583590D6ad0feAFFE811E801a54fCe1d10c259c",
				abiLaunchpadFactory
			);

			const startDate = new Date(item.startedAt).getTime() / 1000;
			var boxIds =[];
			var boxStock = [];
			var boxPrice = [];
			
			var idbox =1;

			for (const [key, value] of Object.entries(item.boxes)) {
				console.log(`${key}: ${value}`);
				boxIds.push(Number(idbox));
				boxStock.push(Number(value.stock));
				boxPrice.push(Number(value.price) * (10**9));
				idbox++;
			}

			const create = await launchpadContract
				.connect(signer)
				.createProject(
					item.name, // name
					item.name.slice(-3),  // symbol
					"https://tes.uri", // nft uri
					vcgEnableTokenTestnet.address, // currency
					startDate, // start date
					boxIds, //box ids
					boxStock, //box stok
					boxPrice, // item price
					"https://tes.uri", // item uri
					item.owner
				);

			create.hash;
			create.wait().then((res) => 
			{
				console.log(res);
				console.log(res.events[0].address);
				isProjectApprove(id, approved, res.events[0].address);
			}
			
			)
		} catch (error) {
			console.log(error);
		}
	}

	const isProjectApprove = (id, approved, address) => {
		try {
			axios.post(API.launchpad.local + API.launchpad.project.approve, {
				id, 
				approved,
				address: address
			}).then((res) => getProjectList())
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (account) {
			if (account == "0x71a183F10d6e6a56CAa2B589651B4958b5Af5aF6") {
				delete(projectFilter.owner);
				setProjectFilter({...projectFilter});
				getProjectList();
			} else {
				projectFilter.owner = account;
				setProjectFilter({...projectFilter});
				getProjectList();
			}
		}
	}, [account]);
	
	return (
		<div 
			id="profile-launchpad" 
			className={isMobile ? "pb-20" : ""}
		>
			<div className="container mx-auto">
				{isDesktop && (
					<div className="navigation-container flex items-center">
						<Link href="/">
							<a className="flex items-center">
								<img src="/images/icon-home.png" alt=""/>
							</a>
						</Link>
						<p className="ml-3 text-sm font-bold">My Profile</p>
					</div>
				)}
				{/* {isDesktop && (<ProfileHeader/>)}
				{isDesktop && (<NavigationDashboard/>)} */}
				{isDesktop && (
					<div className="container-wrapper grid grid-cols-5 gap-4">
						<DashboardSideMenu/>
						<DashboardProjects
							account={account}
							project={project}
							action={isProjectApprove}
							approve={approve}
							page={projectPage}
							pageAction={changePage}
						/>
					</div>
				)}
			</div>
			{isMobile && (
				<div>
					{/* <ProfileHeaderMobile/> */}
					<div className="sub-menu-mobile mt-4 p-3">
						<p className="font-bold mb-3">Profile</p>
						<ul>
							<Link href="https://app.vcgamers.com/">
								<li className="py-3"><img src="/images/svg/icon-cart.svg" className="mr-2" alt=""/>Marketplace</li>
							</Link>
							<Link href="/profile/projects">
								<li className="py-3"><img src="/images/svg/nav-launch-icon-active.svg" className="mr-2" alt=""/>Launchpad</li>
							</Link>
							<Link href="https://hub.vcgamers.com/">
								<li className="py-3"><img src="/images/svg/icon-info-square.svg" className="mr-2" alt=""/>
									Social Hub
								</li>
							</Link>
							<li className="py-3"><img src="/images/svg/icon-info-square.svg" className="mr-2" alt=""/>
								NFT
								<div className="soon rounded-full py-0.5 px-2 ml-1">SOON</div>
							</li>
							<a href="https://lynk.id/vcgoods/" rel="nofollow" target="_blank">
								<li className="py-3"><img src="/images/svg/icon-info-square.svg" className="mr-2" alt=""/>
									Merchandise
								</li>
							</a>
						</ul>
					</div>
				</div>
			)}
		</div>
	)
}
