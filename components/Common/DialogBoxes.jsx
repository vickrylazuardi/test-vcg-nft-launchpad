const {motion} = require("framer-motion");
import BoxesItem from "../Dashboard/BoxesItem";
import {useDispatch, useSelector} from "react-redux";
import {toggleModalBoxes} from "../../redux/modalReducer";

export default function DialogBoxes() {
	//functional
	const {loading} = useSelector(state => state.modal.modalBoxes);
	const dispatch = useDispatch();
	const modalBoxes = {
		loading: false,
		isOpen: false,
		title: {
			en: "Projects",
		}
	};
	//styling
	const textStyling = {
		fontSize: "14px",
		color: "#9AA4BF"
	};
	const imgLoader = {
		width: "150px",
		height: "150px",
		objectFit: "cover"
	};
	const backdrop = {
		visible: {opacity: 1},
		hidden: {opacity: 0}
	};
	const animateModal = {
		hidden: {
			y: "-100vh",
			opacity: 0
		},
		visible: {
			y: "40px",
			opacity: 1,
			transition: {delay: 0.5}
		}
	};
	return (
		<motion.div id="dialog-boxes-overlay" variants={backdrop} initial="hidden" animate="visible" exit="hidden">
			<motion.div className="dialog-boxes rounded-xl" variants={animateModal}>
				<div className="dialog-boxes-head px-4 py-3">
					<div className="dbh-left">
						Boxes
					</div>
					<div className="dbh-right">
						<button>
							<img onClick={() => dispatch(toggleModalBoxes(modalBoxes))} width="20" height="20"
									 src="/images/svg/icon-cross.svg" alt=""/>
						</button>
					</div>
				</div>
				{loading ? (
					<div className="dialog-boxes-body flex justify-center items-center">
						<img src="/loaders/loaders.gif" className="mt-5" style={imgLoader} alt=""/>
					</div>
				) : (
					<div className="dialog-boxes-body">
						<table className="table-auto w-full">
							<thead>
							<tr style={textStyling}>
								<th className="font-semibold">No</th>
								<th className="font-semibold">Image Boxes</th>
								<th className="font-semibold">Boxes Name</th>
								<th className="font-semibold">Box Information</th>
								<th className="font-semibold">Items</th>
							</tr>
							</thead>
							<BoxesItem/>
						</table>
					</div>
				)}
			</motion.div>
		</motion.div>
	);
}
