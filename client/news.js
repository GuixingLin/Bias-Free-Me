Template.news1.onCreated(function(){
	update_score(Session.get('username'), 10);
});

Template.news2.onCreated(function(){
	update_score(Session.get('username'), -10);
});


function update_score(username, addition_score){
	Meteor.call('update_score', username, addition_score);
}
