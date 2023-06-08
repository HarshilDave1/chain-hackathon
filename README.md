# Chainlink Functions Hackathon goals


# Overview
Problem statement: OPENAI and other large companies are building closed source AI models that the public has little input on. Additionally, these APIs from these models are not available worldwide, and can be cost prohibitive. However, the open source community (see HuggingFace) has been building powerful models as well. But these are not easily available to average users, and the cost to deploy these models on the large scale is not available to the open source community. With blockchain-technology and chainlink-functions, we create a simple interface where the user can interact with any AI model, and also fund the cost of running the model though micropayments using Eth. 

With our approach, the following things can be possible:
1. Any user worldwide can pay to use our ML models. Ideally, they can be integrated into their workflow/program. 
2. Support open source developement, possibly DAO-led development, of AI models. 
3. Costs could potentially be competitive with OpenAI and other services. 
4. Responses from AI models can be posted on the blockchain, so other smart contracts can also use our services to enhance their features.
5. For example: A smart contract wallet with a chat-based interface. A user can 'talk to their wallet' to make transactions, made trades, do other DeFi things. The chat based interface can make sure the transactions are safe and valid. 


For this project, we start by integrating OpenAI's API. We use chainlink-functions to call the API and recieve the response. The user can input prompts, and chat with ChatGPT. The cost of interfacing with ChatGPT, along with costs of the blockchain, are charged to funds deposited by the user. 


