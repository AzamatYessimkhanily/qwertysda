const { ethers } = require("hardhat");

async function main() {
  const NFTAddress = "YOUR_NFT_CONTRACT_ADDRESS";
  const provider = new ethers.JsonRpcProvider("YOUR_ETHEREUM_RPC_URL");

  const nft = new ethers.Contract(NFTAddress, ["mint"], provider.getSigner());

  const tokenId = 1; // Change this to the desired token ID
  const to = "0xdF0595178D041e9c595BAC18f56456c21d29DD08"; // Change this to the recipient's address
  const tokenURI = "ipfs://QmdAZgeH7kKN1rWpQr974FU69y5USFDUV11ZTTmaguvWCF"; // Change this to your IPFS CID

  await nft.mint(to, tokenId, tokenURI);

  console.log(`Minted NFT with token ID ${tokenId} to ${to} with tokenURI ${tokenURI}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
