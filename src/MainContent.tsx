import CurrentAmount from "./CurrentAmount";
import MainForm from "./MainForm";

const MainContent = () => {
    return (
		<div id="main-content" className="mx-auto">
			<CurrentAmount />
			<MainForm />
		</div>
	);
}

export default MainContent