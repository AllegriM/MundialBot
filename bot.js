require("dotenv").config();
const getMatchData = require('./index.js');
const TOKEN = process.env.TOKEN;

const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)

    client.user.setActivity(`Mundial`, { type: "WATCHING" })
})

client.on("messageCreate", async message => {
    if (!message.content) return;
    if (message.content === 'partido') {
        const matchData = await getMatchData()
        const { index, hour, matchesData } = matchData
        console.log(index, hour, matchesData.length)
        const match = matchesData[index]
        console.log(match)
        const embed = {
            color: 0x0099ff,
            title: `Partido de ${match.home_team_en} vs ${match.away_team_en}`,
            description: `${new Date().toLocaleDateString()} ${hour}hs`,
            thumbnail: {
                url: `${match.home_flag}`, height: 100, width: 100
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: `Partido ${index + 1} de ${matchesData.length}`,
            }
        }
        message.channel.send({ embeds: [embed] })
    }
})

client.login(TOKEN);