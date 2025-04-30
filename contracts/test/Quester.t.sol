// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import { Test, console } from "forge-std/Test.sol";
import { Quester } from "../src/Quester.sol";

contract QuesterTest is Test {
  Quester public quester;

  function setUp() public {
    quester = new Quester();
  }

  function test_CreateQuest() public {
    quester.createQuest();
  }

  function test_ClaimReward() public {
    quester.claimReward();
  }
}
