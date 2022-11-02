import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { GOOGLE_FORM_NAMES, GOOGLE_FORM_URL, NOT_CORS_URL, SHEET_DATA_URL } from "./constants";
import { AmountInput, ContentInput, DateInput, KarikataInput, KashikataInput } from "./InputAreas";

const MainForm = () => {
    const today = new Date();

    const [accountTitles, setAccountTitles] = useState<string[]>([]);
    useEffect(() => {
        $.ajax({
            url: SHEET_DATA_URL,
            method: "get",
        }).done((data: string) => {
            const rows = data.split("\n");
            setAccountTitles(rows.map((row) => row.split(",")[0]));
        });
    });

    const [monthValue, setMonthValue] = useState(today.getMonth() + 1);
    const [dayValue, setDayValue] = useState(today.getDate());
    const [karikataValue, setKarikataValue] = useState("");
    const [kashikataValue, setKashikataValue] = useState("");
    const [contentValue, setContentValue] = useState("");
    const [amountValue, setAmountValue] = useState("");
    const [submitButtonState, setSubmitButtonState] = useState(false);
    const submitButtonTexts = {
        normal: <span>送信</span>,
        loading: <Spinner size="sm" animation="border" />,
    };
    const [submitButtonText, setSubmitButtonText] = useState(submitButtonTexts.normal);

    const setDateValue = (value: { month: number; day: number }) => {
        setMonthValue(value.month);
        setDayValue(value.day);
    };

    const karikataOnChange = (value: string) => {
        setKarikataValue(value);
    };

    const kashikataOnChange = (value: string) => {
        setKashikataValue(value);
    };

    const data = {
        month: monthValue,
        day: dayValue,
        karikata: karikataValue,
        kashikata: kashikataValue,
        content: contentValue,
        amount: Number(amountValue),
    };

    /**ボタンをクリックしたら */
    const btnOnClick = () => {
        // 入力値が不適切ならreturn
        if (data.karikata === "" || data.kashikata === "" || data.content === "" || isNaN(data.amount) || data.amount <= 0) {
            return;
        }
        /**送信するデータ */
        const sendData = {
            [GOOGLE_FORM_NAMES.date]: `2022/${data.month}/${data.day}`,
            [GOOGLE_FORM_NAMES.karikata]: data.karikata,
            [GOOGLE_FORM_NAMES.kashikata]: data.kashikata,
            [GOOGLE_FORM_NAMES.amount]: data.amount.toString(),
            [GOOGLE_FORM_NAMES.content]: data.content,
        };
        // ボタンを押せないように
        setSubmitButtonState(true);
        // ボタンをロード画面に
        setSubmitButtonText(submitButtonTexts.loading);
        // 銀行とのやり取りなら、方法とプラスマイナスを逆転したデータを送信する
        $.ajax({
            url: NOT_CORS_URL + GOOGLE_FORM_URL,
            method: "post",
            data: sendData,
        })
            .done(() => {
                // 通知を表示し、入力値を消去する
                alert("送信完了しました");
                setKarikataValue("");
                setKashikataValue("");
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
            <KarikataInput id="karikata" value={karikataValue} karikataOnChange={karikataOnChange} accountTitles={accountTitles} />
            <KashikataInput id="kashikata" value={kashikataValue} kashikataOnChange={kashikataOnChange} accountTitles={accountTitles} />
            <AmountInput id="amount" value={amountValue} amountOnChange={setAmountValue} />
            <ContentInput id="content" value={contentValue} contentOnChange={setContentValue} />
            <Button className="w-100 mb-3" onClick={btnOnClick} disabled={submitButtonState}>
                {submitButtonText}
            </Button>
        </Form>
    );
};

export default MainForm;
