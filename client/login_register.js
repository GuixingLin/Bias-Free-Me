import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import { Router, RouteController } from 'meteor/iron:router';
import { Mongo } from 'meteor/mongo';

Template.login_register.events({
	'click #sign_up_button': function(event) {
		event.preventDefault();
		var username = document.getElementById("username_input").value;
		var password = document.getElementById("password_input").value;
		Accounts.createUser({
		    username: username,
		    password: password,
		    profile: { bias_score: 0, points: 0, topics:[]}
		}, function(error){
			if (error){
				console.log(error.reason);
				return;
			}
		});
		//debug purpose
		Accounts.createUser({
		    username: "archer",
		    password: "archer",
		    profile: { bias_score: -89, points: 100, 
		    	topics:[
		    		{topic_name: "How do you like cat", topic_side: "Negative"}
		    	]
		    }
		}, function(error){
			if (error){
				console.log(error.reason);
				return;
			}
		});
		Accounts.createUser({
		    username: "saber",
		    password: "saber",
		    profile: { bias_score: 100, points: 100, 
		    	topics:[
		    		{topic_name: "How do you like cat", topic_side: "Negative"}
		    	]
		    }
		}, function(error){
			if (error){
				console.log(error.reason);
				return;
			}
		});
		Meteor.call("insertNews" ,"NY Times", "https://www.nytimes.com/", 30);
		Meteor.call("insertNews" ,"WSJ", "https://www.wsj.com/", -30);
	},
  	'click #login_button': function(event){
  		event.preventDefault();
		var username = document.getElementById("username_input").value;
		var password = document.getElementById("password_input").value;
		Meteor.loginWithPassword(username, password, function(error){
			if (error){
				console.log(error.reason);
				return;
			}
			console.log("successfully logged in");
			Session.set('isLogin', true);
			Session.set('username', username);
			//Router.go('/home');
			Router.go('/topic_side_submission');
		});
	},
});
    