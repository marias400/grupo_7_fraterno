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
};

module.exports = userApi;
