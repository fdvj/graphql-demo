// 'use strict';
// const fetch = require('node-fetch');
// const sample = require('lodash/sampleSize');
// const Bluebird = require('bluebird');

// const BASE_PATH = 'https://pokeapi.co';

// module.exports = {
//   Query: {
//     pokemon: async (parent, args) => {
//       const response = await fetch(`${BASE_PATH}/api/v2/pokemon/${args.name}`);
//       const pokemon = await response.json();
//       pokemon.types = pokemon.types.map(({ type }) => type.name);
//       return pokemon;
//     },
//     listPokemons: async () => {
//       const response = await fetch(`${BASE_PATH}/api/v2/pokemon`);
//       const pokemons = await response.json();
//       return pokemons.results;
//     }
//   },
//   Pokemon: {
//     moves: async (parent) => {
//       // Pick four randmon moves
//       const moveSample = sample(parent.moves, 4);
//       return Bluebird.map(moveSample, async ({ move }) => {
//         const response = await fetch(move.url);
//         const details = await response.json();
//         return {
//           name: details.name,
//           description: details.effect_entries[0].effect
//         };
//       });
//     }
//   }
// }