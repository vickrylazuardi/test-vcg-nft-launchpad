import React, {useState} from "react";

export default function BoxesItem() {
	const [items, setItems] = useState([1, 2, 3, 4, 5]);
	const [boxItem, setBoxItem] = useState(['CrossOut(1)', 'Deadly Weapon(1)', 'City Black(1)']);
	const bgChipsRequest = {
		backgroundColor: "#FFD4C2",
		color: "#E28058"
	};
	const bgChipsApproved = {
		backgroundColor: "#C4FBCA",
		color: "#40D04F"
	};
	return (
		<tbody>
		{items.map((item, index) => (
			<tr key={index}>
				<td className="text-center">{index + 1}</td>
				<td className="dialog-boxes-image">
					<img src="https://placeimg.com/160/160/arch" alt=""/>
				</td>
				<td className="dialog-boxes-name text-center">
					Small Box
				</td>
				<td className="text-center">Price 300, Stock 10</td>
				<td className="text-center">
					{boxItem.map((value,i)=>(
						<span key={i} className="boxes-item-list">{value + ", "}</span>
					))}
				</td>
			</tr>
		))}
		</tbody>
	);
}
