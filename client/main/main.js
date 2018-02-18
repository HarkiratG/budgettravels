import { Template } from 'meteor/templating';
import {Cities} from "../../lib/collection";

import './main.html';



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