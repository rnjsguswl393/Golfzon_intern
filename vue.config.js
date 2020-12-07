module.exports = {
  lintOnSave : false,
  css: {
    sourceMap: process.env.NODE_ENV !== 'production'
  },
  devServer: {
    port: process.env.port || 8080
  }
};
