/* eslint-disable prettier/prettier */
import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";

dotenv.config();

const config: HardhatUserConfig = {
    solidity: "0.8.4",
    networks: {
        hardhat: {
            chainId: 1337,
            accounts: {
                mnemonic:
                    "test test test test test test test test test test test junk", // test test test test test test test test test test test junk
            },
        },
        // ropsten: {
        //     url: process.env.ROPSTEN_URL,
        //     accounts: [`0x${process.env.PRIVATE_KEY as string}`],
        // },
    },
};

export default config;
