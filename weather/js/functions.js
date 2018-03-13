/* *************************************
 *  Weather Site JavaScript Functions
 ************************************* */

/*console.log('My javascript is being read.'); */

// Variables for Function Use

const temp = 31;
const speed = 5;
buildWC(speed, temp);
const direction = "WSW";
windDial(direction);
const WEATHER = "mist";
let curWeatherImage = getCondition(WEATHER);
changeSummaryImage(curWeatherImage);

/* This function calculates a wind chill temperature */
function buildWC(speed, temp) {

    const feelTemp = document.getElementById('feels');

    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);

    // Round the answer down to integer
    wc = Math.floor(wc);

    // If chill is greater than temp, return the temp
    wc = (wc > temp) ? temp : wc;

    // Display the windchill
    console.log(wc);
    wc = 'Feels like ' + wc + '&deg;F';
    feelTemp.innerHTML = wc;

}


// Wind Dial Function
function windDial(direction) {
    // Get the container
    const dial = document.getElementById("dial");
    console.log(direction);

    /* ***********************************************
            EXTRA - I created one extra line
            to change the direction label
    ************************************************ */
    const labelDirection =document.getElementById("directionLabel");

    // Determine the dial class
    switch (direction) {
        case "North":
        case "N":
            dial.setAttribute("class", "n"); //"n" is the CSS rule selector
/**EXTRA**/ labelDirection.innerHTML = "N";
            break;
        case "NE":
        case "NNE":
        case "ENE":
            dial.setAttribute("class", "ne");
/**EXTRA**/ labelDirection.innerHTML = "NE";
            break;
        case "NW":
        case "NNW":
        case "WNW":
            dial.setAttribute("class", "nw");
/**EXTRA**/ labelDirection.innerHTML = "NW";
            break;
        case "South":
        case "S":
            dial.setAttribute("class", "s");
/**EXTRA**/ labelDirection.innerHTML = "S";
            break;
        case "SE":
        case "SSE":
        case "ESE":
            dial.setAttribute("class", "se");
/**EXTRA**/ labelDirection.innerHTML = "SE";
            break;
        case "SW":
        case "SSW":
        case "WSW":
            dial.setAttribute("class", "sw");
/**EXTRA**/ labelDirection.innerHTML = "SW";
            break;
        case "East":
        case "E":
            dial.setAttribute("class", "e");
/**EXTRA**/ labelDirection.innerHTML = "E";
            break;
        case "West":
        case "W":
            dial.setAttribute("class", "w");
/**EXTRA**/ labelDirection.innerHTML = "W";
            break;
    }

}

/* **********************************
 JavaScript Introduction Assessment
*********************************** */

//Write the getCondition function.
function getCondition(WEATHER) {

    if (WEATHER.includes('blue sky') || WEATHER.includes('sunny') || WEATHER.includes('just sun') || WEATHER.includes('clear sky')) {
        return "clear";
    } else if (WEATHER.includes("partly cloudy") || WEATHER.includes("clouds on the sky") || WEATHER.includes('clouds')) {
        return "clouds";
    } else if (WEATHER.includes('mist') || WEATHER.includes('foggy') || WEATHER.includes('smog') || WEATHER.includes('haze')) {
        return "fog";
    } else if (WEATHER.includes('rainning') || WEATHER.includes('wet wheather') || WEATHER.includes('flood') || WEATHER.includes('precipitation')) {
        return "rain";
    } else(WEATHER.includes('snowstorm') || WEATHER.includes('snowing') || WEATHER.includes('blizzard') || WEATHER.includes('snowfall'))
    return "snow";
}

//Write the changeSummaryImage() function.
function changeSummaryImage(curWeatherImage) {
    const BACKGROUNDWEATHER = document.getElementById("curWeather");
    console.log(curWeatherImage);

    // Determine the background image class
    switch (curWeatherImage) {

        case "clear":
            BACKGROUNDWEATHER.setAttribute("class", "clear");
            break;

        case "clouds":
            BACKGROUNDWEATHER.setAttribute("class", "clouds");
            break;

        case "fog":
            BACKGROUNDWEATHER.setAttribute("class", "fog");
            break;

        case "rain":
            BACKGROUNDWEATHER.setAttribute("class", "rain");
            break;

        case "snow":
            BACKGROUNDWEATHER.setAttribute("class", "snow");
            break;

    }
}
