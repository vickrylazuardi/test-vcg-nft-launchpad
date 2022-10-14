import React, {useState} from "react";

export default function NavigationDashboard() {
	const [isHover, setIsHover] = useState(false);
	const onMouseEnter = () => setIsHover(true);
	const onMouseLeave = () => setIsHover(false);
	return (
		<div id="navigation-launchpad" className="mt-5 rounded-xl">
			<div className="navigation-launchpad-list px-3">
				<div className="navigation-launchpad-item" onMouseLeave={onMouseLeave} onMouseEnter={onMouseEnter}>
					{isHover ? (
						<div className="navigation-launchpad-item-bundling">
							<span className="px-3 py-1">Launchpad</span>
						</div>
					) : (
						<div className="navigation-launchpad-item-bundling">
							<img className="px-3 py-1" src="/images/svg/nav-launch-icon-active.svg" alt=""/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
