/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from "react";
import { useState } from "react";
import { useWallet } from "./context/WalletContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getProvider } from "./provider";
import { GreeterProvider } from "./context/GreeterContext";
import Greeter from "./components/Greeter";
import { joinClasses } from "./helpers";
import NavBar from "./components/layout/NavBar";
import Lottery from "./components/Lottery";
import { LotteryProvider } from "./context/LotteryContext";
function App() {
    const { setWalletAddress } = useWallet();
    React.useEffect(() => {
        (async function init() {
            try {
                const _provider = await getProvider();
                if (setWalletAddress) {
                    const signer = _provider.getSigner();
                    setWalletAddress(await signer.getAddress());
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [setWalletAddress]);
    return (
        <Router>
            <div
                className={joinClasses(
                    "grid",
                    "grid-rows-3m",
                    "min-h-screen",
                    "max-w-4xl",
                    "mx-auto",
                    "text-center",
                    "text-gray-600",
                    "font-mono"
                )}
            >
                <NavBar />

                <div className="h-full text-center">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    {/* <Greeter /> */}
                                    <LotteryProvider>
                                        <Lottery />
                                    </LotteryProvider>
                                </>
                            }
                        ></Route>
                    </Routes>
                </div>
                {/* <Footer /> */}
            </div>
        </Router>
    );
}

export default App;
