const { ethers } = require("hardhat");

async function main() {
  // Load the MyNFT contract factory
  const MyNFT = await ethers.getContractFactory("MyNFT");

  // Deploy the contract
  const nft = await MyNFT.deploy("My NFT Collection", "NFT");
  await nft.deployed();

  console.log("NFT contract deployed to:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
