import { useState } from "react";
import { Button, ButtonGroup, Form, FormControl, InputGroup } from "react-bootstrap";
import FormGroup from "./FormGroup";
import "./style.scss";

// type dataType = {
//     month: number;
//     day: number;
//     cashOrBank: string;
//     kind: string;
//     content: string;
//     amount: number;
// };

const DateInput = (props: { values: { month: number; day: number }; onChange: (values: { month: number; day: number }) => void }) => {
    const [date, setDate] = useState(new Date());

    const changeDate = (dateToChange: Date) => {
        changeButtonState(dateToChange);
        props.onChange({ month: dateToChange.getMonth() + 1, day: dateToChange.getDate() });
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
            if (changedMonth === buttonMonth && changedDay === buttonDay) {
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
                <FormControl type="tel" value={date.getMonth() + 1} onChange={() => {}} disabled={true} />
                <InputGroup.Text>月</InputGroup.Text>
                <FormControl type="tel" value={date.getDate()} onChange={() => {}} disabled={true} />
                <InputGroup.Text>日</InputGroup.Text>
                <ButtonGroup vertical={true}>
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

const CashBankInput = (props: { value: string; onChange: (value: string) => void }) => {
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
                    defaultChecked={true}
                    onClick={(e) => props.onChange(e.currentTarget.value)}
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
                    onClick={(e) => props.onChange(e.currentTarget.value)}
                />
                <label htmlFor="bank" className="btn btn-outline-primary w-50">
                    銀行・カード
                </label>
            </ButtonGroup>
        </FormGroup>
    );
};

const AccountTitleInput = (props: { value: string; onChange: (value: string) => void; id: string; title: string; accountTitles: string[] }) => {
    const optionElems: JSX.IntrinsicElements["option"][] = [];
    props.accountTitles.forEach((option, index) => {
        optionElems.push(
            <option value={option} key={index + 1}>
                {option}
            </option>
        );
    });

    return (
        <FormGroup>
            <Form.Label htmlFor={props.id}>{props.title}</Form.Label>
            <Form.Select
                id={props.id}
                value={props.value}
                onChange={(e) => {
                    const currentVal = e.currentTarget.value;
                    props.onChange(currentVal);
                }}
            >
                <>
                    <option disabled={true} value={""}>
                        選択してください
                    </option>
                    {optionElems}
                </>
            </Form.Select>
        </FormGroup>
    );
};

const KarikataInput = (props: { value: string; karikataOnChange: (value: string) => void; id: string; accountTitles: string[] }) => {
    return <AccountTitleInput value={props.value} onChange={props.karikataOnChange} id={props.id} title="借方" accountTitles={props.accountTitles} />;
};

const KashikataInput = (props: { value: string; kashikataOnChange: (value: string) => void; id: string; accountTitles: string[] }) => {
    return <AccountTitleInput value={props.value} onChange={props.kashikataOnChange} id={props.id} title="貸方" accountTitles={props.accountTitles} />;
};

const ContentInput = (props: { value: string; contentOnChange: (value: string) => void; id: string }) => {
    return (
        <FormGroup>
            <Form.Label htmlFor={props.id}>内容</Form.Label>
            <Form.Control
                id={props.id}
                value={props.value}
                onChange={(e) => {
                    const currentVal = e.currentTarget.value;
                    props.contentOnChange(currentVal);
                }}
            />
        </FormGroup>
    );
};

const AmountInput = (props: { value: string; amountOnChange: (value: string) => void; id: string }) => {
    return (
        <FormGroup>
            <Form.Label htmlFor={props.id}>金額</Form.Label>
            <InputGroup>
                <Form.Control
                    id={props.id}
                    inputMode="numeric"
                    value={props.value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,')}
                    onChange={(e) => {
                        const currentVal = Number(e.currentTarget.value.replaceAll(",", ""));
                        if (isNaN(currentVal) || currentVal <= 0) {
                            props.amountOnChange("");
                            return;
                        }
                        props.amountOnChange(currentVal.toString());
                    }}
                />
                <InputGroup.Text>円</InputGroup.Text>
            </InputGroup>
        </FormGroup>
    );
};

export { DateInput, CashBankInput, KarikataInput, KashikataInput, ContentInput, AmountInput };
