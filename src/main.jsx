import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./styles/global.scss";
import { BrowserRouter } from "react-router-dom";
import 'react-tooltip/dist/react-tooltip.css'

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
);
