/*
    id: //auto-incremented,
    name:
    description:  
*/
const defineCategory = (conn, DataTypes) => {
    const Category = conn.define("category", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING
        },
    });

    return Category;
}

module.exports = defineCategory;