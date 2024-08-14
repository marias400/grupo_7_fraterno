const datasource = require("../services/inventoryData");
const { validationResult} = require('express-validator');

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
};

module.exports = usersController;

