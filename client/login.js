import { Session } from 'meteor/session'

Template.login.events({
  'click button#signup'(e) {
    uname=document.getElementById("uname").value;
	if(uname==""){
		alert("Username cannot be empty!");
		return;
	}
	Session.set('uname',uname);
	Session.set('score',0);
	Session.set('login',true);
    //confirm(uname);
    //window.location.href="http://www.baidu.com"; 
  }
});
    