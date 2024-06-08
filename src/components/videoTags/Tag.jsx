/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { addTag, removeTag } from "../../features/filter/filterSlice";
const Tag = ({ title }) => {
	const dispatch = useDispatch();
	const { tags: selectedTags } = useSelector((state) => state.filter);

	const isSelected = selectedTags.includes(title) ? true : false;

	const handleTagSelector = () => {
		if (isSelected) {
			dispatch(removeTag(title));
		} else {
			dispatch(addTag(title));
		}
	};
	return (
		<div
			onClick={handleTagSelector}
			className={`${
				isSelected ? "bg-blue-600 text-blue-100" : "bg-blue-100 text-blue-600"
			}  px-4 py-1 rounded-full cursor-pointer`}
		>
			{title}
		</div>
	);
};

export default Tag;
