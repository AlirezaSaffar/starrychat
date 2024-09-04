const express = require("express");
const mongoose = require("mongoose")
const path = require("path")
const userscontroler = require("./controler/usercontroler")
const middleware =require("./middleware/checktoken")
require("dotenv").config()
const app = express();

const PORT =  3001

MONGO_URI ="mongodb+srv://alisy5555:7aE7LklAZengddnF@chatroom.nooh0er.mongodb.net/?retryWrites=true&w=majority&appName=chatroom"

app.use(express.json())
app.use(express.static("./public"))



app.get("/users/search", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "search.html"))
})

app.get("/users/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "signup.html"))
})

app.get("/users/login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"))
})

app.get("/users/contacts", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "contacts.html"))
})

app.get("/users/chatroom", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "chatroom.html"))
})

app.get("/users/user", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "user.html"))
})

app.get("/users/settings", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "setting.html"))
})

app.post("/api/users/refresh", userscontroler.refresh) 

app.post("/api/users/chatroom", userscontroler.sendmessage) 

app.post("/api/users/signup", userscontroler.signup) 

app.post("/api/users/login", userscontroler.login)

app.post("/api/users/search", userscontroler.search)

app.post("/api/users/contacts", userscontroler.showcontacts)

app.post("/api/users/user", userscontroler.userinfo)

app.post("/api/users/settings", userscontroler.settings)


const connectDB = (url) => {
    return mongoose.connect(url);
}
const start = async () => {
    try {
        await connectDB(MONGO_URI);
        app.listen(PORT, () => console.log("listening..."))
    } catch (err) {
        console.log(err)
    }
}

start()
