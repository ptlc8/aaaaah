const Discord = require("discord.js");
require("dotenv").config();

const reactFrequency = parseFloat(process.env.REACT_FREQUENCY) || 1;

const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.GuildEmojisAndStickers
	]
});

client.on("ready", () => {
	console.info("Logged in Discord as " + client.user.tag);
});

client.on("messageCreate", async message => {
	if (message.author.id == client.user.id) return;
	if (Math.random() < reactFrequency) {
		var emojis = [];
		message.guild.emojis.cache.forEach(emoji => {
			if (emoji.name.startsWith("AAAAA"))
				emojis.push(emoji);
		});
		var emoji = emojis.length ? emojis[Math.floor(emojis.length*Math.random())] : "👻";
		message.react(emoji);
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);
