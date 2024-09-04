function setcookie(name, value, exday) {
  var date = new Date();
  date.setTime(date.getTime() + exday * 24 * 60 * 60000);
  var exp = "expires=" + date.toGMTString();
  document.cookie = name + "=" + value + ";" + exp + ";path=/";
}
function getcookie(name) {
    var nmae = +"=";
    var decodecookie = decodeURIComponent(document.cookie);
    var x = decodecookie.split(";");
    var i;
    var xx;
    for (i = 0; i < x.length; i++) {
      xx = x[i];
      while (xx.charAt(0) == " ") {
        xx = xx.substring(1);
      }
      if (xx.indexOf(name) == 0) {
        return xx.substring(name.length + 1);
      }
    }
    return " ";
  }
var mywidth=window.screen.width;
console.log(mywidth)
if(mywidth<393){
  var newelement=document.createElement('br');
  var ael=document.getElementsByTagName('a');
  var element = document.getElementById("kolbody");
  element.insertBefore(newelement,ael[2]);
  newelement=document.createElement('br');
  element.insertBefore(newelement,ael[2]);
}
var check=true;
var mycheck = getcookie("login");
if (mycheck == " ") {
  window.location.assign("/users/login");
  check =false;
}


var username= getcookie("login");
if(check){
fetch("/api/users/contacts", {
 method: "POST",
 headers: {
   Accept: "application/json",
   "Content-Type": "application/json",
 },
 body: JSON.stringify({
   name:username
 }),
}).then(response=>{

 return response.json()}).then(date=>{
var username = date.name;
document.getElementById("myprofile").href="/users/user?nameuser="+username;
var cons=date.txt.split('-');
var sw=0;
for(var i=1;i<cons.length;i++){
  var para=document.createElement('a');
  para.setAttribute("onclick","")
  var element = document.getElementById("kolbody");
  var x= document.getElementById("divcon");
  para.href="/users/chatroom";
  para.className="contacts";
  element.insertBefore(para,x);
  sw++;
}
var txt="";
var adoc=document.getElementsByTagName('a');
for(var i =3;i<cons.length+2;i++){


adoc[i].innerHTML=cons[i-2];
adoc[i].href=adoc[i].href+ "?nameuser=" +cons[i-2];
  
 
}


 })
}


 function exit(){
  setcookie("login", " ", -1);
  window.location.assign("/users/login");

}

function setconcookie (obj){
  var txt = obj.innerHTML;
  setcookie("contact",txt,1);
}

function mover(obj){
 
  obj.style.backgroundColor="grey"
}

function mout(obj){
  obj.style.backgroundColor="indigo"

}
