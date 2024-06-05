const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('add-user')
    .setDescription('Add a user to an existing ticket')
    .addUserOption(option => 
      option.setName('user')
        .setDescription('User to add to the ticket')
        .setRequired(true)
    ),
  async execute(interaction) {
    // Handle addUserCommand execution
  },
};
