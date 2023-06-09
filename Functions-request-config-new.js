module.exports = {
  codeLocation: 0,
  codeLanguage: 0,
  source:
    '\n// curl https://pib5z17hx2dep6m1.us-east-1.aws.endpoints.huggingface.cloud \\\n// -X POST \\\n// -d \'{"inputs":{"generated_responses":[],"past_user_inputs":[],"text":"Hey my name is Julien! How are you?"}}\' \\\n// -H "Authorization: Bearer <hf_token>" \\\n// -H "Content-Type: application/json"\n\nconst prompt = args[0];\n\nif (\n    !secrets.openaiKey\n) {\n    throw Error(\n        "Need to set OPENAI_KEY environment variable"\n    )\n}\n\nconst openAIRequest = Functions.makeHttpRequest({\n    url: "https://pib5z17hx2dep6m1.us-east-1.aws.endpoints.huggingface.cloud",\n    method: "POST",\n    headers: {\n        \'Authorization\': `Bearer ${secrets.openaiKey}`,\n        \'Content-Type\': `application/json`,\n        \'Accept\': \'application/json\'\n\n    },\n    data: {\n        "inputs": {\n            "generated_responses": [\'This is a story of a prince in Bel-Air\'],\n            "past_user_inputs": [\'Tell me a story of a prince in Bel-Air.\'],\n            "text": prompt\n        }\n    }\n});\n\nconst openAiResponse = await openAIRequest;\n// console.log("raw response", openAiResponse);\n\nconst generatedText = openAiResponse.data.generated_text;\nconst pastUserInputs = openAiResponse.data.conversation.past_user_inputs;\nconst generatedResponses = openAiResponse.data.conversation.generated_responses;\n\nconsole.log("Generated Text:", generatedText);\nconsole.log("Past User Inputs:", pastUserInputs);\nconsole.log("Generated Responses:", generatedResponses);\nconst encodedData = JSON.stringify(generatedResponses);\n\nreturn Functions.encodeString(encodedData)\n',
  perNodeSecrets: [],
  walletPrivateKey: "255a1438a9595943d8683eb555c566ccac4e66d8645607758a4756ee1a45549c",
  args: ["hj"],
  expectedReturnType: "string",
  secretsURLs: [],
  secrets: {
    openaiKey: "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",
  },
}
