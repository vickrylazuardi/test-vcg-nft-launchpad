import React from "react";
import ProfileHeaderLeft from "./ProfileHeaderLeft";
import ProfileHeaderRight from "./ProfileHeaderRight";

export default class ProfileHeader extends React.Component {
	render() {
		return (
			<div id="profile-launchpad-header" className="rounded-xl mt-2">
				<div className="profile-header-banner">
					<img
						src="/images/banner-profile-default.png"
						alt=""
						className="rounded-t-xl w-full"
					/>
				</div>
				<div className="profile-body-banner rounded-b-xl">
					<ProfileHeaderLeft />
					<ProfileHeaderRight />
				</div>
			</div>
		);
	}
}
