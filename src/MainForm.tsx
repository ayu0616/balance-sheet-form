import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { DateInput, CashBankInput, KindInput, ContentInput, AmountInput } from "./InputAreas";
import $ from "jquery";
import { useState } from "react";

const MainForm = () => {
	const [kindValue, setKindValue] = useState("");
	const [contentValue, setContentValue] = useState("");
	const [amountValue, setAmountValue] = useState("");
	const [submitButtonState, setSubmitButtonState] = useState(false)

	const today = new Date();
	const data = {
		month: today.getMonth() + 1,
		day: today.getDate(),
		cashOrBank: "現金",
		kind: kindValue,
		content: contentValue,
		amount: Number(amountValue),
	};

	const btnOnClick = () => {
		if (data.kind == "" || data.content == "" || isNaN(data.amount) || data.amount <= 0) {
			return;
		}
		const sendData = {
			"entry.143907117": `${data.month}月${data.day}日`,
			"entry.404340766": data.cashOrBank,
			"entry.1171936216": data.kind,
			"entry.1297137810": data.content,
			"entry.321306606": data.amount.toString(),
		};

		setSubmitButtonState(true)

		$.ajax({
			url: "https://not-cors.herokuapp.com/" + "https://docs.google.com/forms/u/0/d/e/1FAIpQLScW_qpNvlhLDsAMQX4TPvZdviPPj4LcIN0xGVB9Gzt5op5Uaw/formResponse",
			method: "post",
			data: sendData,
		}).done(() => {
			alert("送信完了しました")
			setKindValue("");
			setContentValue("");
			setAmountValue("");
		}).always(() => {
			setSubmitButtonState(false)
		});
	};

	return (
		<Form id="main-form" className="my-3 p-3">
			<h2>入力フォーム</h2>
			<DateInput data={data} />
			<CashBankInput data={data} />
			<KindInput value={kindValue} kindOnChange={setKindValue} />
			<ContentInput value={contentValue} contentOnChange={setContentValue} />
			<AmountInput value={amountValue} amountOnChange={setAmountValue} />
			<Button className="w-100" onClick={btnOnClick} disabled={submitButtonState}>
				送信
			</Button>
		</Form>
	);
};

export default MainForm;
