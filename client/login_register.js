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
			Session.set('username', username);
			Session.set('first_time_user', true);
			add_dummy_users();
		});
	},
  	'click #login_button': function(event){
  		event.preventDefault();
		var username = document.getElementById("username_input").value;
		var password = document.getElementById("password_input").value;
		Meteor.loginWithPassword(username, password, function(error){
			if (error){
				alert(error.reason);
				console.log(error.reason);
				return;
			}
			console.log("successfully logged in");
			Session.set('username', username);
			Session.set('first_time_user', false);
			Router.go('/home');
		});
	},
});
    

var add_dummy_users = function(){
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
};

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
};