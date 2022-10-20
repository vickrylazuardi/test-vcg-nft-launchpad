import React, { useState } from "react";
import {useSelector} from "react-redux";
import DashboardHistoryTransactionItem from "./DashboardHistoryTransactionItem";
import DialogBoxes from "../Common/DialogBoxes";
import DialogDetailImage from "../Common/DialogDetailImage";
import Pagination from "../Common/Pagination";
import DialogDetailTransaction from "../Common/DialogDetailTransaction";

export default function DashboardHistoryTransaction(props) {
	//functional
	const modal = useSelector((state) => state.modal);
	const [dataModal, setDataModal] = useState({});
	return (
		<div id="dashboard-projects" className="mt-5 rounded-lg col-span-4">
			<div className="dashboard-projects-header grid grid-cols-2 py-3">
				<div className="dph-left pl-3">
					<p className="font-bold dph-title">Transaction History</p>
				</div>
				<div className="dph-right pr-3">
					<div className="input-wrapper w-full md:w-2/3 relative">
						<div className="img-wrap absolute top-0 bottom-0 flex items-center left-3">
							<img src="/images/svg/icon-search.svg" alt="search" width={16}/>
						</div>
						<input
							type="text"
							className="w-full p-3 pl-10"
							placeholder="Search Projects"
						/>
					</div>
				</div>
			</div>
			<div className="dashboard-projects-body mt-2">
				<DashboardHistoryTransactionItem
					setData={setDataModal}
					history={props.history}
					page={props.page}
				/>
			</div>
			{
				props?.page?.currentPage ?
				<Pagination
					page={props.page}
					pageAction={props.pageAction}
				/> : ""
			}
			{modal.modalBoxes.isOpen && <DialogBoxes/>}
			{modal.modalImages.isOpen && <DialogDetailImage/>}
			{modal.modalDetailTransaction.isOpen && <DialogDetailTransaction data={dataModal} />}
		</div>
	);
}
