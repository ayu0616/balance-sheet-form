import { CSSProperties, useEffect, useState } from "react";
import AddedValues from "./AddedValues";
import $ from "jquery";

const CheckAdded = () => {
	const [spreadSheetData, setSpreadSheetData] = useState([["", "", "", "", "", ""]]);

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
	const [dataDisplay, setDataDisplay] = useState("d-none");
	const btnOnClick = () => {
		changeCount();
		changeInfoText(count - 1);
	};

	const sheetId = "1uwM7-NMiNbSnjRfVXhekLoKSFMFZt2zd_ZMksGRE_9U";
	const sheetName = "自動追加";
	const apiKey = "AIzaSyBh6fWBIDR8nZvucod3Fe77Ro4Hd3xtjO8";
	const jsonUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

	const deleteDouble = (array: any[]) => {
		/**重複している要素の順番リスト */
		const doubleIndex = [];
		// 重複している要素の順番をリストに格納
		for (let i = 0; i < array.length; i++) {
			/**それ以外の要素が入った配列 */
			const arr = Array.from(array);
			arr.splice(i, 1);
			if (arr.includes(array[i])) doubleIndex.push(i);
		}
		/**returnする配列*/
		const newArr = Array.from(array);
		/**累積回数 */
		let accumulate = 0;
		for (let j of doubleIndex) {
			newArr.splice(j - accumulate, 1);
			accumulate++;
		}
		return newArr;
	};

	useEffect(() => {
		$.getJSON(jsonUrl).done((json: { values: string[][] }) => {
			const data: string[][] = json.values.map((x) => {
				x.shift();
				return x;
			});
			data.shift();
			const dataOnlyUnique = deleteDouble(data.map((x) => x.toString())).map((x) => x.split(","));
			if (dataOnlyUnique.length != 0) setDataDisplay("");
			setSpreadSheetData(dataOnlyUnique);
			setCount(dataOnlyUnique.length);
			changeInfoText(dataOnlyUnique.length);
		});
	}, []);

	return (
		<div className="p-3">
			<h2>自動追加</h2>
			<p>{infoText}</p>
			<div className={dataDisplay}>
				{spreadSheetData.map((data, index) => (
					<AddedValues addedData={data} onClick={btnOnClick} key={index} />
				))}
			</div>
		</div>
	);
};

export default CheckAdded;
