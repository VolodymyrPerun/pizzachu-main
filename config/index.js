module.exports = {
    PORT: process.env.PORT || 5000,

    ADMIN_ACCESS: process.env.ADMIN_ACCESS || '$2b$10$I6qMyyKzvgRI3myiLUbVNeAuwblySlalAtAm4Sbxh38QIohj6qKG',
    ADMIN_REFRESH: process.env.ADMIN_REFRESH || '$2b$10$fPeg26ShoEa7bVTjn1x2EuMZTDfEPDivAUxxs81WLowPRbItaMNLm',
    JWT_ADMIN_SECRET_TIME: process.env.JWT_ADMIN_SECRET_TIME || '1110d',
    JWT_ADMIN_REFRESH_SECRET_TIME: process.env.JWT_ADMIN_REFRESH_SECRET_TIME || '1110d',

    JWT_SECRET: process.env.JWT_SECRET || '$2b$10$Gg91pyMdkpIwT2MRMl7xxObPSOAQpS2Gnt29indH8Q4jxpiSfPup2',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '$2b$10$m6z7akGidsLTGt5hFcIKJuPIaseru7aQNnsZ1rDdwOMtHkHXNjFq',
    JWT_SECRET_TIME: process.env.JWT_SECRET_TIME || '1110d',
    JWT_REFRESH_SECRET_TIME: process.env.JWT_REFRESH_SECRET_TIME || '1110d',

    SELLER_ACCESS: process.env.SELLER_ACCESS || '$2b$10$IET7MrgAhz3qFuWTNV9JJeCX4WQluOlNsqN1jIxjbZMrZtne5cX5i',
    SELLER_REFRESH: process.env.SELLER_REFRESH || '$2b$10$W1lTBOd/geN9X3LKLxmYHeZun9KxIpE5Q3m4mkgzkzwkKOPUQ15u',
    JWT_SELLER_SECRET_TIME: process.env.JWT_SELLER_SECRET_TIME || '1110d',
    JWT_SELLER_REFRESH_SECRET_TIME: process.env.JWT_SELLER_REFRESH_SECRET_TIME || '1110d',

    JWT_SECRET_CHANGE_PASSWORD: process.env.JWT_SECRET_CHANGE_PASSWORD || 'laksfklaf124124214_@!1_1424nkfalkklwegngwlll3weewf',
    TOKEN_FOR_RESET_PASSWORD_LIFE: process.env.TOKEN_FOR_RESET_PASSWORD_LIFE || '1110d',

    DB_NAME: process.env.DB_NAME || 'shop',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || 'root',
    DB_DIALECT: process.env.DB_DIALECT || 'mysql',

    ROOT_EMAIL_SERVICE: process.env.ROOT_EMAIL_SERVICE || 'gmail',
    ROOT_EMAIL_LOGIN: process.env.ROOT_EMAIL_LOGIN || 'misterbin700007@gmail.com',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || '700007misterbin700007',

    SITE: process.env.SITE || 'https://volodymyrperun.github.io/upqode-task-master/',

    FRONT_END_URL: process.env.FRONT_END_URL || 'http://localhost:3000',

    CRON_JOB_PERIOD: process.env.CRON_JOB_PERIOD || '0 0 * * *',

    WHITE_LIST: process.env.WHITE_LIST || 'http://localhost:3000;http://localhost:5000',
    ENV: process.env.ENV || 'DEV',
}
