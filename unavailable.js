/* eslint-disable comma-dangle */

// https://www.dragonflycave.com/resources/pokemon-list-generator
// %[number]%, // %[name]%

/** @type {Set<number>} */
const unavailable = new Set([
  // KANTO
  132, // Ditto
  // HOENN
  292, // Shedinja
  352, // Kecleon
  // SINNOH
  479, // Rotom
  489, // Phione
  490, // Manaphy
  492, // Shaymin
  493, // Arceus
  // UNOVA
  517, // Munna
  518, // Musharna
  551, // Sandile
  552, // Krokorok
  553, // Krookodile
  570, // Zorua
  571, // Zoroark
  582, // Vanillite
  583, // Vanillish
  584, // Vanilluxe
  585, // Deerling
  586, // Sawsbuck
  592, // Frillish
  593, // Jellicent
  602, // Tynamo
  603, // Eelektrik
  604, // Eelektross
  619, // Mienfoo
  620, // Mienshao
  621, // Druddigon
  624, // Pawniard
  625, // Bisharp
  629, // Vullaby
  630, // Mandibuzz
  636, // Larvesta
  637, // Volcarona
  647, // Keldeo
  648, // Meloetta
])

module.exports = unavailable
