export default function ProfileHeaderMobile() {
	const positionAvatar = {
		marginTop: "-30px",
		marginLeft: "20px",
	};
	return (
		<div id="profile-launchpad-header">
			<div className="profile-header-banner">
				<img
					src="/images/banner-profile-default.png"
					alt=""
					className="w-full"
				/>
			</div>
			<div className="profile-body-banner">
				<div className="profile-body-banner-left">
					<div className="mask mask-hexagon relative avatar-container cursor-pointer mask-hexagon-different"
							 style={positionAvatar}>
						<div className="mask mask-hexagon avatar-wrap grid place-items-center">
							<img
								src="https://placeimg.com/160/160/arch"
								alt="product market"
								className="mask mask-hexagon"
							/>
						</div>
					</div>
				</div>
				<p className="profile-detail-bio block px-3">
					<span className="text-xl block font-bold">John Doe</span>
					<span className="text-sm">Tidak ada status</span>
				</p>
				<div className="btn-grp grid grid-cols-5 gap-3">
					<button className="col-span-4 btn-edit-profile py-1 rounded-md">Edit Profile</button>
					<button className="btn-gray flex justify-center py-1 rounded-md"><img src="/images/svg/icon-settings.svg"
																																								className="mt-1" alt=""/></button>
				</div>
			</div>
		</div>
	);
}
