// imports
const { ethers, run, network, getNamedAccounts } = require("hardhat")
// async main
async function main() {
  const address = await ethers.getSigners()
  const FundMeFactory = await ethers.getContractFactory("FundMe")
  console.log("Deploying contract...")
  const fundme = await FundMeFactory.deploy()
  await fundme.deployed()
  console.log(`Deployed contract to: ${fundme.address}`)
  // what happens when we deploy to our hardhat network?
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("Waiting for block confirmations...")
    await fundme.deployTransaction.wait(6)
    await verify(fundme.address, [])
  }

  const currentValue = await fundme.addressToAmountFunded(address[0].address)
  console.log(`Current Value is: ${currentValue} for ${address[0].address}`)

  // Update the current value
  const transactionResponse = await fundme.fund({
    value: ethers.utils.parseEther("0.1"),
  })
  await transactionResponse.wait()
  console.log("Funded!")
  console.log(`Current Value is: ${currentValue} for ${address[0].address}`)
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...")
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(e)
    }
  }
}

// main
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
