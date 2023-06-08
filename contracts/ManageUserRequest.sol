// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./FunctionsConsumer.sol";
import "./FundMe.sol";

contract ManageUserRequest {
  FunctionsConsumer private functionsConsumer;
  FundMe private fundme;
  uint256 constant MINIMUM_FUND = 1000;

  // Variables
  mapping(address => bool) private users;

  // Events
  event RequestExecuted(address indexed user, bytes32 requestId);

  // Constructor
  constructor(address functionsConsumerAddress, address fundmeAddress) {
    functionsConsumer = FunctionsConsumer(functionsConsumerAddress);
    fundme = FundMe(fundmeAddress);
  }

  modifier onlyUser() {
    require(users[msg.sender], "Not the user!");
    _;
  }

  // Functions
  function registerUser(address user) external {
    require(!users[user], "UserRequest: User is already registered");
    users[user] = true;
  }

  function unregisterUser(address user) external {
    require(users[user], "UserRequest: User is not registered");
    users[user] = false;
  }

  function executeRequest(
    string calldata source,
    bytes calldata secrets,
    string[] calldata args,
    uint64 subscriptionId,
    uint32 gasLimit
  ) external onlyUser {
    require(fundme.addressToAmountFunded(msg.sender) > MINIMUM_FUND, "UserRequest: Insufficient funds");

    bytes32 requestId = functionsConsumer.executeRequest(source, secrets, args, subscriptionId, gasLimit);

    bytes memory response = functionsConsumer.latestResponse();

    uint256 amountToCharge = calcCharge(response);
    fundme.chargeMe(msg.sender, amountToCharge);

    emit RequestExecuted(msg.sender, requestId);
  }

  function calcCharge(bytes memory response) internal pure returns (uint256) {
    uint256 amountToCharge = 100; // Placeholder cost
    return amountToCharge;
  }
}
