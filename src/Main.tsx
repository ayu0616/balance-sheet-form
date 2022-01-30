import MainContent from "./MainContent";
import CheckAdded from "./CheckAdded";
import { useState } from "react";
import $ from "jquery";

const Main = () => {
	const [mainClass, setMainClass] = useState("d-flex");

	$(window).on("load resize", () => {
		const width = window.innerWidth;
		if (width > 1000) {
			setMainClass("d-flex");
		} else {
			setMainClass("");
		}
	});

	return (
		<main className={mainClass}>
			<CheckAdded />
			<MainContent />
		</main>
	);
};

export default Main;
