import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import DialogSliderMobile from "../../../Components/Common/DialogSliderMobile";
import {toggleModalConfirmation} from "../../../redux/modalReducer";

const {motion} = require("framer-motion");

export default function Box() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [pslItem] = useState([0, 1, 2]);
	const dispatch = useDispatch();
	const modal = useSelector((state) => state.modal);
	const dataModal = {
		modalConfirmation: {
			loading: false,
			isOpen: true,
			isPlain: true,
			isSuccess: false,
			title: {
				en: "Confirmation",
			}
		},
		isShow: false,
		isHide: false,
		isLoading: false,
	};
	const container = {
		hidden: {opacity: 1, scale: 0},
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				delayChildren: 0.5,
				staggerChildren: 0.25
			}
		}
	};
	const itemList = {
		hidden: {y: "100vh", opacity: 0},
		visible: {
			y: 0,
			opacity: 1
		}
	};
	//styling
	const borderBottom = {
		borderBottom: "1px solid #616A82"
	};
	const colorText = {
		color: "#9AA4BF"
	};
	return (
		<div id="project-section-launchpad" className="global-container">
			{modal.modalConfirmation.claimableMobile && (
				<motion.ul variants={container} initial="hidden" animate="visible">
					{pslItem.map((index) => (
						// eslint-disable-next-line react/jsx-key
						<motion.li className="obi-detail-page-refund px-3 py-3" style={borderBottom} key={index}
											 variants={itemList}>
							<img src="https://placeimg.com/160/160/arch" className="rounded-md" alt=""/>
							<div className="psl-detailed">
								<p className="psld-name">Cross Out</p>
								<p className="psld-item font-semibold" style={colorText}>Stock: 1</p>
							</div>
						</motion.li>
					))}
				</motion.ul>
			)}
			{!modal.modalConfirmation.claimableMobile && (
				<ul>
					{pslItem.map((index) => (
						// eslint-disable-next-line react/jsx-key
						<li className="obi-detail-page-refund px-3 py-3" style={borderBottom}>
							<img src="https://placeimg.com/160/160/arch" className="rounded-md" alt=""/>
							<div className="psl-detailed">
								<p className="psld-name">????</p>
								<p className="psld-item font-semibold" style={colorText}>Stock: ????</p>
							</div>
						</li>
					))}
				</ul>
			)}
			<div className="btn-floating-mobile py-4 px-3">
				<button onClick={() => dispatch(toggleModalConfirmation(dataModal.modalConfirmation))}
								className="btn-orange-light w-full py-1 font-semibold rounded-md">Claim
				</button>
			</div>
			{modal.modalConfirmation.isOpen && <DialogSliderMobile status="claim"/>}
		</div>
	)
}
