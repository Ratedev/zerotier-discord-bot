###Configuration:
You can configure the Bot via environment variables:

| Name               | Description                                                         | default |
|--------------------|---------------------------------------------------------------------|---------|
|ZTBOT_DISCORD_TOKEN |your Bot token                                                       |         |
|ZTBOT_ZEROTIER_TOKEN|your ZeroTier API token                                              |         |
|ZTBOT_COMMAND_PREFIX|the command prefix                                                   |zerotier |
|ZTBOT_NETWORK_NAME  |the name of the zerotier network where the nodes should be registered|discord  |

###Register Bot:
https://discord.com/oauth2/authorize?client_id=<your-bots-discord-client-id>&scope=bot
