const usersController = {
  loginPage: (req, res) => {
    res.render("users/log-in");
  },

  registerPage: (req, res) => {
    res.render("users/register");
  },
};

module.exports = usersController;
