const { ethers } = require("hardhat");

async function main() {
  // Replace with the address of your deployed NFT contract
  const contractAddress = "0x1234567890123456789012345678901234567890";

  // Attach the NFT contract
  const MyNFT = await ethers.getContractAt("MyNFT", contractAddress);

  console.log("NFT contract attached at address:", contractAddress);

  // Now, you can interact with the contract using MyNFT methods
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
