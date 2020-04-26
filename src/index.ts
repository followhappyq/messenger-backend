import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"

import {
  UserController,
  DialogController,
  MessageController,
} from "./controllers"

import { updateLastSeen, checkAuth } from "./middlewares"

const app = express()
dotenv.config()
const dataBaseUrl =
  "mongodb+srv://happyq:4ea250e09802@cluster0-3isii.mongodb.net/Chat?retryWrites=true&w=majority"

app.use(bodyParser.json())
app.use(updateLastSeen)
app.use(checkAuth)

const User = new UserController()
const Dialog = new DialogController()
const Messages = new MessageController()

mongoose.connect(dataBaseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

app.get("/user/:id", User.show)
app.delete("/user/:id", User.delete)
app.post("/user/registration", User.create)
app.post("/user/login", User.login)

app.get("/dialogs", Dialog.index)
app.delete("/dialogs/:id", Dialog.delete)
app.post("/dialogs", Dialog.create)

app.get("/messages", Messages.index)
app.post("/messages", Messages.create)
app.delete("/messages/:id", Messages.delete)

app.listen(3000, function () {
  console.log("Example app listening on port 3000!")
})
