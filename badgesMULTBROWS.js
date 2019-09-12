$(document).ready(function() {

//Function that finds the night duration of each promotion and selects the one we need to display badges on
function findNights() {
    //Save an array with the duration of the promotions seen on the page
    var nightArr = $(".itinerary-duration").map(function(){
    return this.innerText;
    }).get();

    //Save an array with only the number of nights, saving as an integer
    var nightNum = [];
    nightArr.map(function(elem) { return nightNum.push(elem.charAt(0))});
    nightNum = nightNum.map(Number);

    //Save an array with only those elements that fit the promotion criteria
    var indexNight = [];    
    nightNum.map(function(elem,i) { return (elem > 4 ? indexNight.push(i) : null)});

    //Of all the promotions of the page, we save the indexes of those that fit the duration promotion criteria
    return indexNight;
};

//Find the IDs of those promotions that fit the "Tour more" criteria
function selectIdsTour() {
    //Use the elements that fit the criteria
    var nightsArr = findNights();

    //Save an arrays of IDs of the list elements of the promotions on the page
    var idArr = $(".itinerary-search-results-list").find("li").map(function(){
        return this.id;
        }).get();

    //Save in a new array only the IDs that fit the "Tour" criteria
    var tourArr = [];
    nightsArr.map(function(elem) { return tourArr.push(idArr[elem])});

    return tourArr;
};

//Function that finds the price of each promotion and selects the one we need to display badges on
function findPrices() {
    //Save an array with the prices of the promotions seen on the page
    var priceArr= $(".price-value").map(function(){
    return this.innerText;
    }).get();
    //Save the numbers as integers
    var numArr = priceArr.map(Number);

    //Save an array with only those elements that fit the promotion criteria
    var indexPrice = [];
    numArr.map(function(elem, i) {return (elem < 250 ? indexPrice.push(i) : null)});

     //Of all the promotions of the page, we save the indexes of those that fit the price promotion criteria
    return indexPrice;
};

//Find the IDs of those promotions that fit the "Save 30%" criteria
function selectIdsDiscount() {    
    //Use the elements that fit the criteria
    var pricesArr = findPrices();

    //Save an arrays of IDs of the list elements of the promotions on the page
    var idArr = $(".itinerary-search-results-list").find("li").map(function(){
        return this.id;
        }).get();

    //Save in a new array only the IDs that fit the "Save 30%" criteria
    var discArr = [];
    pricesArr.map(function(elem,i) {return  discArr.push(idArr[i])});

    return discArr;
};

//Helper function to remove elements from array
function arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
};
        
//Function to remove IDs where the price is less than $250 but the nights are over 4
function finalComparison() {
    var tourArr = selectIdsTour();
    var newPriceArr = selectIdsDiscount();
    //Compare both criteria arrays and remove from the prices array the ones that occur also in the tour more array
    tourArr.map(function (elem) { return (newPriceArr.includes(elem) ? newPriceArr = arrayRemove(newPriceArr, elem) : null)});

    return newPriceArr;    
};

//Function to add badges to the promotion images
function addBadges() {
    //Badge for the "Save 30%" promotion
    var discSpan = '<span style="position: absolute;top: 0px;left: 0px;background-color: #DC3189;color: WHITE;padding-left: 15px;padding-right: 15px;padding-top: 10px;padding-bottom: 10px;text-align: center;font-family: proxima-bold,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;font-size: 22px;font-weight: 400;">SAVE 30%</span>';

    //Badge for the "Tour more" promotion
    var tourSpan = '<span style="position: absolute;top: 0px;left: 0px;background-color: #F6C13E;color: black;padding-left: 15px;padding-right: 15px;padding-top: 10px;padding-bottom: 10px;text-align: center;font-family: proxima-bold,Helvetica Neue,Helvetica,Roboto,Arial,sans-serif;font-size: 22px;font-weight: 400;">TOUR MORE SAVE MORE</span>';

    //Array of promotion that fits the "Tour more" promotion
    var tourArr = selectIdsTour();
    //Array of promotion that fits the "Save 30%" promotion
    var priceArr = finalComparison();

    //We find the figure for each ID that met the criteria and add the badge
    tourArr.map(function(elem) { return ($("#" + elem).find("figure").html(tourSpan))});
    priceArr.map(function(elem) { return ($("#" + elem).find("figure").html(discSpan))});
}

    //Run the script to add the badges
    addBadges();

});

