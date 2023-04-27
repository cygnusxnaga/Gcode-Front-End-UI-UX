//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

// Import smart contracts from Openzeppelin

import "@openzeppelin/contracts@4.4.2/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.4.2/access/Ownable.sol";
import "@openzeppelin/contracts@4.4.2/utils/Counters.sol";


//address: 0x6e0afb4c0449A488059ceA0A0Ed5f506e9F46BcC 

// creation of metaverse smart contract with nft tokens

    //constructor
    constructor()   ERC721("G-Coin", "GRB") {} 


    // Counters to regulate the current amount of NFT tokens minted
    using Counters for Counters.Counter;
    Counters.Counter private supply;

    // total number of NFT available for creation
    uint256 public maxSupply = 100;


    // Cost to be paid for each NFT token

    uint public cost = .01 ether;


    // Owner and His/Her Properties in metaverse
    mapping (address => Building []) NFTOwners;

    //Metaverse buildings
    struct Building {
        string name;
        int8 w;
        int8 h;
        int8 d;
        int8 x;
        int8 y;
        int8 z;

    }

    // List of Mtaverse buildings
    Building[] public buildings;



    // Obtaining the buildings made in the metaverse with getter function
    function getBuildings() public view returns (Building [] memory) {
        return buildings;
    }


    //current supply of NFT TOkens
    function totalSupply() public view returns (uint256){
        return supply.current();
    }

    //how to create building as NFT token in Metaverse    building dimensions.    building coordinates
    function mint(string memory _building_name, int8 _w, int8 _h, int8 _d, int8 _x, int8 _y, int8 _z  ) public payable {
        require(supply.current() <= maxSupply, "Max supply exceeded!");
        require(msg.value >= cost, "Insufficient Funds!!!!!");
        supply.increment();
        _safeMint(msg.sender, supply.current());
        Building memory _newBuild = Building(_building_name, _w, _h, _d, _x, _y, _z);
        buildings.push(_newBuild);
        NFTOwners[msg.sender].push(_newBuild);///??????? where is this from?
    }

    //Extraction of Ehters from the smart contract to the owner
    function withdraw() external payable onlyOwner {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }
        //obtain the list of buildings that a users owns
        function getOwnerBuildings() public view returns (Building [] memory){
            return NFTOwners[msg.sender];
        } 
}