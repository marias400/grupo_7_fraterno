module.exports = (sequelize, DataType) => {
    const alias = 'Product';
    const cols = {
            id:{
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name:{
                type:DataType.STRING(45),
                primaryKey: true,
            },
            description:{
                type:DataType.STRING(200),
                allowNull: true
            },
            ingredients:{
                type: DataType.STRING(45),
                allowNull: true
            },
            image:{
                type: DataType.STRING(45),
                allowNull: true
            },
            category:{
                type: DataType.STRING(45),
                allowNull: true
            },
            suitability:{
                type: DataType.STRING(45),
                allowNull: true
            },
            size:{
                type: DataType.STRING(45),
                allowNull: true
            },
            price:{
                type: DataType.STRING(45),
                allowNull: true
            },
            stock:{
                type: DataType.INTEGER.UNSIGNED,
                allowNull: true
            }
    };
    const config = {
        timestamps: false
    }

    const Product = sequelize.define(alias,cols,config);

    Product.associate = (models)=>{
        Product.hasMany(models.Cart, {
            as: 'carts',
            foreignKey: 'products_id'
        })
    }

    return Product;
}