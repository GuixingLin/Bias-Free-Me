import { Template } from 'meteor/templating'
import { Router, RouteController } from 'meteor/iron:router'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'

ChatHistory = new Mongo.Collection("chatHistory");

Template.user_profile.helpers({
	get_chat_history: function(){
		return ChatHistory.find({me:Session.get("username")}, {limit: 5, sort:{createdAt: -1}});
	}
});

Template.user_profile.onCreated(function(){
	this.subscribe("ChatHistory");
});