import { Router, RouteController } from 'meteor/iron:router';
import { Session } from 'meteor/session'

var reply=["haha", "23333", "Interesting", "orz"]
function chat(){
    toSend=document.getElementById("chattosend").value;
    chatTextArea=document.getElementById("chat");
    chatTextArea.innerHTML+="<span style='float:left;color:red'>You: <font color='black'>"+toSend+"</color></span><br/>";
    chatTextArea.innerHTML+="<span style='float:right;color:blue'>"+chatter+": <font color='black'>"+reply[Math.floor(Math.random()*3+0.99)]+"</color></span><br/>";
    chatTextArea.scrollTop = chatTextArea.scrollHeight;
    document.getElementById("chattosend").value="";
	var score=Session.get('score');
	var sgn=chatterScore-score>0?1:-1;
	document.getElementById('score').innerHTML=getScoreHTML(score+=sgn);
	document.getElementById('chatterscore').innerHTML=getScoreHTML(chatterScore-=sgn);
	Session.set('score', score);
}


Template.chat.events({
  'click button#chatsend'(e) {
    chat();
  }
});

function getScoreHTML(score){
	var color='gray', scoreStr=score.toString();
	if(score>0) scoreStr='+'+scoreStr;
	if(score>=10) color='red';
	else if(score<=-10) color='blue';
	return '<font color="'+color+'"> '+scoreStr+'</font>';
}


Template.chat.onRendered(function (){
	chatter=Router.current().params.query.chatter;
	chatterScore=Router.current().params.query.score
	var score=getScoreHTML(chatterScore);
	document.getElementById('chatteruname').innerText=chatter;
	document.getElementById('chatterscore').innerHTML=score;
	//console.log(chatter, score)
});
