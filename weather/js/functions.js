/* *************************************
*  Weather Site JavaScript Functions
************************************* */

/*console.log('My javascript is being read.'); */

// Variables for Function Use

//const temp = 31;
//const speed = 5;
//buildWC(speed, temp);
//const direction = "WSW";
//windDial(direction);
//const WEATHER = "mist";
//changeSummaryImage(curWeatherImage);




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
    const labelDirection = document.getElementById("directionLabel");

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
function getCondition(weather) {



    if (weather.includes('blue sky') || weather.includes('sunny') || weather.includes('just sun') || weather.includes('clear sky')) {
        return "clear";
    } else if (weather.includes("partly cloudy") || weather.includes("clouds on the sky") || weather.includes('clouds')) {
        return "clouds";
    } else if (weather.includes('mist') || weather.includes('foggy') || weather.includes('smog') || weather.includes('haze')) {
        return weather = "fog";
    } else if (weather.includes('rain') || weather.includes('wet wheather') || weather.includes('flood') || weather.includes('precipitation')) {
        return "rain";
    } else(weather.includes('Snow') || weather.includes('Heavy Snow') || weather.includes('blizzard') || weather.includes('snowfall') || weather.includes('Light Snow'))
    return "snow";
}

//variable to grab weather
/*let weather = "mist";
console.log(weather);
getCondition(weather);
getCondition(weather);
console.log(weather);
let curWeatherImage = getCondition(weather);
console.log(curWeatherImage);
/*changeSummaryImage(curWeatherImage);
*/

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


// Get Data from API
function getData(LOCALE) {
    const WU_API_KEY = '75576a32a1a0330a';
    const URL = "https://api.wunderground.com/api/" + WU_API_KEY + "/almanac/conditions/forecast/hourly/q/" + LOCALE + ".json";
    fetch(URL)
        .then(response => response.json())
        .then(function (data) {
        console.log('Json object from getData function:');
        console.log(data);
        displayData(data);

    })
        .catch(error => console.log('There was an error: ', error))
} // end getData function

//display JSON data
function displayData(data){
    //weather condition
    let weather = data.current_observation.weather;
    console.log(weather);
    //change background based on the weather
    let curWeatherImage = getCondition(weather);
    changeSummaryImage(curWeatherImage);
    //Current temperature
    let temp = data.current_observation.temp_f;
    console.log(temp);
    //Display current temperature
    let curTemp = document.getElementById('tempRightNow');
    let ct = temp+'&deg;F';
    curTemp.innerHTML = ct;
    //Wind Speed
    let speed = data.current_observation.wind_mph;
    console.log(speed);
    //Display Speed
    let windSpeed = document.getElementById('speed');
    let spd = speed + ' mph';
    windSpeed.innerHTML = spd;
    //Feels Like Function
    buildWC(speed, temp);
    //Wind direction
    let direction = data.current_observation.wind_dir;
    console.log(direction);
    windDial(direction);
    //High Temperature
    let high = data.almanac.temp_high.normal.F;
    console.log(high);
    //Low Temperature
    let low = data.almanac.temp_low.normal.F;
    console.log(low);
    //Display High Temp
    let hot = document.getElementById('hot');
    hot.innerHTML = high+'&deg;F';
    //Display Low Temp
    let cold = document.getElementById('cold');
    cold.innerHTML = low+'&deg;F';
    //Gust
    let gust = data.current_observation.wind_gust_mph;
    console.log(gust);
    //Display Gust
    let mphGust = document.getElementById('gust');
    mphGust.innerHTML = gust+' mph';
    //Zip Code
    let zip = data.current_observation.display_location.zip;
    console.log(zip);
    //Display Zip
    let idZip = document.getElementById('zip');
    idZip.innerHTML = zip;
    //Elevation
    let elevation = data.current_observation.display_location.elevation;
    console.log(elevation);
    //Display Elevation
    let idElevation = document.getElementById('elevation');
    idElevation.innerHTML = elevation + ' ft.';
    //Location
    let lat = data.current_observation.display_location.latitude;
    console.log(lat);
    let long = data.current_observation.display_location.longitude;
    console.log(long);
    //Display location
    let loc = document.getElementById('location');
    loc.innerHTML = long + ' , ' + lat;
    //City and State
    let cityState = data.current_observation.display_location.full;
    console.log(cityState);
    //Display City and State
    let cityT = document.getElementById('cityStateT');
    cityT.innerHTML = cityState;
    let cityH = document.getElementById('cityStateH');
    cityH.innerHTML = cityState;
    //Hourly Forecast
    let am = data.hourly_forecast;
    console.log(am);

}


