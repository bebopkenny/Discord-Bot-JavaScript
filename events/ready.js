const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady, // Which event this file is for
    once: true, // Holds a boolean value that specifies if the event should run only once
    // When the client is ready, run this code once
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
    },
};