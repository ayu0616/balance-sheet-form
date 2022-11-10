import $ from "jquery";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import { EDIT_SHEET_URL, TOTAL_DATA_URL } from "../settings/constants";
import "./style.scss";

const CurrentAmountValue = (props: { title: string; datas: [string, string][] }) => {
    return (
        <div className="mb-3">
            <h3>{props.title}</h3>
            <table className="total-data-table">
                <tbody>
                    {props.datas.map((d) => {
                        return (
                            <tr className="total-data-tr">
                                <td className="account-title-td">{d[0]}</td>
                                <td className="amount-td">{d[1]}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const CurrentAmount = () => {
    /**スプレッドシートのURLにリクエストを送る */
    const requestToSheet = (): JQuery.jqXHR<string> => {
        return $.ajax({ url: TOTAL_DATA_URL, method: "GET" });
    };

    /**スプレッドシートからのレスポンスから今月のデータのみを抽出 */
    const getMonthData = (resText: string) => {
        // 今月
        const date = new Date();
        const thisYear = date.getFullYear();
        const thisMonth = date.getMonth() + 1;
        const thisDateStr = `${thisYear}年${thisMonth}月`;

        const arr = resText.split("\n").map((row) => row.split("\t"));
        const headers = arr[0];
        const monthRow = arr.find((row) => row[0] === thisDateStr);
        const dataNum = headers.length;

        const data: [string, string][] = [];
        if (monthRow) {
            for (let i = 1; i < dataNum; i++) {
                data.push([headers[i], monthRow[i]]);
            }
        } else {
            for (let i = 1; i < dataNum; i++) {
                data.push([headers[i], "データの取得に失敗しました"]);
            }
        }
        return data;
    };

    const [assetsData, setAssetsData] = useState<[string, string][]>(["現金", "普通預金", "資産"].map((title) => [title, "¥0"]));
    const [liabilitiesData, setLiabilitiesData] = useState<[string, string][]>(["クレジット未払金", "負債"].map((title) => [title, "¥0"]));
    const [netAssetsData, setNetAssetsData] = useState<[string, string][]>(["純資産"].map((title) => [title, "¥0"]));
    const [PLData, setPLData] = useState<[string, string][]>(["損益"].map((title) => [title, "¥0"]));

    const updateData = () => {
        setAssetsData((prev) => prev.map((prevItem) => [prevItem[0], "読み込み中"]));
        setLiabilitiesData((prev) => prev.map((prevItem) => [prevItem[0], "読み込み中"]));
        setNetAssetsData((prev) => prev.map((prevItem) => [prevItem[0], "読み込み中"]));
        setPLData((prev) => prev.map((prevItem) => [prevItem[0], "読み込み中"]));
        requestToSheet().done((d) => {
            const data = getMonthData(d);
            setAssetsData((prev) => prev.map((prevItem) => data.filter((item) => item[0] === prevItem[0])[0]));
            setLiabilitiesData((prev) => prev.map((prevItem) => data.filter((item) => item[0] === prevItem[0])[0]));
            setNetAssetsData((prev) => prev.map((prevItem) => data.filter((item) => item[0] === prevItem[0])[0]));
            setPLData((prev) => prev.map((prevItem) => data.filter((item) => item[0] === prevItem[0])[0]));
        });
    };

    const [accordionCount, setAccordionCount] = useState(0);
    const buttonOnClick = () => {
        if (accordionCount % 2 === 0) {
            updateData();
        }
        setAccordionCount((prev) => prev + 1);
    };

    return (
        <div id="current-data" className="mb-3 p-3">
            <h2>データ</h2>
            <Accordion>
                <AccordionItem eventKey="0">
                    <AccordionHeader onClick={buttonOnClick}>現在のデータを表示</AccordionHeader>
                    <AccordionBody>
                        <CurrentAmountValue title="現在の資産" datas={assetsData} />
                        <CurrentAmountValue title="現在の負債" datas={liabilitiesData} />
                        <CurrentAmountValue title="現在の純資産" datas={netAssetsData} />
                        <CurrentAmountValue title="今月の損益" datas={PLData} />
                        <div className="w-100 text-end mt-3">
                            <a href={EDIT_SHEET_URL} target="_blank" rel="noopener noreferrer">
                                スプレッドシートはここから
                            </a>
                        </div>
                    </AccordionBody>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default CurrentAmount;
