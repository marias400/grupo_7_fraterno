module.exports = (sequelize, DataType) => {
    const alias = 'User';
    const cols = {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataType.STRING(45),
            allowNull: true
        },
        lastName: {
            type: DataType.STRING(45),
            allowNull: true
        },
        email: {
            type: DataType.STRING(45),
            allowNull: false,  // Hacer que el email sea obligatorio
            unique: true        // Agregar restricción de unicidad
        },
        phone: {
            type: DataType.STRING(45),
            allowNull: true
        },
        address: {
            type: DataType.STRING(45),
            allowNull: true
        },
        password: {
            type: DataType.STRING(100),
            allowNull: false    // Hacer que la contraseña sea obligatoria
        },
        image: {
            type: DataType.STRING(100),
            allowNull: true
        },
        admin: {
            type: DataType.BOOLEAN,
            allowNull: false,   // Asegurarse de que no sea nulo
            defaultValue: false // Por defecto, no es admin
        }
    };
    
    const config = {
        timestamps: false
    };

    const User = sequelize.define(alias, cols, config);

    User.associate = (models) => {
        User.hasMany(models.Cart, {
            as: 'cart',
            foreignKey: 'users_id'  // Asegurarse que el foreignKey coincida con el de Cart
        });
    };

    return User;
};
