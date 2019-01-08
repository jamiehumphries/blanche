const Discord = require('discord.js');
const pokemon = require('pokemon');
const client = new Discord.Client();

const unreleased = require('./unreleased');

const MAX_POKEMON_NUMBER = 488;

client.on('ready', () => {
  console.log('Ready...');
});

client.on('message', msg => {
  if (msg.mentions.users.has(client.user.id)) {
    msg.reply(`**you may choose from:**\n${getFormattedTeam()}\n\n**Your opponent may choose from:**\n${getFormattedTeam()}`);
  }
});

function getFormattedTeam() {
  const numbers = new Set();
  while (numbers.size < 6) {
    const number = Math.floor(Math.random() * MAX_POKEMON_NUMBER) - 1;
    if (!unreleased.has(number)) {
      numbers.add(number);
    }
  }
  return Array.from(numbers).map(n => `◓ ${getName(n)}`).join('\n');
}

function getName(number) {
  switch (number) {
    case -1:
      return 'Meltan';
    case 0:
      return 'Melmetal';
    default:
      return pokemon.getName(number);
  }
}

client.login('---');
