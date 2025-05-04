// SPDX-License-Identifier: MIT
pragma solidity ^0.8.29;

import { IValidator } from "../../src/interfaces/IValidator.sol";

contract MockValidator is IValidator {
    bool public shouldValidate = true;

    function setShouldValidate(bool _shouldValidate) public {
        shouldValidate = _shouldValidate;
    }

    function validate(bytes32 questId, bytes32 submissionId, address user) external view returns (bool) {
        return shouldValidate;
    }
}