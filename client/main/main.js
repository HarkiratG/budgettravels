import {Template} from 'meteor/templating';
import {Cities} from "../../lib/collection";

import './main.html';
import {HTTP} from "meteor/http";


Template.main.onCreated(function helloOnCreated() {
  // counter starts at 0
    Session.set("tmp",0);

});

Template.main.helpers({
  counter() {
    return Session.get("tmp");
  },
    cityList(){
    return Cities.find({});
    },
    username(){
   return Meteor.user().profile.name;
     //return Meteor.user();
    }
});

Template.main.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    Session.set("tmp",Session.get("tmp") + 1);
  },
    'click #fbLoginBtn'(event){
        event.preventDefault();
        Meteor.loginWithFacebook({
            requestPermission:['public_profile', 'email']}, function(err){
                if(err){
                    console.log("something went wrong with facebook login at line 32");
                }
            });
    },

    'click .logout-btn':function(event){
        event.preventDefault();

        Meteor.logout(function(err){
            if(err){
                console.log(err.reason);
            } else {
                Router.go("/");
            }
        })
    }

});

Template.cityAttractions.helpers({

    attractions() {
        var query = $('#searchQuery').val();
        var url = 'https://cryptic-dawn-72809.herokuapp.com/list_attractions/' + Cities.findOne(Router.current().params._id).cityId;
        Meteor.call('getAttractionsWithSearchQuery', url, query,function (error, result) {
            if (error) {

            } else {
                // console.log(result);

               Session.set('result', result);
            }
        });


        return Session.get('result');
    },
    getbgurl(){
        var city = Cities.findOne(Router.current().params._id);
        // console.log(city.bgurl);
        return city.bgurl;
    },
    getcity(){
        var city = Cities.findOne(Router.current().params._id);

        return city.name;
    }
});

Template.cityAttractions.events({

    'click .gohome':function(event){

    },
    'click #searchBtn':function(event){
        event.preventDefault();
        var query = $('#searchQuery').val();
        var url = 'https://cryptic-dawn-72809.herokuapp.com/list_attractions/' + Cities.findOne(Router.current().params._id).cityId;

        Meteor.call('getAttractionsWithSearchQuery', url, query,function (error, result) {
            if (error) {

            } else {
                Session.set('result', result);
            }
        // console.log(test);
        });
        return Session.get('result');
    },
    'click .scheduler':function(event){
        // console.log(Router.current().params._id);
        Router.go('schedule', {_id:Router.current().params._id});
    }
});

Template.schedule.helpers({

    name(){
        return Cities.findOne(Router.current().params._id).name;
    },
    country(){
        return Cities.findOne(Router.current().params._id).country;
    },
    schedules(){
        return Session.get('schedule');
    },
    days(){
        var days = [];
        var index = 0;
        for(var i = 0; i < (2*Session.get('days')); i++){
            if(i%2 == 0){
                var str = "Day " + (index + 1)
                // console.log("THE STRING IS " + str);
                days[index] = JSON.parse(Session.get('schedule')[str]);
            }
        }

        // console.log(days[0]);
        // console.log(days[0][0]);
        return days[0];
    }
});

Template.schedule.events({
    'click .testbtn': function (event) {
        Meteor.call('getSchedule', function(error, result){
            if(error){

            }else{
                // console.log(result['data']);
            }
        });

    },
    'click .generateSchedule': function(event){
        var cid = Cities.findOne(Router.current().params._id).cityId;

        Session.set('days', $('#daysInput').val());
        console.log("CAME TO CLIENT");

        Meteor.call('getSchedule',cid, $('#budgetInput').val(), $('#daysInput').val(), function(error, result){
            if(error){

            }else{
                // console.log((result.data));

                Session.set('schedule', result['data']);
            }
        });
    }
});