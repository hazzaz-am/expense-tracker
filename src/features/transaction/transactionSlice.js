import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	addTransaction,
	deleteTransaction,
	editTransaction,
	getTransaction,
} from "./transactionAPI";

// initial state
export const initialState = {
	isLoading: false,
	transactions: [],
	isError: false,
	error: "",
	editing: {}
};

// async thunk functions start ---------

// get all transactions from server
export const fetchTransactions = createAsyncThunk(
	"transaction/fetchTransactions",
	async () => {
		const transactions = await getTransaction();
		return transactions;
	}
);

// add new transaction to server
export const addNewTransaction = createAsyncThunk(
	"transaction/addNewTransaction",
	async (data) => {
		const transactions = await addTransaction(data);
		return transactions;
	}
);

// change any transaction
export const changeTransaction = createAsyncThunk(
	"transaction/changeTransaction",
	async ({ id, data }) => {
		const transactions = await editTransaction(id, data);
		return transactions;
	}
);

// remove transaction from server
export const removeTransaction = createAsyncThunk(
	"transaction/removeTransaction",
	async (id) => {
		const transactions = await deleteTransaction(id);
		return transactions;
	}
);

// async thunk functions end ---------

// -------------------------------------------

// create slice ---------

const transactionSlice = createSlice({
	name: "transaction",
	initialState,
	reducers : {
		editActive: (state, action) => {
			state.editing = action.payload
		},
		editInActive : (state) => {
			state.editing = {}
		}
	},
	extraReducers: (builder) => {
		builder
			// ----------------- for get transactions from server -----------------
			.addCase(fetchTransactions.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(fetchTransactions.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.transactions = action.payload;
			})
			.addCase(fetchTransactions.rejected, (state, action) => {
				state.isLoading = false;
				state.transactions = [];
				state.isError = true;
				state.error = action.error?.message;
			})
			// ----------------- add new transaction  -----------------
			.addCase(addNewTransaction.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(addNewTransaction.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.transactions.push(action.payload);
			})
			.addCase(addNewTransaction.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.error = action.error?.message;
			})
			// ----------------- change existing transaction  -----------------
			.addCase(changeTransaction.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(changeTransaction.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				const indexToUpdate = state.transactions.findIndex(
					(trans) => trans.id === action.payload.id
				);
				state.transactions[indexToUpdate] = action.payload;
			})
			.addCase(changeTransaction.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.error = action.error?.message;
			})
			// ----------------- remove existing transaction  -----------------
			.addCase(removeTransaction.pending, (state) => {
				state.isError = false;
				state.isLoading = true;
			})
			.addCase(removeTransaction.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.transactions = state.transactions.filter(
					(trans) => trans.id !== action.payload
				);
			})
			.addCase(removeTransaction.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.error = action.error?.message;
			});
	},
});

export default transactionSlice.reducer;
export const {editActive, editInActive} = transactionSlice.actions
