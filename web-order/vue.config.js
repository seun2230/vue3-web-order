// module.exports = {
//  devServer: {
//    proxy: {
//      '/': {
//        target: 'http://localhost:3000/',
//        changeOrigin: true,
//        pathRewrite: {
//          '^/api': ''
//        }
//      }
//    }
//  },
//  outputDir: '../backend/public',
//  configureWebpack: {
//    module: {
//      rules: [{
//        test: /\.mjs$/,
//        include: /node_modules/,
//        type: "javascript/auto"
//      }]
//    },
//  },
// }