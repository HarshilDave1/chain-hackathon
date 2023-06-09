// curl https://pib5z17hx2dep6m1.us-east-1.aws.endpoints.huggingface.cloud \
// -X POST \
// -d '{"inputs":{"generated_responses":[],"past_user_inputs":[],"text":"Hey my name is Julien! How are you?"}}' \
// -H "Authorization: Bearer <hf_token>" \
// -H "Content-Type: application/json"

const prompt = args[0]

if (!secrets.openaiKey) {
  throw Error("Need to set OPENAI_KEY environment variable")
}

const openAIRequest = Functions.makeHttpRequest({
  url: "https://pib5z17hx2dep6m1.us-east-1.aws.endpoints.huggingface.cloud",
  method: "POST",
  headers: {
    Authorization: `Bearer ${secrets.openaiKey}`,
    "Content-Type": `application/json`,
    Accept: "application/json",
  },
  data: {
    inputs: {
      generated_responses: [
        " Hi Bob, nice to meet you. What do you like to do in your free time?",
        " That sounds like a lot of fun. What kind of contracts do you usually work on?",
        " I'''ve never heard of Chain Link. Are they a company that makes chainsaws?",
        " Oh, I see. I'''ve heard of them.",
      ],
      past_user_inputs: [
        "Hi, my name is Bob",
        "I like to program solidity smart contracts.",
        "ChainLink",
        "No, they are a blockchain company",
      ],
      text: prompt,
    },
  },
})

const openAiResponse = await openAIRequest
// console.log("raw response", openAiResponse);

const generatedText = openAiResponse.data.generated_text
const pastUserInputs = openAiResponse.data.conversation.past_user_inputs
const generatedResponses = openAiResponse.data.conversation.generated_responses

//console.log("Generated Text:", generatedText);
//console.log("Past User Inputs:", pastUserInputs);
//console.log("Generated Responses:", generatedResponses);
const encodedData = JSON.stringify(generatedText)

return Functions.encodeString(encodedData)
