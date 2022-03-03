import MainContent from "./MainContent";
import CheckAdded from "./CheckAdded";
import { useState } from "react";
import $ from "jquery";
import { CSSProperties } from "react";

const Main = () => {
	const [mainClass, setMainClass] = useState("");
	const [checkAddedCss, setCheckAddedCss] = useState<CSSProperties>({});

	$(window).on("load", () => {
		const width = window.innerWidth;
		if (width > 1000) {
			setMainClass("d-flex justify-content-evenly");
			const height = window.innerHeight;
			/**ヘッダー要素の高さ（paddingとmarginを除く） */
			const headerHeight = $("#title-header").height();
			if (typeof headerHeight == "undefined") return;
			/**paddingとmarginを含めたヘッダーの高さ */
			const stickHeight = headerHeight + 16 * 3;
			setCheckAddedCss({
				height: height - stickHeight,
				position: "sticky",
				top: stickHeight,
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
