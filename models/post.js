const { DataTypes, Model } = require('sequelize');
// import database connection
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_id: {
            type: DataTypes.STRING,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        // pass in database connection
        sequelize,
        // don't pluralize names of database tables
        freezeTableName: true,
        // use underscore instead of camelcase
        underscored: true,
        // forces the model name to stay lowercase in the database
        modelName: 'post'
    }
);

module.exports = Post;