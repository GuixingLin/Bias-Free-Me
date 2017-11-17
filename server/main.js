import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Messages = new Mongo.Collection('messages');
EndChatRequests = new Mongo.Collection('endChatRequests');
News = new Mongo.Collection('news');
Users = Mongo.Collection.get('users');
Topics = new Mongo.Collection('topics');
TopicsList = new Mongo.Collection('topicsList');

Meteor.publish('Users', function(){
    return Users.find({});
});

Meteor.publish('Messages', function(){
	return Messages.find({});
});

Meteor.publish('EndChatRequests', function(){
	return EndChatRequests.find({});
});

Meteor.publish('current_user_info', function(){
	return Users.findOne({username: this.username});
});

Meteor.publish('News', function(){
	return News.find({});
});

Meteor.publish('Topics', function(){
	return Topics.find({});
});

Meteor.publish('TopicsList', function(){
	return TopicsList.find({});
});

Meteor.startup(() => {

});

Meteor.methods({
	update_score:function (username, addition_score) {
		Users.update({username: username},{$inc: {"profile.bias_score" : addition_score}});
	},
	insert_message:function (text, username, roomNumber){
		EndChatRequests.remove({roomNumber:roomNumber});

		Messages.insert({
			text: text,
			createdAt: new Date(), // current time
			owner: username,
			username: username,
			roomNumber: roomNumber
	    });
	    console.log(text + ' inserted');
	},
	housekeeping: function(roomNumber, user1, user2){
		var user1_score = Math.round(Users.findOne({username:user1}).profile.bias_score);
		var user2_score = Math.round(Users.findOne({username:user2}).profile.bias_score);
		var user1_update_score = Math.round((user2_score - user1_score) / 5);
		var user2_update_score = Math.round((user1_score - user2_score) / 5);

		Users.update({username: user1},{$inc: {"profile.bias_score" : user1_update_score}});
		Users.update({username: user2},{$inc: {"profile.bias_score" : user2_update_score}});
		EndChatRequests.insert({
			roomNumber: roomNumber,
			ack: 0
		});
	},
	chat_ended: function(roomNumber, username){
		EndChatRequests.update({roomNumber: roomNumber}, {$inc: {"ack": 1}});
		if (EndChatRequests.findOne({roomNumber:roomNumber}).ack >= 2){
			EndChatRequests.remove({roomNumber:roomNumber});
		}
	},
	update_topics: function(username, topicName, topicSide){
		if (Topics.findOne({"username":username, "topicName":topicName})){
			Topics.update({"username":username, "topicName":topicName},{$set:{"side":topicSide}});
		}else{
			Topics.insert({"username":username, "topicName": topicName, "side": topicSide});
		}
	}
});