// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import './ERC20.sol';

contract TestToken is ERC20 {
    constructor(string memory name, string memory symbol, uint256 totalSupply) ERC20(name, symbol, totalSupply)Ownable(msg.sender) {
        _mint(msg.sender, 500 * (10 ** uint256(decimals()))); // Mint 500 tokens to the deployer
     }

     //Fnction to retrieve the balance of a specific address
    function getTokenBalance(address account) public view returns (uint256) {
       return balanceOf(account);
    }

    function mintToken(address account, uint256 amount)onlyOwner external returns (bool){
        require(account != address(0),"ERC20 : Address cannot be zero");
        require(amount > 0,"ERC20 :Amount cannot be zero");
        _mint(account,amount  * (10 ** uint256(decimals())));
        return true;
    }

}

