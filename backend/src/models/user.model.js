const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
 
const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"username is required"],
        unique : [true,"username must be uniqued"]
    },
    email : {
        type : String,
        required : [true,"email must be required"],
        unique : [true,"email must be uniqued"]
    },
    password:{
        type : String,
        required : [true,"password must be required"],
        select : false
    }
},{
    timestamps : true
})


userSchema.pre("save", async function(){
  try{
      if(!this.isModified("password")){
        return ;
    }
  const hash = await bcrypt.hash(this.password,10)
  this.password = hash
  }catch(err){
    console.log(err.message)
    next(error);
  }
})

userSchema.methods.comparePassword = async function(pass){
   
    return await bcrypt.compare(pass,this.password)
}


const userModel = mongoose.model("User",userSchema)
module.exports = userModel