import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Messages = new Mongo.Collection('messages');

Users = Mongo.Collection.get('users');


Meteor.publish('Users', function(){
    return Users.find({});
});

Meteor.publish('Messages', function(){
	return Messages.find({});
});

Meteor.publish('current_user_info', function(){
	return Users.findOne({username: this.username});
})

Meteor.startup(() => {
	Users.remove({});
});

Meteor.methods({
	update_score:function (username, addition_score) {
		Users.update({username: username},{$inc: {"profile.bias_score" : addition_score}});
	},
	insert_message:function (text, username, roomNumber){
		Messages.insert({
			text: text,
			createdAt: new Date(), // current time
			owner: username,
			username: username,
			roomNumber: roomNumber
	    });
	    console.log(text + ' inserted');
	}
});