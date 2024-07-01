export default function calculateSelectedPokemonRank(
  ranks,
  attackIV,
  defenseIV,
  staminaIV
) {
  let keys = Object.keys(ranks);
  let maxStatProd = keys[0].split(".")[0];
  let actualRank = 1;
  let pokemonRank = {};

  for (let i = 0; i < ranks.numRanks && ranks[keys[i]].length; i++) {
    //console.log(ranks[keys[i]]);
    for (let j = 0; j < ranks[keys[i]].length; j++) {
      if (
        parseInt(ranks[keys[i]][j].IVs.A) === parseInt(attackIV) &&
        parseInt(ranks[keys[i]][j].IVs.D) === parseInt(defenseIV) &&
        parseInt(ranks[keys[i]][j].IVs.S) === parseInt(staminaIV)
      ) {
        // found rank for the selected pokemon

        /*control highlight of User Data row based on rank*/
        /*this has been moved to CSS Stylings as of re-write*/
        if (actualRank / 1 < (0.02442 * ranks.numRanks) / 1) {
          pokemonRank.class = "good";
        } else if (actualRank / 1 < (0.2442 * ranks.numRanks) / 1) {
          pokemonRank.class = "ok";
        } else {
          pokemonRank.class = "rubbish";
        }

        pokemonRank.rank = actualRank;

        pokemonRank.level = ranks[keys[i]][j].L;
        pokemonRank.cp = ranks[keys[i]][j].CP;
        pokemonRank.attackIV = ranks[keys[i]][j].IVs.A;
        pokemonRank.defenseIV = ranks[keys[i]][j].IVs.D;
        pokemonRank.staminaIV = ranks[keys[i]][j].IVs.S;
        pokemonRank.maxStatProd = keys[i].split(".")[0];
        pokemonRank.perfection = parseFloat(
          (100 * keys[i].split(".")[0]) / maxStatProd
        ).toFixed(2);
        pokemonRank.battleAttack = ranks[keys[i]][j].battle.A;
        pokemonRank.battleDefense = ranks[keys[i]][j].battle.D;
        pokemonRank.battleStamina = ranks[keys[i]][j].battle.S;

        break;
      }
      actualRank = actualRank + 1;
    }
  }

  return pokemonRank;
}
