import { Template } from 'meteor/templating'
import { Router, RouteController } from 'meteor/iron:router'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor';

News = new Mongo.Collection("news");

Template.news.helpers({
	getArticles: function(){
		var news = News.find({});
		var output = [];
		news.forEach(function(x){
			var bias_score_ = ""
			if (x.bias_score < 0)
				bias_score_ = "Left + " + Math.floor(Math.abs(x.bias_score)/2).toString() + "%";
			else
				bias_score_ = "Right + " + Math.floor(Math.abs(x.bias_score)/2).toString() + "%";
			output.push({"link":x.link, "title":x.title, "bias_score": x.bias_score, "bias_score_": bias_score_});
		});
		return output;
	}
});

Template.article.events({
	'click #have_read': function(event) {
		Meteor.call("update_score", Session.get('username'), this.bias_score);
		window.alert("Marked As Read! Score Updated");
	}
})