import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { WalletProvider } from "./context/WalletContext";
import { GreeterProvider } from "./context/GreeterContext";
import { TransactionProvider } from "./context/TransactionContext";
import { MessageProvider } from "./context/MessageContext";

ReactDOM.render(
    <WalletProvider>
        <MessageProvider>
            <TransactionProvider>
                <GreeterProvider>
                    <App />
                </GreeterProvider>
            </TransactionProvider>
        </MessageProvider>
    </WalletProvider>,
    document.getElementById("root")
);
