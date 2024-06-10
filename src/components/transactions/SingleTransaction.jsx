/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import deleteSvg from "../../assets/images/delete.svg";
import editSvg from "../../assets/images/edit.svg";
import {
	editActive,
	removeTransaction,
} from "../../features/transaction/transactionSlice";
import thousandsSeparator from "../../utils/thousandsSeparator";

const SingleTransaction = ({ transaction }) => {
	const { id, name, type, amount } = transaction;
	const dispatch = useDispatch();

	const handleEditTransaction = () => {
		dispatch(editActive(transaction));
	};

	const handleDeleteTransaction = () => {
		dispatch(removeTransaction(id));
	};

	return (
		<li className={`transaction ${type}`}>
			<p>{name}</p>
			<div className="right">
				<p>৳ {thousandsSeparator(amount)}</p>
				<button className="link">
					<img className="icon" src={editSvg} onClick={handleEditTransaction} />
				</button>
				<button className="link">
					<img
						className="icon"
						src={deleteSvg}
						onClick={handleDeleteTransaction}
					/>
				</button>
			</div>
		</li>
	);
};

export default SingleTransaction;
