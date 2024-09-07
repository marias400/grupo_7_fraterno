module.exports = (sequelize, DataType) => {
    const alias = 'User';
    const cols = {
            id:{
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstName:{
                type:DataType.STRING(45),
                allowNull: true
            },
            lastName:{
                type:DataType.STRING(45),
                allowNull: true
            },
            email:{
                type: DataType.STRING(45),
                allowNull: true
            },
            phone:{
                type: DataType.STRING(45),
                allowNull: true
            },
            address:{
                type: DataType.STRING(45),
                allowNull: true
            },
            password:{
                type: DataType.STRING(100),
                allowNull: true
            },
            image:{
                type: DataType.STRING(100),
                allowNull: true
            },
            admin:{
                type: DataType.BOOLEAN,
                allowNull: false
            }
    };
    const config = {
        timestamps: false
    }

    const User = sequelize.define(alias,cols,config);

    User.associate = (models)=>{
        User.hasMany(models.Cart, {
            as:'carts',
            foreignKey: 'users_id'
        })
    }

    return User;
}