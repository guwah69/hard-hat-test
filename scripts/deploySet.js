const { ethers } = require("hardhat");

async function main() {
  const [deployer, otheraccount] = await ethers.getSigners();
  console.log("Calling functions with deployer address:", deployer.address);

  const contractAddress = "";
  const contract = await ethers.getContractAt("WhiteListing", contractAddress);
  // const contract = await ethers.deployContract("WhiteListing");
  console.log("Contract Address => ", await contract.getAddress());

  // owner get function
  const Owner = await contract.owner();
  console.log("Owner Address => ", Owner);

  // whitelist set function
  console.log("whitelist Address => ", otheraccount.address);
  let tx = await contract.addWhiteListMember(otheraccount.address);
  console.log("Transaction hash => ", tx.hash);
  await tx.wait();

  // get function for whitelist 
  const status = await contract.isWhiteListed(otheraccount.address);
  console.log(otheraccount.address, " isWhiteListed => ",status);
  
  return tx.hash;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
