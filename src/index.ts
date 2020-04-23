import mongoose from "mongoose"
import express from "express"
import bodyParser from "body-parser"

import { UserController } from "./controllers/"

const dataBaseUrl =
  "mongodb+srv://happyq:4ea250e09802@cluster0-3isii.mongodb.net/Сhat?retryWrites=true&w=majority"

const app = express()

app.use(bodyParser.json())

const User = new UserController()

mongoose.connect(dataBaseUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})

app.get("/user/:id", User.index)
app.delete("/user/:id", User.delete)
app.get("/user/registration", User.create)

app.listen(3000, function () {
  console.log("Example app listening on port 3000!")
})
