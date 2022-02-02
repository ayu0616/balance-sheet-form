import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import $ from "jquery";

// type addedDataType = {
// 	date: string;
// 	way: string;
// 	kind: string;
// 	content: string;
// 	amount: string;
// };

const AddedValues = (props: { addedData: string[]; onClick: () => void }) => {
	const [formClass, setFormClass] = useState("added-value border rounded-3 p-3 my-3");
	const [kindValue, setKindValue] = useState("");
	const [contentValue, setContentValue] = useState("");

	const options = ["学業", "趣味", "飲食費", "旅費", "交通費", "通信費", "その他費用", "収入", "出金", "入金", "繰越"];
	const optionElems: JSX.IntrinsicElements["option"][] = [];
	options.forEach((option, index) => {
		optionElems.push(
			<option value={option} key={index + 1}>
				{option}
			</option>
		);
	});

	const sendSubForm = () => {
		const subFormData = {
			"entry.143907117": props.addedData[1],
			"entry.404340766": props.addedData[2],
			"entry.1171936216": props.addedData[3],
			"entry.1297137810": props.addedData[4],
			"entry.321306606": props.addedData[5],
			"entry.2061631037": props.addedData[6],
		};
		$.ajax({
			url: "https://not-cors.herokuapp.com/" + "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeN_YxlXOgLL9LKzEjG-NuTAQy7BPTBglSWZw5afw1x-V0uZQ/formResponse",
			method: "post",
			data: subFormData,
		});
	};

	const sendMainForm = () => {
		const mainFormData = {
			"entry.143907117": props.addedData[1],
			"entry.404340766": props.addedData[2],
			"entry.1171936216": kindValue,
			"entry.1297137810": contentValue,
			"entry.321306606": props.addedData[5],
		};
		$.ajax({
			url: "https://not-cors.herokuapp.com/" + "https://docs.google.com/forms/u/0/d/e/1FAIpQLScW_qpNvlhLDsAMQX4TPvZdviPPj4LcIN0xGVB9Gzt5op5Uaw/formResponse",
			method: "post",
			data: mainFormData,
		});
	};

	const buttonOnClick = () => {
		if (kindValue == "" || contentValue == "") {
			return;
		}
		setFormClass("d-none");
		props.onClick();
		sendSubForm();
		sendMainForm();
	};

	return (
		<Form className={formClass}>
			<p>
				{props.addedData[1]} {props.addedData[2]}（{props.addedData[5]}円）
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
				placeholder={props.addedData[4]}
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
