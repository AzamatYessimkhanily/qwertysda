const { expect } = require("chai");
const { ethers } = require("hardhat");
const { waffle } = require("hardhat");
const provider = waffle.provider;

describe("MyNFT", function () {
  let MyNFT;
  let myNFT;
  let owner;
  let addr1;
  let addr2;

  before(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    MyNFT = await ethers.getContractFactory("MyNFT");
    myNFT = await MyNFT.deploy("My NFT Collection", "NFT");
    await myNFT.deployed();
  });

  it("Should deploy with the correct name and symbol", async function () {
    expect(await myNFT.name()).to.equal("My NFT Collection");
    expect(await myNFT.symbol()).to.equal("NFT");
  });

  it("Should allow the owner to mint NFTs", async function () {
    const tokenId = 1;
    const tokenURI = "ipfs://QmdAZgeH7kKN1rWpQr974FU69y5USFDUV11ZTTmaguvWCF"; // Replace with a valid IPFS CID

    await myNFT.connect(owner).mint(addr1.address, tokenId, tokenURI);

    const ownerOfToken = await myNFT.ownerOf(tokenId);
    expect(ownerOfToken).to.equal(addr1.address);

    const tokenURIStored = await myNFT.tokenURI(tokenId);
    expect(tokenURIStored).to.equal(tokenURI);
  });

  it("Should not allow non-owners to mint NFTs", async function () {
    const tokenId = 2;
    const tokenURI = "ipfs://QmdAZgeH7kKN1rWpQr974FU69y5USFDUV11ZTTmaguvWCF"; // Replace with a valid IPFS CID

    await expect(myNFT.connect(addr1).mint(addr2.address, tokenId, tokenURI)).to.be.revertedWith(
      "Ownable: caller is not the owner"
    );
  });
});
