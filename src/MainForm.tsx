import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { DateInput, CashBankInput, KindInput, ContentInput, AmountInput } from "./InputAreas";
import $ from "jquery";

const MainForm = () => {
	const today = new Date();
	const data = {
		month: today.getMonth() + 1,
		day: today.getDate(),
		cashOrBank: "現金",
		kind: "",
		content: "",
		amount: 0,
	};

	const btnOnClick = () => {
		console.log(data)
		if (data.kind == "" || data.content == "" || isNaN(data.amount) || data.amount < 0) {
			return;
		}
		const sendData = {
			"entry.143907117": `${data.month}月${data.day}日`,
			"entry.404340766": data.cashOrBank,
			"entry.1171936216": data.kind,
			"entry.1297137810": data.content,
			"entry.321306606": data.amount.toString(),
		};

		$.ajax({
			url: "https://not-cors.herokuapp.com/" + "https://docs.google.com/forms/u/0/d/e/1FAIpQLScW_qpNvlhLDsAMQX4TPvZdviPPj4LcIN0xGVB9Gzt5op5Uaw/formResponse",
			method: "post",
			data: sendData,
		}).done(() => {
			console.log("succeed");
			data.kind = ""
			data.content = ""
			data.amount = 0
		});
	};

	return (
		<Form id="main-form" className="mx-auto my-3 p-3">
			<DateInput data={data} />
			<CashBankInput data={data} />
			<KindInput data={data} />
			<ContentInput data={data} />
			<AmountInput data={data} />
			<Button className="w-100" onClick={btnOnClick}>
				送信
			</Button>
		</Form>
	);
};

export default MainForm;
