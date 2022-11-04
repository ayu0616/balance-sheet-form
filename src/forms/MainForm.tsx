import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { ACCOUNT_TITLES_URL, GOOGLE_FORM_NAMES, GOOGLE_FORM_URL, NOT_CORS_URL } from "../settings/constants";
import { AmountInput, ContentInput, DateInput, KarikataInput, KashikataInput } from "./InputAreas";

const MainForm = () => {
    const today = new Date();

    const [accountTitles, setAccountTitles] = useState<string[]>([]);
    useEffect(() => {
        $.ajax({
            url: ACCOUNT_TITLES_URL,
            method: "get",
        }).done((data: string) => {
            const rows = data.split("\n");
            setAccountTitles(rows.map((row) => row.split(",")[0]));
        });
    }, []);

    // const [monthValue, setMonthValue] = useState(today.getMonth() + 1);
    // const [dayValue, setDayValue] = useState(today.getDate());
    const [dateValue, setDateValue] = useState(today);
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

    const karikataOnChange = (value: string) => {
        setKarikataValue(value);
    };

    const kashikataOnChange = (value: string) => {
        setKashikataValue(value);
    };

    const data = {
        date: dateValue,
        karikata: karikataValue,
        kashikata: kashikataValue,
        content: contentValue,
        amount: Number(amountValue),
    };

    /**ボタンをクリックしたら */
    const btnOnClick = () => {
        // 入力値が不適切ならreturn
        if (data.karikata === "" || data.kashikata === "" || isNaN(data.amount) || data.amount <= 0) {
            return;
        }
        /**送信するデータ */
        const sendData = {
            [GOOGLE_FORM_NAMES.year]: data.date.getFullYear(),
            [GOOGLE_FORM_NAMES.month]: data.date.getMonth() + 1,
            [GOOGLE_FORM_NAMES.day]: data.date.getDate(),
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
            <DateInput value={dateValue} onChange={setDateValue} />
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
