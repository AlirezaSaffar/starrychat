

function setcookie(name,value,exday){
    var date= new Date();
    date.setTime(date.getTime()+ exday*24*60*60000);
    var exp="expires="+ date.toGMTString() ;
    document.cookie= name + "=" +value + ";" +exp +";path=/";
}

function getcookie(name){
    var nmae =+ "=";
    var decodecookie = decodeURIComponent(document.cookie);
    var x= decodecookie.split(";");
    var i;
    var xx;
    for(i=0;i<x.length;i++){
xx= x[i];
while(xx.charAt(0)==' '){
    xx= xx.substring(1);

}
if(xx.indexOf(name)==0){
    return xx.substring(name.length+1);
}
    }
    return " ";
}

var cki =window.location.href;
for(var i=0;i<cki.length;i++){
  var ch=cki.charAt(i-1);
  if(ch=='='){break;}
}
var c=cki.substring(i)
console.log(c)
fetch("/api/users/user", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name:c
    }),
   }).then(response=>{
   
    return response.json()}).then(date=>{
        if(date.url!=undefined){
    document.getElementById("prof").src=date.url;}else{
    document.getElementById("prof").src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAd5avdba8EiOZH8lmV3XshrXx7dKRZvhx-A&s"; 
    }
    var a= document.getElementsByTagName('t');
    document.getElementById("un").innerHTML="username:"+c;
    
    a[0].innerHTML="bio:"+date.bio;
    a[1].innerHTML="favorites:"+date.favorites;
    a[2].innerHTML="birthyear:"+date.birthyear;

   })
   function back(){
    window.location.assign("/users/contacts");
  }
