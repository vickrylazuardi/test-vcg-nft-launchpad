import React, {useState} from "react";

export default function DashboardProjectItem() {
	const [items, setItems] = useState([1, 2, 3, 4, 5]);
	const bgChipsRequest = {
		backgroundColor: "#FFD4C2",
		color: "#E28058"
	};
	const bgChipsApproved = {
		backgroundColor: "#C4FBCA",
		color: "#40D04F"
	};
	return (
		<tbody>
		{items.map((item, index) => (
			<tr>
				<td className="text-center">1</td>
				<td className="project-name">
					<img src="https://placeimg.com/160/160/arch" alt=""/>
					<div className="project-name-detailed ml-2.5">
						<p className="pnd-title">Ragnarok X Point Black</p>
						<p className="pnd-boxes">4 boxes</p>
						<p className="pnd-times">8/13/2022, 11:30 AM - 10/20/2022, 11:30 AM</p>
					</div>
				</td>
				<td className="text-center project-socmed">
					<img className="px-1" src="/images/svg/icon-browser.svg" alt=""/>
					<img className="px-1" src="/images/svg/icon-discord.svg" alt=""/>
					<img className="px-1" src="/images/svg/icon-telegram.svg" alt=""/>
					<img className="px-1" src="/images/svg/icon-yt.svg" alt=""/>
				</td>
				<td className="text-center">
					<div className="approval-chips px-1 py-0.5 rounded-md" style={bgChipsRequest}>Request</div>
				</td>
				<td className="text-center">Not Started</td>
				<td className="text-center project-balance">1.000 VCG</td>
				<td className="text-center project-withdraw">
					<button className="btn-gray rounded-md px-2 py-1 active">Withdraw</button>
				</td>
			</tr>
		))}
		</tbody>
	);
}
