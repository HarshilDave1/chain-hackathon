const { ethers, getNamedAccounts } = require("hardhat")

async function main() {
  const address = await ethers.getSigners()
  user = address[1].address
  console.log(user)
  const fundMe = await ethers.getContractAt("FundMe", "0xb9DeE93B494A7F4d0135a1AbB018Cb40890B61c5", user)

  console.log(`Got contract FundMe at ${fundMe.address}`)
  console.log("Funding contract...")
  const transactionResponse = await fundMe.fund({
    value: ethers.utils.parseEther("0.01"),
  })
  await transactionResponse.wait()
  console.log("Funded!")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
