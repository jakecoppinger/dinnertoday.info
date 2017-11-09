var data = require("../data/data.json");
var DiningHall = require("./DiningHall.js");
var moment = require('moment');


const Vue = require('vue');
const compiler = require('vue-template-compiler');


var humanDate = function(m) {
    return m.format("MMMM") + " " + m.format("Do");
}


//var today = moment("2017-07-24 09:30");
var today = moment();
var tomorrow = moment().add(1, 'days');

// Dinner finish time
const dinnerEnd = {
    hours: 19,
    minutes: 15
}

// Check if dinner has finished
var dinnerOver = false;
if (today.hours() >= dinnerEnd.hours &&
    today.minutes() > dinnerEnd.minutes) {
    dinnerOver = true;
}

var dino = new DiningHall(data);

var vueapp = new Vue({
    el: '#app',
    data: {
        humanDate: humanDate(today),
        mealsTodayData: dino.menuExistsOnDate(today),
        mealsTomorrowData: dino.menuExistsOnDate(tomorrow),
        mealsToday: dino.mealsOnDate(today),
        mealsTomorrow: dino.mealsOnDate(tomorrow),
        noMenu: !dino.menuExistsOnDate(today) && !dino.menuExistsOnDate(today),
        dinnerFinished: dinnerOver
    }
});


$(document).ready(function() {
    const mealsToday = dino.mealsOnDate(today);

    var $form = $('form#test-form')
    var url = 'https://script.google.com/macros/s/AKfycbx6jc5jiJXbubMY0Zfi8PKkopNrSmAjUX3FBTl4RYI5914WaWv0/exec';

    $('#submit-form').on('click', function(e) {

        const data = $form.serializeObject()

        data.dinner = mealsToday.Dinner;
        data.vegetarian = mealsToday.Vegetarian;
        data.vegetables = JSON.stringify(mealsToday.Vegetables);

        console.log(data)
        // data.diner = mealsToday.Dinner
        console.log("submitting form");


        e.preventDefault();
        var jqxhr = $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data 
        })
    });
});