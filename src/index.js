import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import './global/css/global.scss'
import 'react-felix-ui/dist/cjs/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);