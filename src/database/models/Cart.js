module.exports = (sequelize, DataType) => {
    const alias = 'Cart';
    const cols = {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        products_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            }
        },
        users_id: {
            type: DataType.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            }
        },
        amount: {
            type: DataType.INTEGER,
            allowNull: true
        }
    };

    const config = {
        timestamps: false
    };

    const Cart = sequelize.define(alias, cols, config);

    Cart.associate = (models) => {
        Cart.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'users_id'
        });
        Cart.belongsTo(models.Product, {
            as: 'product',
            foreignKey: 'products_id'
        });
    };

    return Cart;
};
