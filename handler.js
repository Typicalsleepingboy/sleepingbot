require('dotenv').config();
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, Collection, IntentsBitField, Partials } = require('discord.js');

const clientId = '1247850807613984859'; // Ganti dengan ID klien bot Anda

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.DirectMessages
  ],partials: [Partials.Channel, Partials.Message]
});
client.commands = new Collection();

const commandFiles = fs.readdirSync('./command/').filter(file => file.endsWith('.js'));

const commands = [];

for (const file of commandFiles) {
  const command = require(`./command/${file}`);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
    console.log(`Command ${command.data.name} has been successfully registered.`);
  } else {
    console.log(`[WARNING] The command at ./command/${file} is missing a required "data" or "execute" property.`);
  }
}

const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    );

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
      await command.execute(interaction);
  } catch (error) {
      console.error(`Error executing command ${interaction.commandName}:`, error);
      if (interaction.deferred || interaction.replied) {
          await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
      } else {
          await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
  }
});

client.login(process.env.DISCORD_TOKEN);
