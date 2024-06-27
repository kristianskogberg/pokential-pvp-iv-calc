import { pokeListObj } from "./pokeListObj";

/* clear min stat filters, filterMod, and lastLeague */
const mA = 0;
const mD = 0;
const mHP = 0;
const filterMod = false;
const lastLeague = undefined;
const perfTiming = false;
let rIV = [];
let lvl = [];
var gmRhtml = null;
var vAtk = 0;
var vDef = 0;
var vHP = 0;
var pokemonRank = null;

function XLcandy(xlev, shdw) {
  /* Returns calculated XL candy costs based on https://bulbapedia.bulbagarden.net/wiki/Power_Up#CP_multiplier */
  switch (xlev) {
    case 11:
    case 10:
      if (shdw) {
        return 360;
      }
      return 296;
    case 10.5:
    case 9.5:
      if (shdw) {
        return 336;
      }
      return 276;
    case 9:
      if (shdw) {
        return 312;
      }
      return 256;
    case 8.5:
      if (shdw) {
        return 288;
      }
      return 236;
    case 8:
      if (shdw) {
        return 264;
      }
      return 216;
    case 7.5:
      if (shdw) {
        return 243;
      }
      return 199;
    case 7:
      if (shdw) {
        return 222;
      }
      return 182;
    case 6.5:
      if (shdw) {
        return 201;
      }
      return 165;
    case 6:
      if (shdw) {
        return 180;
      }
      return 148;
    case 5.5:
      if (shdw) {
        return 162;
      }
      return 133;
    case 5:
      if (shdw) {
        return 144;
      }
      return 118;
    case 4.5:
      if (shdw) {
        return 126;
      }
      return 103;
    case 4:
      if (shdw) {
        return 108;
      }
      return 88;
    case 3.5:
      if (shdw) {
        return 93;
      }
      return 76;
    case 3:
      if (shdw) {
        return 78;
      }
      return 64;
    case 2.5:
      if (shdw) {
        return 63;
      }
      return 52;
    case 2:
      if (shdw) {
        return 48;
      }
      return 40;
    case 1.5:
      if (shdw) {
        return 36;
      }
      return 30;
    case 1:
      if (shdw) {
        return 24;
      }
      return 20;
    case 0.5:
      if (shdw) {
        return 12;
      }
      return 10;
    default:
      return 0;
  }
}

function numOut(num, decimals) {
  if (isNaN(decimals / 1)) {
    console.error(
      "numOut: unsupported decimal place:" + JSON.stringify(decimals)
    );
    return false;
  }

  var places = Math.pow(10, decimals);
  var out = (Math.trunc(num * places) / places).toFixed(decimals);
  return out;
}

function getMonRank(
  ranks,
  keys,
  shdw,
  maxStatProd,
  aIV,
  dIV,
  sIV,
  numIVs,
  mon,
  evo,
  uri,
  maxLvl,
  dec
) {
  var T0;
  if (perfTiming) {
    T0 = performance.now();
  }
  console.log(
    "gMR: received: ranks:" +
      ranks +
      ", keys[0]:" +
      keys[0] +
      ", shdw:" +
      shdw +
      ", maxStatProd:" +
      maxStatProd +
      ", aIV:" +
      aIV +
      ", dIV:" +
      dIV +
      ", sIV:" +
      sIV +
      ", numIVs:" +
      numIVs +
      ", mon:" +
      mon +
      ", uri:" +
      uri +
      ", maxLvl:" +
      maxLvl +
      ", dec:" +
      dec
  );
  var html = "";
  var actualRank = 1;
  var vAtk = false,
    vDef = false,
    vHP = false;

  let pokemonRank = {};
  console.log(ranks);

  for (var i = 0; i < ranks.numRanks && ranks[keys[i]].length; i++) {
    for (var j = 0; j < ranks[keys[i]].length; j++) {
      if (
        aIV / 1 === ranks[keys[i]][j].IVs.A / 1 &&
        dIV / 1 === ranks[keys[i]][j].IVs.D / 1 &&
        sIV / 1 === ranks[keys[i]][j].IVs.S / 1
      ) {
        /*control highlight of User Data row based on rank*/
        /*this has been moved to CSS Stylings as of re-write*/
        if (actualRank / 1 < (0.02442 * ranks.numRanks) / 1) {
          html += "<tr class='good'>"; /*green for "good"*/
          pokemonRank.class = "good";
        } else if (actualRank / 1 < (0.2442 * ranks.numRanks) / 1) {
          html += "<tr class='ok'>"; /*orange for "ok"*/
          pokemonRank.class = "ok";
        } else {
          html += "<tr class='rubbish'>"; /*red for "rubbish"*/
          pokemonRank.class = "rubbish";
        }

        /*Pokemon	Rank	Lvl	CP	%	PvP Atk	PvP Def	PvP HP	Stat Prod*/
        /*output the row for this individual mon*/
        /*if there is an evo mon passed in, print/exclude certain rows*/
        /*allows for more code re-use / less versioning to maintain*/
        if (evo) {
          html +=
            "<td><a href='" +
            encodeURI(uri) +
            "'>" +
            evo +
            "</a></td>"; /*evos[e] aka evoName*/
          if (numIVs / 1 > 1) {
            html +=
              "<td>" +
              ranks[keys[i]][j].IVs.A +
              "/" +
              ranks[keys[i]][j].IVs.D +
              "/" +
              ranks[keys[i]][j].IVs.S +
              "</td>"; /*evoIVs*/
          }
        }
        html += "<td>" + actualRank + "</td>"; /*Rank*/
        html += "<td>" + ranks[keys[i]][j].L + "</td>"; /*Level*/
        html += "<td>" + ranks[keys[i]][j].CP + "</td>"; /*Final CP*/
        if (!evo) {
          /*skip if this is an evoTable print*/

          html += "<td>" + ranks[keys[i]][j].IVs.A + "</td>"; /*Atk IV*/
          html += "<td>" + ranks[keys[i]][j].IVs.D + "</td>"; /*Def IV*/
          html += "<td>" + ranks[keys[i]][j].IVs.S + "</td>"; /*Sta IV*/
          rIV.push(actualRank); /*Save rank for trash string links*/
          lvl.push(
            ranks[keys[i]][j].L
          ); /*Save levels for PvPoke Custom Group Export*/
        }

        html +=
          "<td>" +
          parseFloat((100 * keys[i].split(".")[0]) / maxStatProd).toFixed(2) +
          "%" +
          "</td>"; /*Perfection*/
        if (!evo && maxLvl > 41 && ranks.maxLvl > 41) {
          html += shdw ? "<td style='color:purple'>" : "<td>";
          html += XLcandy(ranks[keys[i]][j].L / 1 - 40, shdw) + "</td>";
        }

        html += "<td>" + numOut(ranks[keys[i]][j].battle.A, dec);
        html += shdw
          ? "<p style='color:purple'>(" +
            numOut(ranks[keys[i]][j].battle.A * 1.2, dec) +
            ")</p></td>"
          : "</td>"; /*GL Atk Total*/
        html += "<td>" + numOut(ranks[keys[i]][j].battle.D, dec);
        html += shdw
          ? "<p style='color:purple'>(" +
            numOut(ranks[keys[i]][j].battle.D * 0.8, dec) +
            ")</p></td>"
          : "</td>"; /*GL Def Total*/
        html += "<td>" + ranks[keys[i]][j].battle.S + "</td>"; /*GL Sta IV*/
        html += "<td>" + keys[i].split(".")[0] + "</td>"; /*Stat Product*/

        html += "</tr>";
        /*console.log("Found rank="+actualRank);*/

        /* Check if these IVs are valid or invalid for user filter feeedback */
        if (filterMod) {
          if (mA / 1 <= numOut(ranks[keys[i]][j].battle.A, dec)) {
            vAtk = true;
          }
          if (mD / 1 <= numOut(ranks[keys[i]][j].battle.D, dec)) {
            vDef = true;
          }
          if (mHP / 1 <= ranks[keys[i]][j].battle.S) {
            vHP = true;
          }
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
        pokemonRank.battleAttack = numOut(ranks[keys[i]][j].battle.A, dec);
        pokemonRank.battleDefense = numOut(ranks[keys[i]][j].battle.D, dec);
        pokemonRank.battleStamina = ranks[keys[i]][j].battle.S;

        break; /* we found it, stop searching / leave the loop!*/
      }
      actualRank = actualRank + 1;
    }
  }

  if (perfTiming) {
    stopTiming(T0, "getMonRank");
  }
  console.log(pokemonRank);

  return [html, vAtk, vDef, vHP, pokemonRank];
}

export default function outputUserRanks(
  aIV,
  dIV,
  sIV,
  shdw,
  mon,
  league,
  leagueName,
  ranks,
  dec,
  URL
) {
  var T0, Tc, Ti, Tr, T1;
  if (perfTiming) {
    T0 = performance.now();
  }
  console.log(
    "oUR: Received aIV:" +
      aIV +
      ", dIV:" +
      dIV +
      ", sIV:" +
      sIV +
      ", shdw:" +
      shdw +
      ", league:" +
      league +
      ", leagueName:" +
      leagueName +
      ", ranks" +
      ranks +
      ", dec:" +
      dec +
      ", URL:" +
      URL
  );

  const floor = 0;
  const minLvl = 1;
  const maxLvl = 50;
  var limit = 10;
  var keys = Object.keys(ranks);
  var maxStatProd = keys[0].split(".")[0];
  var evos = pokeListObj[mon]
    .split(",")
    .slice(4, pokeListObj[mon].split(",").length);
  //console.log("evos:" + JSON.stringify(evos));
  var evoLen = evos.length;

  /*we have at least one rank to output, let's print! */
  var html = "<table id='outTable'><tr><th>#</th><th>Lvl</th><th>CP</th>";

  html += "<th>Atk IV</th><th>Def</th><th>Stam</th><th>Perfect</th>";

  /*include XL candy costs if Max Level > 41*/
  if (maxLvl > 41 && ranks.maxLvl > 41) {
    html += "<th>XL</th>";
  }

  /*print main table output and count actual outputted rows/ranks*/
  var actualRank = 1;
  var rowsOutput = 0;
  var minAtk = ranks.minAtk.value,
    maxAtk = ranks.maxAtk.value;
  var minDef = ranks.minDef.value,
    maxDef = ranks.maxDef.value;

  if (perfTiming) {
    Tc = performance.now();
  }

  html += "<th>PvP Atk</th><th>Def</th><th>HP</th><th>Stat Prod</th>";

  html += "</tr>";

  /* Generate user inputted IV rows for main output table */
  console.log(aIV, " ", dIV, " ", sIV);

  if (aIV / 1 >= floor / 1 && dIV / 1 >= floor / 1 && sIV / 1 >= floor / 1) {
    /*console.log("i:"+i+" All 3 IVs > floor("+floor+"): "+aIV[i]+", "+dIV[i]+", "+sIV[i]+", aIV.length:"+aIV.length);*/
    [gmRhtml, vAtk, vDef, vHP, pokemonRank] = getMonRank(
      ranks,
      keys,
      shdw,
      maxStatProd,
      aIV,
      dIV,
      sIV,
      aIV.length,
      mon,
      false,
      false,
      maxLvl,
      dec
    );

    if (aIV && dIV && sIV && gmRhtml === "") {
      console.log("Detected too high CP after getMonRank");
    } else {
      html += gmRhtml;
    }
  } else {
    console.log(
      " Detected IV below Floor:" +
        floor +
        " aIV[i]:" +
        aIV +
        " dIV[i]:" +
        dIV +
        " sIV[i]:" +
        sIV
    );
  }

  /*console.log("outputUserRanks: Finished creating output for IVs, now printing main table...");*/
  if (perfTiming) {
    Ti = performance.now();
  }

  /* used to track if we should hide XL candy column */
  var nonZeroXL = false;
  var outIVs = "";

  for (
    let i = 0;
    actualRank / 1 <= ranks.numRanks / 1 && actualRank / 1 <= limit / 1;
    i++
  ) {
    for (let j = 0; j < ranks[keys[i]].length; j++) {
      if (
        mA / 1 <= numOut(ranks[keys[i]][j].battle.A, dec) &&
        mD / 1 <= numOut(ranks[keys[i]][j].battle.D, dec) &&
        mHP / 1 <= ranks[keys[i]][j].battle.S
      ) {
        /* All three stats are above filter cutoffs, and (if enabled by user) IV is efficient, proceed with printing this row */
        if (actualRank / 1 <= limit / 1) {
          html += "<tr><td>" + actualRank + "</td>"; /*Rank*/
          html += "<td>" + ranks[keys[i]][j].L + "</td>"; /*Level*/
          html += "<td>" + ranks[keys[i]][j].CP + "</td>"; /*Final CP*/

          html += "<td>" + ranks[keys[i]][j].IVs.A + "</td>"; /*Atk IV*/
          html += "<td>" + ranks[keys[i]][j].IVs.D + "</td>"; /*Def IV*/
          html += "<td>" + ranks[keys[i]][j].IVs.S + "</td>"; /*Sta IV*/
          outIVs +=
            ranks[keys[i]][j].IVs.A +
            "-" +
            ranks[keys[i]][j].IVs.D +
            "-" +
            ranks[keys[i]][j].IVs.S +
            ",";
          html +=
            "<td>" +
            parseFloat((100 * keys[i].split(".")[0]) / maxStatProd).toFixed(3) +
            "%" +
            "</td>"; /*Perfection*/
          if (maxLvl > 41 && ranks.maxLvl > 41) {
            var candy = XLcandy(ranks[keys[i]][j].L / 1 - 40);
            html += "<td>" + candy + "</td>";
            if (!nonZeroXL && candy > 0) {
              nonZeroXL = true;
            } /*XL*/
          }

          html +=
            "<td>" +
            numOut(ranks[keys[i]][j].battle.A, dec) +
            "</td>"; /*GL Atk Total*/
          html +=
            "<td>" +
            numOut(ranks[keys[i]][j].battle.D, dec) +
            "</td>"; /*GL Def Total*/
          html += "<td>" + ranks[keys[i]][j].battle.S + "</td>"; /*GL HP*/
          html += "<td>" + keys[i].split(".")[0] + "</td>"; /*Stat Product*/

          html += "</tr>";
          rowsOutput = rowsOutput / 1 + 1;
        }
      } else {
        /* Skip printing row, but ensure we still print a total of <limit> rows */
        limit = (limit / 1 + 1) / 1;
      }
      actualRank = actualRank + 1;
    }
  }

  console.log(gmRhtml);

  /*console.log("outputUserRanks: Finished loop with i:"+i+", actualRank:"+actualRank+" >= limit:"+limit);*/
  html += "</table>"; /*finish building the whole table*/
  var printLimit = Math.min(rowsOutput, limit, ranks.numRanks);
  if (perfTiming) {
    Tr = performance.now();
  }

  /*prepare max stat html output*/
  var maxAtkurl = encodeURI(
    URL +
      "?mon=" +
      mon +
      "&r=" +
      limit +
      "&cp=" +
      league +
      "&f=" +
      floor +
      "&min=" +
      minLvl +
      "&max=" +
      maxLvl +
      "&set=" +
      ranks.maxAtk.aIV +
      "_" +
      ranks.maxAtk.dIV +
      "_" +
      ranks.maxAtk.sIV
  );

  var maxDefurl = encodeURI(
    URL +
      "?mon=" +
      mon +
      "&r=" +
      limit +
      "&cp=" +
      league +
      "&f=" +
      floor +
      "&min=" +
      minLvl +
      "&max=" +
      maxLvl +
      "&set=" +
      ranks.maxDef.aIV +
      "_" +
      ranks.maxDef.dIV +
      "_" +
      ranks.maxDef.sIV
  );
  var maxHPurl = encodeURI(
    URL +
      "?mon=" +
      mon +
      "&r=" +
      limit +
      "&cp=" +
      league +
      "&f=" +
      floor +
      "&min=" +
      minLvl +
      "&max=" +
      maxLvl +
      "&set=" +
      ranks.maxHP.aIV +
      "_" +
      ranks.maxHP.dIV +
      "_" +
      ranks.maxHP.sIV
  );
  var minAtkurl = encodeURI(
    URL +
      "?mon=" +
      mon +
      "&r=" +
      limit +
      "&cp=" +
      league +
      "&f=" +
      floor +
      "&min=" +
      minLvl +
      "&max=" +
      maxLvl +
      "&set=" +
      ranks.minAtk.aIV +
      "_" +
      ranks.minAtk.dIV +
      "_" +
      ranks.minAtk.sIV
  );
  var minDefurl = encodeURI(
    URL +
      "?mon=" +
      mon +
      "&r=" +
      limit +
      "&cp=" +
      league +
      "&f=" +
      floor +
      "&min=" +
      minLvl +
      "&max=" +
      maxLvl +
      "&set=" +
      ranks.minDef.aIV +
      "_" +
      ranks.minDef.dIV +
      "_" +
      ranks.minDef.sIV
  );
  var minHPurl = encodeURI(
    URL +
      "?mon=" +
      mon +
      "&r=" +
      limit +
      "&cp=" +
      league +
      "&f=" +
      floor +
      "&min=" +
      minLvl +
      "&max=" +
      maxLvl +
      "&set=" +
      ranks.minHP.aIV +
      "_" +
      ranks.minHP.dIV +
      "_" +
      ranks.minHP.sIV
  );

  var step = 1 / Math.pow(10, dec);

  var ranges =
    "<br />Atk &ge; <input type='number' step=" +
    step +
    " id='atkVal' min=" +
    numOut(minAtk, dec) +
    " max=" +
    numOut(maxAtk, dec) +
    " value=" +
    mA +
    " onchange='atkRange.value=this.value;mA=this.value;filterAdjusted();'> <a href=" +
    minAtkurl +
    ">" +
    numOut(minAtk, dec) +
    "</a><input type='range' id='atkRange' min=" +
    numOut(minAtk, dec) +
    " max=" +
    numOut(maxAtk, dec) +
    " value=" +
    mA +
    " onchange='atkVal.value=this.value;mA=this.value;filterAdjusted();'><a href=" +
    maxAtkurl +
    ">" +
    numOut(maxAtk, dec) +
    "</a><br>";
  ranges +=
    "Def &ge; <input type='number' step=" +
    step +
    " id='defVal' min=" +
    numOut(minDef, dec) +
    " max=" +
    numOut(maxDef, dec) +
    " value=" +
    mD +
    " onchange='defRange.value=this.value;mD=this.value;filterAdjusted();'> <a href=" +
    minDefurl +
    ">" +
    numOut(minDef, dec) +
    "</a><input type='range' id='defRange' min=" +
    numOut(minDef, dec) +
    " max=" +
    numOut(maxDef, dec) +
    " value=" +
    mD +
    " onchange='defVal.value=this.value;mD=this.value;filterAdjusted();'><a href=" +
    maxDefurl +
    ">" +
    numOut(maxDef, dec) +
    "</a><br>";
  ranges +=
    "HP &ge; <input type='number' step='1' min=" +
    ranks.minHP.value +
    " max=" +
    ranks.maxHP.value +
    " id='hpVal' value=" +
    mHP +
    " onchange='hpRange.value=this.value;mHP=this.value;filterAdjusted();'> <a href=" +
    minHPurl +
    ">" +
    ranks.minHP.value +
    "</a><input type='range' id='hpRange' min=" +
    ranks.minHP.value +
    " max=" +
    ranks.maxHP.value +
    " value=" +
    mHP +
    " onchange='hpVal.value=this.value;mHP=this.value;filterAdjusted();'><a href=" +
    maxHPurl +
    ">" +
    ranks.maxHP.value +
    "</a><br />";

  /*compute trade percentages*/
  var trades = "";
  var searchLink = "";
  var statProd = html.split("</td></tr><tr><td>")[0];
  if (
    gmRhtml !== "" &&
    statProd !== null &&
    aIV[aIV.length - 1] &&
    dIV[aIV.length - 1] &&
    sIV[aIV.length - 1]
  ) {
    statProd = statProd.split("</td><td>");
    statProd = statProd[statProd.length - 1];

    /* Generate Search String links for each IV set, formatted like: https://pvpivs.com/searchStr.html?mon=Togedemaru&cp=1500&r=15_f_f&set=10100*/
    if (!filterMod) {
      for (let i = 0; i < rIV.length; i++) {
        searchLink +=
          "<p><a href='https://pvpivs.com/searchStr.html?mon=" +
          mon +
          "&cp=" +
          league +
          "&r=" +
          rIV[i] +
          "&set=10100'>Generate " +
          mon +
          " Search String to Trash below Rank " +
          rIV[i] +
          "</a></p>";
      }
    }
  } else {
  }

  /* Print out link to custom IV Search String if any ranks were filtered out*/
  if (filterMod) {
    var searchMon = mon;
    var value = pokeListObj[mon].split(",");
    /* Trim trailing comma off string */
    outIVs = outIVs.replace(/,\s*$/, "");
    /* Ensure that mon is a base form, if not find the base form! */
    if (!value[0].includes("b")) {
      /* Not a base form, check evolutions */
      var monFamilyNames = value.slice(4, value.length);
      for (let i = 0; i < monFamilyNames.length; i++) {
        if (pokeListObj[monFamilyNames[i]].split(",")[0].includes("b")) {
          /*console.log("Found the base mon! "+pokeListObj[monFamilyNames[i]].split(",")[0]+", setting searchMon="+monFamilyNames[i]);*/
          searchMon = monFamilyNames[i];
        }
      }
    }
    searchLink +=
      "<p><a href='https://www.pvpivs.com/searchStr.html?mon=" +
      searchMon +
      "&cp=" +
      league +
      "&o=000011&IVentry=" +
      outIVs +
      "'>Generate " +
      searchMon +
      " Search String for only these filtered IVs</a></p>";
  }

  if (perfTiming) {
    T1 = performance.now();
    console.log(
      mon +
        " outputUserRanks: " +
        (T1 - T0).toFixed(1) +
        "ms (CMP " +
        (Tc - T0).toFixed(1) +
        "ms +IVs " +
        (Ti - Tc).toFixed(1) +
        "ms + Rows " +
        (Tr - Ti).toFixed(1) +
        "ms) for " +
        ranks.numRanks +
        " ranks."
    );
    document.getElementById("timing_outputs").innerHTML +=
      "outputUserRanks: " +
      (T1 - T0).toFixed(1) +
      "ms (CMP " +
      (Tc - T0).toFixed(1) +
      "ms +IVs " +
      (Ti - Tc).toFixed(1) +
      "ms + Rows " +
      (Tr - Ti).toFixed(1) +
      "ms) for " +
      ranks.numRanks +
      " ranks.<br>";
  }
  return [printLimit, pokemonRank];
}
