const wait = require('node:timers/promises').setTimeout;

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'ping') {
        await interaction.reply('Pong!');
        await wait(2_000);
        await interaction.editReply('Pong again!');
    }
});