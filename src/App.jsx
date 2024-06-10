import Form from "./components/Form";
import Layout from "./components/Layout";
import Balance from "./components/Balance";
import Transactions from "./components/transactions/Transactions";

const App = () => {
	return (
		<Layout>
			<Balance />
			<Form />
			<Transactions />
		</Layout>
	);
};

export default App;
