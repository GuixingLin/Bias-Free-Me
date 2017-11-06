import { Template } from 'meteor/templating'
import { Router, RouteController } from 'meteor/iron:router'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'

Messages = new Mongo.Collection('messages');

Template.new_chat_room.helpers({
  messages() {
    return Messages.find({roomNumber: roomNumber});
  },
});

Template.new_chat_room.events({
  'submit .new-message'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;

    // Insert a message into the collection
    Meteor.call('insert_message', text, Session.get('username'), roomNumber);

    // Clear form
    target.text.value = '';

    // scroll to last message
    $('.panel-body').scrollTop($('.media-list').height())
  },
});

Template.new_chat_room.onCreated(function (){
  chatter = Router.current().params.query.chatter;
  console.log(chatter);
  //calculate bias score
  chatter_bias_score = Users.findOne({username: chatter}).profile.bias_score;
  current_user_bias_score = Users.findOne({username: Session.get('username')}).profile.bias_score;
  addition_score =  chatter_bias_score / 10;

  //generate room number
  roomNumber = generateRoomNumber(Session.get('username'), chatter);
  console.log(roomNumber);
});



//-----------helper function to generate room number---------//
var generateRoomNumber = function(id1, id2){
  var hash1 = new String(id1).hashCode();
  var hash2 = new String(id2).hashCode();
  return hash1+hash2;
};

String.prototype.hashCode = function(){
    if (Array.prototype.reduce){
        return this.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
    } 
    var hash = 0;
    if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        var character  = this.charCodeAt(i);
        hash  = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

