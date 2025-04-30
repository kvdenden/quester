// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import { Script, console } from "forge-std/Script.sol";
import { Quester } from "../src/Quester.sol";

contract DeployScript is Script {
  Quester public quester;

  function setUp() public { }

  function run() public {
    vm.startBroadcast();

    quester = new Quester();
    console.log("Quester contract deployed at:", address(quester));

    vm.stopBroadcast();
  }
}
