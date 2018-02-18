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
    }
});

Template.main.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    Session.set("tmp",Session.get("tmp") + 1);
  },
});
