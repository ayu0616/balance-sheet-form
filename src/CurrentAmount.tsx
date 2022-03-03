import $ from "jquery";
import { useState } from "react";
import { Accordion, Col, Row } from "react-bootstrap";
import AccordionBody from "react-bootstrap/esm/AccordionBody";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionItem from "react-bootstrap/esm/AccordionItem";

const CurrentAmountValue = (props: { title: string; cash: string; bank: string; sum: string }) => {
	return (
		<Col className="rounded-3 m-3">
			<h3>{props.title}</h3>
			<p className="m-0">現金：{props.cash}</p>
			<p className="m-0">銀行：{props.bank}</p>
			<p className="m-0">合計：{props.sum}</p>
		</Col>
	);
};

const CurrentAmount = () => {
	function getBalance(json: string[][]) {
		// Spreadsheetから残高を取得
		const balanceArray = json.slice(-1)[0];
		const balanceDict = {
			cash: balanceArray[1],
			bank: balanceArray[2],
			sum: balanceArray.slice(-1)[0],
		};
		return balanceDict;
	}

	function getFlow(json: string[][]) {
		// 今月
		const date = new Date();
		const thisYear = date.getFullYear();
		const thisMonth = date.getMonth() + 1;
		const thisDateStr = `${thisYear}年${thisMonth}月`;
		// jsonから今月の収支を取得
		let flowDict = { cash: "", bank: "", sum: "" };
		json.forEach((value) => {
			if (value[0] == thisDateStr) {
				flowDict = {
					cash: value[1],
					bank: value[2],
					sum: value.slice(-1)[0],
				};
			}
		});
		return flowDict;
	}

	const sheetId = "1uwM7-NMiNbSnjRfVXhekLoKSFMFZt2zd_ZMksGRE_9U";
	const sheetName = "月別集計";
	const apiKey = "AIzaSyBh6fWBIDR8nZvucod3Fe77Ro4Hd3xtjO8";
	const jsonUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

	const [balance, setBalance] = useState({ cash: "", bank: "", sum: "" });
	const [flow, setFlow] = useState({ cash: "", bank: "", sum: "" });

	const updateData = async () => {
		$.getJSON(jsonUrl).done((json: { values: string[][] }) => {
			setBalance(getBalance(json.values));
			setFlow(getFlow(json.values));
		});
	};

	const [accordionCount, setAccordionCount] = useState(0);
	const buttonOnClick = () => {
		if (accordionCount % 2 == 0) updateData();
		setAccordionCount((prev) => prev + 1);
	};

	return (
		<div id="current-data" className="mb-3 p-3">
			<h2>データ</h2>
			<Accordion>
				<AccordionItem eventKey="0">
					<AccordionHeader onClick={buttonOnClick}>現在のデータを表示</AccordionHeader>
					<AccordionBody>
						<Row>
							<CurrentAmountValue title="現在の残高" cash={balance.cash} bank={balance.bank} sum={balance.sum}></CurrentAmountValue>
							<CurrentAmountValue title="今月の収支" cash={flow.cash} bank={flow.bank} sum={flow.sum}></CurrentAmountValue>
						</Row>
						<div className="w-100 text-end">
							<a href="https://docs.google.com/spreadsheets/d/1uwM7-NMiNbSnjRfVXhekLoKSFMFZt2zd_ZMksGRE_9U/edit#gid=219452251">スプレッドシートはここから</a>
						</div>
					</AccordionBody>
				</AccordionItem>
			</Accordion>
		</div>
	);
};

export default CurrentAmount;
