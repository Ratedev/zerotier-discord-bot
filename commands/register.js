const zerotier = require('../api.js');

module.exports = {
    name: 'register',
    description: 'Register a zerotier node',
    execute(message, args) {
        console.log(message.content);
        const nodeId = args.shift();
        if (!nodeId) {
            message.reply(`you didn't provide a node id!`);
        } else {

            zerotier.getNetworks(() => {
                    networkNotFound(message);
                },
                (networks) => {
                    let networkId;
                    networks.forEach((network) => {
                        if (network.config.name === networkName) {
                            networkId = network.id;
                        }
                    })
                    if (!networkId) {
                        networkNotFound(message);
                    } else {
                        zerotier.getMembers(networkId, () => {
                                // network found but members could not be fetched -> same error case
                                networkNotFound(message);
                            },
                            (members) => {

                                const existingMembers = members.filter(member => member.nodeId === nodeId);
                                if (existingMembers.length) {
                                    const existingMember = existingMembers[0];
                                    if (existingMember.description) {
                                        nodeAlreadyRegistered(message, nodeId, existingMember.config.authorized)
                                    } else {
                                        registerNode(networkId, nodeId, message);
                                    }
                                } else {
                                    //TODO: should we limit the number of nodes a discord user may register?
                                    registerNode(networkId, nodeId, message)
                                }
                            });
                    }
                });
        }
    },
};

// helper functions
const registerNode = (networkId, nodeId, originalMessage) => {

    const member = {
        name: originalMessage.author.username,
        description: originalMessage.author.id,
        config: {
            authorized: true
        }
    };
    zerotier.registerNode(networkId, nodeId, member, () => {
            sendErrorResponse(originalMessage, `i failed to register you. Please ask an admin.`)
        },
        () => {
            originalMessage.reply(`you are now registered! gl hf`)
        });
}
const networkNotFound = (originalMessage) => {
    sendErrorResponse(originalMessage, `i could not find the configured network!`);
}

const nodeAlreadyRegistered = (originalMessage, nodeId, authorized) => {
    if (authorized) {
        sendErrorResponse(originalMessage, `your node ${nodeId} is already registered!`);
    } else {
        sendErrorResponse(originalMessage, `your node ${nodeId} is already registered but it looks like you are not authorized. Please contact an admin.`);
    }
}

const sendErrorResponse = (originalMessage, errorMessage) => {
    console.log(errorMessage);
    originalMessage.reply(errorMessage)
}