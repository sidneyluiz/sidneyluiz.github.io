/* *************************************
*  Weather Site JavaScript Functions
************************************* */

/*console.log('My javascript is being read.'); */


/* This function calculates a wind chill temperature */
function buildWC(speed, temp) {

    let feelTemp = document.getElementById('feels');

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



    if (weather.includes('Clear') || weather.includes('Mostly Sunny') || weather.includes('Partly Sunny') || weather.includes('Sunny')) {
        return "clear";
    } else if (weather.includes("Partly Cloudy") || weather.includes("Funnel Cloud") || weather.includes('Mostly Cloudy') || weather.includes('Overcast') || weather.includes('Cloudy')) {
        return "clouds";
    } else if (weather.includes('Fog') || weather.includes('Patches of Fog') || weather.includes('Shallow Fog') || weather.includes('Partial Fog') || weather.includes('Smoke') || weather.includes('Light Smoke') || weather.includes('Heavy Smoke') || weather.includes('Light Fog') || weather.includes('Heavy Fog') || weather.includes('Haze')) {
        return weather = "fog";
    } else if (weather.includes('Rain') || weather.includes('Light Rain') || weather.includes('Heavy Rain') || weather.includes('Drizzle') || weather.includes('Light Drizzle') || weather.includes('Heavy Drizzle') || weather.includes('Thunderstorm') || weather.includes('Thunderstorms')) {
        return "rain";
    } else(weather.includes('Snow') || weather.includes('Heavy Snow') || weather.includes('Blizzard') || weather.includes('Snow Grains') || weather.includes('Light Snow') || weather.includes('Light Snow Grains') || weather.includes('Heavy Snow Grains') || weather.includes('Snow Grains') || weather.includes('Ice Crystals') || weather.includes('Light Ice Crystals') || weather.includes('Heavy Ice Crystals') || weather.includes('Ice Pellets') || weather.includes('Light Ice Pellets'))
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
    const URL = "https://api.wunderground.com/api/" + WU_API_KEY + "/conditions/forecast/hourly/q/" + LOCALE + ".json";
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
    let ct = Math.round(temp)+'&deg;F';
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
    let high = data.forecast.simpleforecast.forecastday["0"].high.fahrenheit;
    console.log(high);
    //Low Temperature
    let low = data.forecast.simpleforecast.forecastday["0"].low.fahrenheit;
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
    //call meteres to feet
    metersToFeet(elevation);
    //Display Elevation
    let idElevation = document.getElementById('elevation');
    idElevation.innerHTML = metersToFeet(elevation) + ' ft.';

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

    //title video
    let titleVideo = data.current_observation.weather;
    console.log(titleVideo);
    //Display Laberl Viode
    let labelVideo = document.getElementById('hVideo');
    labelVideo.innerHTML = titleVideo;

    //Video Icon
    let videoIcon = data.current_observation.icon_url;
    console.log(videoIcon);
    //Display Video Icon
    let imgVideo = document.getElementById('imgVideo');
    imgVideo.src = videoIcon;


    //Weather credit Icon
    let creditIcon = data.current_observation.image.url;
    console.log(creditIcon);
    //Display Weather credit Icon
    let imgCreIcon = document.getElementById('imgCreIcon');
    imgCreIcon.src = creditIcon;

    //Hourly Forecast
    let hourlyTemp = [];
    for (let i=0; i<24; i++){
    hourlyTemp[i] = data.hourly_forecast[i].temp.english;
    console.log(hourlyTemp);
    }

    //Hourly Temp Display
    let zero = document.getElementById("zero");
    zero.innerHTML = hourlyTemp[0]+'&deg;F';
    let one = document.getElementById("one");
    one.innerHTML = hourlyTemp[1]+'&deg;F';
    let two = document.getElementById("two");
    two.innerHTML = hourlyTemp[2]+'&deg;F';
    let three = document.getElementById("three");
    three.innerHTML = hourlyTemp[3]+'&deg;F';
    let four = document.getElementById("four");
    four.innerHTML = hourlyTemp[4]+'&deg;F';
    let five = document.getElementById("five");
    five.innerHTML = hourlyTemp[5]+'&deg;F';
    let six = document.getElementById("six");
    six.innerHTML = hourlyTemp[6]+'&deg;F';
    let seven = document.getElementById("seven");
    seven.innerHTML = hourlyTemp[7]+'&deg;F';
    let eight = document.getElementById("eight");
    eight.innerHTML = hourlyTemp[8]+'&deg;F';
    let nine  = document.getElementById("nine");
    nine.innerHTML = hourlyTemp[9]+'&deg;F';
    let ten = document.getElementById("ten");
    ten.innerHTML = hourlyTemp[10]+'&deg;F';
    let eleven = document.getElementById("eleven");
    eleven.innerHTML = hourlyTemp[11]+'&deg;F';
    let twelve = document.getElementById("twelve");
    twelve.innerHTML = hourlyTemp[12]+'&deg;F';
    let thirteen = document.getElementById("thirteen");
    thirteen.innerHTML = hourlyTemp[13]+'&deg;F';
    let fourteen = document.getElementById("fourteen");
    fourteen.innerHTML = hourlyTemp[14]+'&deg;F';
    let fifteen = document.getElementById("fifteen");
    fifteen.innerHTML = hourlyTemp[15]+'&deg;F';
    let sixteen = document.getElementById("sixteen");
    sixteen.innerHTML = hourlyTemp[16]+'&deg;F';
    let seventeen = document.getElementById("seventeen");
    seventeen.innerHTML = hourlyTemp[17]+'&deg;F';
    let eighteen = document.getElementById("eighteen");
    eighteen.innerHTML = hourlyTemp[18]+'&deg;F';
    let nineteen = document.getElementById("nineteen");
    nineteen.innerHTML = hourlyTemp[19]+'&deg;F';
    let twenty = document.getElementById("twenty");
    twenty.innerHTML = hourlyTemp[20]+'&deg;F';
    let twentyOne = document.getElementById("twentyOne");
    twentyOne.innerHTML = hourlyTemp[21]+'&deg;F';
    let twentyTwo = document.getElementById("twentyTwo");
    twentyTwo.innerHTML = hourlyTemp[22]+'&deg;F';
    let twentyThree = document.getElementById("twentyThree");
    twentyThree.innerHTML = hourlyTemp[23]+'&deg;F';

    //Insert favicon of weather condition
    document.querySelector("link[rel='shortcut icon']").href = videoIcon;

    //display content once everything is loaded.
    showContent();
}

//convert meters to feet
function metersToFeet(elevation) {
    let feet = Math.round(elevation/0.3048);
    return feet;
}

//Remove status and show content
function showContent(){
    //hide status
    let idStatus = document.getElementById('status');
    idStatus.setAttribute('class','hide');
    //show loaded content
    let hide = document.getElementById("content");
    hide.setAttribute("class", "show");
}
