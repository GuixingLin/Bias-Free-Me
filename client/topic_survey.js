import { Template } from 'meteor/templating'
import { Router, RouteController } from 'meteor/iron:router'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor';

TopicsList = new Mongo.Collection("topicsList");
Topics = new Mongo.Collection("topics");

Template.topic_survey.helpers({
	get_topics_list: function(){
		var topics = TopicsList.find({});
		var output = [];
		var i = 0;
		topics.forEach(function(x){
			output.push({"topicName":x.topicName, "ID": i});
			i+=1;
		});
		return output;
	}
});


Template.topic_survey.events({
	'click #survey_form_submit': function(event) {
		event.preventDefault();
		var score = 0;
		$.each($('input:radio:checked'), function(){
			if ($(this).attr('name') != "self_evaluation"){
				console.log($(this).attr('name'));
				Meteor.call('update_topics', Session.get('username'), $(this).attr('name'), $(this).val());
			}

			if ($(this).val() == "Left")
				score += -20;
			else if ($(this).val() == "Right")
				score += 20;
			else if ($(this).val() == "Neutral"){

			}else{
				score += parseInt($(this).val());
			}
		});
		console.log(score);
		Meteor.call('update_score', Session.get('username'), score);
		Session.set("isSideChosen", true);
		Router.go('/home');
	}
});