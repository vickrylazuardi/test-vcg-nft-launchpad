export default function ProfileHeaderLeft () {
	const positionAvatar = {
		marginTop: "-50px",
		marginLeft: "50px",
	};
	return (
		<div className="profile-body-banner-left flex">
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
			<p className="profile-detail-bio ml-3 pt-2">
				<span className="text-xl block font-bold">John Doe</span>
				<span className="text-sm">Tidak ada status</span>
			</p>
		</div>
	)
}
