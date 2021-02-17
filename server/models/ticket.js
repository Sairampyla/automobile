


const mongoose = require('mongoose')

const Schema = mongoose.Schema
const userSchema = new Schema({
    id:String,
    name:String,
    description:String,
    date:String
})


module.exports = mongoose.model('ticket',userSchema,'tickets')


  