const { SlashCommandBuilder } = require('@discordjs/builders');
const { PermissionsBitField, ActionRowBuilder, ButtonBuilder, EmbedBuilder, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket-setup')
    .setDescription('Set up a ticket system in a channel')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Channel where the ticket system will be set up')
        .setRequired(true)
    ),
  async execute(interaction) {
    if (interaction.commandName === 'ticket-setup') {
      try {
        const channel = interaction.options.getChannel('channel');

        if (!channel) {
          return interaction.reply({ content: 'Please select a channel.', ephemeral: false });
        }

        const ticketChannel = await channel.guild.channels.create({
          name: 'ticket-system', // Provide a name for the channel
          type: ChannelType.GuildText,
          permissionOverwrites: [
            {
              id: interaction.guild.id,
              deny: [PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: interaction.guild.roles.everyone.id,
              deny: [PermissionsBitField.Flags.ViewChannel],
            },
            {
              id: interaction.user.id,
              allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
            },
          ],
        });

        const embed = new EmbedBuilder()
          .setColor('#242238')
          .setTitle('Sleeping.stu ticket system setup')
          .setFooter({ text: 'By 48Intens Official and Full automated 🤖', iconURL: 'https://cdn.discordapp.com/attachments/1247858377611284561/1247858470657458260/logo_sleeping.jpg?ex=66618e43&is=66603cc3&hm=dba2c431c7a79f4e5c068d7fbec03467462b210fabde7e1213f036c5e93f0328&' })
          .setTimestamp()
          .setImage('https://bit.ly/4e5m6eF')
          .setDescription(`Ticket system has been set up in ${ticketChannel.toString()}. Click the button below to create a new ticket.`);

        const row = new ActionRowBuilder()
          .addComponents(
            new ButtonBuilder()
              .setCustomId('create_ticket')
              .setLabel('⭐ Create Ticket')
              .setStyle('Primary'),
          );

        await interaction.reply({ content: 'Ticket system has been set up!', ephemeral: false });
        const commandMessage = await ticketChannel.send({ embeds: [embed], components: [row] });

        const filter = (interaction) => interaction.customId === 'create_ticket';
        const collector = commandMessage.createMessageComponentCollector({ filter, time: 10000 });

        collector.on('collect', async (collectedInteraction) => {
          if (collectedInteraction.customId === 'create_ticket') {
            try {
              const newChannel = await collectedInteraction.guild.channels.create({
                name: `ticket-${collectedInteraction.user.username}`,
                type: ChannelType.GuildText,
                permissionOverwrites: [
                  {
                    id: collectedInteraction.guild.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                  },
                  {
                    id: collectedInteraction.guild.roles.everyone.id,
                    deny: [PermissionsBitField.Flags.ViewChannel],
                  },
                  {
                    id: collectedInteraction.user.id,
                    allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.ReadMessageHistory],
                  },
                ],
              });

              const welcomeEmbed = new EmbedBuilder()
                .setColor('#242238')
                .setTitle('Welcome to your ticket!')
                .setDescription(`Hello @${collectedInteraction.user.username}! Support will be with you shortly. To close this ticket react with 🔒`);

              await newChannel.send({ embeds: [welcomeEmbed] });

              try {
                await collectedInteraction.reply({ content: `Ticket created: ${newChannel.toString()}`, ephemeral: true });
              } catch (error) {
                console.error('Error replying to interaction:', error);
                await collectedInteraction.followUp({ content: 'Error creating ticket. Please try again.', ephemeral: true });
              }
            } catch (error) {
              console.error('Error creating ticket:', error);
              await collectedInteraction.reply({ content: 'Error creating ticket. Please try again.', ephemeral: true });
            }
          }
        });
      } catch (error) {
        console.error('Error setting up ticket system:', error);
        await interaction.reply({ content: 'Error setting up ticket system. Please try again.', ephemeral: false });
      }
    }
  },
};