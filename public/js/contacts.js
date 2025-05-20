function setcookie(name, value, exday) {
  var date = new Date();
  date.setTime(date.getTime() + exday * 24 * 60 * 60000);
  var exp = "expires=" + date.toGMTString();
  document.cookie = name + "=" + value + ";" + exp + ";path=/";
}

function getcookie(name) {
  var cname = name + "=";
  var decoded = decodeURIComponent(document.cookie);
  var parts = decoded.split(";");
  for (var i = 0; i < parts.length; i++) {
    var c = parts[i].trim();
    if (c.indexOf(cname) === 0) return c.substring(cname.length);
  }
  return "";
}

var mywidth = window.screen.width;
if (mywidth < 393) {
  var element = document.getElementById("kolbody");
  var ael = document.getElementsByTagName("a");
  var br = document.createElement("br");
  element.insertBefore(br, ael[2]);
  br = document.createElement("br");
  element.insertBefore(br, ael[2]);
}

var token = getcookie("login");
if (!token) {
  window.location.assign("/users/login");
} else {
  fetch("/api/users/contacts", {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Authorization": "Bearer " + token
    }
  })
    .then(res => res.json())
    .then(data => {
      var username = data.name;
      document.getElementById("myprofile").href = "/users/user?nameuser=" + username;
      var cons = data.txt.split("-");
      var element = document.getElementById("kolbody");
      var x = document.getElementById("divcon");
      for (var i = 1; i < cons.length; i++) {
        var a = document.createElement("a");
        a.href = "/users/chatroom?nameuser=" + cons[i];
        a.className = "contacts";
        a.innerHTML = cons[i];
        element.insertBefore(a, x);
      }
    });
}

function exit() {
  setcookie("login", "", -1);
  window.location.assign("/users/login");
}

function setconcookie(obj) {
  setcookie("contact", obj.innerHTML, 1);
}

function mover(obj) {
  obj.style.backgroundColor = "grey";
}

function mout(obj) {
  obj.style.backgroundColor = "indigo";
}
