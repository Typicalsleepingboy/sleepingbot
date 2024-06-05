const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Menampilkan daftar perintah yang tersedia dan deskripsinya'),
    execute: async (interaction) => {
        const commands = interaction.client.commands;
        const embed = new EmbedBuilder()
            .setColor('#242238')
            .setAuthor({ name: '48Intens Official✧', iconURL: 'https://ucarecdn.com/d64744d4-b4ce-4d39-afd7-9c9ce3795f99/48intens_1_1.png', url: 'https://discord.gg/48intenscommunity' })
            .setTitle('Command List bot 48Intens Official')
            .setDescription('List of available commands and their descriptions')
            .setTimestamp()
            .setImage('https://ucarecdn.com/7263cdb0-7aa9-4e0f-914e-1751ea511337/intenspink.jpg')
                      .setFooter({ text: 'By 48Intens Official and Full automated 🤖', iconURL: 'https://cdn.discordapp.com/attachments/1247858377611284561/1247858470657458260/logo_sleeping.jpg?ex=66618e43&is=66603cc3&hm=dba2c431c7a79f4e5c068d7fbec03467462b210fabde7e1213f036c5e93f0328&' });

        commands.forEach(command => {
            embed.addFields({ name: `\`/ ${command.data.name}\``, value:`⭐ ${command.data.description}`, inline: false });
        });

        await interaction.reply({ embeds: [embed] });
    },
};
