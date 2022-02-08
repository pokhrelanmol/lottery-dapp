/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { expect } from "chai";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
describe("Lottery", function () {
    let lottery: any;
    let signers: SignerWithAddress[];
    this.beforeEach(async function () {
        const Lottery = await ethers.getContractFactory("Lottery");
        lottery = await Lottery.deploy();
        await lottery.deployed();
        signers = await ethers.getSigners();
    });
    it("should set deployer as manager", async function () {
        expect(await lottery.manager()).to.equal(signers[0].address);
    });
    it("should give error if deposit is less then 1 ether", async function () {
        await expect(
            lottery
                .connect(signers[1])
                .deposit({ value: ethers.utils.parseEther(".5") })
        ).to.revertedWith("Minimum transfer 1 Eth");
    });
    it("should deposit ether", async function () {
        const value = ethers.utils.parseEther("1");
        const signer = signers[1];
        console.log("singer 1: " + signer.address);
        await expect(lottery.connect(signer).deposit({ value }))
            .to.emit(lottery, "Deposit")
            .withArgs(signer.address, value);
    });
    describe("Select Winner", async function () {
        const value = ethers.utils.parseEther("1");
        beforeEach(async function () {
            await lottery.connect(signers[1]).deposit({ value });
            await lottery.connect(signers[2]).deposit({ value });
            await lottery.connect(signers[3]).deposit({ value });
        });
        // it("should fail if the winner is not announced by manager", async function () {
        //     await expect(
        //         lottery.connect(signers[0]).selectWinner()
        //     ).to.revertedWith("only manager can select winner");
        // });
        it("should check if participants counts is equal to or more then 3", async function () {
            const participantCount = await lottery.participantCount();
            expect(participantCount.toString()).to.equal("3");
        });
        it("should emit winner event and reset the contract balance and participants to 0", async function () {
            let lotteryAmount = await lottery.getContractBalance();
            console.log("initial amount:" + lotteryAmount);
            expect(await lottery.selectWinner())
                .emit(lottery, "Winner")
                .with.length(2);
            // TODO:get the amount from the event and compare it with lotteryAmountdata
            expect(await lottery.getContractBalance()).to.equal(0);
            expect(await lottery.participantCount()).to.equal(0);
            lotteryAmount = await lottery.getContractBalance();
            console.log("after transfer:" + lotteryAmount);
        });
    });
});
