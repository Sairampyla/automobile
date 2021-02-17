
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/show',{useNewUrlParser: true,useUnifiedTopology: true},(err)=>{
    if(!err)
      console.log('Mongodb connection succeedd');
      else
      console.log('Error in your connection: '+JSON.stringify(err,undefined,2))
});
