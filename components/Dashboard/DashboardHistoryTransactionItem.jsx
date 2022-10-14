import React, {useState} from "react";

export default function DashboardHistoryTransactionItem() {
	const [value, setValue] = useState([1, 2, 3, 4, 5]);
	return (
		<div id="history-tr-list" className="p-3">
			{value.map((item, index) => (
				<div key={index} className="history-tr-item py-2">
					<div className="hti-count">{index + 1}</div>
					<div className="hti-box">
						<img src="https://placeimg.com/160/160/arch" alt=""/>
						<div className="hti-detailed ml-2">
							<p className="font-bold hti-detailed-title">Box Name</p>
							<p className="font-bold hti-detailed-boxes">4 Boxes</p>
							<p className="font-semibold hti-detailed-projecct">Project Name</p>
							<p className="font-semibold hti-detailed-time">8/13/2022, 11:30 AM - 10/20/2022, 11:30 AM</p>
						</div>
					</div>
					<div className="hti-btn">
						<button className="refund px-3 py-1 rounded-md">Claim</button>
					</div>
				</div>
			))}
		</div>
	);
}
