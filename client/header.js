import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'

Users = Mongo.Collection.get('users');

Template.header.events({
	'click #help': function(event) {
		Modal.show("guide");
	}
});

function getScoreHTML(score){
	var color='gray', scoreStr=score.toString();
	if(score>0) scoreStr='+'+scoreStr;
	if(score>=10) color='red';
	else if(score<=-10) color='blue';
	return '<font color="'+color+'"> '+scoreStr+'</font>';
}

Template.header.helpers({
	'show_username': function(){
		return Session.get('username');
	},
	'show_bias_score': function(){	
		return Users.findOne({username: Session.get('username')}).profile.bias_score;
	}
});

Template.header.onCreated(function (){
});



