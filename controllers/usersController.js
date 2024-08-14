const datasource = require("../services/inventoryData");

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
   //console.log(Users);
  
   let userFind = Users.find((u) => u.email === email);
    console.log(userFind + " password " + password);
   if (userFind && userFind.password === password) {
     req.session.user = userFind.email;
  //res.send(" usuario: " + userFind.email + password );
     res.redirect("/home"); 
   } else {
    console.log(userFind + " email " + email );
  res.send("contraseña incorrecta ");
     //res.render("users/log-in", { error: "Email o contraseña incorrectos" });
   }
  },

 async registerPage(req, res) {
    res.render("users/register");
  },
};

module.exports = usersController;

