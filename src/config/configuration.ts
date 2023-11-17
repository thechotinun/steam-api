export default () => ({
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  endpoint: {
    backend: process.env.ENDPOINT_BACKEND,
    frontend: process.env.ENDPOINT_FRONTEND,
  },
  upload: {
    image_type: process.env.TYPE_IMAGE,
  },
  mode: process.env.NODE_ENV,
  port: parseInt(process.env.PORT),
  database: {
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    name: process.env.DATABASE_NAME,
    nameTest: process.env.DATABASE_NAME_TEST,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    sync: process.env.DATABASE_SYNC === 'true',
  },
  jwt: {
    backend: {
      access: {
        secret: process.env.BACKEND_JWT_ACCESS_SECRET,
        expire: process.env.BACKEND_JWT_ACCESS_EXPIRE || '15m',
      },
      refresh: {
        secret: process.env.BACKEND_JWT_REFRESH_SECRET,
        expire: process.env.BACKEND_JWT_REFRESH__EXPIRE || '1h',
      },
    },
    frontend: {
      access: {
        secret: process.env.FRONTEND_JWT_ACCESS_SECRET,
        expire: process.env.FRONTEND_JWT_ACCESS_EXPIRE || '15m',
      },
      refresh: {
        secret: process.env.FRONTEND_JWT_REFRESH_SECRET,
        expire: process.env.FRONTEND_JWT_REFRESH__EXPIRE || '1h',
      },
    },
  },
  password: {
    saltRound: parseInt(process.env.PASSWORD_SALT_ROUNDS),
  },
  PER_PAGE: process.env.PER_PAGE || 30,
  graylog: {
    host: process.env.GRAYLOG_HOST,
    port: process.env.GRAYLOG_PORT,
  },
});
