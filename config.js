const env = process.env;
//urlitu web kita
const config = {
    url: env.URL,
    host: env.HOST,
    port: env.PORT,
    db: {
        host: "localhost",
        user: "root",
        password: "",
        database: "products",
        // connectTimeout: env.DB_TIMEOUT,
    },
    mail: {
        host: 'keosyaro@gmail.com',
        port: 587,
        user: 'keosyaro@gmail.com',
        password: 535210013,
    },
    telegram: env.TG_BOT_TOKEN,
};

module.exports = config;