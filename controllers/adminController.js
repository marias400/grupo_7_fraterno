const adminController = {
    loginPage: (req, res) => {
        res.render('admin/log-in');
    },
    
    productManagementPage: (req, res) => {
        res.render('admin/product-management');
    },
}

module.exports = adminController;