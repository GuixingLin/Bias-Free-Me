import { Template } from 'meteor/templating'
import { Router, RouteController } from 'meteor/iron:router'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor';

TopicsList = new Mongo.Collection("topicsList");
Topics = new Mongo.Collection("topics");

Template.topic_side_submission.helpers({
	get_topics_list: function(){
		return TopicsList.find({});
	}
});


Template.topic_side_submission.events({
	'click #topic_side_submit_button': function(event) {
		event.preventDefault();
		$.each($('input:radio:checked'), function(){
			Meteor.call('update_topics', Session.get('username'), $(this).attr('name'), $(this).val());
		});
		
		Session.set("isSideChosen", true);
		Router.go('/home');
	}
});