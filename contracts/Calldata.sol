// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Calldata {
    uint128 public number;

    function store() external {
        uint128 _number;
        assembly {
            _number := calldataload(4)
        }
        number = _number;
    }

    function retrieve() external view returns (uint128) {
        return number;
    }
}
