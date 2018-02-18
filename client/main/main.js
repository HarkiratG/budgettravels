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
        console.log(city.bgurl);
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
    }
});

Template.schedule.helpers({



});

Template.schedule.events({
    'click .testbtn': function (event) {
        Meteor.call('getSchedule', function(error, result){
            if(error){

            }else{
                console.log(result['data']);
            }
        });

    }
});