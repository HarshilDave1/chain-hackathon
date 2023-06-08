const fs = require("fs");
const promptin = require("prompt");

// Load the configuration file
const configPath = "../../Functions-request-config.js";
let requestConfig = require(configPath);

task("userInput", "Update the args field in the configuration")
    .setAction(async () => {
        // Create a prompt schema
        const schema = {
            properties: {
                userInput: {
                    description: "Enter your text prompt:",
                    type: "string",
                    required: true
                }
            }
        };

        // Start the prompt to get user input
        promptin.start();

        // Get the user input
        promptin.get(schema, (err, result) => {
            if (err) {
                console.error("Error while capturing user input:", err);
                return;
            }

            // Access the user input
            const userInput = result.userInput;

            // Update the args field in the configuration
            requestConfig.args = [userInput];

            // Generate the modified configuration as a string
            const configContent = `module.exports = ${JSON.stringify(requestConfig, null, 2)};\n`;

            // Save the modified configuration to the file
            fs.writeFileSync(configPath, configContent);

            console.log("Args field updated:", requestConfig.args);
            console.log("Configuration file saved.");

            // Clear the module cache to force a fresh load of the modified file
            delete require.cache[require.resolve(configPath)];

            // Reload the modified configuration
            requestConfig = eval(configContent);

            // Perform any other necessary actions
        });
    });

