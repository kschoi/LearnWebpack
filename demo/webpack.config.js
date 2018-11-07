var webpack = require('webpack');
var path = require('path');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'development',   // 빌드 모드. development || production || none
    entry: './src/index.js',  // 시작점
    output: {
        path: path.resolve(__dirname, 'dist'), //__dirname은 현재 모듈의 현재 폴더 위치
        filename: 'bundle.js'
    }, // 결과물
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader']
				use: [
                    {loader: MiniCssExtractPlugin.loader},
                    "css-loader"
                ]
            }           
        ]
    }, // loader. 특정 파일 형식을 인식
    plugins: [
        // 모든 모듈에서 사용할 수 있도록 해당 모듈을 변수로 변환
        new webpack.ProvidePlugin({ 
            $: "jquery"
        }),
        // CSS 파일을 따로 분리하여 번들링
        new MiniCssExtractPlugin({
			filename: 'style.css'
        }),
    ],// Output 시점에 관여하는 커스텀 기능
    resolve: {
        // 별칭 지정
        // alias: {
        //     Utilities: path.resolve(__dirname, 'src/utilities/')
        // },
    }, // 모듈, chunk 해석 방식을 정의
    devServer: {
        contentBase: path.resolve(__dirname),
        publicPath: "/dist/",
        watchContentBase: true,
        port: 9000
    },
};