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
		    profile: { bias_score: 0}
		}, function(error){
			if (error){
				console.log(error.reason);
				return;
			}
		});
		//dummy users
		Accounts.createUser({
		    username: "Caster",
		    password: "Caster",
		    profile: { bias_score: 50}
		}, function(error){
			if (error){
				console.log(error.reason);
				return;
			}
		});
		Accounts.createUser({
		    username: "Saber",
		    password: "Saber",
		    profile: { bias_score: -50}
		}, function(error){
			if (error){
				console.log(error.reason);
				return;
			}
		});
		Accounts.createUser({
		    username: "Lancer",
		    password: "Lancer",
		    profile: { bias_score: 20}
		}, function(error){
			if (error){
				console.log(error.reason);
				return;
			}
		});
		Accounts.createUser({
		    username: "Rider",
		    password: "Rider",
		    profile: { bias_score: -20}
		}, function(error){
			if (error){
				console.log(error.reason);
				return;
			}
		});
		Accounts.createUser({
		    username: "Berserker",
		    password: "Berserker",
		    profile: { bias_score: -90}
		}, function(error){
			if (error){
				console.log(error.reason);
				return;
			}
		});
		Accounts.createUser({
		    username: "Assassin",
		    password: "Assassin",
		    profile: { bias_score: 90}
		}, function(error){
			if (error){
				console.log(error.reason);
				return;
			}
		});
		Session.set('username', username);
		Session.set('first_time_user', true);
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
			Session.set('username', username);
			//Router.go('/home');
			Router.go('/topic_side_submission');
			Session.set('first_time_user', false);
		});
	},
});
    