import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Router, RouteController } from 'meteor/iron:router';

Router.route('/', function () {
	if (Session.get('isLogin')){
		if (Session.get('isSideChosen'))
			Router.go('/home');
		else
			Router.go('/topic_side_submission');
	}
	else
		Router.go('/login');
});

Router.route('/login', function() {
	if (!Session.get('username'))
		Router.go('/login');
	this.render('login_register');
});

Router.route('/home', function() {
	if (!Session.get('username'))
		Router.go('/login')
	else 
		this.render('home');
});

Router.route('/topic_side_submission', function(){
	if (!Session.get('username'))
		Router.go('/login')
	else 
	this.render('topic_side_submission');
});

Router.route('/chat_home', function() {
	if (!Session.get('username'))
		Router.go('/login')
	else 
	this.render('chat_home');
});

Router.route('/new_chat', function(){
	if (!Session.get('username'))
		Router.go('/login')
	else 
	this.render('new_chat_room');
});

Router.route('/news', function(){
	if (!Session.get('username'))
		Router.go('/login')
	else 
	this.render('news');
});

Router.route('/topic_selection', function(){
	if (!Session.get('username'))
		Router.go('/login')
	else 
	this.render('topic_selection');
});


Meteor.subscribe('Users');
Meteor.subscribe('Messages');
Meteor.subscribe('EndChatRequests');
Meteor.subscribe('News');
