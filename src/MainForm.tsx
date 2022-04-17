import { Button, Form, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { DateInput, CashBankInput, KindInput, ContentInput, AmountInput } from "./InputAreas";
import $ from "jquery";
import { useEffect, useState } from "react";
import { notCorsUrl } from "./helper";

const MainForm = () => {
	const today = new Date();

	const [monthValue, setMonthValue] = useState(today.getMonth() + 1);
	const [dayValue, setDayValue] = useState(today.getDate());
	const [cashOrBankValue, setCashOrBankValue] = useState("現金");
	const [kindValue, setKindValue] = useState("");
	const [contentValue, setContentValue] = useState("");
	const [amountValue, setAmountValue] = useState("");
	const [submitButtonState, setSubmitButtonState] = useState(false);
	const submitButtonTexts = {
		normal: <span>送信</span>,
		loading: <Spinner size="sm" animation="border" />,
	};
	const [submitButtonText, setSubmitButtonText] = useState(submitButtonTexts.normal);

	const setDateValue = (value:{ month: number; day: number }) => {
		setMonthValue(value.month)
		setDayValue(value.day)
	}

	const kindOnChange = (value: string) => {
		setKindValue(value);
		if (["出金", "入金"].includes(value)) {
			setContentValue(value);
		}
	};

	const data = {
		month: monthValue,
		day: dayValue,
		cashOrBank: cashOrBankValue,
		kind: kindValue,
		content: contentValue,
		amount: Number(amountValue),
	};

	/**ボタンをクリックしたら */
	const btnOnClick = () => {
		// 入力値が不適切ならreturn
		if (data.kind == "" || data.content == "" || isNaN(data.amount) || data.amount <= 0) {
			return;
		}
		// 銀行とのやり取りなら方法は「現金」に
		if (["出金", "入金"].includes(data.kind)) {
			data.cashOrBank = "現金";
		}
		// プラスマイナス調整
		if (!["収入", "出金"].includes(data.kind)) {
			data.amount *= -1;
		}
		/**送信するデータ */
		const sendData = {
			"entry.143907117": `${data.month}月${data.day}日`,
			"entry.404340766": data.cashOrBank,
			"entry.1171936216": data.kind,
			"entry.1297137810": data.content,
			"entry.321306606": data.amount.toString(),
		};
		// ボタンを押せないように
		setSubmitButtonState(true);
		// ボタンをロード画面に
		setSubmitButtonText(submitButtonTexts.loading);
		// 銀行とのやり取りなら、方法とプラスマイナスを逆転したデータを送信する
		if (["出金", "入金"].includes(data.kind)) {
			/**逆転するデータ */
			const reversedData = { ...sendData };
			reversedData["entry.404340766"] = "銀行・カード";
			reversedData["entry.321306606"] = (Number(reversedData["entry.321306606"]) * -1).toString();
			// 送信する
			$.ajax({
				url: notCorsUrl + "https://docs.google.com/forms/u/0/d/e/1FAIpQLScW_qpNvlhLDsAMQX4TPvZdviPPj4LcIN0xGVB9Gzt5op5Uaw/formResponse",
				method: "post",
				data: reversedData,
			});
		}
		$.ajax({
			url: notCorsUrl + "https://docs.google.com/forms/u/0/d/e/1FAIpQLScW_qpNvlhLDsAMQX4TPvZdviPPj4LcIN0xGVB9Gzt5op5Uaw/formResponse",
			method: "post",
			data: sendData,
		})
			.done(() => {
				// 通知を表示し、入力値を消去する
				alert("送信完了しました");
				setKindValue("");
				setContentValue("");
				setAmountValue("");
			})
			.always(() => {
				// ボタンを押せるように戻す
				setSubmitButtonState(false);
				// ボタンのテキストを戻す
				setSubmitButtonText(submitButtonTexts.normal);
			});
	};

	return (
		<Form id="main-form" className="p-3">
			<h2>入力フォーム</h2>
			<DateInput values={{ month: monthValue, day: dayValue }} onChange={setDateValue} />
			<CashBankInput value={cashOrBankValue} onChange={setCashOrBankValue} />
			<KindInput value={kindValue} kindOnChange={kindOnChange} />
			<ContentInput value={contentValue} contentOnChange={setContentValue} />
			<AmountInput value={amountValue} amountOnChange={setAmountValue} />
			<Button className="w-100 mb-3" onClick={btnOnClick} disabled={submitButtonState}>
				{submitButtonText}
			</Button>
		</Form>
	);
};

export default MainForm;
