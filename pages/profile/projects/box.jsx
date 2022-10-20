import {useState} from "react";

export default function box() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [pslItem] = useState([0, 1, 2]);
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
				<div className="psl-detail-page-mobile px-3 py-3" style={borderBottom}>
					<img src="https://placeimg.com/160/160/arch" className="rounded-md" alt=""/>
					<div className="psl-detailed">
						<p className="psld-name">Cross Out</p>
						<p className="psld-item font-semibold" style={colorText}>Stock: 1</p>
					</div>
				</div>
			))}
		</div>
	)
}
