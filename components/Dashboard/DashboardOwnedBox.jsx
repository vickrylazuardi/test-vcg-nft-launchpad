import DashboardOwnedBoxItem from "./DashboadOwnedBoxItem";
import DialogConfirmation from "../Common/DialogConfirmation";
import DialogClaimable from "../Common/DialogClaimable";
import Pagination from "../Common/Pagination";
import {useSelector} from "react-redux";

export default function DashboardOwnedBox() {
	//functional
	const modal = useSelector((state) => state.modal);
	return (
		<div id="dashboard-projects" className="mt-5 rounded-lg col-span-4">
			<div className="dashboard-projects-header grid grid-cols-2 py-3">
				<div className="dph-left pl-3">
					<p className="font-bold dph-title">Owned Box</p>
				</div>
				<div className="dph-right pr-3">
					<div className="input-wrapper w-full md:w-2/3 relative">
						<div className="img-wrap absolute top-0 bottom-0 flex items-center left-3">
							<img src="/images/svg/icon-search.svg" alt="search" width={16}/>
						</div>
						<input
							type="text"
							className="w-full p-3 pl-10"
							placeholder="Search Box"
						/>
					</div>
				</div>
			</div>
			<div className="dashboard-projects-body mt-2 p-3">
				<DashboardOwnedBoxItem />
			</div>
			<Pagination/>
			{modal.modalConfirmation.isOpen && <DialogConfirmation status="refund"/>}
			{modal.modalClaimable.isOpen && <DialogClaimable/>}
		</div>
	);
}
