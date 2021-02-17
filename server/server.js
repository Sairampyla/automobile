
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const social = require('./passport/passport.js')

const PORT = process.env.PORT || 3000;
const api = require('./routes/api.js');

const app = express();
app.use(cors())

const {mongoose} = require('./db.js')

app.use(bodyParser.json())

app.get('/',function(req,res){
    res.send('hello from Server im located at confidentail')
});

app.listen(PORT,()=>console.log('server works'));
app.use('/api',api)