import { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";

type addedDataType = {
	date: string;
	way: string;
	kind: string;
	content: string;
	amount: string;
};

const AddedValues = ({ addedData }: { addedData: addedDataType }) => {
    const [formClass, setFormClass] = useState("border rounded-3 p-3 my-3");

	const [kindValue, setKindValue] = useState("");

	const options = ["学業", "趣味", "飲食費", "旅費", "交通費", "通信費", "その他費用", "収入", "出金", "入金", "繰越"];
	const optionElems: JSX.IntrinsicElements["option"][] = [];
	options.forEach((option, index) => {
		optionElems.push(
			<option value={option} key={index + 1}>
				{option}
			</option>
		);
	});

	const [contentValue, setContentValue] = useState("");

    const buttonOnClick = () => {
        setFormClass("d-none")
    }

	return (
		<Form className={formClass}>
			<p>
				{addedData.date}・{addedData.way}・{addedData.amount}円
			</p>
			<Form.Select
				className="mb-3"
				value={kindValue}
				onChange={(e) => {
					const currentVal = e.currentTarget.value;
					setKindValue(currentVal);
				}}
			>
				<option disabled value={""}>
					選択してください
				</option>
				{optionElems}
			</Form.Select>
			<FormControl
				className="mb-3"
				placeholder={addedData.content}
				value={contentValue}
				onChange={(e) => {
					setContentValue(e.currentTarget.value);
				}}
			/>
			<Button onClick={buttonOnClick}>送信</Button>
		</Form>
	);
};

export default AddedValues;
