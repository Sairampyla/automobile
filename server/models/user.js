
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema
const userSchema = new Schema({
    email:String,
    password:String,
    token:String,
    provider:String,
    provider_id:String
})

userSchema.pre('save',async function (next){
       try{
           const salt = await bcrypt.genSalt(10)
           const hasedPassword = await bcrypt.hash(this.password,salt)
           this.password = hasedPassword
           next()
       }catch(error){
           next(error)
       }
})
// userSchema.methods.isValidPassword = async function(password){
//     try{
//       return await bcrypt.compare(password,this.password)
//     }catch(error){
//         throw error
//     }
// }
// // userSchema.pre('validate',async function (next){
//     try{
//         const success = await bcrypt.compare(this.password)
//         this.password  = success
//         next()
//     }catch(error){
//         next(error)
//     }
// })



module.exports = mongoose.model('user',userSchema,'users')