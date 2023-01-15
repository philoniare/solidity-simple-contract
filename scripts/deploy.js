const hre = require("hardhat");

async function main() {
  const SampleContract = await hre.ethers.getContractFactory("SampleContract");
  const sampleContract = await SampleContract.deploy();

  await sampleContract.deployed();

  console.log("SampleToken deployed to:", sampleContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
