// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract FundMe {
  mapping(address => uint256) public addressToAmountFunded;
  address[] public users;
  address public owner;

  constructor() {
    owner = msg.sender;
  }

  function fund() public payable {
    addressToAmountFunded[msg.sender] += msg.value;
    users.push(msg.sender);
  }

  function withdrawFunds() public {
    uint256 amountFunded = addressToAmountFunded[msg.sender];
    require(amountFunded > 0, "No funds to withdraw");

    addressToAmountFunded[msg.sender] = 0;
    payable(msg.sender).transfer(amountFunded);
  }

  function chargeMe(address user, uint256 amountCharged) public {
    // moves funds from person who called function to owner.
    uint256 amountFunded = addressToAmountFunded[msg.sender];
    require(amountFunded > amountCharged, "Not enough funds");

    addressToAmountFunded[user] -= amountCharged;

    addressToAmountFunded[owner] += amountCharged;
  }
}
