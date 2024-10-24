const db = require("../../database/models");

const userApi = {
  userCount(req, res) {
    db.User.findAll().then((response) => {
      return res.json({
        count: response.length,
        users: response,
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
          image: `localhost:8000${data.image}`
        }
        return res.json(user);
      }else{
        return res.status(404).json({
          status: 404,
          error: "No se encontro usuario asociado al id ingresado "
        })
      }
    }).catch(
      err => console.log(err)
    )

  }
};

module.exports = userApi;
