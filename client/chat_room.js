import { Router, RouteController } from 'meteor/iron:router';
import { Session } from 'meteor/session'

var reply=["I am a robot", "But I love kitty", "I know you are a dog lover", "Don't be salty man","I am a robot", "Fine, I love"];

Template.chat_room.helpers({
	'get_chatter': function(){
		return chatter;
	},
	'get_addition_score': function(){
		return addition_score;
	}
});


Template.chat_room.events({
	'click #chat_send': function(event) {
		chat();
	},
	'click #end_chat': function(event) {
		//need fix
		var canEnd = request_consent();
		if (canEnd){
			update_score(Session.get('username'), addition_score);
			update_score(chatter, addition_score);
			Router.go('/chat_home');
		}
	}
});


Template.chat_room.onCreated(function (){
	chatter = Router.current().params.query.chatter;
	chatter_bias_score = Users.findOne({username: chatter}).profile.bias_score;
	current_user_bias_score = Users.findOne({username: Session.get('username')}).profile.bias_score;
	addition_score =  chatter_bias_score / 10;
});



function chat(){
    chat_msg = document.getElementById("chat_textbox").value;
    chatTextArea = document.getElementById("chat");
    chatTextArea.innerHTML += "<span style='float:left;color:red'>You: <font color='black'>"+chat_msg+"</color></span><br/>";
    chatTextArea.innerHTML += "<span style='float:right;color:blue'>"+chatter+": <font color='black'>"+reply[Math.floor(Math.random()*reply.length)]+"</color></span><br/>";
    chatTextArea.scrollTop = chatTextArea.scrollHeight;
    document.getElementById("chat_textbox").value="";
}

function request_consent(){
	setTimeout(function(){
	   
	}, 1000);
	return true;
	
}

function update_score(username, addition_score){
	Meteor.call('update_score', username, addition_score);
}