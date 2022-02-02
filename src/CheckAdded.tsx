import { CSSProperties, useEffect, useState } from "react";
import AddedValues from "./AddedValues";
import $ from "jquery";

const CheckAdded = (props: { containerCss: CSSProperties }) => {
	const [spreadSheetData, setSpreadSheetData] = useState([[""]]);

	const [count, setCount] = useState(0);
	const noValueText = "追加された項目はありません";
	const [infoText, setInfoText] = useState(noValueText);
	const changeCount = () => setCount((prevState) => prevState - 1);
	const changeInfoText = (count: number) => {
		if (count) {
			setInfoText(count + "件の項目を確認してください");
		} else {
			setInfoText(noValueText);
		}
	};
	const btnOnClick = () => {
		changeCount();
		changeInfoText(count - 1);
	};

	const sheetId = "1uwM7-NMiNbSnjRfVXhekLoKSFMFZt2zd_ZMksGRE_9U";
	const sheetName = "自動追加";
	const apiKey = "AIzaSyBh6fWBIDR8nZvucod3Fe77Ro4Hd3xtjO8";
	const jsonUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

	useEffect(() => {
		$.getJSON(jsonUrl).done((json) => {
			const data = json.values;
			data.shift();
			setSpreadSheetData(data);
			setCount(data.length);
			changeInfoText(data.length);
		});
	}, []);

	return (
		<div id="added-container" className="px-3 w-100 overflow-auto" style={props.containerCss}>
			<div className="p-3">
				<h2>自動追加</h2>
				<p>{infoText}</p>
				{spreadSheetData.map((data, index) => {
					return <AddedValues addedData={data} onClick={btnOnClick} key={index} />;
				})}
			</div>
		</div>
	);
};

export default CheckAdded;
