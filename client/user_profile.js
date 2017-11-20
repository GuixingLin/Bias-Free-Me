import { Template } from 'meteor/templating'
import { Router, RouteController } from 'meteor/iron:router'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'

ChatHistory = new Mongo.Collection("chatHistory");

Template.user_profile.helpers({
	get_chat_history: function(){
		return ChatHistory.find({me:Session.get("username")}, {limit: 5, sort:{createdAt: -1}});
	},
	evaluate_chat_history: function(){
		var history = ChatHistory.find({me:Session.get("username")}, {limit: 5, sort:{createdAt: -1}});
		var score_change = 0;
		var count = 0;
		history.forEach(function(entry){
			score_change += entry.score_change;
			count += 1;
		});	
		var current_score = Users.findOne({username:Session.get("username")}).profile.bias_score;
		var result = "";
		var code = 0;
		if (count < 5){
			result = "Hmmm... Try to chat more with others!";
			code = 0;
		}else{
			if (Math.abs(current_score)-10 < Math.abs(current_score-score_change)){
				result = "Yo! You are talking with different people! Keep up the good work!";
				code = 1;
			}else{
				result = "Oops! Don't be bias! Try to talk with different people! ";
				code = 2;
			}
		}
		var Message = [{"result":result, "code":code}];
		return Message

	}
});

Template.user_profile.onCreated(function(){
	this.subscribe("ChatHistory");
	this.subscribe("Users");
});