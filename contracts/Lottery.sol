// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Lottery {
    event Deposit(address indexed depositor, uint256 amount);
    event Winner(address indexed winner, bytes amount);
    struct Winners {
        uint256 amount;
        bool claimed;
    }
    address public manager;
    address public winner;
    mapping(address => Winners) public winners;

    address[] public participants;

    constructor() {
        manager = msg.sender;
    }

    function deposit() external payable {
        require(msg.value >= 1 ether, "Minimum transfer 1 Eth");
        participants.push(msg.sender);
        emit Deposit(msg.sender, msg.value);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        participants.length
                    )
                )
            );
    }

    function participantCount() public view returns (uint256) {
        return participants.length;
    }

    function selectWinner() public {
        require(msg.sender == manager, "Only Manager");
        require(participantCount() >= 3, "Min participants should be 3");
        Winners memory winnerDetails = Winners(address(this).balance, false);
        winners[participants[random() % participantCount()]] = winnerDetails;
        delete participants;
        (bool success, bytes memory data) = winner.call{
            value: getContractBalance()
        }("");
        require(success, "Transfer failed");
        emit Winner(winner, data);

        // TODO: emit fund transfered to winner
    }
}
