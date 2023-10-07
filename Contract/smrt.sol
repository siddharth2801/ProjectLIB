// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MYT") {
        _mint(msg.sender, 1000000 * 10 ** 18); // Mint 1,000,000 tokens to the contract deployer
    }

    // Mint Fiction tokens
    function mintFiction(address recipient, uint256 amount) public onlyOwner {
        _mint(recipient, amount);
    }

    // Mint Non Fiction tokens
    function mintNonFiction(address recipient, uint256 amount) public onlyOwner {
        _mint(recipient, amount);
    }

    // Mint True Crime tokens
    function mintTrueCrime(address recipient, uint256 amount) public onlyOwner {
        _mint(recipient, amount);
    }

    // Confirmation message
    function getConfirmationMessage() public pure returns (string memory) {
        return "Tokens have been minted successfully!";
    }
}
