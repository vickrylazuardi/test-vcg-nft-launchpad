import Link from "next/link";
import React from "react";
import {isDesktop, isMobile} from "react-device-detect";

export default class Pagination extends React.Component {
	render() {
		return (
			<div id="pagination-section">
				<div className="pagination-content rounded-lg grid grid-cols-6">
					<div className="pagination-content-item">
						<img src="/images/svg/chevron-left.svg" alt=""/>
					</div>
					<div className="pagination-content-item col-span-4">
						<div className="pagination-content-number active">
							<span>1</span>
						</div>
						<div className="pagination-content-number">
							<span>2</span>
						</div>
					</div>
					<div className="pagination-content-item">
						<img src="/images/svg/chevron-right.svg" alt=""/>
					</div>
				</div>
			</div>
		);
	}
}
