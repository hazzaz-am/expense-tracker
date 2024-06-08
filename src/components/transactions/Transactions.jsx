import { useSelector } from "react-redux";
import SingleTransaction from "./SingleTransaction";

const Transactions = () => {
	const { transactions, isLoading, isError } = useSelector(
		(state) => state.transaction
	);

	let content = null;

	if (isLoading) {
		content = <p className="text-center">Loading....</p>;
	}

	if (!isLoading && isError) {
		content = <p className="error text-center">An error occured</p>;
	}

	if (!isLoading && !isError && transactions.length === 0) {
		content = <p className="text-center">No Transaction Occured</p>;
	}

	if (!isLoading && !isError && transactions.length > 0) {
		content = transactions.map((transaction) => (
			<SingleTransaction key={transaction.id} transaction={transaction} />
		));
	}

	return (
		<>
			<p className="second_heading">Your Transactions:</p>

			<div className="conatiner_of_list_of_transactions">
				<ul>{content}</ul>
			</div>
		</>
	);
};

export default Transactions;
