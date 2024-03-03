const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("WhiteListing", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployWhiteListing() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount, account3] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("WhiteListing");
    const contract = await Contract.deploy();
    return { contract, owner, otherAccount, account3 };
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { contract, owner } = await loadFixture(deployWhiteListing);
      expect(await contract.owner()).to.equal(owner.address);
    });
  });

  describe("WhitelistAdd", function () {
    describe("Validations", function () {
      it("set Whitelist address", async function () {
        const { contract, otherAccount } = await loadFixture(deployWhiteListing);
        await expect(contract.addWhiteListMember(otherAccount.address)).not.to.be.reverted;
      });
      it("get whitelist address status", async function () {
        const { contract, otherAccount } = await loadFixture(deployWhiteListing);
        await contract.addWhiteListMember(otherAccount.address);
        expect(await contract.isWhiteListed(otherAccount.address)).to.equal(true);;
      });

      it("get whitelist address status false", async function () {
        const { contract, account3 } = await loadFixture(deployWhiteListing);
        expect(await contract.isWhiteListed(account3.address)).to.equal(false);;
      });

    });
  });
});
