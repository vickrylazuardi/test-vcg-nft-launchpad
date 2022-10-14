import React, {useState} from "react";

export default function DashboardOwnedBoxItem() {
	const [value, setValue] = useState([1, 2, 3, 4, 5]);
	return (
		<div id="owned-boxes-list" className="grid grid-cols-5 gap-4">
			{value.map((item, index) => (
				<div className="owned-boxes-item rounded-lg">
					<div className="owned-boxes-item-head">
						<img src="https://placeimg.com/160/160/arch" className="rounded-t-lg" alt=""/>
					</div>
					<div className="owned-boxes-item-body p-3">
						<p className="font-bold obi-name">Box Name [{index+1}]</p>
						<p className="font-semibold obi-project mt-3">Project Name</p>
						<button className="btn-orange-light rounded-md px-3 py-1 mt-3">Claim</button>
					</div>
				</div>
				))}
		</div>
	);
}
