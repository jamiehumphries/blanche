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
  494, // Victini
  517, // Munna
  518, // Musharna
  527, // Woobat
  528, // Swoobat
  531, // Audino
  540, // Sewaddle
  541, // Swadloon
  542, // Leavanny
  546, // Cottonee
  547, // Whimsicott
  548, // Petilil
  549, // Lilligant
  551, // Sandile
  552, // Krokorok
  553, // Krookodile
  554, // Darumaka
  555, // Darmanitan
  559, // Scraggy
  560, // Scrafty
  570, // Zorua
  571, // Zoroark
  572, // Minccino
  573, // Cinccino
  574, // Gothita
  575, // Gothorita
  576, // Gothitelle
  577, // Solosis
  578, // Duosion
  579, // Reuniclus
  580, // Ducklett
  581, // Swanna
  582, // Vanillite
  583, // Vanillish
  584, // Vanilluxe
  585, // Deerling
  586, // Sawsbuck
  587, // Emolga
  592, // Frillish
  593, // Jellicent
  594, // Alomomola
  602, // Tynamo
  603, // Eelektrik
  604, // Eelektross
  605, // Elgyem
  606, // Beheeyem
  618, // Stunfisk
  619, // Mienfoo
  620, // Mienshao
  621, // Druddigon
  624, // Pawniard
  625, // Bisharp
  626, // Bouffalant
  627, // Rufflet
  628, // Braviary
  629, // Vullaby
  630, // Mandibuzz
  636, // Larvesta
  637, // Volcarona
  641, // Tornadus
  642, // Thundurus
  643, // Reshiram
  644, // Zekrom
  645, // Landorus
  646, // Kyurem
  647, // Keldeo
  648, // Meloetta
  649 // Genesect
])

module.exports = unavailable
