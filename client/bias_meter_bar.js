import { Template } from 'meteor/templating'
import { Router, RouteController } from 'meteor/iron:router'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'

Template.bias_score.helpers({
	get_right_bias_score_in_pecentage: function(){
		return Math.floor((Math.abs(this.bias_score+100.0) / 200) * 100);
	},
	get_left_bias_score_in_pecentage: function(){
		return Math.floor((1 - Math.abs(this.bias_score+100.0) / 200) * 100);
	}
});

Template.bias_meter_bar.helpers({
	get_right_bias_score_in_pecentage: function(){
		return Math.floor((Math.abs(this.bias_score+100.0) / 200) * 100);
	},
	get_left_bias_score_in_pecentage: function(){
		return Math.floor((1 - Math.abs(this.bias_score+100.0) / 200) * 100);
	}
});