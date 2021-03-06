/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
    ethers,
    EventFilter,
    Signer,
    BigNumber,
    BigNumberish,
    PopulatedTransaction,
    BaseContract,
    ContractTransaction,
    Overrides,
    PayableOverrides,
    CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface LotteryInterface extends ethers.utils.Interface {
    functions: {
        "claim()": FunctionFragment;
        "getContractBalance()": FunctionFragment;
        "join()": FunctionFragment;
        "lotteryPrice()": FunctionFragment;
        "nextLotteryPrice()": FunctionFragment;
        "participants()": FunctionFragment;
        "selectWinner()": FunctionFragment;
        "winners(address)": FunctionFragment;
    };

    encodeFunctionData(functionFragment: "claim", values?: undefined): string;
    encodeFunctionData(
        functionFragment: "getContractBalance",
        values?: undefined
    ): string;
    encodeFunctionData(functionFragment: "join", values?: undefined): string;
    encodeFunctionData(
        functionFragment: "lotteryPrice",
        values?: undefined
    ): string;
    encodeFunctionData(
        functionFragment: "nextLotteryPrice",
        values?: undefined
    ): string;
    encodeFunctionData(
        functionFragment: "participants",
        values?: undefined
    ): string;
    encodeFunctionData(
        functionFragment: "selectWinner",
        values?: undefined
    ): string;
    encodeFunctionData(functionFragment: "winners", values: [string]): string;

    decodeFunctionResult(functionFragment: "claim", data: BytesLike): Result;
    decodeFunctionResult(
        functionFragment: "getContractBalance",
        data: BytesLike
    ): Result;
    decodeFunctionResult(functionFragment: "join", data: BytesLike): Result;
    decodeFunctionResult(
        functionFragment: "lotteryPrice",
        data: BytesLike
    ): Result;
    decodeFunctionResult(
        functionFragment: "nextLotteryPrice",
        data: BytesLike
    ): Result;
    decodeFunctionResult(
        functionFragment: "participants",
        data: BytesLike
    ): Result;
    decodeFunctionResult(
        functionFragment: "selectWinner",
        data: BytesLike
    ): Result;
    decodeFunctionResult(functionFragment: "winners", data: BytesLike): Result;

    events: {
        "Deposit(address,uint256)": EventFragment;
        "Winner(address)": EventFragment;
    };

    getEvent(nameOrSignatureOrTopic: "Deposit"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Winner"): EventFragment;
}

export type DepositEvent = TypedEvent<
    [string, BigNumber] & { depositor: string; amount: BigNumber }
>;

export type WinnerEvent = TypedEvent<[string] & { winner: string }>;

export class Lottery extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;

    listeners<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
    ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
    off<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>
    ): this;
    on<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>
    ): this;
    once<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>
    ): this;
    removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
        listener: TypedListener<EventArgsArray, EventArgsObject>
    ): this;
    removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
        eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
    ): this;

    listeners(eventName?: string): Array<Listener>;
    off(eventName: string, listener: Listener): this;
    on(eventName: string, listener: Listener): this;
    once(eventName: string, listener: Listener): this;
    removeListener(eventName: string, listener: Listener): this;
    removeAllListeners(eventName?: string): this;

    queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
        event: TypedEventFilter<EventArgsArray, EventArgsObject>,
        fromBlockOrBlockhash?: string | number | undefined,
        toBlock?: string | number | undefined
    ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

    interface: LotteryInterface;

    functions: {
        claim(
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<ContractTransaction>;

        getContractBalance(overrides?: CallOverrides): Promise<[BigNumber]>;

        join(
            overrides?: PayableOverrides & { from?: string | Promise<string> }
        ): Promise<ContractTransaction>;

        lotteryPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

        nextLotteryPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

        participants(overrides?: CallOverrides): Promise<[string[]]>;

        selectWinner(
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<ContractTransaction>;

        winners(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;
    };

    claim(
        overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getContractBalance(overrides?: CallOverrides): Promise<BigNumber>;

    join(
        overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    lotteryPrice(overrides?: CallOverrides): Promise<BigNumber>;

    nextLotteryPrice(overrides?: CallOverrides): Promise<BigNumber>;

    participants(overrides?: CallOverrides): Promise<string[]>;

    selectWinner(
        overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    winners(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    callStatic: {
        claim(overrides?: CallOverrides): Promise<void>;

        getContractBalance(overrides?: CallOverrides): Promise<BigNumber>;

        join(overrides?: CallOverrides): Promise<void>;

        lotteryPrice(overrides?: CallOverrides): Promise<BigNumber>;

        nextLotteryPrice(overrides?: CallOverrides): Promise<BigNumber>;

        participants(overrides?: CallOverrides): Promise<string[]>;

        selectWinner(overrides?: CallOverrides): Promise<void>;

        winners(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    };

    filters: {
        "Deposit(address,uint256)"(
            depositor?: string | null,
            amount?: null
        ): TypedEventFilter<
            [string, BigNumber],
            { depositor: string; amount: BigNumber }
        >;

        Deposit(
            depositor?: string | null,
            amount?: null
        ): TypedEventFilter<
            [string, BigNumber],
            { depositor: string; amount: BigNumber }
        >;

        "Winner(address)"(
            winner?: string | null
        ): TypedEventFilter<[string], { winner: string }>;

        Winner(
            winner?: string | null
        ): TypedEventFilter<[string], { winner: string }>;
    };

    estimateGas: {
        claim(
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<BigNumber>;

        getContractBalance(overrides?: CallOverrides): Promise<BigNumber>;

        join(
            overrides?: PayableOverrides & { from?: string | Promise<string> }
        ): Promise<BigNumber>;

        lotteryPrice(overrides?: CallOverrides): Promise<BigNumber>;

        nextLotteryPrice(overrides?: CallOverrides): Promise<BigNumber>;

        participants(overrides?: CallOverrides): Promise<BigNumber>;

        selectWinner(
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<BigNumber>;

        winners(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;
    };

    populateTransaction: {
        claim(
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<PopulatedTransaction>;

        getContractBalance(
            overrides?: CallOverrides
        ): Promise<PopulatedTransaction>;

        join(
            overrides?: PayableOverrides & { from?: string | Promise<string> }
        ): Promise<PopulatedTransaction>;

        lotteryPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

        nextLotteryPrice(
            overrides?: CallOverrides
        ): Promise<PopulatedTransaction>;

        participants(overrides?: CallOverrides): Promise<PopulatedTransaction>;

        selectWinner(
            overrides?: Overrides & { from?: string | Promise<string> }
        ): Promise<PopulatedTransaction>;

        winners(
            arg0: string,
            overrides?: CallOverrides
        ): Promise<PopulatedTransaction>;
    };
}
