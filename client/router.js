import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import { Router, RouteController } from 'meteor/iron:router';

Router.route('/', function () {
	if (Session.get('isLogin'))
		Router.go('/home');
	else
		Router.go('/login');
});

Router.route('/login', function() {
	this.render('login_register');
});

Router.route('/home', function() {
	this.render('home');
});

Router.route('/chat_home', function() {
	this.render('chat_home')
});


Router.route('/chat', function () {
  // render the Home template with a custom data context
  this.render('chat_room');
});


Meteor.subscribe('Users');