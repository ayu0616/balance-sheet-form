import React, { useState } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import $ from "jquery";
import { kindOptions } from "./helper";

// type addedDataType = {
// 	date: string;
// 	way: string;
// 	kind: string;
// 	content: string;
// 	amount: string;
// };

const AddedValues = (props: { addedData: string[]; onClick: () => void }) => {
	const dataDict = {
		date: props.addedData[0],
		way: props.addedData[1],
		kind: props.addedData[2],
		content: props.addedData[3],
		amount: props.addedData[4],
		id: props.addedData[5],
	};
	const [formClass, setFormClass] = useState("added-value border rounded-3 p-3 my-3");
	const [kindValue, setKindValue] = useState("");
	const [contentValue, setContentValue] = useState("");

	const optionElems: JSX.IntrinsicElements["option"][] = [];
	kindOptions.forEach((option, index) => {
		optionElems.push(
			<option value={option} key={index + 1}>
				{option}
			</option>
		);
	});

	const sendSubForm = () => {
		const subFormData = {
			"entry.143907117": dataDict.date,
			"entry.404340766": dataDict.way,
			"entry.1171936216": dataDict.kind,
			"entry.1297137810": dataDict.content,
			"entry.321306606": dataDict.amount,
			"entry.2061631037": dataDict.id,
		};
		$.ajax({
			url: "https://not-cors.herokuapp.com/" + "https://docs.google.com/forms/u/0/d/e/1FAIpQLSeN_YxlXOgLL9LKzEjG-NuTAQy7BPTBglSWZw5afw1x-V0uZQ/formResponse",
			method: "post",
			data: subFormData,
		});
	};

	const sendMainForm = () => {
		const mainFormData = {
			"entry.143907117": dataDict.date,
			"entry.404340766": dataDict.way,
			"entry.1171936216": kindValue,
			"entry.1297137810": contentValue,
			"entry.321306606": dataDict.amount,
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
				{dataDict.date} {dataDict.way}（{dataDict.amount}円）
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
				placeholder={dataDict.content}
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
