const fs = require("fs");

const emojis = [];

function create(text) {
	if (emojis.length == 0)
		console.error("No emojis, did you load call load function ?");
	var rebus = text.toLowerCase();
	for (const [emoji,syllables] of emojis) {
		for (let syllable of syllables) {
			while (rebus.includes(syllable)) {
				rebus = rebus.replace(syllable,emoji);
			}
		}
	}
	return rebus;
}

function load() {
	return new Promise((resolve, reject) => {
		fs.readFile("emojis.txt", "utf8", function(err,data) {
			emojis.push(...data.split("\n").map(function(line){
			  	var syllables = line.split(":")[1] ? line.split(":")[1].split(",") : [];
				var emoji = line.split(":")[0];
					return [emoji,syllables];
			}));
		});
		console.log("Rebus.js is loaded");
		resolve();
	});
}

module.exports = { create, load };
