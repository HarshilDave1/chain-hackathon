const { execSync } = require("child_process")
const { ethers } = require("hardhat")

//use ethers to import smart contract account

const prompt = require("prompt-sync")()

function startListener() {
  console.log("Starting listener to capture request result...")

  // Implement your listener logic here
  // This function should listen for the request result and handle it accordingly
}

async function userInput() {
  const newValue = prompt("Enter the new value: ")

  // Call the "userInput" task using the new value
  try {
    execSync(`npx hardhat userInput --newvalue ${newValue}`)
    console.log("userInput task completed successfully.")
  } catch (error) {
    console.log("Error executing userInput task:", error)
  }
}

async function makeRequest() {
  // Call the "functions-request" task with the required parameters
  const CONTRACT_ADDRESS = 0x5dc48e67acc3364cab2bf23a2609f5fba0c5c28a
  const SUBSCRIPTION_ID = 1738
  // execSync(`npx hardhat functions-request --contract 0x5dC48E67aCc3364cab2bF23a2609f5fBA0c5C28a --subid 1738 --network polygonMumbai`);
  try {
    // execSync(`npx hardhat functions-request --contract ${CONTRACT_ADDRESS} --subid ${SUBSCRIPTION_ID}`);
    const { execSync } = require("child_process")

    const command = "npx hardhat functions-simulate --gaslimit 300000"
    const output = execSync(command).toString().trim()

    console.log(output)

    console.log("functions-request task completed successfully.")
    return output
  } catch (error) {
    console.log("Error executing functions-request task:", error)
  }
}

async function processResponse(AiResponse) {
  // Retrieve the response from the request
  //const requestId = prompt("Enter the request ID: ");

  // charge user for use
  const address = await ethers.getSigners()
  user = address[1].address
  console.log(user)
  const fundMe = await ethers.getContractAt("FundMe", "0xb9DeE93B494A7F4d0135a1AbB018Cb40890B61c5", user)
  console.log(`Got contract FundMe at ${fundMe.address}`)
  console.log("Charging User...")
  amountCharged = ethers.utils.parseEther("0.000001")
  const transactionResponse = await fundMe.chargeMe(user, amountCharged)
  await transactionResponse.wait()
  console.log("Charged!")
}

// Main function to manage the user request process
async function manageUserRequest() {
  try {
    // Start the listener
    startListener()

    // Get the new value from the front end
    await userInput()

    // Make the request
    const output = await makeRequest()

    // Get the response and provide it to the front end
    await processResponse(output)
  } catch (error) {
    console.log("Error in manageUserRequest:", error)
    return null
  }
}

// Call the main function to initiate the user request process
manageUserRequest()
