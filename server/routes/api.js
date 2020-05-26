const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const mongodb = require('mongodb');
const User = require('../models/user');
const Contact = require('../models/contact');
const mongoose = require('mongoose');
const db = 'mongodb+srv://loutweak:261751661@mongodb-ehlpm.mongodb.net/home?retryWrites=true&w=majority';


mongoose.connect(db, err => {
  if(err) {
    console.log("Error: ", err);
  } else {
    console.log("\x1b[32m", 'connected mongodb', "\x1b[0m");
  }
});



function verifyToken (req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).send('Unauthorization request')
  }
  let token = req.headers.authorization.split(' ')[1];
  if(token === 'null') {
    return res.status(401).sens('Unauthorization request')
  }
  let payload = jwt.verify(token, 'secretKey');
  if(!payload) {
    return res.status(401).send('Unauthorization request');
  }
  req.userId = payload.subject;
  next();
}

router.get('/', function (req, res) {
  res.send('Api on and worked');
});

//---------------------------------------------
//  Contacts - Route
//---------------------------------------------
// --------------------------------------------------
//  Create field in Contacts - C
// --------------------------------------------------
router.post('/contacts/add/:id', function(req, res) {
  let contactsData = req.body;
  console.log(contactsData);
  let contact = new Contact(contactsData);

  contact.save((error, contact) => {
    if(error) {
      res.status(401).send('Неверные данные')
    }
    if(!contact) {
      res.status(401).send('Пустые поля');
    }
    res.send(contact);
  });
});

// --------------------------------------------------
//  Read all fields in Contacts - R
// --------------------------------------------------
router.post('/contacts/:user_id', function(req, res) {
  let contactsData = req.body;
  // user_id: contactsData.user_id
  Contact.find({user_id: req.params.user_id}, function(error, contacts) {
    if(error) {
      res.status(401).send('База данных не доступна')
    }
    if(!contacts) {
      res.status(401).send('Пустые контакты');
    } else {
      res.send(contacts);
    }

  })
});

// --------------------------------------------------
//  Read all fields in Contacts - R
// --------------------------------------------------
router.post('/contacts/delete/:id', function(req, res) {
  let contactsData = req.body;
  // user_id: contactsData.user_id
  Contact.findOneAndDelete({_id: req.params.id}, function(error, contacts) {
    if(error) {
      res.status(401).send('База данных не доступна')
    }
    if(!contacts) {
      res.status(401).send('Пустые контакты');
    } else {
      res.send(contacts);
    }
  })
});

// --------------------------------------------------
//  Read all fields in Contacts - R
// --------------------------------------------------
router.post('/contacts/edit/:id', function(req, res, next) {
  let contactsData = req.body;
  let item = {
    name: contactsData.name,
    tel: contactsData.tel,
    user_id: contactsData.user_id
  };
  if(!contactsData.tel || !contactsData.name || !contactsData.user_id) {
    res.status(200).send('Empty contacts');
  } else {
    Contact.updateOne({ _id: req.params.id }, { $set: item }, function(error, contacts) {
      if(error) {
        res.status(401).send('База данных не доступна')
      }
      if(!contacts) {
        res.status(401).send('Пустые контакты');
      } else {
        res.send(contacts);
      }
    })
  }
});


router.post('/register', function (req, res) {
  let userData = req.body;
  let userSave = new User(userData);

  User.findOne({email: userData.email}, (err, user) => {
    if(user == null) {
      userSave.save((error, registeredUser) => {
        if(error) {
          console.log('Error: ', error);
        } else {
          let payload = { subject: registeredUser._id };
          let token = jwt.sign(payload, 'secretKey');
          res.status(200).send({ token, user_id: registeredUser._id });
        }
      })
    } else {
      res.status(401).body('Данный email: ' + userData.email + ' уже зарегистрирован!');
    }
  });


});


router.post('/login', function(req, res) {
  let userData = req.body;

  console.log('its login page in a API');

  User.findOne({"email": userData.email}, (err, user) => {
      if(err) {
        console.log(err);
      } else {
        if(!user) {
          res.status(401).send('Invalid email');
        } else {
          if(user.password !== userData.password) {
            res.status(401).send('Invalid password');
          } else {
            let payload = { subject: user._id };
            let token = jwt.sign(payload, 'secretKey');
            res.status(200).send({ token, user_id: user._id });
          }
        }
      }
  })
});


module.exports = router;
