/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { ReactNode } from "react";
import { getProvider } from "../provider";
import { JsonRpcProvider } from "@ethersproject/providers";
interface WalletProps {
    walletAddress: string;
    setWalletAddress: React.Dispatch<React.SetStateAction<string>>;
}
interface ProviderProps {
    children: ReactNode;
}
const WalletContext = React.createContext<WalletProps>({} as WalletProps);

export function WalletProvider({ children }: ProviderProps) {
    const [walletAddress, setWalletAddress] = React.useState<string>("");
    const [provider, setprovider] = React.useState<JsonRpcProvider>();
    React.useEffect(() => {
        (async function init() {
            const _provider = await getProvider();
            setprovider(_provider);
        })();
    }, []);
    if (provider) {
        provider.on("accountChanged", (address) => {
            console.log(address);
        });
    }

    return (
        <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
            {children}
        </WalletContext.Provider>
    );
}

export const useWallet = () => React.useContext(WalletContext);
