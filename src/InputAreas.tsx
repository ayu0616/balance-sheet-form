import { Button, ButtonGroup, Form, FormControl, InputGroup } from "react-bootstrap";
import FormGroup from "./FormGroup";
import { useState } from "react";

type dataType = {
	month: number;
	day: number;
	cashOrBank: string;
	kind: string;
	content: string;
	amount: number;
};

const DateInput = ({ data }: { data: dataType }) => {
	const [date, setDate] = useState(new Date());
	const [month, setMonth] = useState(date.getMonth() + 1);
	const [day, setDay] = useState(date.getDate());

	const changeDate = (dateToChange: Date) => {
		setMonth(dateToChange.getMonth() + 1);
		setDay(dateToChange.getDate());
		changeButtonState(dateToChange);
		data.month = dateToChange.getMonth() + 1;
		data.day = dateToChange.getDate();
	};

	const dateUp = () => {
		const changedDate = new Date(date.getTime() + 1000 * 60 * 60 * 24);
		setDate(changedDate);
		changeDate(changedDate);
	};

	const dateDown = () => {
		const changedDate = new Date(date.getTime() - 1000 * 60 * 60 * 24);
		setDate(changedDate);
		changeDate(changedDate);
	};

	const changeDayBeforeYesterday = () => {
		const changedDate = new Date();
		changedDate.setDate(changedDate.getDate() - 2);
		setDate(changedDate);
		changeDate(changedDate);
	};

	const changeYesterday = () => {
		const changedDate = new Date();
		changedDate.setDate(changedDate.getDate() - 1);
		setDate(changedDate);
		changeDate(changedDate);
	};

	const changeToday = () => {
		const changedDate = new Date();
		setDate(changedDate);
		changeDate(changedDate);
	};

	const [todayBtnState, setTodayBtnState] = useState("primary");
	const [yesterdayBtnState, setYesterdayBtnState] = useState("outline-primary");
	const [beforeYesterdayBtnState, setBeforeYesterdayBtnState] = useState("outline-primary");

	const changeButtonState = (date: Date) => {
		const today = new Date();
		const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);
		const dayBeforeYesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
		const changedMonth = date.getMonth();
		const changedDay = date.getDate();
		const buttonDates = [today, yesterday, dayBeforeYesterday];
		const funcs = [setTodayBtnState, setYesterdayBtnState, setBeforeYesterdayBtnState];
		buttonDates.forEach((value, index) => {
			const buttonMonth = value.getMonth();
			const buttonDay = value.getDate();
			if (changedMonth == buttonMonth && changedDay == buttonDay) {
				funcs[index]("primary");
			} else {
				funcs[index]("outline-primary");
			}
		});
	};

	return (
		<FormGroup>
			<Form.Label>日付</Form.Label>
			<InputGroup>
				<FormControl type="tel" value={month} onChange={() => {}}></FormControl>
				<InputGroup.Text>月</InputGroup.Text>
				<FormControl type="tel" value={day} onChange={() => {}}></FormControl>
				<InputGroup.Text>日</InputGroup.Text>
				<ButtonGroup vertical>
					<Button id="day-up" variant="secondary" onClick={dateUp}>
						↑
					</Button>
					<Button id="day-down" variant="secondary" onClick={dateDown}>
						↓
					</Button>
				</ButtonGroup>
			</InputGroup>
			<ButtonGroup className="w-100 mt-3">
				<Button id="day-before-yesterday" variant={beforeYesterdayBtnState} onClick={changeDayBeforeYesterday}>
					一昨日
				</Button>
				<Button id="yesterday" variant={yesterdayBtnState} onClick={changeYesterday}>
					昨日
				</Button>
				<Button id="today" variant={todayBtnState} onClick={changeToday}>
					今日
				</Button>
			</ButtonGroup>
		</FormGroup>
	);
};

const CashBankInput = ({ data }: { data: dataType }) => {
	return (
		<FormGroup>
			<p className="m-0">現金／銀行・カード</p>
			<ButtonGroup className="mt-3 w-100">
				<input
					id="cash"
					className="btn-check"
					type="radio"
					name="cash-or-bank-radio"
					value="現金"
					defaultChecked
					onClick={(e) => {
						data.cashOrBank = e.currentTarget.value;
					}}
				/>
				<label htmlFor="cash" className="btn btn-outline-primary w-50">
					現金
				</label>
				<input
					id="bank"
					className="btn-check"
					type="radio"
					name="cash-or-bank-radio"
					value="銀行・カード"
					onClick={(e) => {
						data.cashOrBank = e.currentTarget.value;
					}}
				/>
				<label htmlFor="bank" className="btn btn-outline-primary w-50">
					銀行・カード
				</label>
			</ButtonGroup>
		</FormGroup>
	);
};

const KindInput = ({ data }: { data: dataType }) => {
	const [value, setValue] = useState(data.kind);

	const options = ["学業", "趣味", "飲食費", "旅費", "交通費", "通信費", "その他費用", "収入", "出金", "入金", "繰越"];
	const optionElems: JSX.IntrinsicElements["option"][] = [];
	options.forEach((option, index) => {
		optionElems.push(
			<option value={option} key={index + 1}>
				{option}
			</option>
		);
	});

	return (
		<FormGroup>
			<Form.Label>種別</Form.Label>
			<Form.Select
				value={value}
				onChange={(e) => {
					const currentVal = e.currentTarget.value;
					setValue(currentVal);
					data.kind = currentVal;
				}}
			>
				<option disabled value={""}>
					選択してください
				</option>
				{optionElems}
			</Form.Select>
		</FormGroup>
	);
};

const ContentInput = ({ data }: { data: dataType }) => {
	const [value, setValue] = useState(data.content);
	return (
		<FormGroup>
			<Form.Label>内容</Form.Label>
			<Form.Control
				value={value}
				onChange={(e) => {
					const currentVal = e.currentTarget.value;
					setValue(currentVal);
					data.content = currentVal;
				}}
			></Form.Control>
		</FormGroup>
	);
};

const AmountInput = ({ data }: { data: dataType }) => {
	const [value, setValue] = useState(data.amount.toString());
	return (
		<FormGroup>
			<Form.Label>金額</Form.Label>
			<InputGroup>
				<Form.Control
					type="tel"
					value={value}
					onChange={(e) => {
						const currentVal = Number(e.currentTarget.value);
						if (isNaN(currentVal) || currentVal <= 0) {
							setValue("");
							data.amount = 0;
							return;
						}
						setValue(currentVal.toString());
						data.amount = currentVal;
					}}
				/>
				<InputGroup.Text>円</InputGroup.Text>
			</InputGroup>
		</FormGroup>
	);
};

export { DateInput, CashBankInput, KindInput, ContentInput, AmountInput };
