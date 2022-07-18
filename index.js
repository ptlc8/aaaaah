const Discord = require("discord.js");
require("dotenv").config();

const client = new Discord.Client({ intents:
	[
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.GuildEmojisAndStickers
	]
});

client.on("ready", () => {
	console.info("Logged in Discord as "+client.user.tag);
});

client.on("messageCreate", async message => {
	var emojis = [];
	message.guild.emojis.cache.forEach(emoji => {
		if (emoji.name.startsWith("AAAAA"))
			emojis.push(emoji);
	});
	var emoji = emojis.length ? emojis[Math.floor(emojis.length*Math.random())] : "👻";
	message.react(emoji);
});

client.login(process.env.DISCORD_BOT_TOKEN);
