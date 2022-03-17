import React, { useState } from "react";
import { useLottery } from "../context/LotteryContext";
import { useTransaction } from "../context/TransactionContext";
import { useWallet } from "../context/WalletContext";
import { getSignerAddress } from "../provider";
import Button from "./Button";
import GlobalMessage from "./GlobalMessage";
const Lottery = () => {
    const {
        currentLotteryStatus,
        joinLottery,
        selectWinner,
        winner,
        claimAmount,
    } = useLottery();
    const { walletAddress } = useWallet();

    return (
        <>
            {/* left*/}
            {walletAddress ? (
                <div className="flex justify-between items-center">
                    <div className="">
                        <p className=" text-xl text-blue-600 font-mono pb-5 underline">
                            The price of Lottery is{" "}
                            {currentLotteryStatus._lotteryPrice} Ether
                        </p>
                        <Button
                            onClick={joinLottery}
                            color="primary"
                            children="Join Lottery"
                        />
                        {currentLotteryStatus.participants?.length >= 3 ? (
                            <Button
                                children="Select Winner"
                                color="dark"
                                onClick={selectWinner}
                            />
                        ) : (
                            ""
                        )}
                        {winner ? (
                            <Button
                                children="Claim Amount"
                                color="dark"
                                onClick={claimAmount}
                            />
                        ) : (
                            ""
                        )}
                    </div>
                    {/* right */}
                    <div className="space-y-5 border-l-2 p-5 border-indigo-600">
                        <h1 className=" text-2xl text-blue-600 font-mono pb-5 underline">
                            Current Lottery Status
                        </h1>
                        <p>
                            {" "}
                            Lottery Price :{" "}
                            <span className="text-red-400">
                                {" "}
                                {currentLotteryStatus._lotteryPrice} ether
                            </span>
                        </p>
                        <p>
                            {" "}
                            Next winner price :
                            <span className="text-red-400">
                                {" "}
                                {currentLotteryStatus.nextLotteryPrice} ether
                            </span>
                        </p>
                        <ol className="border-2 w-full p-5">
                            <span className="font-bold text-blue-500 border-b-2">
                                Participants
                            </span>
                            {currentLotteryStatus.participants?.map(
                                (address) => (
                                    <li className="mt-4">{address}</li>
                                )
                            )}
                        </ol>
                    </div>
                </div>
            ) : (
                <p className="font-bolder text-yellow-600 text-3xl">
                    {" "}
                    Opps! Please Connect To The Wallet Using The Above Button
                </p>
            )}
        </>
    );
};

export default Lottery;
