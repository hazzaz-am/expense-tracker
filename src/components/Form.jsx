import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	addNewTransaction,
	changeTransaction,
	editInActive,
	fetchTransactions,
} from "../features/transaction/transactionSlice";

const Form = () => {
	const [name, setName] = useState("");
	const [type, setType] = useState("");
	const [amount, setAmount] = useState("");
	const [editMode, setEditMode] = useState(false);

	const dispatch = useDispatch();
	const { isError, isLoading } = useSelector((state) => state.transaction);
	const { editing } = useSelector((state) => state.transaction);

	useEffect(() => {
		dispatch(fetchTransactions());
	}, [dispatch]);

	useEffect(() => {
		const { id, name, type, amount } = editing;
		if (id) {
			setEditMode(true);
			setName(name);
			setType(type);
			setAmount(amount);
		} else {
			setEditMode(false);
			resetInputs();
		}
	}, [editing]);

	const resetInputs = () => {
		setName("");
		setType("");
		setAmount("");
	};

	const handleCreate = (e) => {
		e.preventDefault();
		dispatch(
			addNewTransaction({
				name,
				type,
				amount: Number(amount),
			})
		);
		resetInputs();
	};

	const handleCancelBtn = () => {
		resetInputs();
		setEditMode(false);
		dispatch(editInActive());
	};

	const submitUpdateTransaction = (e) => {
		e.preventDefault();
		dispatch(
			changeTransaction({
				id: editing?.id,
				data: {
					name,
					type,
					amount,
				},
			})
		);
		resetInputs();
		setEditMode(false);
	};

	return (
		<div className="form">
			<h3>Add new transaction</h3>

			<form onSubmit={editMode ? submitUpdateTransaction : handleCreate}>
				<div className="form-group">
					<label htmlFor="transaction_name">Name</label>
					<input
						type="text"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="My Salary"
						required
					/>
				</div>

				<div className="form-group radio">
					<label htmlFor="transaction_type">Type</label>
					<div className="radio_group">
						<input
							type="radio"
							value="income"
							onChange={() => setType("income")}
							name="type"
							checked={type === "income"}
							required
						/>
						<label htmlFor="transaction_type">Income</label>
					</div>
					<div className="radio_group">
						<input
							type="radio"
							value="expense"
							onChange={() => setType("expense")}
							name="type"
							placeholder="Expense"
							checked={type === "expense"}
						/>
						<label htmlFor="transaction_type">Expense</label>
					</div>
				</div>

				<div className="form-group">
					<label htmlFor="transaction_amount">Amount</label>
					<input
						type="number"
						placeholder="300"
						name="amount"
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						required
					/>
				</div>

				<button disabled={isLoading} type="submit" className="btn">
					{editMode ? "Update Transaction" : "Add Transaction"}
				</button>

				{!isLoading && isError && (
					<p className="error text-center">An Error Occured</p>
				)}
			</form>

			{editMode && (
				<button className="btn cancel_edit" onClick={handleCancelBtn}>
					Cancel Edit
				</button>
			)}
		</div>
	);
};

export default Form;
