const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS
    ]
});

client.commands = new Discord.Collection();
client.once('ready', () => {
    console.log('Online !! ');
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith("!find") || message.author.bot || !message.inGuild()) return;

    let rolesMentioned = [];
    message.mentions.roles.forEach(role => {
        rolesMentioned.push(role.id);
    });


    message.guild.members.fetch().then(members => {
        let membersMatched = [];

        members.forEach(member => {
            let rolesExist = true;

            rolesMentioned.forEach(roleMentioned => {
                if (member.roles.cache.has(roleMentioned) == false) {
                    rolesExist = false
                }
            })

            if (rolesExist) {
                membersMatched.push(member.user.tag)
            }
        })
        const buffer = Buffer.from(JSON.stringify(membersMatched))
        message.channel.send({
            files: [{
                attachment: buffer,
                name: 'members.txt'
            }]
        })

    })



});



client.login('');