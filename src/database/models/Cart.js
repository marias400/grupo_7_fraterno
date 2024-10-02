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
            allowNull: false,  // Asumir que debe tener un producto
            references: {
                model: 'products',  // Asegúrate que coincida con la tabla de productos
                key: 'id'
            }
        },
        users_id: {
            type: DataType.INTEGER,
            allowNull: false,  // Asumir que debe tener un usuario
            references: {
                model: 'users',  // Asegúrate que coincida con la tabla de usuarios
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
            as: 'user',           // Singular porque un carrito pertenece a un solo usuario
            foreignKey: 'users_id'
        });
        Cart.belongsTo(models.Product, {
            as: 'product',        // Singular porque un carrito pertenece a un solo producto
            foreignKey: 'products_id'
        });
    };

    return Cart;
};
