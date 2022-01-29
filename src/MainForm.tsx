import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { DateInput, CashBankInput, KindInput, ContentInput, AmountInput } from "./InputAreas";

const MainForm = () => {
	return (
		<Form id="main-form" className="mx-auto my-3 p-3">
			<DateInput />
			<CashBankInput />
			<KindInput />
			<ContentInput />
			<AmountInput />
			<Button className="w-100">送信</Button>
		</Form>
	);
};

export default MainForm;
