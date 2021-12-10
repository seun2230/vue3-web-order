module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
      }
    }
  },
  outputDir: './server/public',  //  배포 파일 위치
}