import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

Users = Mongo.Collection.get('users');

Meteor.publish('Users', function(){
    return Users.find({});
});

Meteor.publish('current_user_info', function(){
	return Users.findOne({username: this.username});
})

Meteor.startup(() => {

});

Meteor.methods({
  update_score:function (username, addition_score) {
    Users.update({username: username},{$inc: {"profile.bias_score" : addition_score}});
  }
});
