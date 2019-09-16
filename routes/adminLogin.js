const express = require('express');
const router = new express.Router();
const Joi = require('@hapi/joi');
const {validationUserSchema} = require('../models/validationModels');
const bcrypt = require('bcrypt');
const User = require('../models/usersModel');
 
router.get('/login', (req,res) => {
    res.render('login',{error_message:'',confirm_message :''});

});

//TODO: da progettere o eliminare
router.post('/register',async (req,res)=> {
 
    //  input validation
    const resultValidation = Joi.validate(req.body,validationUserSchema);
    if (resultValidation.error){
        res.send(resultValidation.error.details[0].message);
        return;
    } 
   // get data from the form
   const { userName, userEmail, userPassword , role} = req.body;
   
   // hash password
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(userPassword,salt); // 1234paolo   1234salvo
   
   // create and save user
   const user = new User  ({
       name : userName,
       email : userEmail,
       password :hashedPassword,
       role: role
   });
   try {
       const result = await  user.save ();
       res.send({
               "userID" : userName,
               "email"  : userEmail
           });
   } catch {

       res.status(400).send(error);
   }
});

router.post('/login',async (req,res) => {
    const { name, password} = req.body;

    // user in the database
    const user = await User.findOne({ name: name});
    if (!user) return  res.render('login',{error_message:'utente inesistente', confirm_message : ''});
    

    // check if password is correct
    const validPassword = await bcrypt.compare(password,user.password);
    if (!validPassword)  return  res.render('login',{error_message:'wrong password', confirm_message : ''}) ;
    req.session.userId =  user._id;
    req.session.userName = user.name;
    res.redirect('/admin/dashboard');
   
    
});


module.exports = router;