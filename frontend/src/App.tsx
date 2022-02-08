/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { useState } from "react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";
import { ethers } from "ethers";
const greeterContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const { ethereum } = window as any;
function App() {
    const [currentAccount, setCurrentAccount] = useState("");
    const [greetingMessage, setGreetingMessage] = useState("");

    const connectWallet = async () => {
        try {
            const account = await ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(account);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchGreeting = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();
            const greeterContract = new ethers.Contract(
                greeterContractAddress,
                Greeter.abi,
                provider
            );
            const data = await greeterContract.greet();
            console.log("data: " + data);
        } catch (error) {
            console.log(error);
        }
    };
    const setGreeting = async () => {
        // eslint-disable-next-line no-useless-return
        if (!greetingMessage) return;
        await connectWallet();
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const greeterContract = new ethers.Contract(
            greeterContractAddress,
            Greeter.abi,
            signer
        );
        const transaction = await greeterContract.setGreeting(greetingMessage);
        await transaction.wait();
        fetchGreeting();
    };
    const commonClasses = ``;
    return (
        <div className="flex justify-center items-center">
            <input
                className="border-b border-black outline-none"
                onChange={(e) => setGreetingMessage(e.target.value)}
                placeholder="Set greeting"
            />
            <button
                className="px-6 py-2 rounded bg-slate-400 hover:bg-slate-500 text-slate-100"
                onClick={fetchGreeting}
            >
                Fetch Greeting
            </button>
            <button
                className="px-6 py-2 rounded bg-cyan-400 hover:bg-cyan-500 text-cyan-100"
                onClick={setGreeting}
            >
                Set Greeting
            </button>
        </div>
    );
}

export default App;
