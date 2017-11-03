import { Session } from 'meteor/session'
Template.header.events({

});

function getScoreHTML(score){
	var color='gray', scoreStr=score.toString();
	if(score>0) scoreStr='+'+scoreStr;
	if(score>=10) color='red';
	else if(score<=-10) color='blue';
	return '<font color="'+color+'"> '+scoreStr+'</font>';
}

Template.header.onRendered(function (){
	document.getElementById('uname').innerText=Session.get('uname');
	document.getElementById('score').innerHTML=getScoreHTML(Session.get('score'));
});



