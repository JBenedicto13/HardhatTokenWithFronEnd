const hre = require("hardhat");

async function main() {
  const HardhatToken = await hre.ethers.getContractFactory("HardhatToken");
  const hardhatToken = await HardhatToken.deploy();
  await hardhatToken.deployed();
  console.log("Token deployed to: ", hardhatToken.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
