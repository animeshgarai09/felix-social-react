import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import { BrowserRouter as Router } from "react-router-dom";
import './global/css/global.scss'
import 'react-felix-ui/dist/cjs/index.css'
import { FelixProvider } from "react-felix-ui"
import { makeServer } from "./server";
import { Provider } from "react-redux"
import { store } from "./store"
// Call make Server
makeServer();

ReactDOM.render(
    <React.StrictMode>
        <FelixProvider>
            <Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>
        </FelixProvider>
    </React.StrictMode>,
    document.getElementById("root")
);