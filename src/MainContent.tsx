import CurrentAmount from "./CurrentAmount";
import MainForm from "./MainForm";

const MainContent = () => {
    return (
		<div id="main-content" className="w-100">
			<div className="px-3">
				<CurrentAmount />
				<MainForm />
			</div>
		</div>
	);
}

export default MainContent