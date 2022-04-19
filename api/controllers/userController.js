

const User = require('../models/userModel')

module.exports=function createUser (req,res) {
    console.log(req.body)
    let newUser = new User(req.body)

    newUser.save((error,user)=>{
        if(error){
            res.status(500).send(error)
        }
        res.status(201).send(user)
    })
}


