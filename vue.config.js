module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/apollo-vue' : '/',
    // publicPath: '/',
	devServer : {
        historyApiFallback: true,
        noInfo: true,
        overlay: true,
        public: 'http://192.168.0.199:1234',
        allowedHosts: ['vmhost','192.168.0.199'],
        proxy: {
            '/api_v1': {
                // target: 'http://192.168.0.199:5000',
                target: 'http://dry-citadel-24215.herokuapp.com/',
                secure: false
            }
        },
        port: 1234
    },
    pluginOptions: {
        webpackBundleAnalyzer: {
          openAnalyzer: false
        }
    },
    configureWebpack:
        { externals: {
            formulajs: 'formulajs'
        }
    }
}