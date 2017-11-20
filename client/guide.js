import { Template } from 'meteor/templating'
import { Router, RouteController } from 'meteor/iron:router'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'

final_tip_index = 6;
Template.guide.onCreated(function(){
	Session.set("current_tip", 0);

	Session.set('first_time_user', false);
});

Template.guide.events({
	'click #move_to_next_tip': function(event) {
		Session.set("current_tip", Session.get("current_tip")+1);
	}
});

Template.guide.helpers({
	is_tipZero: function(){
		return Session.get("current_tip") == 0;
	},
	is_tipOne: function(){
		return Session.get("current_tip") == 1;
	},
	is_tipTwo: function(){
		return Session.get("current_tip") == 2;
	},
	is_tipThree: function(){
		return Session.get("current_tip") == 3;
	},
	is_tipFour: function(){
		return Session.get("current_tip") == 4;
	},
	is_tipFive: function(){
		return Session.get("current_tip") == 5;
	},
	is_tipSix: function(){
		return Session.get("current_tip") == 6;
	},
	has_next: function(){
		return ( final_tip_index != Session.get("current_tip"));
	},
	start_modal: function(){
		return Session.get('current_tip') == 0;
	}
});