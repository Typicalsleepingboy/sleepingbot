const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Get the avatar of a user')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('The user whose avatar you want to get')
        .setRequired(true)),
  async execute(interaction) {
    try {
      // Defer the reply to give more time for processing
      await interaction.deferReply();

      const user = interaction.options.getUser('user');
      const avatarUrl = user.avatarURL({ dynamic: true, format: 'png', size: 1024 });

      // Edit the deferred reply with the avatar URL
      await interaction.editReply({ content: `48Intens Avatar of ${user.username}:`, files: [avatarUrl] });
    } catch (error) {
      console.error('Error executing command avatar:', error);
      await interaction.editReply('There was an error while executing this command!');
    }
  },
};
