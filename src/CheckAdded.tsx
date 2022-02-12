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

	const deleteDouble = (array: any[]) => {
		const newArr = array;
		let h, i, j: number;
		for (h = 0; h < array.length; h++) {
			var curItem = array[h];
			var foundCount = 0;
			// search array for item
			for (i = 0; i < array.length; i++) {
				if (array[i] == array[h]) foundCount++;
			}
			if (foundCount > 1) {
				// remove repeated item from new array
				for (j = 0; j < newArr.length; j++) {
					if (newArr[j] == curItem) {
						newArr.splice(j, 1);
						j--;
					}
				}
			}
		}
		return newArr;
	};

	useEffect(() => {
		$.getJSON(jsonUrl).done((json) => {
			const data: string[][] = json.values.map((x: string[]) => { x.shift(); return x;});
			data.shift();
			const dataOnlyUnique = deleteDouble(data.map((x) => x.toString())).map((x) => x.split(","));
			setSpreadSheetData(dataOnlyUnique);
			setCount(dataOnlyUnique.length);
			changeInfoText(dataOnlyUnique.length);
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
