/* eslint-disable react/prop-types */
import deleteSvg from "../../assets/images/delete.svg";
import editSvg from "../../assets/images/edit.svg";

const SingleTransaction = ({ transaction }) => {
	const { name, type, amount } = transaction;
	return (
		<li className={`transaction ${type}`}>
			<p>{name}</p>
			<div className="right">
				<p>৳ {amount}</p>
				<button className="link">
					<img className="icon" src={editSvg} />
				</button>
				<button className="link">
					<img className="icon" src={deleteSvg} />
				</button>
			</div>
		</li>
	);
};

export default SingleTransaction;
