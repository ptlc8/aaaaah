const Discord = require("discord.js");
const Rebus = require("rebus-fr");
require("dotenv").config();

const reactFrequency = parseFloat(process.env.REACT_FREQUENCY) || 1;

const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.GuildEmojisAndStickers,
		Discord.GatewayIntentBits.MessageContent
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
	if (message.content.startsWith("'")) {
		message.channel.send(Rebus.toRebus(message.content.substring(1)));
		return;
	}
});

client.login(process.env.DISCORD_BOT_TOKEN);
