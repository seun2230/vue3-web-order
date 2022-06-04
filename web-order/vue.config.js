module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import '../assets/scss/_components.scss';
          @import '../assets/scss/_main.scss';
          @import '../assets/scss/_mixin.scss';
          @import '../assets/scss/_variables.scss';
          `
      }
    }
  },
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