import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import DialogSliderMobile from "../../../components/Common/DialogSliderMobile";
import {toggleModalConfirmation} from "../../../redux/modalReducer";
import {toggleNavbar} from "../../../redux/navbarReducer";

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
	}
	//styling
	const borderBottom = {
		borderBottom: "1px solid #616A82"
	};
	const colorText = {
		color: "#9AA4BF"
	};
	return (
		<div id="project-section-launchpad" className="global-container">
			{pslItem.map((item) => (
				// eslint-disable-next-line react/jsx-key
				<div className="obi-detail-page-refund px-3 py-3" style={borderBottom}>
					<img src="https://placeimg.com/160/160/arch" className="rounded-md" alt=""/>
					<div className="psl-detailed">
						<p className="psld-name">Cross Out</p>
						<p className="psld-item font-semibold" style={colorText}>Stock: 1</p>
					</div>
				</div>
			))}
			<div className="btn-floating-mobile py-4 px-3">
				<button onClick={()=>dispatch(toggleModalConfirmation(dataModal.modalConfirmation))} className="btn-orange-light w-full py-1 font-semibold rounded-md">Refund</button>
			</div>
			{modal.modalConfirmation.isOpen && <DialogSliderMobile status="refund"/>}
		</div>
	)
}
