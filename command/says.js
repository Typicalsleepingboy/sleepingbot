const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField } = require('discord.js');

const cooldowns = new Map();

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sayang')
        .setDescription('Admin only hehehe')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to send')
                .setRequired(true))
        .addAttachmentOption(option =>
            option.setName('attachment')
                .setDescription('Attachment to send')),
    async execute(interaction) {
        try {
            const now = Date.now();
            const cooldownTime = 5000;

            if (cooldowns.has(interaction.user.id)) {
                const expirationTime = cooldowns.get(interaction.user.id) + cooldownTime;
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return interaction.reply({ content: `Tunggu dulu ${timeLeft.toFixed(1)} detik baru bisa digunakan lagi 😭😭.`, ephemeral: true });
                }
            }

            cooldowns.set(interaction.user.id, now);

            const message = interaction.options.getString('message');
            const attachment = interaction.options.getAttachment('attachment');
            const allowedRoleIDs = ['1185883650252881968', '1185883650252881969', '1193421102194626590', '1188765074987429888', '989164395684855855'];

            if (!interaction.member) {
                return interaction.reply({ content: 'This command can only be used in a server!', ephemeral: true });
            }

            // Periksa apakah pengguna memiliki salah satu dari peran yang diizinkan
            const hasAllowedRole = interaction.member.roles.cache.some(role => allowedRoleIDs.includes(role.id));

            if (!hasAllowedRole) {
                return interaction.reply({ content: 'Kamu bukan admin yaahaaaa ', ephemeral: true });
            }

            // Menandai bahwa bot sedang memproses perintah
            await interaction.deferReply({ ephemeral: true });

            const messageOptions = { content: message };
            if (attachment) {
                messageOptions.files = [attachment];
            }
            
            // Mengirim pesan ke channel
            await interaction.channel.send(messageOptions);

            // Mengirim balasan sebagai konfirmasi
            await interaction.followUp({ content: 'Message sent!', ephemeral: true });
        } catch (error) {
            console.error('An error occurred while executing the command:', error);
            try {
                await interaction.followUp({ content: 'An error occurred while executing the command. Please try again later.', ephemeral: true });
            } catch (followUpError) {
                console.error('An error occurred while sending the follow-up message:', followUpError);
            }
        }
    },
};
