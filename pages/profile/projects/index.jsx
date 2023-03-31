import ProjectItemMobile from "../../../components/Dashboard/Navbar/ProjectItemMobile";
import DialogSliderMobile from "../../../components/Common/DialogSliderMobile";
import {useSelector} from "react-redux";
import Pagination from "../../../components/Common/Pagination";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../utils/globalConstant";
import useMetaMask from "../../../wallet/hook";

export default function Index() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const modal = useSelector((state) => state.modal);
	const [profile, setProfile] = useState(null);
	const [walletAccount, setWalletAccount] = useState(null);

	const [projectItem, setProjectItem] = useState([]);
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
					setProjectItem([]);
					setProjectPage({});
					return;
				}
        setProjectItem(res.data.data.items);
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

	useEffect(() => {
		if (account) {
			setWalletAccount(account);
			projectFilter.owner = account;
			setProjectFilter({...projectFilter});
			getProjectList();
		}
	}, [account]);

	useEffect(() => {
		if (walletAccount) {
			boxesFilter.owner = walletAccount;
			setBoxesFilter({...boxesFilter});
			getBoxesList();
		}
	}, [walletAccount]);

	
	useEffect(() => {
		const isLogedin = localStorage.getItem("isLogedin");
		const data = localStorage.getItem("profile-data");
		if (isLogedin == "true") {
		  console.log("profile",JSON.parse(data))
		  var prof = JSON.parse(data);
		  setProfile(prof);
		  setTimeout(() => {
				setWalletAccount(prof.member_wallet);
			}, 1000);
		}
	  }, []);

	return (
		<div id="project-section-launchpad">
			{
				projectItem.length ?
				projectItem.map((item, index) => (
					<div key={index}>
						<ProjectItemMobile
							projectItem={item}
						/>
					</div>
				)) :
				<div className="my-16 flex flex-col items-center">
					<img className="mb-5 w-64" src="/images/data-not-found.png" alt=""/>
					<p className="pnd-title">No Data Found</p>
				</div>
			}
			{
				projectItem.length ?
				<div className="mb-3">
					<Pagination 
						page={projectPage}
						pageAction={changePage}
					/>
				</div> : ""
			}
			{modal.modalConfirmation.isOpen && <DialogSliderMobile/>}
		</div>
	)
}
