/*UL mantine */
var mantineUL = [
    {iv: "15/15/15", lvl: 51},
    {iv: "15/14/15", lvl: 51},
    {iv: "15/15/14", lvl: 51},
];

var mantineIvsUL = mantineUL.map(function(item){
    return item.iv
});

var mantineLvlsUL = mantineUL.map(function(item){
    return item.lvl
});


/*GL mantine */
var mantineGL = [
    {iv: "0/15/14", lvl: 27.5},
    {iv: "0/15/13", lvl: 27.5},
    {iv: "0/13/15", lvl: 27.5},
    {iv: "1/13/13", lvl: 27.5},
    {iv: "0/12/10", lvl: 28},
    {iv: "0/8/13", lvl: 28},
    {iv: "0/6/14", lvl: 28},
    {iv: "0/14/14", lvl: 27.5},
    {iv: "0/14/13", lvl: 27.5},
    {iv: "0/12/15", lvl: 27.5},
    {iv: "2/15/15", lvl: 27},
    {iv: "1/14/12", lvl: 27.5},
    {iv: "1/12/14", lvl: 27.5},
    {iv: "1/12/13", lvl: 27.5},
    {iv: "1/10/15", lvl: 27.5},
    {iv: "3/15/13", lvl: 27},
    {iv: "3/13/15", lvl: 27},
    {iv: "0/15/7", lvl: 28},
    {iv: "0/13/9", lvl: 28},
    {iv: "0/11/10", lvl: 28},
    {iv: "2/14/10", lvl: 27.5},
    {iv: "0/9/12", lvl: 28},
    {iv: "2/10/13", lvl: 27.5},
    {iv: "0/7/13", lvl: 28},
    {iv: "0/15/12", lvl: 27.5},
    {iv: "0/5/15", lvl: 28},
    {iv: "0/5/14", lvl: 28},
    {iv: "1/13/7", lvl: 28},
    {iv: "0/13/14", lvl: 27.5},
    {iv: "0/13/13", lvl: 27.5},
];

var mantineIvsGL = mantineGL.map(function(item){
    return item.iv
});

var mantineLvlsGL = mantineGL.map(function(item){
    return item.lvl
});

/*LC mantine */
var mantineLC = [
    {iv: "3/15/15", lvl: 9},
    {iv: "4/13/15", lvl: 9},
    {iv: "0/12/5", lvl: 9.5},
    {iv: "3/14/15", lvl: 9},
    {iv: "0/5/10", lvl: 9.5},
    {iv: "0/15/3", lvl: 9.5},
    {iv: "4/12/15", lvl: 9},
    {iv: "0/8/8", lvl: 9.5},
    {iv: "2/15/15", lvl: 9},
    {iv: "4/15/13", lvl: 9},
    {iv: "5/10/15", lvl: 9},
    {iv: "0/11/6", lvl: 9.5},
    {iv: "0/11/5", lvl: 9.5},
    {iv: "3/13/15", lvl: 9},
    {iv: "0/1/13", lvl: 9.5},
    {iv: "5/13/13", lvl: 9},
    {iv: "0/4/11", lvl: 9.5},
    {iv: "0/4/10", lvl: 9.5},
    {iv: "1/9/5", lvl: 9.5},
    {iv: "0/14/4", lvl: 9.5},
    {iv: "0/14/3", lvl: 9.5},
    {iv: "4/11/15", lvl: 9},
    {iv: "0/7/9", lvl: 9.5},
    {iv: "0/7/8", lvl: 9.5},
    {iv: "2/14/15", lvl: 9},
    {iv: "1/2/10", lvl: 9.5},
    {iv: "1/12/3", lvl: 9.5},
    {iv: "4/14/14", lvl: 9},
    {iv: "4/14/13", lvl: 9},
    {iv: "5/9/15", lvl: 9},
];

var mantineIvsLC = mantineLC.map(function(item){
    return item.iv
});

var mantineLvlsLC = mantineLC.map(function(item){
    return item.lvl
});


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
        if (currentPokemon.attack>= 1 || currentPokemon.defence >= 1 || currentPokemon.stamina >= 1 ) {
            hasValidStats = true;
            if (currentPokemon.attack== -1) {
                currentPokemon.attack = 0;
            }
            if (currentPokemon.defence== -1) {
                currentPokemon.defence = 0;
            }
            if (currentPokemon.stamina== -1) {
                currentPokemon.stamina = 0;
            }
        }

        var ivPercentage = (currentPokemon.attack + currentPokemon.defence + currentPokemon.stamina) / 45 * 100;
        var marker = markers[i];

        var min_iv_compare = min_iv;

        //to let unknown iv show
        if (min_iv == 0) {
            min_iv_compare = -100;
        }

        if ((ivPercentage >= min_iv_compare && hasValidStats) || shouldTurnFilterOff()) {
            var isDesiredPokemon = false;
            var statsString = currentPokemon.attack+ "/"+ currentPokemon.defence +"/"+currentPokemon.stamina;

            if (currentPokemon.id==226) {

                var index = mantineIvsGL.indexOf(statsString);
                var pvpString = "";
                if (index != -1) {
                    //found. check level
                    targetPokemonLevel = mantineLvlsGL[index];
                    if (currentPokemon.level < targetPokemonLevel)
                    {
                        isDesiredPokemon = true;
                        pvpString = "GL #" + (index+1);
                    }
                }

                index = mantineIvsUL.indexOf(statsString);
                if (index!= -1) {
                    targetPokemonLevel = mantineLvlsUL[index];
                    if (currentPokemon.level < targetPokemonLevel)
                    {
                        //found
                        if (isDesiredPokemon) {
                            pvpString += ", "
                        }
                        isDesiredPokemon = true;
                        pvpString += "UL #" + (index+1);
                    }
                }

                index = mantineIvsLC.indexOf(statsString);
                if (index!= -1) {
                    targetPokemonLevel = mantineLvlsLC[index];
                    if (currentPokemon.level < targetPokemonLevel)
                    {
                        //found
                        if (isDesiredPokemon) {
                            pvpString += ", "
                        }
                        isDesiredPokemon = true;
                        pvpString += "LC #" + (index+1);
                    }
                }

                currentPokemon.pvptype = pvpString;

            }

            if (isDesiredPokemon) {
                if (!marker._map) {
                    marker.addTo(map);
                }
            }
            else {
                if (marker._map) {
                    marker.removeFrom(map);
                }
            }
        }
        else {
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
                $(tmpMarker._icon).find('.pokemon_icon_timer').html(timeToString(pokemons[i].remainingTime()));
            }
        }
    }
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
    if (pokemon.attack>= 1 || pokemon.defence >= 1 || pokemon.stamina >= 1 ) {
        if (pokemon.attack== -1) {
            pokemon.attack = 0;
        }
        if (pokemon.defence== -1) {
            pokemon.defence = 0;
        }
        if (pokemon.stamina== -1) {
            pokemon.stamina = 0;
        }
    }

    if (pokemon.attack != -1 && pokemon.defence != -1 && pokemon.stamina != -1 && pokemon.move1 != -1 && pokemon.move2 != -1 && pokemon.cp != -1) {
        ivString = "<b>L30+ IV:</b> "+ pokemon.attack + " | " + pokemon.defence + " | " + pokemon.stamina + " (" + Math.floor((pokemon.attack + pokemon.defence + pokemon.stamina)/45 * 100) + "%)<br />";
        movesetString = "<b>L30+ Moveset:</b><br />" + getMoveName(pokemon.move1) + " | " + getMoveName(pokemon.move2) + "<br />";
        cpString = "<b>L30+ CP:</b> " + pokemon.cp + " (Level: " + pokemon.level + ")<br /><br />";
    }

    return '<b>' + getPokemonName(pokemon) + disguiseString + genderString + formString + "</b><br />" + (pokemon.pvptype ?   pokemon.pvptype + "</b><br /><br />" : "") + weatherString + ivString + movesetString + cpString + timeToString(pokemon.remainingTime()) + '<br /><br /><a target="_blank" href="https://maps.google.com/maps?q=' + pokemon.center.lat + ',' + pokemon.center.lng + '">Maps</a><br /><br /><a href="faq.html#approximately_timer" target="_blank">(Approximately Despawn Time)</a>';
}
