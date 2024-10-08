module.exports = (sequelize, DataType) => {
    const alias = 'Cart';
    const cols = {
            id:{
                type:DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            products_id:{
                type:DataType.INTEGER,
                allowNull: true
            },
            users_id:{
                type:DataType.INTEGER,
                allowNull: true
            },
            amount:{
                type:DataType.INTEGER,
                allowNull: true
            }
    };
    const config = {
        timestamps: false
    }

    const Cart = sequelize.define(alias,cols,config);

    Cart.associate = (models)=>{
        Cart.belongsTo(models.User,{
            as: 'users',
            foreignKey: 'users_id'
        });
        Cart.belongsTo(models.Product,{
            as: 'products',
            foreignKey: 'products_id'
        });
    }

    return Cart;
}