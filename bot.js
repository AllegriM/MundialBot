require("dotenv").config();
const { getMatchAlert, transformHours } = require('./index.js');
const TOKEN = process.env.TOKEN;

const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions } = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)

    client.user.setActivity(`Mundial`, { type: "WATCHING" })
})

// async function verifyTime() {
//     const d = new Date();
//     if (d.getHours() == d.getMinutes()) {
//         //your code goes here
//         setTimeout(() => {
//             verifyTime();
//         }, 61 * 1000);

//     } else {
//         setTimeout(() => {
//             verifyTime();
//         }, 1000);
//     }
// }

client.on("messageCreate", async message => {
    if (!message.content) return;
    if (message.content === 'partido') {
        const matchData = await getMatchAlert("Hoy")
        const actualPartido = matchData.find(match => match.status === "jugando")
        const { index, hour, matchesInfo } = actualPartido
        const match = matchesInfo[index]
        console.log(match)
        const embed = {
            color: 0x0099ff,
            title: `Partido de ${match.home_team_en} vs ${match.away_team_en}`,
            description: `${new Date().toLocaleDateString()} ${hour}hs`,
            thumbnail: {
                url: `https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Maradona-Mundial_86_con_la_copa.JPG/272px-Maradona-Mundial_86_con_la_copa.JPG`, height: 100, width: 100
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: `Partido ${index + 1} de ${matchesInfo.length}`,
            }
        }
        message.channel.send({ embeds: [embed] })
    }
})

client.on("messageCreate", async message => {
    if (!message.content) return;
    if (message.content === 'proximo') {
        const matchData = await getMatchAlert("Hoy")
        const proximoPartido = matchData.find(match => match.status === "proximo")
        if (proximoPartido === undefined) return message.channel.send("No hay mas partidos hoy compa")
        const { index, hour, matchesInfo } = proximoPartido
        const match = matchesInfo[index]
        const embed = {
            color: 0x0099ff,
            title: `Partido de ${match.home_team_en} vs ${match.away_team_en}`,
            description: `${new Date().toLocaleDateString()} ${hour}hs`,
            thumbnail: {
                url: `https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Maradona-Mundial_86_con_la_copa.JPG/272px-Maradona-Mundial_86_con_la_copa.JPG`, height: 100, width: 100
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: `Partido ${index + 1} de ${matchesInfo.length}`,
            }
        }
        message.channel.send({ embeds: [embed] })
    }
})

client.on("messageCreate", async message => {
    if (!message.content) return;
    if (message.content === 'finalizado') {
        const matchData = await getMatchAlert("Hoy")
        const proximoPartido = matchData.find(match => match.status === "finalizado")
        const { index, hour, matchesInfo } = proximoPartido
        const match = matchesInfo[index]
        const embed = {
            color: 0x0099ff,
            title: `Partido de ${match.home_team_en} vs ${match.away_team_en}`,
            description: `${new Date().toLocaleDateString()} ${hour}hs`,
            thumbnail: {
                url: `https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Maradona-Mundial_86_con_la_copa.JPG/272px-Maradona-Mundial_86_con_la_copa.JPG`, height: 100, width: 100
            },

            timestamp: new Date().toISOString(),
            footer: {
                text: `Partido ${index + 1} de ${matchesInfo.length}`,
            }
        }
        message.channel.send({ embeds: [embed] })
    }
})

client.on("messageCreate", async message => {
    if (!message.content) return;
    if (message.content === 'mañana') {
        const matchData = await getMatchAlert("Mañana")
        const embed = {
            color: 0x0099ff,
            title: `Partidos de Mañana`,
            thumbnail: {
                url: `https://media.tycsports.com/files/2020/12/06/160024/maradona-imagen.jpg`, height: 100, width: 100
            },
            fields:
                matchData[0].matchesInfo.map(match => {
                    return {
                        "name": `${transformHours(match.local_date).toLocaleTimeString()}hs`,
                        "value": `${match.home_team_en} vs ${match.away_team_en}`,
                        "inline": true
                    }
                })
            ,
            timestamp: new Date().toISOString(),
        }
        message.channel.send({ embeds: [embed] })
    }
})



client.on("messageCreate", async message => {
    if (!message.content) return;
    if (message.content === 'money') {
        // Answer user with message
        message.channel.send("You are poor bitch");
    }
})

client.login(TOKEN);

// setTimeout(() => {
//     verifyTime();
// }, 5000);