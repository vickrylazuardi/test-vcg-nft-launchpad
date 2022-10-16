import {useState} from "react";
import {useDispatch} from "react-redux";
import {toggleNavbar} from "../../../redux/navbarReducer";
import {useRouter} from "next/router";

export default function detail() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const dispatch = useDispatch();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [pslItem] = useState([0, 1, 2]);
	const navbarBoxes = {
		title: "Small Box",
		status: 3,
	};
	const toggleNavbarActions = () => {
		dispatch(toggleNavbar(navbarBoxes))
		router.push("/profile/projects/box?=small-box2")
	}
	return (
		<div id="project-section-launchpad" className="global-container">
			{pslItem.map((item) => (
				// eslint-disable-next-line react/jsx-key
				<div onClick={toggleNavbarActions} className="psl-detail-page-mobile px-3 py-3">
					<img src="https://placeimg.com/160/160/arch" className="rounded-md" alt=""/>
					<div className="psl-detailed">
						<p className="psld-name">Small Box</p>
						<p className="psld-price text-green-500">Price 300, Stock 10</p>
						<p className="psld-item font-semibold">4 items</p>
					</div>
				</div>
			))}
		</div>
	)
}
