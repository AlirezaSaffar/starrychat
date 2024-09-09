const user = require('../models/user')
const express = require("express")
const messages = require('../models/messages')
const { ObjectId } = require('mongodb')
const joi = require("joi")
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
class userscontroler{
    static signup = async(req,res)=>{
        var i;
        var us = await user.find();
       const schema ={
        username : joi.string().min(4).max(50).required(),
        password :joi.string().min(4).max(50).required()
}
          var hashpassword = await bycrypt.hash(req.body.password,10)
          var check=true;
          var isvalid= joi.object(schema).validate(req.body)
          for(i in us){
              if(us[i]["username"]==req.body.username){check = false;}
          }
          var data=true;
          if(check){
           if(isvalid.error) return
            var newuserdata= {
              username:req.body.username,
              password:hashpassword
            }
          const newuser = new user(newuserdata);
        try{
         await newuser.save();
      }catch{
          console.log("err")
        } 
           }else{
             data = false;
           }
           var js= {d :data}
           res.json(js).send()
}

    static login = async(req,res)=>{
        var i;
        var us = await user.find();
        var check = false;
        for(i in us){
            if(us[i]["username"]==req.body.username){
              check = bycrypt.compareSync(req.body.password,us[i]["password"]);
           }
        }
        if(check){
         var token= jwt.sign(req.body.username,"mysecretkey58963");
         }else{
         var token = false;
        }
         res.json(token).send();
}

    static search = async(req,res)=>{
      var i;
      var txt,check;
      check=false;
      try{
    var n = jwt.verify(req.body.me,"mysecretkey58963")
    }catch(err){
      console.log(err)
    }
      var us = await user.find();
      var t;
      for(i in us){
        if(us[i]["username"]==req.body.friend){
         check=true;
         t = us[i]["contacts"];
         break;
        }
      }
      if(check){
var contacts = t.split('-');
for(i in contacts){
  if(contacts[i]==n){ 
    res.json("you already have this member in your contacts").send()
    return;}
}
t= t+"-"+n;

await user.updateOne({ username:req.body.friend},{ $set: {contacts: t} } );

for(i in us){
  if(us[i]["username"]==n){
t = us[i]["contacts"];
break;
  }
}
t=t+"-"+req.body.friend;
await user.updateOne({ username:n },{ $set: {contacts: t} } );
res.json("you added a new contact").send()
      }else{ res.json("there is no contact with this name").send()  }


}

    static sendmessage =async(req,res)=>{
var sender= jwt.verify(req.body.sender,"mysecretkey58963");
var user1= sender;
var user2=req.body.receiver;
var whofirst=0;
var j;
if(user2.length>user1.length){whofirst=2;}
if(user2.length<user1.length){whofirst=1;}
if(user2.length==user1.length){
  for(j=0;j<user1.length;j++){
    if(user1.charAt(j)>user2.charAt(j)){
      whofirst=1;
      break;
    }
    if(user1.charAt(j)<user2.charAt(j)){
      whofirst=2;
      break;
    }

  }
}
var tablename;
if(whofirst==1){tablename=user1+"-"+user2;}
if(whofirst==2){tablename=user2+"-"+user1;}
var chatroomtable= mongoose.model(tablename,messages);
var newmessage ={
  message:req.body.message,
  sender:sender,
  receiver:req.body.receiver
}
const newtable = new chatroomtable(newmessage);
        try{
         await newtable.save();
      }catch{
          console.log("err")
        }

    
}

    static showcontacts= async(req,res)=>{
      var us = await user.find();
      var i;
      for(i in us){
        if(us[i]["username"]==jwt.verify(req.body.name,"mysecretkey58963")){
          var txt = us[i]["contacts"];
          break;
        }     }
        var data={
          txt:txt,
          name:jwt.verify(req.body.name,"mysecretkey58963")
        }
        res.json(data).send();
    }

    static refresh=async(req,res)=>{
var sender=jwt.verify(req.body.sender,"mysecretkey58963")
var j;
var whofirst=0;
var user1= sender;
var user2=req.body.receiver;
if(user2.length>user1.length){whofirst=2;}
if(user2.length<user1.length){whofirst=1;}
if(user2.length==user1.length){
  for(j=0;j<user1.length;j++){
    if(user1.charAt(j)>user2.charAt(j)){
      whofirst=1;
      break;
    }
    if(user1.charAt(j)<user2.charAt(j)){
      whofirst=2;
      break;
    }

  }
}
var tablename;
if(whofirst==1){tablename=user1+"-"+user2;}
if(whofirst==2){tablename=user2+"-"+user1;}
var chatroomtable= mongoose.model(tablename,messages);
var mess= await chatroomtable.find();
var sw=new Array();
var messarray=new Array();
var i;
var receiver= req.body.receiver
var k=0;
for(i in mess){
if(mess[i]["sender"]==sender&&mess[i]["receiver"]==receiver){
  messarray[k]=mess[i]["message"]
  sw[k]=true
  k++
}
if(mess[i]["receiver"]==sender&&mess[i]["sender"]==receiver){
  messarray[k]=mess[i]["message"]
  sw[k]=false
  k++
}

}
var refreshedmessages={
  messages: messarray,
  sw:sw
}
res.json(refreshedmessages).send();

    }

    static userinfo=async(req,res)=>{
     var name= req.body.name;
     var us=await user.find();
     var i;
     for(i in us){
      if(us[i]["username"]== name){
        var data = {
          bio: us[i]["bio"],
          birthyear : us[i]["birthyear"],
          favorites : us[i]["favorites"],
          url:us[i]["profile"]

        }
        break;
      }
     }
res.json(data).send();
    }

    static settings=async(req,res)=>{
      var name= jwt.verify(req.body.name,"mysecretkey58963");
      
          if(req.body.arr[0]){
            await user.updateOne({ username:name},{ $set: {password: req.body.pass  } } );
          }
          if(req.body.arr[1]){
            await user.updateOne({ username:name},{ $set: {bio: req.body.bio  } } );
          }
          if(req.body.arr[2]){
            await user.updateOne({ username:name},{ $set: {favorites: req.body.fav  } } );
          }
          if(req.body.arr[3]){
            await user.updateOne({ username:name},{ $set: {birthyear: req.body.age  } } );
          }
          if(req.body.arr[4]){
            await user.updateOne({ username:name},{ $set: {profile: req.body.url  } } );
          }
          

        
      

    }
}

module.exports = userscontroler
