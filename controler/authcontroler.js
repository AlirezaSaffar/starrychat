const user = require('../models/user')
const express = require("express")
const messages = require('../models/messages')
const { ObjectId } = require('mongodb')
const joi = require("joi")
const bycrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
class authController {
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
}

module.exports = authController