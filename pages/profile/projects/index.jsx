import ProjectItemMobile from "../../../components/Dashboard/Navbar/ProjectItemMobile";
import DialogSliderMobile from "../../../components/Common/DialogSliderMobile";
import {useSelector} from "react-redux";

export default function index() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const modal = useSelector((state) => state.modal);
	return (
		<div id="project-section-launchpad">
			{[1, 2, 3, 4, 5].map((item, index) => (
				<div key={index}>
					<ProjectItemMobile/>
				</div>
			))}
			{modal.modalConfirmation.isOpen && <DialogSliderMobile/>}
		</div>
	)
}
