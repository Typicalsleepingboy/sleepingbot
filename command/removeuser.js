const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket-close')
    .setDescription('Close an existing ticket'),
  async execute(interaction) {
    const newChannel = interaction.channel;

    if (!newChannel || newChannel.type !== ChannelType.GuildText || !newChannel.name.startsWith('ticket-')) {
      return interaction.reply({ content: 'This command can only be used in a ticket channel.', ephemeral: true });
    }

    const confirmationEmbed = new EmbedBuilder()
      .setColor('#242238')
      .setTitle('Close Ticket Confirmation')
      .setDescription('Are you sure you want to close this ticket? This action cannot be undone.');

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('confirm_close')
          .setLabel('Confirm Close')
          .setStyle('Danger'),
        new ButtonBuilder()
          .setCustomId('cancel_close')
          .setLabel('Cancel')
          .setStyle('Secondary'),
      );

    try {
      const originalMessage = await interaction.reply({ embeds: [confirmationEmbed], components: [row], fetchReply: true });

      const filter = (i) => {
        return ['confirm_close', 'cancel_close'].includes(i.customId) && i.user.id === interaction.user.id;
      };

      const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000 });

      collector.on('collect', async (btnInteraction) => {
        if (btnInteraction.customId === 'confirm_close') {
          try {
            await btnInteraction.reply({ content: 'Ticket closed.', ephemeral: true });
            await newChannel.delete();
          } catch (error) {
            console.error('Error closing ticket:', error);
            await btnInteraction.reply({ content: 'Error closing ticket. Please try again.', ephemeral: true });
          }
        } else if (btnInteraction.customId === 'cancel_close') {
          await btnInteraction.reply({ content: 'Ticket close cancelled.', ephemeral: true });
        }
      });

      collector.on('end', async (collected) => {
        if (collected.size === 0) {
          try {
            await originalMessage.edit({ content: 'Ticket close timed out.', components: [] });
          } catch (error) {
            console.error('Error editing reply after timeout:', error);
          }
        } else {
          try {
            await originalMessage.edit({ components: [] });
          } catch (error) {
            console.error('Error editing reply after button interaction:', error);
          }
        }
      });

    } catch (error) {
      console.error('Error sending confirmation message:', error);
      await interaction.reply({ content: 'Error sending confirmation message. Please try again.', ephemeral: true });
    }
  },
};
