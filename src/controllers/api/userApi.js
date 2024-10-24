const db = require("../../database/models");

const userApi = {
  userCount(req, res) {
    db.User.findAll().then((response) => {
      let userArray = response.map((user)=>({
          id: user.id,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
          address: user.address,
          image: `${req.protocol}://${req.get('host')}${user.image}`
      }))
      return res.json({
        count: response.length,
        users: userArray,
      });
    }).catch(error => {
      console.log(error);
      return res.status(500).json({
        error: "Hubo un error al obtener los usuarios",
      });
    });
  },

  userById(req,res){
    let {id} = req.params
    db.User.findByPk(id).then((data)=>{
      if(data !== null){
        let user = {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone,
          address: data.address,
          image: `${req.protocol}://${req.get('host')}${data.image}`
        }
        return res.json(user);
      }else{
        return res.status(404).json({
          status: 404,
          error: "No se encontro usuario asociado al id ingresado "
        })
      }
    }).catch(error => {
      console.log(error);
      return res.status(500).json({
        status: 500,
        error: "Hubo un error al obtener el usuario"
      });
    });
  },

};

module.exports = userApi;
