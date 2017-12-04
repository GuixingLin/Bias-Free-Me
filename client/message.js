import { Template } from 'meteor/templating'
import { Router, RouteController } from 'meteor/iron:router'
import { Session } from 'meteor/session'
import { Mongo } from 'meteor/mongo'

Template.message.helpers({
  'profile_picture': function(){
    if (this.username === Session.get("username"))
    	return "/images/profile_pic_2.jpeg";
    else
    	return "/images/profile_pic_1.jpg";
  }
});