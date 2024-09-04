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
    var mycheck = getcookie("login");
if (mycheck == " ") {
  window.location.assign("/users/login");
}

function confirm(){
    var pass= document.getElementById("password").value;
    var bio= document.getElementById("bio").value;
    var fav= document.getElementById("favorites").value;
    var age= document.getElementById("birthyear").value;
    var url= document.getElementById("profile").value;
    var uname= getcookie("login");
    var arr=[false,false,false,false,false];
    var check = (age>1900&&age<2024)||age=="";
    if(check){
    if(!pass==""&& pass.length<4){alert('choise a longer password')}else{
    if(pass!=""){arr[0]=true;}
    if(bio!=""){arr[1]=true;}
    if(fav!=""){arr[2]=true;}
    if(age!=""){arr[3]=true;}
    if(url!=""){arr[4]=true;}
   
    fetch("/api/users/settings", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name:uname,
          pass:pass,
          bio:bio,
          fav:fav,
          age:age,
          url:url,
          arr:arr
        })
       }).then(response=>{
       
        return response.json()})
     alert("Changes saved")
     document.getElementById("password").value="";
     document.getElementById("bio").value="";
     document.getElementById("favorites").value="";
     document.getElementById("birthyear").value="";
     document.getElementById("profile").value="";
    }
    }else{alert("your age is wrong")}
     
}
function gohome(){
    window.location.assign("/users/contacts");
  }