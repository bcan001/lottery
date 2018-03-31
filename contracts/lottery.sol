pragma solidity ^0.4.17;

contract Lottery {
  address public manager; // data type, access level, var name

  // initialize players as an array of addresses
  address[] public players;

  // init method for contract
  function Lottery() public {
      manager = msg.sender; // whenever we send a contract we attach the senders address to it
  }

  // enter player to lottery
  function enter() public payable {
      require(msg.value > .01 ether); // require func is used for validation. if true, CONTINUE. if false, don't continue

      players.push(msg.sender);
  }

  function random() private view returns (uint){
      // private means only the contract can run this method
      // view means we're not changing data in the contract with this function

      return uint(sha3(block.difficulty, now, players));
  }
  
  function pickWinner() public restricted {
      uint index = random() % players.length;
      players[index].transfer(this.balance); // players[index] ==> 0xabsdfdfefdsafd. USE THE TRANSFER FUNCTION TO SEND ETHER TO THE ADDRESS
      players = new address[](0); // (0) is for the initial size of 0. otherwise it looks like this [0x000,0x000,0x000,0x000,0x000]

  }
  
  modifier restricted() {
      require(msg.sender == manager); // is this the manager? only he can pick the pickWinner
      _; // takes all the code out of the function and stick it where the _ is
  }
  
  function getPlayers() public view returns (address[]) {        // view means we're not changing data in the contract with this function
      return players;
  }

}







