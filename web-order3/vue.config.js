module.exports = {
    devServer: {
        proxy: {
            '/api': {   //  api 요청 처리 주소
                target: 'http://localhost:3000/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    outputDir: '../server/public',  //  배포 파일 위치
}