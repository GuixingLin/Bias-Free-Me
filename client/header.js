import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'

Users = Mongo.Collection.get('users');

Template.header.events({

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
		score=Users.findOne({username: Session.get('username')}).profile.bias_score;
		return score;
	},
	'get_score_color': function(){
		score=Users.findOne({username: Session.get('username')}).profile.bias_score;
		if(score>=10) return "red";
		else if(score<=-10) return "blue";
		return "gray";
	}	
});

Template.header.onCreated(function (){
});



