module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: `${process.env.VUE_APP_URL}/api`,
        changeOrigin: true,
          pathRewrite: {
            '^/api': ''
        }
      }
    }
  },
  outputDir: '../backend/public',
}