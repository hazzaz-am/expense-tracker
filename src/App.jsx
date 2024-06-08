import Form from "./components/Form";
import Layout from "./components/Layout";
import TopCard from "./components/TopCard";
import Transactions from "./components/transactions/Transactions";

const App = () => {
	return (
		<Layout>
			<TopCard />
			<Form />
			<Transactions />
		</Layout>
	);
};

export default App;
