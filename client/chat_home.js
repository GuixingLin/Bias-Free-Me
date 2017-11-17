import { Router, RouteController } from 'meteor/iron:router';
import { Session } from 'meteor/session'

Template.chat_home.helpers({
	online_users:function(){
		return Users.find({username: {$ne: Session.get('username')}});
	}
});

Template.chat_home.onCreated(function(){
	currentUserView = Topics.find({username:Session.get('username')});
});

Template.name_tag.helpers({
	get_topics_list: function(username){
		var differentTopics = [];
		var output = Topics.find({username:username});

		output.forEach(function(x){
			currentUserView.forEach(function(y){
				if (x.topicName == y.topicName){
					if (x.side !== y.side){
						differentTopics.push({"username": username, "topicName": x.topicName, "topicSide": x.side});
					}
				}
			})
		});
		return differentTopics;
	}
});

Template.topic_entry.helpers({
	get_chatter: function(){
		return this.chatter;
	}
});