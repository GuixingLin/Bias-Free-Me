import { Template } from 'meteor/templating'
import { Router, RouteController } from 'meteor/iron:router'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor';



Template.topic_side_submission.events({
	'click #topic_side_submit': function(event) {
		event.preventDefault();
		var selection = $('input[name=topic]:checked').val();
		var topic_name = $('#topic_name').text();
		console.log(selection);
		console.log(topic_name);
		Meteor.call('update_topic_side', Session.get('username'), topic_name, selection);
		Session.set("isSideChosen", true);
		Router.go('/home');
	}
})