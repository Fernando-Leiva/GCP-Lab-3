const express = require('express')
const app = express()

const User = require('./api/models/userModel')

require("./config/db");

const port = process.env.PORT || 4000

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.get('/version',(req,res)=>{
    res.status(200).json({version:'1.0.0'})
})

app.get('/users',(req,res)=>{
    const admin = req.body
    User.find({rol:'admin',email:admin.email,password:admin.password},(error,adminUser)=>{
        if(error)  return res.status(403).json(error)
        
        if(adminUser.length > 0){
            User.find({},(error,users)=>{
                if(error) res.status(400).json(error)
                res.status(200).json(users)
            })
        }else{
            res.status(403).json({message:'El usuario no tiene privilegios de administrador'})
        }
    })
})

app.post('/create',(req,res)=>{
    let newUser = new User(req.body)
    newUser.save((error,user)=>{
        if(error){
            res.status(500).send(error)
        }
        res.status(201).send(user)
    })
})

app.post('/singIn',(req,res)=>{
    const user = req.body
    console.log(user)
    User.find({email:user.email},(err,authUser)=>{
        if(authUser.length > 0){
            if (user.password === authUser[0].password){
                res.status(200).send('Bienvenido!!')
            }else{
                res.status(400).send('Verifique su contraseña')
            }
        }
        if(err) res.status(404).json({message:'Not found'})
    })
})


app.put('/user',(req,res)=>{
    const user = req.body
    console.log(user)
    User.findOneAndUpdate({email:user.email},user,{new:false},(error,userUpdated)=>{
        if(error) res.status(400).json(error)
        res.status(200).json(user)
    })
})

app.delete('/user',(req,res)=>{
    const user = req.body
    User.deleteOne({email: user.email},(error,deleteUser)=>{
        
        if(error) res.status(400).json(error)

        res.status(200).json(deleteUser)
    })
})


app.listen(port,()=>{
    console.log(`server up and running!`)
})