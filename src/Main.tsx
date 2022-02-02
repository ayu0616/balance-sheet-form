import MainContent from "./MainContent";
import CheckAdded from "./CheckAdded";
import { useState } from "react";
import $ from "jquery";
import { CSSProperties } from "react";

const Main = () => {
	const [mainClass, setMainClass] = useState("");
	const [checkAddedCss, setCheckAddedCss]: [CSSProperties, React.Dispatch<React.SetStateAction<{}>>] = useState({});

	$(window).on("load", () => {
		const width = window.innerWidth;
		if (width > 1000) {
			setMainClass("d-flex justify-content-evenly");
			const height = window.innerHeight;
			const headerHeight = 46.938 + 16 * 3;
			setCheckAddedCss({
				height: height - headerHeight,
				position: "sticky",
				top: headerHeight,
			});
		} else {
			setMainClass("");
			setCheckAddedCss({});
		}
	});
	return (
		<main className={mainClass}>
			<CheckAdded containerCss={checkAddedCss} />
			<MainContent />
		</main>
	);
};

export default Main;
