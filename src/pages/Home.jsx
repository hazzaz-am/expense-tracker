import Pagination from "../components/ui/Pagination";
import VideoGrid from "../components/videoGrid/VideoGrid";
import VideoTag from "../components/videoTags/VideoTag";

const Home = () => {
	return (
		<>
			<VideoTag />
			<VideoGrid />
			<Pagination />
		</>
	);
};

export default Home;
