import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import { Router, RouteController } from 'meteor/iron:router';


Template.login_register.events({
	'click #sign_up_button': function(event) {
		event.preventDefault();
		var username = document.getElementById("username_input").value;
		var password = document.getElementById("password_input").value;
		Accounts.createUser({
		    username: username,
		    password: password,
		    profile: { bias_score: 0, points: 0}
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
		    profile: { bias_score: -10, points: 10}
		}, function(error){
			if (error){
				console.log(error.reason);
				return;
			}
		});
		Accounts.createUser({
		    username: "saber",
		    password: "saber",
		    profile: { bias_score: 100, points: 100}
		}, function(error){
			if (error){
				console.log(error.reason);
				return;
			}
		});
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
			Router.go('/home');
		});
	},
});
    