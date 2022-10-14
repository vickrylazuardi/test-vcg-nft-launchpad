import Link from "next/link";
import React from "react";
import {isDesktop, isMobile} from "react-device-detect";
import BoxesItem from "../Dashboard/BoxesItem";

export default class ProfileHeader extends React.Component {
	render() {
		const textStyling = {
			fontSize: "14px",
			color: "#9AA4BF"
		}
		return (
			<div id="dialog-boxes-overlay">
				<div className="dialog-boxes rounded-xl">
					<div className="dialog-boxes-head px-4 py-3">
						<div className="dbh-left">
							Boxes
						</div>
						<div className="dbh-right">
							<button>
								<img width="20" height="20" src="/images/svg/icon-cross.svg" alt=""/>
							</button>
						</div>
					</div>
					<div className="dialog-boxes-body">
						<table className="table-auto w-full">
							<thead>
							<tr style={textStyling}>
								<th className="font-semibold">No</th>
								<th className="font-semibold">Image Boxes</th>
								<th className="font-semibold">Boxes Name</th>
								<th className="font-semibold">Box Information</th>
								<th className="font-semibold">Items</th>
							</tr>
							</thead>
							<BoxesItem/>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
