// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CarbonNexToken is ERC20, Ownable {
    uint public price = 1 ether;

    constructor() ERC20("CarbonNexToken", "CNX") Ownable(msg.sender) {
    }

    event Transaction(address indexed from, address indexed to, uint256 numberOfToken, uint256 timestamp);

    function mintForNewUser(address newUser) public onlyOwner {
        require(balanceOf(newUser) == 0, "User already has tokens");
        _mint(newUser, 1000 * price);
    }

    function buyToken(address from, uint256 tokensToTransfer) public {
        require(tokensToTransfer > 0, "Please enter more than 0");
        require(tokensToTransfer * price <= balanceOf(from), "There is not enough balance");
        _transfer(from, msg.sender, tokensToTransfer * price);
        emit Transaction(from, msg.sender, tokensToTransfer, block.timestamp);
    }

    function balanceOfUser() public view returns (uint256 balance) {
        return balanceOf(msg.sender) / price;
    }

    function transferAdmin(address newOwner) public onlyOwner {
        transferOwnership(newOwner); 
    }
}
