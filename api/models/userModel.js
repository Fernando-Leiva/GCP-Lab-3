

// Import mongoose
    const mongoose = require("mongoose");

// Declare schema and assign Schema class
    const Schema = mongoose.Schema;

    const UserSchema = new Schema({
        
        name:{
            type:String
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String
        },
        rol:{
            type:String
        }

    })

    module.exports = mongoose.model("userModel", UserSchema);