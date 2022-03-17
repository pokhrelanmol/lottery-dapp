import { Contract, ethers, Signer } from "ethers";
import React, { useContext, useState } from "react";
import { getProvider, getSigner, getSignerAddress } from "../provider";
import { Lottery } from "../customTypes/Lottery";
import deployedAddress from "../helpers/deployedAddress.json";
import LotteryArtifacts from "../abis/Lottery.json";
import { useWallet } from "../context/WalletContext";
import {
    TransactionContext,
    useTransaction,
} from "../context/TransactionContext";
import { useMessage } from "../context/MessageContext";

interface LotteryStatusType {
    participants: string[];
    _lotteryPrice: unknown;
    nextLotteryPrice: unknown;
}
type ProviderProps = {
    children: React.ReactNode;
};
interface LotteryContextType {
    currentLotteryStatus: LotteryStatusType;
    joinLottery: () => void;
    selectWinner: () => void;
    winner: string;
    claimAmount: () => void;
}
const LotteryContext = React.createContext<LotteryContextType>(
    {} as LotteryContextType
);
let init: () => void;
export const LotteryProvider = ({ children }: ProviderProps) => {
    const { setWalletAddress, walletAddress } = useWallet();
    const { pending, setPending } = useTransaction();
    const { globalMessage, setGlobalMessage } = useMessage();
    const [lotteryPrice, setLotteryPrice] = useState("");
    const [winner, setWinner] = useState("");
    const [contract, setContract] = useState<Lottery>();
    const [currentLotteryStatus, setCurrentLotteryStatus] =
        React.useState<LotteryStatusType>({} as LotteryStatusType);
    React.useEffect(() => {
        init = async () => {
            const provider = await getProvider();
            const signer = provider.getSigner();
            const _contract = new ethers.Contract(
                deployedAddress.Lottery,
                LotteryArtifacts.abi,
                signer
            ) as unknown as Lottery;
            setContract(_contract);
            const participants = await _contract.participants();
            const _lotteryPrice = ethers.utils.formatEther(
                (await _contract.lotteryPrice()).toString()
            );
            setLotteryPrice(_lotteryPrice);

            const nextLotteryPrice = ethers.utils.formatEther(
                (await _contract.nextLotteryPrice()).toString()
            );
            setCurrentLotteryStatus({
                participants,
                _lotteryPrice,
                nextLotteryPrice,
            });
        };
        if (walletAddress) init();
    }, [walletAddress, winner]);
    const joinLottery = async () => {
        const provider = await getProvider();
        const signer = provider.getSigner();

        if (contract) {
            try {
                const tx = await contract.join({
                    value: ethers.utils.parseEther(lotteryPrice),
                });
                setPending(true);
                await tx.wait();
                setPending(false);
                contract.on("Deposit", async (address, parsedEther) => {
                    init();
                });

                setGlobalMessage({
                    message: "You have Successfully joined Lottery",
                    type: "success",
                });
                setTimeout(() => {
                    setGlobalMessage({});
                }, 5000);
            } catch (error: any) {
                setGlobalMessage({
                    message: error.message || "",
                    type: "error",
                });
            }
        }
    };
    const selectWinner = async () => {
        if (contract) {
            try {
                const tx = await contract.selectWinner();
                setPending(true);
                await tx.wait();
                setPending(false);
                contract.on("Winner", async (winner) => {
                    if (winner === (await getSignerAddress())) {
                        setWinner(winner);
                    } else {
                        console.log("you are not a winner");
                        console.log(
                            `signer ${await getSignerAddress()} and winner :${winner}`
                        );
                    }
                });
                setGlobalMessage({
                    message: "Winner selected Successfully",
                    type: "success",
                });
            } catch (error: any) {
                setGlobalMessage({
                    message: error.message,
                    type: "error",
                });
            }
        }
    };
    const claimAmount = async () => {
        try {
            if (contract) {
                const tx = await contract.claim();
                setPending(true);
                await tx.wait();
                setPending(false);
                setWinner("");
            }
            setGlobalMessage({
                message: "Winning Amount transfered to your address",
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
    };
    return (
        <LotteryContext.Provider
            value={{
                currentLotteryStatus,
                joinLottery,
                selectWinner,
                winner,
                claimAmount,
            }}
        >
            {children}
        </LotteryContext.Provider>
    );
};
export const useLottery = () => React.useContext(LotteryContext);
