require('dotenv').config()

module.exports = {
    HOST: process.env.HOST,
    USER: process.env.MYSQLUSER,
    PASSWORD: process.env.PASSWORD,
    DB: process.env.DB,
    PORT: process.env.MYSQLPORT,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };