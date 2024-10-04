const db = require('../database/models');

function areEmailAndPassInDB(req, res, next) {
    const { email, password } = req.body;

    db.User.findOne({
        where: { email: email },
    }).then((user) => {
        if (!user) {
            res.render("users/log-in", { dbErrorEmail: '* Email no se encuentra registrado' });
        } else if (password != user.password) {
            res.render("users/log-in", { dbErrorPassword: '* La contraseña es incorrecta' });
        } else {
            next();
        }
    });
}

module.exports = areEmailAndPassInDB;