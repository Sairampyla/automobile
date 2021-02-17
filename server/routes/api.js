  

const express = require('express')
const router = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')
const Ticket = require('../models/ticket.js')
const bcrypt = require('bcrypt')



 function verifyToken(req, res, next){
     if(!req.headers.authorization){
         return res.status(401).send('un authorized request')
     }
     let token = req.headers.authorization.split(' ')[1]
     if(token === 'null'){
         return res.status(401).send('unauthorized request')
     }
     try{
       let payload = jwt.verify(token,'secretKey')
     req.userId = payload.subject
     next()
     }catch(err){
         return res.status(401).send('un authorized request')
     }
 }

router.post('/register',(req,res)=>{
    let userData = req.body
    let user = new User (userData)

     User.find({email:req.body.email})
     .then(resp =>{
         if(resp.length!=0){
             return res.json({
                 data:[],
                 success:false,
                 msg:"Email already exists"
             })
         }
         else{
            user.save((error,registerdUser)=>{
                if(error){
                    console.log(error)
                }else{
                    let payload = {subject:registerdUser._id}
                    let token = jwt.sign(payload,'secretkey')
                    res.json({
                        data:[],
                        success:true,
                        token:token,
                    })
                }
            })
         }
     })
});

//  router.post('/login',(req,res)=>{
//       let userData = req.body
//       User.findOne({email:userData.email},(error, user)=>{
//           if(error){
//               console.log(error)
//           }else{
//               if(!user){
//                   res.status(401).send('Invalid Email')
//               }else{
//                 //   if(user.password !== userData.password){
//                 //       res.status(401).send('Invalid password')
//                 const isMatch = user.isValidPassword(userData.password)
//                  if(!isMatch){
//                     res.status(401).send('Invalid password')
//                     console.log('wrofkk')
//                   }else{
//                     let payload = {subject:user._id}
//                     let token = jwt.sign(payload,'secretkey')
//                       res.status(200).send({token})
//                     //   console.log('success');
                    
//                   }
//               }
//           }
//       })
//  })

//logging with user details
router.post('/login', (req, res, next) => {
    console.log(req.body);
    let fetchedUser;
    User.findOne({ email: req.body.email }).then(result => {
        console.log(req.body.password + "||" + result.password);
  
        if (!result) {
            return res.status(401).json({
                messege: "Authorization Failed..!!",
                result: result
            });
        }
        fetchedUser = result;
        return bcrypt.compare(req.body.password, result.password);
    }).then(result => {
        if (!result) {
            return res.status(401).json({
                messege: "Authorization Failed..!!",
                result: "false"
            });
        }
        //Creation of Token Since Credentials are matched
        const payload = {email:fetchedUser.email}
        //Secret key to issue JWT token
       // const secret = "kadndak#$%^&*dfreqofn2oa2141341";
        const token = jwt.sign(payload, 'secretkey');
        //Sending Token
        res.status(200).json({
            messege: "Authorization Success..!!",
            token: token,
            result: "true"
        });
  
    }).catch(err => {
        console.log(err);
        res.status(401).json({
            messege: "Authorization Failed..!!",
            result: "false"
        });
    });
});
     
//   router.get('/events',(req,res)=>{
//       let events =[
//           {
//               "_id":"1",
//               "name":"autoexpo",
//               "description":"worlds most famous",
//               "date":"2015-02-23T18:25:43.222"
//           },
//           {
//             "_id":"2",
//             "name":"autoexpo",
//             "description":"worlds most famous",
//             "date":"2015-02-23T18:25:43.222"
//         },
//          {
//               "_id":"3",
//               "name":"autoexpo",
//               "description":"worlds most famous",
//               "date":"2015-02-23T18:25:43.222"
//           },
//           {
//             "_id":"4",
//             "name":"autoexpo",
//             "description":"worlds most famous",
//             "date":"2015-02-23T18:25:43.222"
//         },
//         {
//             "_id":"5",
//             "name":"autoexpo",
//             "description":"worlds most famous",
//             "date":"2015-02-23T18:25:43.222"
//         },
//         {
//             "_id":"6",
//             "name":"autoexpo",
//             "description":"worlds most famous",
//             "date":"2015-02-23T18:25:43.222"
//         }
//       ]
//        res.json(events)
//   })
//   router.get('/special', verifyToken,(req,res)=>{
//     let events =[
//         {
//             "_id":"1",
//             "name":"autoexpo",
//             "description":"worlds most famous",
//             "date":"2015-02-23T18:25:43.222"
//         },
//         {
//           "_id":"2",
//           "name":"autoexpo",
//           "description":"worlds most famous",
//           "date":"2015-02-23T18:25:43.222"
//       },
//        {
//             "_id":"3",
//             "name":"autoexpo",
//             "description":"worlds most famous",
//             "date":"2015-02-23T18:25:43.222"
//         },
//         {
//           "_id":"4",
//           "name":"autoexpo",
//           "description":"worlds most famous",
//           "date":"2015-02-23T18:25:43.222"
//       },
//       {
//           "_id":"5",
//           "name":"autoexpo",
//           "description":"worlds most famous",
//           "date":"2015-02-23T18:25:43.222"
//       },
//       {
//           "_id":"6",
//           "name":"autoexpo",
//           "description":"worlds most famous",
//           "date":"2015-02-23T18:25:43.222"
//       }
//     ]
//      res.json(events)
// })

 router.get('/events',async(req,res)=>{
      try{
              const Sai = await Ticket.find()
              res.json(Sai)
      }catch(err){
          res.send('error '+err)
      }
 })

 router.get('/special', verifyToken,async(req,res)=>{
    try{
            const Sai = await Ticket.find()
            res.json(Sai)
    }catch(err){
        res.send('error '+err)
    }
})

router.post('/data',async(req,res)=>{
    const Sai = new Ticket({
       id:req.body.id,
       name:req.body.name,
       description:req.body.description,
       date:req.body.date
    })
    try{
        const a1 = await Sai.save()
        res.json(a1)
    }catch(err){
        res.send(err)
    }
})
module.exports = router