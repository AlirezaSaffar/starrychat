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
var mycheck= getcookie("login");
if(mycheck!=" "){
    window.location.assign('/users/contacts');
}
function signup(){
     var pass = document.getElementById('password') .value  ;
     var name = document.getElementById('user').value;
     var conpass= document.getElementById('passwordconfirm').value;

if(pass==conpass){
fetch("/api/users/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
            password: pass
        }),
      }).then(response=>{
   
        return response.json()}).then(date=>{
        if(!date.d){
          alert('this account already exist')

        }else{
          
            alert("Your account has been successfully created");
            window.location.assign("/users/login");
           
        }
       
       
        })
      }else{
        alert('your confirmed password is wrong');
      }
      if(name.length <4 || pass.length<4){
         alert('size of your username and password must be longer than 3 letters');
      }
      
}


   