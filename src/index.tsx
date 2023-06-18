import React from "react";
import ReactDOM from "react-dom";
import faker from "faker";
import dayjs from "dayjs";
import "dayjs/locale/ru";

import App from "./app";
import reportWebVitals from "./reportWebVitals";

import "./index.css";

dayjs.locale("ru");
faker.locale = "en";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root"),
);

reportWebVitals();
