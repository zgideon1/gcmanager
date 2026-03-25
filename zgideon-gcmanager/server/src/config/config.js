module.exports = {
    port: process.env.PORT || 3000,
    db : {
        database: process.env.DB_NAME || 'sys',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASS || "FuckOff20$",
        options: {
            dialect: process.env.DIALECT || 'mysql',
            host: process.env.HOST || 'localhost',
            storage: './gcmanager.mysql',
            port:3306
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}