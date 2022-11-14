const config = {
  environment: process.env.NODE_ENV || "development",
  server: {
    port: process.env.SERVER_PORT || 4111,
  },
  app: {
    name: process.env.APP_NAME || "gst",
    url: process.env.APP_URL || "https://gst.com",
    api: process.env.APP_URL || "https://api.gst.com",
    logo: process.env.APP_LOGO || "../../public/logo.png"
  },
  database: {
    URI: process.env.DATABASE_URI || "mongodb://127.0.0.1:27017/gstdb",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    },
  },
  jwt: {
    issuer: process.env.JWT_ISSUER || "gst",
    secret: process.env.JWT_SECRET || "4@17p1PkS4qy",
    expirationHours: process.env.JWT_EXPIRATION_HOURS || 10,
  }
}

export { config }
