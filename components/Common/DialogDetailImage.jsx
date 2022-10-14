import Link from "next/link";
import React from "react";
import {isDesktop, isMobile} from "react-device-detect";

export default class ProfileHeader extends React.Component {
	render() {
		return (
			<div id="dialog-images-overlay">
				<div className="dialog-images rounded-xl">
					<div className="dialog-images-head px-4 py-3">
						<div className="dbh-left">
							Photo Box
						</div>
						<div className="dbh-right">
							<button>
								<img width="20" height="20" src="/images/svg/icon-cross.svg" alt=""/>
							</button>
						</div>
					</div>
					<div className="dialog-images-body text-center">
						<img src="https://placeimg.com/160/160/arch" alt=""/>
						<p className="font-bold dib-title mt-2">Deadly Weapon</p>
						<p className="font-bold dib-stock">Stock: 1</p>
					</div>
				</div>
			</div>
		);
	}
}
