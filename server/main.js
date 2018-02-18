import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http'
import {Cities} from "../lib/collection";


Meteor.startup(() => {
  // code to run on server at startup

    //populate cities db


  // getCities();
});


function getCities() {

    // this.unblock();

    var result;

    try {
       result = HTTP.call('GET', 'https://pure-coast-27115.herokuapp.com/data/cities');

        //console.log(result['data']['data']);

    } catch (e) {
        // Got a network error, timeout, or HTTP error in the 400 or 500 range.
       console.log(e)
    }

    var cityArr = result['data']['data'];
    for(var i=0; i<cityArr.length;i++){
        //console.log(cityArr[i].name);
        var name = cityArr[i].name;
        var country = cityArr[i].country;
        var cityId = cityArr[i].id;
        console.log(name + " " + country);
       Cities.insert({name:name,country:country, cityId:cityId});
    }
}