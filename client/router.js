import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Router, RouteController } from 'meteor/iron:router';

Router.route('/', function () {
	if (retrieve_username_session())
		Router.go('/home');
	else
		Router.go('/login');
});

Router.route('/login', function() {
	if (retrieve_username_session()){
		if (Session.get('first_time_user') == false)
			Router.go('/home');
		else
			Router.go('/topic_side_submission');
	}else
		this.render('login_register');
});

Router.route('/home', function() {
	if (!retrieve_username_session())
		Router.go('/login')
	else{
		this.render('home');
		this.layout('header');
	}
});

Router.route('/topic_side_submission', function(){
	if (!retrieve_username_session())
		Router.go('/login')
	else 
		this.render('topic_side_submission');
});

Router.route('/chat_home', function() {
	if (!retrieve_username_session())
		Router.go('/login')
	else{
		this.render('chat_home');
		this.layout('header');
	}
});

Router.route('/new_chat', function(){
	if (!retrieve_username_session())
		Router.go('/login')
	else{
		this.render('new_chat_room');
		this.layout('header');
	}
});

Router.route('/news', function(){
	if (!retrieve_username_session())
		Router.go('/login')
	else{
		this.render('news');
		this.layout('header');
	}
});

Router.route('/topic_selection', function(){
	if (!retrieve_username_session())
		Router.go('/login')
	else 
		this.render('topic_selection');
});

Router.route('/logout', function(){
	Meteor.logout();
	Router.go('/');
});

Meteor.startup(function(){
 $.getScript('//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js', function(){});
});

var retrieve_username_session = function(){
	if (Meteor.userId() != null){
		if (!Session.get("username")){
			Session.set("username", Meteor.user().username);
		}
		return true;
	}
	return false;
}

Meteor.subscribe('Users');
Meteor.subscribe('Messages');
Meteor.subscribe('EndChatRequests');
Meteor.subscribe('News');
Meteor.subscribe('Topics');
Meteor.subscribe('TopicsList');
Meteor.subscribe('ChatHistory');