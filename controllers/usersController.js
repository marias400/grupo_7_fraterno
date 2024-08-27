const datasource = require("../services/inventoryData");
const { validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../services/User');

 const usersController = {
 async loginPage(req, res) {
  
    if(req.session.user ){
      res.send("ya estas logueado con tu email" + req.session.user);
    }else{
      res.render("users/log-in");
    }
  },

  async loginSuccesful(req, res){
    let {email,password} = req.body;
    let Users = await datasource.loadUsers();
    let errors = validationResult(req);
  
   let userFind = Users.find((u) => u.email === email);
   if (userFind && userFind.password === password) {
     req.session.user = userFind.email;
     res.redirect("/home"); 
   } else {
      if(!errors.isEmpty()){
        res.render("users/log-in", { errors: errors.array() } );
      }
        
   }
  },

 async registerPage(req, res) {
    res.render("users/register");
  },

  async processRegister(req, res) {
   let newUser = {...req.body};
     if(req.file){
      newUser = {...req.body, image:req.file.filename};
     }else{
      newUser.image = "/products/default.png";
     }
     newUser.password = bcrypt.hashSync(req.body.password, 10);
    let usuario = User.create(newUser) ;
    res.send(usuario);
  },


};

module.exports = usersController;

