import React from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Main from "./Main";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./style/index.scss";

ReactDOM.render(
    <React.StrictMode>
        <Header />
        <Main />
        <iframe
        title="google form"
            src="https://docs.google.com/forms/d/e/1FAIpQLSeBETN_CleUHfVUtf77pMlWdPpoB1xNLt8kXIFidxX_yecRcw/viewform?embedded=true"
            width="640"
            height="1144"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
        >
            読み込んでいます…
        </iframe>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
