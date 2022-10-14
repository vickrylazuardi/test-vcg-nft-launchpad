import React from "react";

export default function MidNavbar() {
	function redirectWallet() {
		window.location.assign("/connect-wallet");
	}

	return (
		<div
			className="mid-nav-container flex items-center px-5"
			style={{flex: "1 1 0%"}}
		>
			<div className="input-wrapper w-full lg:w-2/3 relative">
				<div className="img-wrap absolute top-0 bottom-0 flex items-center left-3">
					<img src="/images/svg/icon-search.svg" alt="search" width={22}/>
				</div>
				<input
					type="text"
					className="w-full p-3 pl-10"
					placeholder="Search Projects"
				/>
			</div>
			<div className="market-container pl-5 items-center hidden lg:flex">
				<button onClick={redirectWallet} className="btn-connect-wallet py-1 px-3 rounded-md">Connect Wallet</button>
			</div>
		</div>
	);
}
