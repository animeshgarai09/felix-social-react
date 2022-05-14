import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import './global/css/global.scss'
import 'react-felix-ui/dist/cjs/index.css'
import { FelixProvider } from "react-felix-ui"
import { makeServer } from "./server";

// Call make Server
makeServer();

ReactDOM.render(
    <React.StrictMode>
        <FelixProvider>
            <App />
        </FelixProvider>
    </React.StrictMode>,
    document.getElementById("root")
);