import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import './global/css/global.scss'
import 'react-felix-ui/dist/cjs/index.css'

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);