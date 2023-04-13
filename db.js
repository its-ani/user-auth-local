const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect : 'sqlite',
    storage : __dirname + '/users.db'
})

const Users = db.define('user', {
    id:{
        type: Sequelize.DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    username:{
        type: Sequelize.DataTypes.STRING(30),
        unique: true,
        allowNull: false
    },
    email:{
        type: Sequelize.DataTypes.STRING(30),
    },    
    password:{
        type: Sequelize.DataTypes.STRING(30),
        allowNull: false
    }
})