const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('admin')
        .setDescription('Displays a list of users with the Administrator role'),
    async execute(interaction) {
        const guild = interaction.guild;

        await interaction.reply({ content: 'Sabar lagi mengambil data server discord anda😭😭' });

        try {
            await guild.members.fetch();
            const adminMembers = guild.members.cache.filter(member => 
                member.permissions.has(PermissionsBitField.Flags.Administrator) && !member.user.bot
            );
            if (adminMembers.size === 0) {
                await interaction.editReply('No human members with Administrator role found in this server.');
                return;
            }
            const adminList = adminMembers.map(member => `☠️ ${member.user.tag}`).join('\n');

            const MAX_DESCRIPTION_LENGTH = 2048;
            const chunks = adminList.match(new RegExp(`(.|[\r\n]){1,${MAX_DESCRIPTION_LENGTH}}`, 'g'));

            for (const chunk of chunks) {
                // Create an embed message
                const embed = new EmbedBuilder()
                    .setAuthor({ name: '48Intens Official✧', iconURL: 'https://ucarecdn.com/d64744d4-b4ce-4d39-afd7-9c9ce3795f99/48intens_1_1.png', url: 'https://discord.gg/48intenscommunity' })
                    .setTitle('Administrator List')
                    .setColor('#242238')
                    .setDescription(chunk)
                    .setTimestamp()
                    .setFooter({ text: 'Requested by ' + interaction.user.tag, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) });

                // Update the reply with the embed
                await interaction.followUp({ embeds: [embed] });
            }
        } catch (error) {
            console.error('Error fetching members or sending the reply:', error);
            await interaction.editReply({ content: 'There was an error while executing this command!' });
        }
    },
};
