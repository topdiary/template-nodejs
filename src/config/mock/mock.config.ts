const defaultOptions = {
  host: process.env.APP_SERVICE_HOST,
  port: process.env.APP_SERVICE_PORT,
  greetingTimeout: 1000 * 10, // 10 sec.
  auth: {
    user: process.env.APP_SERVICE_USERNAME,
    pass: process.env.APP_SERVICE_PASSWORD,
  },
}

const production = {
  ...defaultOptions,
}
const development = {
  ...defaultOptions,
}

export default () => ({
  mock: process.env.APP_ENV === 'production' ? production : development,
})
