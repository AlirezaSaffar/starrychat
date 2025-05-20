const user = require('../models/user')
const express = require("express")
const messages = require('../models/messages')
const { ObjectId } = require('mongodb')
const joi = require("joi")
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
class userscontroler{
    static search = async(req,res)=>{
      var i;
      var txt,check;
      check=false;
      try{
    var n = req.verifieduser
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
    res.json("you already have this member in your contacts")
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
res.json("you added a new contact")
      }else{ res.json("there is no contact with this name")  }


}

    static sendmessage =async(req,res)=>{
var sender= req.verifieduser
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
      var verifieduser= req.verifieduser
      var us = await user.find();
      var i;
      for(i in us){
        if(us[i]["username"]==verifieduser){
          var txt = us[i]["contacts"];
          break;
        }     }
        var data={
          txt:txt,
          name:verifieduser
        }
        res.json(data);
    }

    static refresh=async(req,res)=>{
var sender=req.verifieduser
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
res.json(refreshedmessages);
}

    

    static settings=async(req,res)=>{
      var name= req.verifieduser
      
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
