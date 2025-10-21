// load scripts
var overlayGrey;

L.GridLayer.OverlayGrey = L.GridLayer.extend({
  createTile: function (e) {
    var i = document.createElement("div");
    return (i.style.background = "#000000"), i;
  },
});

var isOverlay = false;
function toggleOverlay() {
  if (isOverlay) {
    if (overlayGrey) {
      map.removeLayer(overlayGrey);
    }
    isOverlay = false;
    $("#map").removeClass("grey");
  } else {
    isOverlay = true;
    overlayGrey = new L.GridLayer.OverlayGrey();
    overlayGrey.setOpacity(0.6);
    map.addLayer(overlayGrey);
    $("#map").addClass("grey");
  }
}

if (typeof isFirstTime === "undefined") {
  var isFirstTime = true;
}

$("#close_donation_button").click();
$(".toast-close-button").click();
$("#overlay").hide();
$("#topbar").hide();
$(".please").hide();
$("#map").css({
    width: "100vw",
    height: "100vh",
    top: 0,
    bottom: 0
});
$(window).resize(function () {
  $("#map").css({
    width: "100vw",
    height: "100vh",
  });
});

var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i);

if (isMobile) {
    $(".leaflet-control-zoom").css("display", "none");
    $("#custom_panel").css("top", "10px");
}

if (isFirstTime) {
  $("body").append(
    '<style>#custom_panel{position:absolute;top:80px;left:10px;z-index:800}.custom_i{border-radius:40px;background-color:white;width:40px;height:40px;display:flex;align-items:center;justify-content:center;box-shadow:-1px 1px #999;margin-bottom:10px}#mon_filter{margin-left:10px}.pokemon_icon_img.iv_perfect{-webkit-filter:drop-shadow(3px 3px 3px red);filter:drop-shadow(3px 3px 5px red);transform:scale(1.3,1.3);transform-origin:0 0}.pokemon_icon_img.iv90{-webkit-filter:drop-shadow(3px 3px 3px blue);filter:drop-shadow(3px 3px 3px blue);transform:scale(1.3,1.3);transform-origin:0 0}.pokemon_icon_img.iv80{-webkit-filter:drop-shadow(3px 3px 3px purple);filter:drop-shadow(3px 3px 3px purple)}#map.grey .pokemon_icon_img.iv_perfect{-webkit-filter:drop-shadow(3px 3px 3px #ff1493);filter:drop-shadow(3px 3px 5px #ff1493)}#map.grey .pokemon_icon_img.iv90{-webkit-filter:drop-shadow(3px 3px 3px #00bfff);filter:drop-shadow(3px 3px 3px #00bfff)}#map.grey .pokemon_icon_img.iv80{-webkit-filter:drop-shadow(3px 3px 3px #F4D03F);filter:drop-shadow(3px 3px 3px #F4D03F)}</style> <div id="custom_panel"> <div id="filter_icon" class="custom_i"> <svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="#999" d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" /></svg> </div> <div id="darken_icon" class="custom_i"> <svg style="width:24px;height:24px" viewBox="0 0 24 24"> <path fill="#999" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z" /></svg> </div> </div>'
  );
  $("#filter_label").after(
    '<div id="pvp_filter"><input type="checkbox" id="pvp_filter_check" name="pvp_filter_check"><label for="pvp_filter_check">PvP</label> <input id="pvp_top_number" type="search" placeholder="PvP Top Ranks" value="30"/><div id="pvp_filter_list"></div></div>'
  );
  $("body").append(
    "<style>#pvp_filter {padding: 10px;} #pvp_filter_list {display:none; border: 1px solid #ccc; margin: 10px 100px 10px 0; padding: 10px;} .pvp_mon_checkbox {margin-bottom: 10px;} pvp_mon_checkbox:last {margin-bottom: 0px;} .pvp_iv_list_rank {display: block; clear: both;} .pvp_iv_hit_container {margin:0; padding:0;} #pvp_top_number {width: 100px}</style>"
  );
  perfTiming = false;
  isFirstTime = false;
}
var isFilterPvP = false;
var isForcePvpRecompute = false;
var checkedPokemons = [];
var ivsCheckList = [];
var ivsArrMax = 30;

$("#pvp_filter_check").on("change", function () {
  isFilterPvP = $(this).prop("checked") ? true : false;
  isForcePvpRecompute = true;

  if (isFilterPvP) {
    $("#pvp_filter_list").show();
  } else {
    $("#pvp_filter_list").hide();
  }
});
$("#filter_settings").css("top", "10px"), $("#locate").css("top", "10px");
$("#filter_icon").on("click", function () {
  $("#filter_link").click();
});
$("#darken_icon").on("click", function () {
  toggleOverlay();
});

function updateCheckedPokemons() {
  var pvpPokeArray = [];
  var pvpPokeIdEvoMap = {};
  for (var i = 0; i < pokeArray.length; ++i) {
    var pokemon = pokeArray[i];
    if (isPokemonChecked(pokemon["i"])) {
      var pokeName = pokemon["n"];
      //handle exceptions
      switch (pokeName) {
        case "Nidoran♀":
          pokeName = "Nidoran_Female";
          break;
        case "Nidoran♂":
          pokeName = "Nidoran_Male";
          break;
      }
      pvpPokeArray.push({
        name: pokeName,
        id: pokemon["i"],
      });
    }
  }
  checkedPokemons = pvpPokeArray;

  pvpPokeArray.forEach(function (mon) {
    monName = mon["name"];
    monId = mon["id"];
    var evoNameArr = [];
    var evos = pokeListObj[monName].split(",").slice(4, pokeListObj[monName].split(",").length);
    evoNameArr.push(monName);
    evoNameArr = evoNameArr.concat(evos);
    pvpPokeIdEvoMap[monId] = evoNameArr;
  });

  var pvpFilterList = $("#pvp_filter_list");
  pvpFilterList.html("");
  Object.entries(pvpPokeIdEvoMap).forEach(function ([pokemonId, evoNameArr]) {
    evoNameArr.forEach(function (name) {
      var html = `<div class='pvp_mon_checkbox'>
				<div class="pvp_mon_name">${name}</div>
				<div class="league_selector">
				<input type='checkbox' id='${pokemonId}__${name}__LC' name='pvp_leage_selector' value='${pokemonId}__${name}__LC'><label for='${pokemonId}__${name}__LC'>LC</label>
				<input type='checkbox' id='${pokemonId}__${name}__GL' name='pvp_leage_selector' value='${pokemonId}__${name}__GL'><label for='${pokemonId}__${name}__GL'>GL</label>
				<input type='checkbox' id='${pokemonId}__${name}__UL' name='pvp_leage_selector' value='${pokemonId}__${name}__UL'><label for='${pokemonId}__${name}__UL'>UL</label>
				</div>
			</div>
			`;
      pvpFilterList.append(html);
    });
  });
  processLocalStoragePvPItems();
}

function processLocalStoragePvPItems() {
  var localStoredPvpSelectors = localStorage.getItem("pvpIvSelectors");
  if (localStoredPvpSelectors) {
    var pvpSelectors = JSON.parse(localStorage.getItem("pvpIvSelectors"));
    var checkedPokemonIds = checkedPokemons.map(function (element) {
      return element["id"];
    });

    let filteredArray = pvpSelectors.filter(function (pvp_leage_selector_params) {
      var [monId, monName, league] = pvp_leage_selector_params.split("__");
      if (checkedPokemonIds.indexOf(monId) != -1) {
        $(`#${pvp_leage_selector_params}`).prop("checked", true);
        return true;
      } 
      else {
        return false;
      }
    });
    localStorage.setItem("pvpIvSelectors", JSON.stringify(filteredArray));
  } else {
    localStorage.setItem("pvpIvSelectors", JSON.stringify([]));
  }
}

function getPvPIvs(monId, monName, league) {
    var cpLimit = 0;
  switch (league) {
    case "LC":
      cpLimit = 500;
      break;
    case "GL":
      cpLimit = 1500;
      break;
    case "UL":
      cpLimit = 2500;
      break;
  }

  // get the mon's attributes
  var monAttr = pokeListObj[monName].split(",").slice(1, 4).map(function (element) {
      return parseInt(element);
  });

  // calculate the IV list
  var calculatedArr = calculate(monAttr[0], monAttr[1], monAttr[2], 0, 0, 51, false, cpLimit, monName);

  // sort the stat product
  var statProductAtkKeys = Object.keys(calculatedArr);

  var regex = /(\d+)\.(\d+)/;
  var statProducts = [];
  var spToSpAtkKeyMap = {};

  statProductAtkKeys.forEach(function (key) {
    var match = key.match(regex);
    if (match !== null) {
      statProducts.push(parseInt(match[1]));
      spToSpAtkKeyMap[match[1]] = key;
    }
  });

  statProducts.sort(function (a, b) {
    return b - a;
  });

  // init list
  var ivsArr = [];
  var pvpRank = 0;

  // loop the sorted statProducts, look up the actual list and form the top 50
  for (var i = 0; i < statProducts.length; i++) {
    var statProduct = statProducts[i];
    var spAtkKey = spToSpAtkKeyMap[statProduct];
    var data = calculatedArr[spAtkKey];

    var extractedData = data.map(function (item) {
      pvpRank++;
      return {
        atk: item.IVs.A,
        def: item.IVs.D,
        sta: item.IVs.S,
        iv: `${item.IVs.A}\/${item.IVs.D}\/${item.IVs.S}`,
        lvl: item.L,
        rank: pvpRank,
      };
    });

    if (ivsArr.length < ivsArrMax) {
      ivsArr = ivsArr.concat(extractedData);
    } else {
      break;
    }
  }

  return {
    pvpMonId: monId,
    name: `${monName} ${league}`,
    ivList: ivsArr,
  };
}

function updatePvpIvList() {
  // reset
  tmpIvList = [];
  isForcePvpRecompute = true;

  pvpIvStorage = [];

  $("input[name='pvp_leage_selector']:checked").each(function () {
    pvp_leage_selector_params = $(this).val();
    pvpIvStorage.push(pvp_leage_selector_params);

    var [monId, monName, league] = pvp_leage_selector_params.split("__");
    monId = parseInt(monId);

    tmpIvList.push(getPvPIvs(monId, monName, league));
  });
  ivsCheckList = tmpIvList;
  localStorage.setItem("pvpIvSelectors", JSON.stringify(pvpIvStorage));
}

isTmpFirst = true;

function refreshPokemons() {
  if (!shouldUpdate) {
    return; //don't update when map is moving
  }
  var toBeRemovedIndexes = [];
  var currentUnixTime = Math.floor(Date.now() / 1000) - timeOffset;
  for (var i = 0; i < pokemons.length; ++i) {
    var currentPokemon = pokemons[i];

    if (currentPokemon.despawn < currentUnixTime - 10 ||
      (!isPokemonChecked(currentPokemon.id) && !shouldTurnFilterOff())) {
      toBeRemovedIndexes.push(i);
    }

    if (currentPokemon.id == 854) {
      formString = getFormString(currentPokemon);
      if (formString != " - Antique") {
        toBeRemovedIndexes.push(i);
      }
    }

  }

  for (var i = toBeRemovedIndexes.length - 1; i >= 0; --i) {
    pokemons.splice(toBeRemovedIndexes[i], 1);
    var marker = markers[toBeRemovedIndexes[i]];
    marker.removeFrom(map);
    markers.splice(toBeRemovedIndexes[i], 1);
  }

  //remove low IV from map, add high IV to map
  for (var i = 0; i < pokemons.length; ++i) {
    var currentPokemon = pokemons[i];

    // fix to adjust for -1 attack, probably screen capture error
    var hasValidStats = false;
    if (
      currentPokemon.attack >= 1 ||
      currentPokemon.defence >= 1 ||
      currentPokemon.stamina >= 1
    ) {
      hasValidStats = true;
      if (currentPokemon.attack == -1) {
        currentPokemon.attack = 0;
      }
      if (currentPokemon.defence == -1) {
        currentPokemon.defence = 0;
      }
      if (currentPokemon.stamina == -1) {
        currentPokemon.stamina = 0;
      }
    }

    var ivPercentage = ((currentPokemon.attack + currentPokemon.defence + currentPokemon.stamina) / 45) * 100;
    var marker = markers[i];

    var min_iv_compare = min_iv;

    //to let unknown iv show
    if (min_iv == 0) {
      min_iv_compare = -100;
    }

    if (ivPercentage >= min_iv_compare || shouldTurnFilterOff()) {
      if (isFilterPvP) {
        // pvp starts here
        if (hasValidStats) {
          if (!currentPokemon.hasOwnProperty("isDesiredPokemon") | isForcePvpRecompute) {
            var isDesiredPokemon = false;

            // loop the ivs list
            var pvpString = "";

            for (var j = 0; j < ivsCheckList.length; j++) {
              ivsCheckItem = ivsCheckList[j];
              pvpMonId = ivsCheckItem["pvpMonId"];
              pvpCheckListName = ivsCheckItem["name"];
              pvpIvListArray = ivsCheckItem["ivList"];

              if (currentPokemon.id == pvpMonId) {
                for (var k = 0; k < pvpIvListArray.length; k++) {
                  pvpIvItem = pvpIvListArray[k];
                  if (
                    currentPokemon.attack == pvpIvItem.atk &&
                    currentPokemon.defence == pvpIvItem.def &&
                    currentPokemon.stamina == pvpIvItem.sta &&
                    currentPokemon.level <= pvpIvItem.lvl
                  ) {
                    isDesiredPokemon = true;
                    pvpString += `<div class="pvp_iv_list_rank">${pvpCheckListName} #${pvpIvItem.rank}</div>`;
                    break;
                  }
                }
              }
            }
            if (isDesiredPokemon) {
              currentPokemon.pvptype = `<div class="pvp_iv_hit_container">${pvpString}</div>`;
            }

            currentPokemon.isDesiredPokemon = isDesiredPokemon;
          }

          if (currentPokemon.isDesiredPokemon) {
            if (!marker._map) {
              marker.addTo(map);
            }
          } else {
            if (marker._map) {
              marker.removeFrom(map);
            }
          }
        } else {
          // no valid stats. remove
          if (marker._map) {
            marker.removeFrom(map);
          }
        }
      } else {
        // original code
        if (!marker._map) {
          marker.addTo(map);
        }
      }
    } else {
      if (marker._map) {
        marker.removeFrom(map);
      }
    }
  }

  if (shouldShowTimers()) {
    for (var i = 0; i < markers.length; ++i) {
      //only update for the ones in bounds
      var mapBounds = map.getBounds();
      var tmpMarker = markers[i];
      if (mapBounds.contains(tmpMarker.getLatLng())) {
        $(tmpMarker._icon)
          .find(".pokemon_icon_timer")
          .html(timeToString(pokemons[i].remainingTime()));
      }
    }
  }

  isForcePvpRecompute = false;
}

function infoWindowString(pokemon) {
  var disguiseString = "";
  if (pokemon.disguise != 0 && pokemon.disguise != -1) {
    disguiseString = " (" + getDisguisePokemonName(pokemon) + ")";
  }

  var genderString = getGenderString(pokemon);

  var formString = getFormString(pokemon);

  var ivString = "";

  var movesetString = "";

  var cpString = "";
  var weatherString = "";

  weatherString = "<a href='faq.html#weather'><b>Weather boost</b>: ";
  switch (pokemon.weather) {
    case 0:
      weatherString += "None<br /></a>";
      break;
    case 1:
      weatherString += "Clear<br /></a>";
      break;
    case 2:
      weatherString += "Rainy<br /></a>";
      break;
    case 3:
      weatherString += "Partly Cloudy<br /></a>";
      break;
    case 4:
      weatherString += "Cloudy<br /></a>";
      break;
    case 5:
      weatherString += "Windy<br /></a>";
      break;
    case 6:
      weatherString += "Snow<br /></a>";
      break;
    case 7:
      weatherString += "Fog<br /></a>";
      break;
    default:
      weatherString = "";
      break;
  }

  // fix to adjust for -1 attack, probably screen capture error
  if (pokemon.attack >= 1 || pokemon.defence >= 1 || pokemon.stamina >= 1) {
    if (pokemon.attack == -1) {
      pokemon.attack = 0;
    }
    if (pokemon.defence == -1) {
      pokemon.defence = 0;
    }
    if (pokemon.stamina == -1) {
      pokemon.stamina = 0;
    }
  }

  if (
    pokemon.attack != -1 &&
    pokemon.defence != -1 &&
    pokemon.stamina != -1 &&
    pokemon.move1 != -1 &&
    pokemon.move2 != -1 &&
    pokemon.cp != -1
  ) {
    ivString =
      "<b>L30+ IV:</b> " +
      pokemon.attack +
      " | " +
      pokemon.defence +
      " | " +
      pokemon.stamina +
      " (" +
      Math.floor(
        ((pokemon.attack + pokemon.defence + pokemon.stamina) / 45) * 100
      ) +
      "%)<br />";
    movesetString =
      "<b>L30+ Moveset:</b><br />" +
      getMoveName(pokemon.move1) +
      " | " +
      getMoveName(pokemon.move2) +
      "<br />";
    cpString =
      "<b>L30+ CP:</b> " +
      pokemon.cp +
      " (Level: " +
      pokemon.level +
      ")<br /><br />";
  }

  return (
    "<b>" +
    getPokemonName(pokemon) +
    disguiseString +
    genderString +
    formString +
    "</b><br />" +
    (pokemon.pvptype ? pokemon.pvptype + "</b><br /><br />" : "") +
    weatherString +
    ivString +
    movesetString +
    cpString +
    timeToString(pokemon.remainingTime()) +
    '<br /><br /><a target="_blank" href="https://maps.google.com/maps?q=' +
    pokemon.center.lat +
    "," +
    pokemon.center.lng +
    '">Maps</a><br /><br /><a href="faq.html#approximately_timer" target="_blank">(Approximately Despawn Time)</a>'
  );
}

// Function to handle script loading success
function handleScriptLoad(url, successCallback) {
  $.getScript(url, function (data, textStatus, jqxhr) {
    if (textStatus === "success") {
      console.log(`Successfully loaded script: ${url}`);
      loadedScriptsCount++; // Increment counter on success
      if (loadedScriptsCount === scriptUrls.length) {
        successCallback(); // Call onAllScriptsLoaded after all scripts load
      }
    } else {
      const error = new Error(`Failed to load script: ${url}`);
      console.error(error);
      // Handle the error appropriately
    }
  });
}

// Script URLs
const scriptUrls = [
  "https://pvpivs.com/includes/pokeListObj.js",
  "https://pvpivs.com/includes/calculate.js",
];

// Counter for loaded scripts
let loadedScriptsCount = 0;

// Load scripts sequentially and call onAllScriptsLoaded after all are loaded
scriptUrls.forEach((url) => handleScriptLoad(url, onAllScriptsLoaded));

// Define success and error handlers (optional)
function onAllScriptsLoaded() {
  console.log("All scripts loaded successfully");
  // Update checked Pokemons initially
  updateCheckedPokemons();

  // Event handler for filter checkboxes
  $(document).on(
    "change",
    ".filter_checkbox input[type='checkbox']",
    function () {
      updateCheckedPokemons();
    }
  );

  // Update PvP IV list initially
  updatePvpIvList();

  // Event handler for league selector
  $(document).on("change", "input[name='pvp_leage_selector']", function () {
    updatePvpIvList();
  });

  // Event handler for deselect all button
  $("#deselect_all_btn").click(function () {
    updateCheckedPokemons();
    updatePvpIvList();
  });

  // Event handler for top number input
  $("#pvp_top_number").on("change", function () {
    ivsArrMax = $(this).val();
    updatePvpIvList();
  });
}
