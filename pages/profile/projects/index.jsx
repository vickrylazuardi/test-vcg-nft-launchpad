import ProjectItemMobile from "../../../components/Dashboard/Navbar/ProjectItemMobile";
import DialogSliderMobile from "../../../components/Common/DialogSliderMobile";
import {useSelector} from "react-redux";

export default function index() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const modal = useSelector((state) => state.modal);
	return (
		<div id="project-section-launchpad" className="global-container">
			{[1, 2, 3, 4, 5].map((item, index) => (
				<ProjectItemMobile/>
			))}
			{modal.modalConfirmation.isOpen && <DialogSliderMobile/>}
		</div>
	)
}
