module.exports = {
  codeLocation: 0,
  codeLanguage: 0,
  source:
    '// curl https://pib5z17hx2dep6m1.us-east-1.aws.endpoints.huggingface.cloud \\\n// -X POST \\\n// -d \'{"inputs":{"generated_responses":[],"past_user_inputs":[],"text":"Hey my name is Julien! How are you?"}}\' \\\n// -H "Authorization: Bearer <hf_token>" \\\n// -H "Content-Type: application/json"\n\nconst prompt = args[0]\n\nif (!secrets.openaiKey) {\n    throw Error("Need to set OPENAI_KEY environment variable")\n}\n\nconst openAIRequest = Functions.makeHttpRequest({\n    url: "https://pib5z17hx2dep6m1.us-east-1.aws.endpoints.huggingface.cloud",\n    method: "POST",\n    headers: {\n        Authorization: `Bearer ${secrets.openaiKey}`,\n        "Content-Type": `application/json`,\n        Accept: "application/json",\n    },\n    data: {\n        inputs: {\n            generated_responses: [" Hi Bob, nice to meet you. What do you like to do in your free time?", " That sounds like a lot of fun. What kind of contracts do you usually work on?", " I\'\\\'\'ve never heard of Chain Link. Are they a company that makes chainsaws?", " Oh, I see. I\'\\\'\'ve heard of them."],\n            past_user_inputs: ["Hi, my name is Bob", "I like to program solidity smart contracts.", "ChainLink", "No, they are a blockchain company"],\n            text: prompt,\n        },\n    },\n})\n\nconst openAiResponse = await openAIRequest\n// console.log("raw response", openAiResponse);\n\nconst generatedText = openAiResponse.data.generated_text\nconst pastUserInputs = openAiResponse.data.conversation.past_user_inputs\nconst generatedResponses = openAiResponse.data.conversation.generated_responses\n\n//console.log("Generated Text:", generatedText);\n//console.log("Past User Inputs:", pastUserInputs);\n//console.log("Generated Responses:", generatedResponses);\nconst encodedData = JSON.stringify(generatedText)\n\nreturn Functions.encodeString(encodedData)\n',
  perNodeSecrets: [],
  walletPrivateKey: "255a1438a9595943d8683eb555c566ccac4e66d8645607758a4756ee1a45549c",
  args: ["what is my name"],
  expectedReturnType: "string",
  secretsURLs: [],
  secrets: {
    openaiKey: "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",
  },
}
