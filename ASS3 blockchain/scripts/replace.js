const { ethers } = require("hardhat");

async function main() {
  // Replace with the address of your deployed NFT contract
  const contractAddress = "0x12345678901234567890123456789012345678";

  // Replace with the private key of the owner address
  const ownerPrivateKey = "YOUR_OWNER_PRIVATE_KEY";

  const provider = new ethers.providers.JsonRpcProvider("YOUR_ETHEREUM_RPC_URL");

  const wallet = new ethers.Wallet(ownerPrivateKey, provider);

  // Attach the NFT contract
  const MyNFT = await ethers.getContractAt("MyNFT", contractAddress);

  // Replace an NFT
  const tokenId = 1; // Replace with the token ID to replace
  const newTokenURI = "ipfs://QmdAZgeH7kKN1rWpQr974FU69y5USFDUV11ZTTmaguvWCF"; // Replace with the new IPFS CID

  // Ensure that the wallet is the owner of the NFT
  if (await MyNFT.ownerOf(tokenId) === wallet.address) {
    await MyNFT.connect(wallet).mint(wallet.address, tokenId, newTokenURI);
    console.log(`NFT with token ID ${tokenId} replaced with a new URI: ${newTokenURI}`);
  } else {
    console.log(`You do not own the NFT with token ID ${tokenId}.`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
