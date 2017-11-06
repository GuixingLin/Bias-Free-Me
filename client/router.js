import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
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

Router.route('/new_chat', function(){
	this.render('new_chat_room');
});

Router.route('/news', function(){
	this.render('news');
});

Router.route('/news1', function(){
	this.render('news1');
});

Router.route('/news2', function(){
	this.render('news2');
});

Router.route('/news3', function(){
	this.render('news3');
});
Meteor.subscribe('Users');
Meteor.subscribe('Messages');
