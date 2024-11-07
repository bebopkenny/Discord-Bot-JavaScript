// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance 
const client = new Client({ intents: [GatewayIntentBits.Guilds] }); // "guild" refers to Discord server

// When the client is ready, run this code (only once)
// The distinction between 'client: Client<boolean>' and 'readyClient: Client<true>' is important for TS developers
// It makes some properties non-nullable
client.once(Events.ClientReady, readyClient => {
    console.log('Ready! Logged in as ${readyClient.user.tag}');
});

// Log in to Discord with your client's token
client.login(token);

const fs = require('node:fs'); // fs is used to read the commands directory and identify our commands files
const path = require('node:path'); // path helps construct paths to access files and directories
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// const client = new Client ({ intents: [GatewayIntentBits.Guilds]});

client.commands = new Collection(); // Collection class extends JS native Map class, and includes extensive functionality

const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs. readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}

