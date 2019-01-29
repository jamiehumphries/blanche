const Discord = require('discord.js')
const _ = require('lodash')
const pokemon = require('pokemon')
const client = new Discord.Client()

const cpList = require('./cp-list')
const unavailable = require('./unavailable')

const SEARCH_EMOJI = '🔍'

const tiers = {
  S: { article: 'an', league: 'Master', pokemon: [] },
  A: { article: 'an', league: 'Master', pokemon: [] },
  B: { article: 'a', league: 'Ultra', pokemon: [] },
  C: { article: 'a', league: 'Ultra', pokemon: [] },
  D: { article: 'a', league: 'Great', pokemon: [] },
  E: { article: 'an', league: 'Great', pokemon: [] },
  F: { article: 'an', league: 'Great', pokemon: [] }
}

const leagueTiers = _.groupBy(Object.keys(tiers), t => tiers[t].league.toLowerCase())

function getGrade (cp) {
  if (cp > 3000) {
    return 'S'
  } else if (cp > 2500) {
    return 'A'
  } else if (cp > 2000) {
    return 'B'
  } else if (cp > 1500) {
    return 'C'
  } else if (cp > 1000) {
    return 'D'
  } else if (cp > 500) {
    return 'E'
  } else {
    return 'F'
  }
}

Object.keys(cpList).forEach(pkm => {
  const id = getId(pkm)
  if (!unavailable.has(id)) {
    const cp = cpList[pkm]
    const grade = getGrade(cp)
    tiers[grade].pokemon.push(id)
  }
})

client.on('ready', () => {
  console.log(guildReport())
})

client.on('message', message => {
  if (!shouldListen(message)) {
    return
  }
  if (message.mentions.users.has(client.user.id)) {
    const grade = chooseGrade(message)
    const tier = tiers[grade]
    const teams = _.sampleSize(tier.pokemon, 12)
    const userTeam = teams.slice(0, 6)
    const opponentTeam = teams.slice(6)
    message.reply(`${isDM(message) ? 'Y' : 'y'}ou may choose from:\n\n${format(userTeam)}\n\n` +
      `Your opponent may choose from:\n\n${format(opponentTeam)}\n\n` +
      `This is ${tier.article} ${grade}-Tier battle which should be fought in the **${tier.league} League**.\n\n` +
      `_React with ${SEARCH_EMOJI} to receive a search string for your team._`
    ).then(reply => {
      reply.react(SEARCH_EMOJI)
    })
  } else if (message.author.id === process.env.OWNER && message.content === 'blancheguilds') {
    message.author.send(guildReport())
  }
})

client.on('messageReactionAdd', (messageReaction, user) => {
  const { message, emoji } = messageReaction
  if (!shouldListen(message)) {
    return
  }
  const isBlancheMessage = message.author.id === client.user.id
  const isSearchEmoji = emoji.toString() === SEARCH_EMOJI
  const userIsBlanche = user.id === client.user.id
  if (isBlancheMessage && isSearchEmoji && !userIsBlanche) {
    const numbers = message.content.match(/\b\d\d\d\b/g)
    if (!numbers || numbers.length !== 12) {
      // Some other Blanche message.
      return
    }
    const isMentionedUser = message.mentions.users.has(user.id)
    const team = isMentionedUser || isDM(message) ? numbers.slice(0, 6) : numbers.slice(6)
    user.send(team.join(','))
  }
})

function shouldListen (message) {
  const isProduction = this.process.env.ENV === 'production'
  const isTestGuild = message.guild && (message.guild.id === this.process.env.TEST_GUILD)
  const isOwnerDM = isDM(message) && message.channel.recipient.id === process.env.OWNER
  return (isProduction && !isTestGuild) || (!isProduction && (isTestGuild || isOwnerDM))
}

function isDM (message) {
  return message.channel.type === 'dm'
}

function guildReport () {
  return `Listening on ${client.guilds.array().length} servers.`
}

function chooseGrade (message) {
  const tierMatch = message.content.match(/\b([SABCDEF])[- ]Tier\b/i)
  if (tierMatch) {
    // Specified grade.
    return tierMatch[1].toUpperCase()
  }
  const leagueMatch = message.content.match(/\b(Great|Ultra|Master)\b/i)
  if (leagueMatch) {
    // Random grade from specified league.
    const league = leagueMatch[1].toLowerCase()
    return _.sample(leagueTiers[league])
  }
  // Random grade, weighted on Pokémon per tier.
  return getGrade(_.sample(Object.values(cpList)))
}

function format (team) {
  return team.map(id => `◓ ${pad(id)} ${getName(id)}`).join('\n')
}

function pad (n) {
  let s = n.toString()
  while (s.length < 3) {
    s = '0' + s
  }
  return s
}

function getId (name) {
  switch (name) {
    case 'Meltan':
      return 808
    case 'Melmetal':
      return 809
    default:
      return pokemon.getId(name)
  }
}

function getName (id) {
  switch (id) {
    case 808:
      return 'Meltan'
    case 809:
      return 'Melmetal'
    default:
      return pokemon.getName(id)
  }
}

client.login(process.env.TOKEN)
