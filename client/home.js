import { Template } from 'meteor/templating'
import { Router, RouteController } from 'meteor/iron:router'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'

Template.home.helpers({
	need_to_show_guide: function(){
		return Session.get('first_time_user');
	},
	show_guide: function(){
		Modal.show('guide');
	}
});