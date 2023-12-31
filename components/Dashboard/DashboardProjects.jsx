import DashboardProjectItem from "./DashboardProjectItem";
import Pagination from "../Common/Pagination";
import DialogBoxes from "../Common/DialogBoxes";
import DialogDetailImage from "../Common/DialogDetailImage";
import DialogConfirmation from "../Common/DialogConfirmation";
import {useSelector} from "react-redux";

export default function DashboardSideMenu(props) {
	//functional
	const modal = useSelector((state) => state.modal);
	//styling
	const textStyling = {
		fontSize: "14px",
		color: "#9AA4BF"
	}
	const theadStyling = {
		borderBottom: "1px solid #9AA4BF",
	}

	return (
		<div id="dashboard-projects" className="mt-5 rounded-lg col-span-4">
			<div className="dashboard-projects-header grid grid-cols-2 py-3">
				<div className="dph-left pl-3">
					<p className="font-bold dph-title">Projects</p>
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
				<table className="table-auto w-full">
					<thead style={theadStyling}>
						<tr style={textStyling}>
							<th className="font-semibold">No</th>
							<th className="text-left font-semibold">Project Name</th>
							<th className="font-semibold">Social Media</th>
							<th className="font-semibold">Approval</th>
							<th className="font-semibold">Status</th>
							{
								props.account == "0x71a183F10d6e6a56CAa2B589651B4958b5Af5aF6" ?
								<th className="font-semibold">Action</th> : 
								<>
									<th className="font-semibold">Balance</th>
									<th className="font-semibold">Withdraw</th>
								</>
							}
						</tr>
					</thead>
					<DashboardProjectItem
						account={props.account}
						project={props.project}
						action={props.action}
						approve={props.approve}
						page={props.page}
					/>
				</table>
			</div>
			{
				props?.project?.length ?
				<Pagination
					page={props.page}
					pageAction={props.pageAction}
				/> : ""
			}
			{modal.modalBoxes.isOpen && <DialogBoxes/>}
			{modal.modalImages.isOpen && <DialogDetailImage/>}
			{modal.modalConfirmation.isOpen && <DialogConfirmation/>}
		</div>
	);
}
