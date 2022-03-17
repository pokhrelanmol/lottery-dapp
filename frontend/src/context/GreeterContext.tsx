import { ethers } from "ethers";
import React from "react";
import { Greeter } from "../customTypes/Greeter";
import { getProvider, getSigner, getSignerAddress } from "../provider";
import { useMessage } from "./MessageContext";
import { useTransaction } from "./TransactionContext";
import { useWallet } from "./WalletContext";
import deployedAddress from "../helpers/deployedAddress.json";
import greeterArtifacts from "../abis/Greeter.json";
interface GreeterState {
    greeting: string;
    updateGreeting: (greeting: string) => void;
}
type ProviderProps = {
    children: React.ReactNode;
};
const GreeterContext = React.createContext<GreeterState>({} as GreeterState);

export const GreeterProvider = ({ children }: ProviderProps) => {
    const { setPending } = useTransaction();
    const { walletAddress } = useWallet();
    const { setGlobalMessage } = useMessage();
    const [message, setMessage] = React.useState<string>();
    const [contract, setContract] = React.useState<Greeter>();
    React.useEffect(() => {
        const init = async () => {
            const _provider = await getProvider();
            const signer = _provider.getSigner();
            const _contract = new ethers.Contract(
                deployedAddress.Greeter,
                greeterArtifacts.abi,
                signer
            ) as unknown as Greeter;

            const _greeting = await _contract.greet();
            console.log("gretting:" + _greeting);
            setContract(_contract);
            setMessage(_greeting);
        };
        if (walletAddress) init();
    }, [walletAddress]);

    const updateGreeting = async (_greeting: string) => {
        if (contract) {
            try {
                const tx = await contract.setGreeting(_greeting);
                setPending(true);

                await tx.wait();
                setPending(false);
                const newGreeting = await contract.greet();
                setMessage(newGreeting);
                setGlobalMessage({
                    message: "Greeting message updated successfully",
                    type: "success",
                });
                setTimeout(() => {
                    setGlobalMessage({});
                }, 5000);
            } catch (error: any) {
                setGlobalMessage({
                    message: error.message,
                    type: "error",
                });
                setTimeout(() => {
                    setGlobalMessage({});
                }, 5000);
            }
        }
    };
    return (
        <GreeterContext.Provider
            value={{
                greeting: message || "",
                updateGreeting,
            }}
        >
            {children}
        </GreeterContext.Provider>
    );
};
export const useGreeter = () => React.useContext(GreeterContext);
