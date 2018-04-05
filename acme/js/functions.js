
getData();

function getData()
{
    fetch("/acme/js/acme.json")
        .then(response => response.json())
        .then(function (data) {
        //console.log(data);
        navContent(data);
        })
        .catch(error => console.log('Error: ', error))
}

function navContent(data)
{
    let options = document.getElementById("nav_opt");
    let navList = "<li><a href=\"\" title=\"Homepage\">Home</a></li>"
    let navDisplay = ["Anvils", "Explosives", "Decoys", "Traps"];
    //console.log(data.Explosives);
    for (let i = 0; i < navDisplay.length; i++) {
        navList += "<li id=\"" + data[navDisplay[i]].display + "\" >" + data[navDisplay[i]].display + "</li>";
    }
    options.innerHTML = navList;
    //console.log(options.innerHTML);
    addEventeListenersToList(data, navDisplay);

}
function addEventeListenersToList(data, navDisplay){
    var anvil = document.getElementById("Anvil");
    var explosive = document.getElementById("TNT");
    var decoy = document.getElementById("Decoy");
    var trap = document.getElementById("Trap");
    var aux = [anvil, explosive, decoy,trap];
    for (let i = 0; i < aux.length; i++) {
      aux[i].addEventListener("click", function(){show(data, navDisplay, i)});
    }
}

function show(data, navDisplay, i)
{
    toogle();
    let name = document.getElementById("name");
    let image = document.getElementById("image");
    let description = document.getElementById("desc");
    let manufacturer = document.getElementById("manuf");
    let price = document.getElementById("price");
    let review = document.getElementById("review");

    name.innerHTML = data[navDisplay[i]].name;
    image.setAttribute("src", data[navDisplay[i]].path);
    description.innerHTML = data[navDisplay[i]].description;
    manufacturer.innerHTML = data[navDisplay[i]].manufacturer;
    price.innerHTML = "Price: " + data[navDisplay[i]].price;
    review.innerHTML = data[navDisplay[i]].reviews;

}
function toogle(){
    let princ = document.getElementById("princ");
    let productContent = document.getElementById("contentInfo");

    princ.setAttribute("class", "hide");
    productContent.setAttribute("class", "show");

}
