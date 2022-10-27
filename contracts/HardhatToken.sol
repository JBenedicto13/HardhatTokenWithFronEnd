// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract HardhatToken is ERC20 {
    constructor() ERC20("Hardhat Token", "HHT") {
        _mint(msg.sender, 1000 * (10 ** 18));
    }
}
