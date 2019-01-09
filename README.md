# Blanche

## Overview

Blanche is a Discord bot that you can add to your server to give random line-ups for Trainer Battles in Pokémon GO.

For example:

> **JTAtomico** Today at 12:00 <br/>
> Hey @Blanche, pick some teams for us!
>
> **Blanche** Today at 12:00 <br/>
> @JTAtomico, you may choose from:
>
> ◓ 073 Tentacruel<br/>
> ◓ 224 Octillery<br/>
> ◓ 226 Mantine<br/>
> ◓ 372 Shelgon<br/>
> ◓ 237 Hitmontop<br/>
> ◓ 326 Grumpig<br/>
>
> Your opponent may choose from:<br/>
>
> ◓ 342 Crawdaunt<br/>
> ◓ 295 Exploud<br/>
> ◓ 279 Pelipper<br/>
> ◓ 454 Toxicroak<br/>
> ◓ 026 Raichu<br/>
> ◓ 335 Zangoose<br/>
>
> This is a B-Tier battle which should be fought in the **Ultra League**.<br/>

Pokémon are split into tiers based on their maximum CP, to help balance the match-ups.

* **S-Tier** CP 3001 or higher
* **A-Tier** CP 2501 - CP 3000
* **B-Tier** CP 2001 - CP 2500
* **C-Tier** CP 1501 - CP 2000
* **D-Tier** CP 1001 - CP 1500
* **E-Tier** CP 501 - CP 1000
* **F-Tier** CP 500 or lower

The idea behind Blanche is to give trainers a reason to use a wider variety of their Pokémon in Trainer Battles.

## Installation

To install Blanche on a Discord server that you administer, follow this link: [Install Blanche](https://discordapp.com/oauth2/authorize?client_id=532196601075335168&scope=bot&permissions=2048)

Blanche only requires the _Send Messages_ permission.

## Commands

Once you have added Blanche to your server, the bot will suggest a team any time that it is @mentioned in a message. For example:

> Pick some teams, @Blanche!

> @Blanche, set up a match.

You can also specify the particular Tier of the match you want, or more generally the League*. For example:

> @Blanche, we want to fight in the C-Tier.

> Let's have some Great League teams please @Blanche!

If you would rather not talk to a bot as if it were a person, then the minimal commands are:

> @Blanche

> @Blanche c-tier

> @Blanche great

\* _If you specify a Tier and a League, the Tier has priority and inconsistencies between the two are ignored._

## Issues

Please raise any bugs or issues on Github: https://github.com/jamiehumphries/blanche/issues
