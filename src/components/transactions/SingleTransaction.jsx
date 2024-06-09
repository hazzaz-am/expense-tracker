/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import deleteSvg from "../../assets/images/delete.svg";
import editSvg from "../../assets/images/edit.svg";
import { editActive } from "../../features/transaction/transactionSlice";

const SingleTransaction = ({ transaction }) => {
	const { name, type, amount } = transaction;
	const dispatch = useDispatch()

	

	const handleEditTransaction = () => {
		dispatch(editActive(transaction))
	}

	return (
		<li className={`transaction ${type}`}>
			<p>{name}</p>
			<div className="right">
				<p>৳ {amount}</p>
				<button className="link">
					<img className="icon" src={editSvg} onClick={handleEditTransaction}/>
				</button>
				<button className="link">
					<img className="icon" src={deleteSvg} />
				</button>
			</div>
		</li>
	);
};

export default SingleTransaction;
