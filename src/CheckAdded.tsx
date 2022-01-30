import AddedValues from "./AddedValues";

const CheckAdded = () => {
	const testData = { date: "1月30日", way: "現金", kind: "その他費用", content: "テストテストテストテストテスト", amount: "31415" };

	const addedValues = [<AddedValues addedData={testData}></AddedValues>, <AddedValues addedData={testData}></AddedValues>];

	return (
		<div id="added-container" className="mx-auto px-3">
			<h2>自動追加</h2>
			{addedValues}
		</div>
	);
};

export default CheckAdded;
