import React from "react";
import { Link } from "react-router-dom";
import { useMessage } from "../../context/MessageContext";
import { useWallet } from "../../context/WalletContext";
import { useTransaction } from "../../context/TransactionContext";

import { getTruncatedAddress, joinClasses } from "../../helpers";
import { getSignerAddress } from "../../provider";

import Button from "../../components/Button";
import CircularLoader from "../CircularLoader";
import GlobalMessage from "../GlobalMessage";
const NavBar = () => {
    const { walletAddress, setWalletAddress } = useWallet();
    const { globalMessage, setGlobalMessage } = useMessage();
    const { pending } = useTransaction();
    const handleConnect = async () => {
        const ethereum = (window as any).ethereum;
        if (ethereum) {
            await ethereum.request({ method: "eth_requestAccounts" });
        }
        const address = await getSignerAddress();
        if (address && setWalletAddress && setGlobalMessage) {
            setWalletAddress(address);
            setGlobalMessage({
                message: "Wallet connected successfully!",
                type: "success",
            });
            setTimeout(() => {
                setGlobalMessage({});
            }, 3000);
        }
    };
    return (
        <div>
            <div
                className={joinClasses(
                    "py-4",
                    "border-b-2",
                    "flex",
                    "justify-between",
                    "items-center"
                )}
            >
                <div id="brand" className="flex items-center ">
                    <svg
                        width="25"
                        height="25"
                        viewBox="0 0 256 417"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="xMidYMid"
                    >
                        <path
                            fill="#2298bd"
                            d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
                        />
                        <path
                            fill="#0ed7b5"
                            d="M127.962 0L0 212.32l127.962 75.639V154.158z"
                        />
                        <path
                            fill="#2298bd"
                            d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"
                        />
                        <path
                            fill="#0ed7b5"
                            d="M127.962 416.905v-104.72L0 236.585z"
                        />
                        <path
                            fill="#1a7e9c"
                            d="M127.961 287.958l127.96-75.637-127.96-58.162z"
                        />
                        <path
                            fill="#2298bd"
                            d="M0 212.32l127.96 75.638v-133.8z"
                        />
                    </svg>
                    <Link to="/">
                        <h2 className="ml-4 text-lg font-medium">DAppBoi</h2>
                    </Link>
                </div>
                <ul id="nav-links" className="inline-flex">
                    {pending && (
                        <li>
                            <Button
                                color="warning"
                                className="flex items-center justify-around mr-4"
                            >
                                <CircularLoader />
                                Pending...
                            </Button>
                        </li>
                    )}
                    <li>
                        {walletAddress ? (
                            <Button className="px-2 py-1 border rounded">
                                {getTruncatedAddress(walletAddress)}
                            </Button>
                        ) : (
                            <Button color="success" onClick={handleConnect}>
                                Connect
                            </Button>
                        )}
                    </li>
                </ul>
            </div>
            <GlobalMessage />
        </div>
    );
};

export default NavBar;
