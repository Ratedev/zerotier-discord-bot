module.exports = {
    name: 'help',
    description: 'Help!',
    execute(message, args) {
        message.reply(`to register your node, type 'zerotier register <your-node-id>' e.g. 'zerotier register 1234567890'`)
    },
};