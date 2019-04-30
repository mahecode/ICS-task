const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const RegisterValidation = require('../validation/register');
const LoginValidation = require('../validation/login');

const User = require('../models/user');

router.post('/register', (req, res)=>{
    const { errors, isValid } = RegisterValidation(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
    User.findOne({email: req.body.email}).then( user => {

        if(user){
            return res.status(400).json({emailExist: 'Email already exist !'});
        }
        const newUser = User({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password,
            professionalInfo: {
                NumberOfBooks: req.body.professionalInfo['NumberOfBooks'],
                language: req.body.professionalInfo['language'],
                bookSample: req.body.professionalInfo['bookSample'],
                categories: req.body.professionalInfo['categories'],
            }
        })
    
        bcrypt.genSalt(10, (err, salt)=>{
            bcrypt.hash(newUser.password, salt, (err, hash)=>{
                if(err) throw err;
                newUser.password = hash;
                newUser
                    .save()
                    .then(user=> res.json(user))
                    .catch(err => console.log(err));
    
            })
        })
    })
});

router.post('/login', (req, res)=>{
    const {errors, isValid} = LoginValidation(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
        .then( user=>{
            if(!user){
                return res.status(400).json({emailnotfound: "user doesn't exist!"});
            }
            bcrypt.compare(password, user.password).then( isMatch => {
                if(!isMatch){
                    return res.status(400).json({passworderror: "Check your password"});
                }
                const payload = {
                    id: user.id,
                    fname: user.fname,
                    lname: user.lname,
                    professionalInfo: {
                        NumberOfBooks: user.professionalInfo.NumberOfBooks,
                        language: user.professionalInfo.language,
                        bookSample: user.professionalInfo.bookSample,
                        categories: user.professionalInfo.categories
                    }
                }
                jwt.sign(
                    payload,
                    'secret',
                    {
                      expiresIn: 86400 // 1 year in seconds
                    },
                    (err, token) => {
                      res.json({
                        success: true,
                        token: "Bearer " + token
                      });
                    }
                  );
            })
        })
        .catch( err=> {
            console.log(err);
        });
})

module.exports = router;