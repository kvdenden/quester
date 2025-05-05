// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import { Script, console } from "forge-std/Script.sol";
import { Quester } from "../src/Quester.sol";
import { TrustedValidator } from "../src/TrustedValidator.sol";

contract DeployScript is Script {
  Quester public quester;
  TrustedValidator public trustedValidator;

  function setUp() public { }

  function run() public {
    address trustedAddress = vm.envAddress("TRUSTED_ADDRESS");

    vm.startBroadcast();

    // Deploy the Quester contract
    quester = new Quester();
    console.log("Quester contract deployed at:", address(quester));

    // Deploy the TrustedValidator
    trustedValidator = new TrustedValidator(trustedAddress);
    console.log("TrustedValidator deployed at:", address(trustedValidator));

    vm.stopBroadcast();
  }
}
