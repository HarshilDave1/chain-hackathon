// OCR response listener
const { ethers } = require("ethers");
const { getDecodedResultLog } = require("../../FunctionsSandboxLibrary");

// Provider and contract setup
const provider = new ethers.providers.JsonRpcProvider("YOUR_JSON_RPC_PROVIDER_URL");
const clientContractAddress = "ADDRESS_OF_CLIENT_CONTRACT";
const clientContractABI = [
    // Client contract ABI here
];

const clientContract = new ethers.Contract(clientContractAddress, clientContractABI, provider);

// Event listener for fulfillment events
clientContract.on("OCRResponse", async (requestId, result, error) => {
    console.log("Fulfillment event received!");
    console.log("Request ID:", requestId);
    console.log("Result:", result);
    console.log("Error:", error);

    // Decode and process the result if needed
    const decodedResult = getDecodedResultLog(requestConfig, result);
    console.log("Decoded Result:", decodedResult);

    // Further processing of the result...
});

console.log("Listening for fulfillment events...");
