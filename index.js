const Discord = require('discord.js');
const fs = require('fs');

const discordToken = process.env.ZTBOT_DISCORD_TOKEN;
const zerotierToken = process.env.ZTBOT_ZEROTIER_TOKEN;
const commandPrefix = process.env.ZTBOT_COMMAND_PREFIX || 'zerotier';
const networkName = process.env.ZTBOT_NETWORK_NAME || 'discord';

global.zerotierToken = zerotierToken;
global.networkName = networkName;

if (!discordToken){
    console.error('no discord token set');
    process.exit(1);
}
if (!zerotierToken){
    console.error('no zerotier token set');
    process.exit(1);
}

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('Ready!');
});

client.on('message', message => {
    try {
        if (!message.content.startsWith(commandPrefix) || message.author.bot) return;

        const args = message.content.slice(commandPrefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if (!client.commands.has(command)) {
            message.reply(`i don't know how to respond.`);
            return;
        }

        try {
            client.commands.get(command).execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    } catch (error) {
        console.error(error);
    }
});

client.login(discordToken);
