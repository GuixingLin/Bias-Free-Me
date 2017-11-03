import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session'
import { Router, RouteController } from 'meteor/iron:router';

Router.route('/', function () {
	console.log("homepage")
	if(Session.get('login')!=true)
		this.render('login');
	else
		this.render('home');
});

Router.route('/chathome');


Router.route('/chat', function () {
  // render the Home template with a custom data context
  this.render('chat');
});
