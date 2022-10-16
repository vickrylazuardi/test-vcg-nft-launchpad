import Link from "next/link";

export default function LeftNavbarDashboard() {
	const handleEnter = (el) => {
		let elm = document.querySelector(`.${el}`);
		if (el === "sub-sub-menu-1") {
			let htt = document.querySelector(".how-to-text");
			htt.style.background = "#4b546a";
		}
		elm.classList.add("active");
	};
	const handleLeave = (el) => {
		let elm = document.querySelector(`.${el}`);
		if (el === "sub-sub-menu-1") {
			let htt = document.querySelector(".how-to-text");
			htt.style.background = null;
		}
		elm.classList.remove("active");
	};
	return (
		<div className="left-navbar-container flex items-center">
			<div className="logo-wrapper flex items-start">
				<img src="/images/logo.png" alt="vcgamers"/>
				<div className="flex items-start">
					<p
						className="font-bold text-sm ml-1 cursor-default"
						style={{color: "#9AA4BF"}}
					>
						ACCOUNT
					</p>
					<img src="/images/svg/arrow-down.svg" alt="" className="ml-1"/>
				</div>
			</div>
			<ul className="flex items-center ml-7">
				<li>
					<Link href="/" className="text-link semibold flex">
						Home
					</Link>
				</li>
				<li
					onMouseEnter={() => handleEnter("sub-menu-1")}
					onMouseLeave={() => handleLeave("sub-menu-1")}
				>
					<div className="flex items-center">
						<p className="text-link semibold">Tutorial</p>
						<img src="/images/svg/arrow-down.svg" alt="" className="ml-1"/>
						<div className="absolute sub-menu-container sub-menu-1">
							<div className="sub-menu">
								<p
									className="how-to-text"
									onMouseEnter={() => handleEnter("sub-sub-menu-1")}
								>
									How To{" "}
									<img
										src="/images/svg/arrow-down.svg"
										alt="arrow"
										className="rotate-img"
									/>
								</p>
								<p className="not-enter">FAQ</p>
							</div>
							<div
								className="sub-sub-menu-container sub-sub-menu-1"
								onMouseLeave={() => handleLeave("sub-sub-menu-1")}
							>
								<div className="sub-sub-menu">
									<Link href="/">Pancake Swap</Link>
									<Link href="/">Uniswap</Link>
									<Link href="/">Indodax</Link>
								</div>
							</div>
						</div>
					</div>
				</li>
				<li
					onMouseEnter={() => handleEnter("sub-menu-2")}
					onMouseLeave={() => handleLeave("sub-menu-2")}
				>
					<div className="flex items-center">
						<p className="text-link semibold">Features</p>
						<img src="/images/svg/arrow-down.svg" alt="" className="ml-1"/>
						<div className="absolute sub-menu-container sub-menu-2">
							<div className="sub-menu">
								<Link href="/">Staking</Link>
								<Link href="/">Ransverse</Link>
								<Link href="/">NFT Marketplace</Link>
								<Link href="/">NFT Launchpad</Link>
							</div>
						</div>
					</div>
				</li>
				<li>
					<div className="flex items-center">
						<p className="text-link semibold">Chart</p>
					</div>
				</li>
				<li
					onMouseEnter={() => handleEnter("sub-menu-3")}
					onMouseLeave={() => handleLeave("sub-menu-3")}
				>
					<div className="flex items-center">
						<p className="text-link semibold">Other</p>
						<img src="/images/svg/arrow-down.svg" alt="" className="ml-1"/>
						<div className="absolute sub-menu-container sub-menu-3">
							<div className="sub-menu">
								<Link href="/">Tokenomic</Link>
								<Link href="/">Whitepaper</Link>
								<Link href="/">Audit</Link>
							</div>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
}
