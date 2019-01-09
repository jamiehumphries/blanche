const Discord = require('discord.js')
const _ = require('lodash')
const pokemon = require('pokemon')
const client = new Discord.Client()

const cpList = require('./cp-list')
const unavailable = require('./unavailable')

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
  console.log('Ready...')
})

client.on('message', msg => {
  if (shouldRespond(msg)) {
    const grade = chooseGrade(msg)
    const tier = tiers[grade]
    const teams = _.sampleSize(tier.pokemon, 12)
    const userTeam = teams.slice(0, 6)
    const opponentTeam = teams.slice(6)
    msg.reply(`you may choose from:\n\n${format(userTeam)}\n\n` +
      `Your opponent may choose from:\n\n${format(opponentTeam)}\n\n` +
      `This is ${tier.article} ${grade}-Tier battle which should be fought in the **${tier.league} League**.`
    )
  }
})

function shouldRespond (msg) {
  return process.env.ENV === 'production' ? msg.mentions.users.has(client.user.id) : msg.content.startsWith('testblanche')
}

function chooseGrade (msg) {
  const tierMatch = msg.content.match(/\b([SABCDEF])[- ]Tier\b/i)
  if (tierMatch) {
    // Specified grade.
    return tierMatch[1].toUpperCase()
  }
  const leagueMatch = msg.content.match(/\b(Great|Ultra|Master)\b/i)
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
