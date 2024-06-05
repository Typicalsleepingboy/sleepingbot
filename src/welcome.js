const { EmbedBuilder } = require('discord.js');

function welcomeNewMember(member, channelId) {
    try {
        const channel = member.guild.channels.cache.get(channelId);
        console.log("\x1b[39m%s\x1b[0m", `Ada user baru yang masuk ke Discord: ${member.user.tag} di server ${member.guild.name}`);
        if (!channel) return;

        const userCreatedAt = member.user.createdAt.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
        const userJoinedAt = member.joinedAt.toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

        const serverName = member.guild.name;

        const welcomeEmbed = new EmbedBuilder()
            .setAuthor({ name: '48Intens Official✧', iconURL: 'https://ucarecdn.com/d64744d4-b4ce-4d39-afd7-9c9ce3795f99/48intens_1_1.png', url: 'https://discord.gg/48intenscommunity' })
            .setColor('#242238')
            .setTitle(`Hi ${member}, Welcome to ${serverName}!`)
            .setImage('https://ucarecdn.com/7263cdb0-7aa9-4e0f-914e-1751ea511337/intenspink.jpg')
            .setDescription(`Have fun while still implementing the rules on this server! <#1185903092479295599>`)
            .addFields({
                name: "User Information",
                value: `\`\`\`User Tag : ${member.user.tag}\nUser ID : ${member.id}\nUser Created : ${userCreatedAt}\nUser Joined : ${userJoinedAt}\`\`\``,
                inline: true
            })
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                      .setFooter({ text: 'By 48Intens Official and Full automated 🤖', iconURL: 'https://cdn.discordapp.com/attachments/1247858377611284561/1247858470657458260/logo_sleeping.jpg?ex=66618e43&is=66603cc3&hm=dba2c431c7a79f4e5c068d7fbec03467462b210fabde7e1213f036c5e93f0328&' })
            .setTimestamp();

        const messageContent = `**Welcome brooo/siss semoga nyaman diserver ini yaa 😁 ${member}!**`;
        channel.send({ content: messageContent, embeds: [welcomeEmbed] });
    } catch (error) {
        console.error('Error occurred in welcomeNewMember function:', error);
    }
}

function farewellMember(member, channelId) {
    try {
        const channel = member.guild.channels.cache.get(channelId);
        console.log("\x1b[39m%s\x1b[0m",`ada user yg keluar dari Discord kita di server ${member.guild.name} dengan nama discord ${member.user.tag}`);
        if (!channel) return;

        const farewellEmbed = new EmbedBuilder()
            .setAuthor({ name: '48Intens Official✧', iconURL: 'https://ucarecdn.com/d64744d4-b4ce-4d39-afd7-9c9ce3795f99/48intens_1_1.png', url: 'https://discord.gg/48intenscommunity' })
            .setColor('#242238')
            .setTitle('Goodbye!')
            .setDescription(`Farewell, ${member}! Thank you for being a part of our community in ${member.guild.name}.`)
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setImage('https://ucarecdn.com/7263cdb0-7aa9-4e0f-914e-1751ea511337/intenspink.jpg')
                      .setFooter({ text: 'By 48Intens Official and Full automated 🤖', iconURL: 'https://cdn.discordapp.com/attachments/1247858377611284561/1247858470657458260/logo_sleeping.jpg?ex=66618e43&is=66603cc3&hm=dba2c431c7a79f4e5c068d7fbec03467462b210fabde7e1213f036c5e93f0328&' })
            .setTimestamp();

        const messageContent = `**Bye bye brooo 😭😭 ${member}!**`;
        channel.send({ content: messageContent, embeds: [farewellEmbed] });
    } catch (error) {
        console.error('Error occurred in farewellMember function:', error);
    }
}

module.exports = {
    welcomeNewMember,
    farewellMember
};
