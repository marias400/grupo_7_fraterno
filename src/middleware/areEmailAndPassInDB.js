const db = require('../database/models');
const bcrypt = require("bcryptjs");

function areEmailAndPassInDB(req, res, next) {
    const { email, password } = req.body;

    db.User.findOne({
        where: { email: email },
    }).then((user) => {
        if (!user) {
            return res.render("users/log-in", { dbErrorEmail: '* El email no se encuentra registrado' });
        } else {
            const isMatch = bcrypt.compareSync(password, user.password);
            if (!isMatch) {
                return res.render("users/log-in", { dbErrorPassword: '* La contraseña es incorrecta' });
            }
            next();
        }
    }).catch(err => {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    });
}

module.exports = areEmailAndPassInDB;
