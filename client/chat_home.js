import { Router, RouteController } from 'meteor/iron:router';
import { Session } from 'meteor/session'

Template.chat_home.helpers({
	online_users:function(){
		return Users.find({username: {$ne: Session.get('username')}});
	}
});