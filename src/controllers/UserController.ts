import express from "express"
import { UserModel } from "../schemas"

class UserController {
  index(req: express.Request, res: express.Response) {
    const id: string = req.params.id
    UserModel.findById(id, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: "Not found",
        })
      }
      res.json(user)
    })
  }

  getMe() {
    //return info about self
  }

  create(req: express.Request, res: express.Response) {
    const postData = {
      email: req.body.email,
      login: req.body.login,
      password: req.body.password,
    }
    const user = new UserModel(postData)
    user
      .save()
      .then((obj: any) => {
        res.json(obj)
      })
      .catch((reason) => {
        res.json(reason)
      })
  }

  delete(req: express.Request, res: express.Response) {
    const id: string = req.params.id
    UserModel.findOneAndRemove({ _id: id })
      .then((user) => {
        if (user) {
          res.json({
            message: `User ${user.login} deleted`,
          })
        }
      })
      .catch((err) => {
        res.json({
          message: err,
        })
      })
  }
}

export default UserController
