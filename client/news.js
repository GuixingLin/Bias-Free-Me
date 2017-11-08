import { Template } from 'meteor/templating'
import { Router, RouteController } from 'meteor/iron:router'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor';

News = new Mongo.Collection("news");

Template.news.helpers({
	getArticles: function(){
		return News.find({});
	}
});

Template.article.events({
	'click #have_read': function(event) {
		console.log(this.bias_score);
		Meteor.call("update_score", Session.get('username'), this.bias_score);
		window.alert("Marked As Read! Score Updated");
	}
})