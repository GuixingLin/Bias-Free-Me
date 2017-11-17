import { Template } from 'meteor/templating'
import { Router, RouteController } from 'meteor/iron:router'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'

Messages = new Mongo.Collection('messages');
EndChatRequests = new Mongo.Collection('endChatRequests');

Template.new_chat_room.helpers({
  messages() {
    return Messages.find({roomNumber: roomNumber});
  },
  'get_chatter': function(){
    return chatter;
  },
  'get_addition_score': function(){
    return addition_score;
  },
  'end_chat': function(){
    return EndChatRequests.find({roomNumber:roomNumber});
  },
  'get_topic': function(){
    if (topicName == undefined || topicName == null)
      return "NA"
    else
      return topicName;
  }
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
    chatTextArea = document.getElementById("chat_area");
    chatTextArea.scrollTop = (chatTextArea.scrollHeight);
  },

  'click #end_chat': function(event) {
    //need fix
    event.preventDefault();
    console.log("end chat");
    housekeeping(roomNumber);
  },

  'click #get_suggested_topics': function(event){
    Modal.show("suggested_topics");
  },

  'click #get_score_change_explanation': function(event){
     Modal.show("suggested_topics");
  }
});

Template.new_chat_room.onCreated(function (){
  chatter = Router.current().params.query.chatter;
  topicName = Router.current().params.query.topicName;
  //calculate bias score
  chatter_bias_score = Users.findOne({username: chatter}).profile.bias_score;
  current_user_bias_score = Users.findOne({username: Session.get('username')}).profile.bias_score;
  addition_score =  Math.round((chatter_bias_score - current_user_bias_score) / 5);

  //generate room number
  roomNumber = generateRoomNumber(Session.get('username'), chatter);
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

var housekeeping = function (roomNumber){
  Meteor.call("housekeeping", roomNumber, Session.get('username'), chatter);
};

Template.end_message.helpers({
  'end_chat': function(){
      Router.go('/chat_home');
      Meteor.call("chat_ended", roomNumber, Session.get('username'));
  }
});

