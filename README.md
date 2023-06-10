# Chainlink Functions Hackathon: Funding Open Source AI Models for Blockchain

For submission by Harshil Dave
June 9 2023
Project title: Funding Open Source AI Models for Blockchain


# Overview
Problem statement: OPENAI and other large companies are building closed source AI models that the public has little input on. Additionally, the APIs from these models are not available worldwide, and can be cost prohibitive when scaled. However, the open source community (see HuggingFace) has been building powerful models as well. But these are not easily available to average users, and the cost to deploy these models on the large scale is not available to the open source community. With blockchain-technology and chainlink-functions, we create a simple interface where the user can interact with any AI model on HuggingFace, and also fund the cost of running the model though micropayments using Eth/Matic. For demonstration, we use a conversational AI model, like ChatGPT, on HuggingFace. This is different from the ChatGPT API because the past conversation history can be saved on blockchain, and each user can have a unique, ongoing conversation. 
It is not as good as ChatGPT, but in the future, the model can be trained to be a blockchain expert, and a user could interact with their smart wallet through a chat interface. 

With our approach, the following things can be possible:
1. Any user worldwide can connect a wallet to our website, and pay to use our ML models. Ideally, they can be integrated into their workflow/program. 
2. With this income, we can support open source development, possibly DAO-led development, of AI models. 
3. Costs could potentially be competitive with OpenAI and other services. 
4. Responses from AI models can be posted on the blockchain, so other smart contracts can also use our services to enhance their features.
5. For example: A smart contract wallet with a chat-based interface. A user can 'talk to their wallet' to make transactions, made trades, do other DeFi things. The chat based interface can make sure the transactions are safe and valid. The costs to run this service can be paid by the user or someone delegated by the smart contract wallet. 


For this project, we start by integrating HuggingFace's API. We use chainlink-functions to call the API and receive the response. The user can input prompts, and chat with ChatGPT. 

The cost of interfacing with ChatGPT, along with costs of the blockchain, are charged to funds deposited by the user. 


## Testing yourself

Please note that I will pause my HuggingFace API since it is a paid service. You may start your own and plug in the API address in 'promptHuggingFace.js'
Make a copy of 'Functions-request-config-backup.js' and rename to 'Functions-request-config.js'. This is because of my security concern below.

**ALSO NOTE A SECURITY CONCERN**: My script saves the private key in plain text inside the Functions-request-config.js when you run ManageUserRequest.js. My JS skills are pretty rudimentary...
