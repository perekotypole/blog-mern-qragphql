export const PORT = 4040
export const environment = {
  development: {
    serverURL: `http://localhost:${PORT}/`,
    dbString: 'mongodb://localhost:27017/blog',
  },
  production: {
    serverURL: `http://localhost:${PORT}/`,
    dbString: 'mongodb://localhost:27017/blog-prod',
  },
}
