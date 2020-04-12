const path = require('path');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

//Code below for Testing: 
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' });
}

module.exports = (env) => {
    const isProduction = env === 'production';
    return {
        entry: ['babel-polyfill', './src/index.js'],
        output: {
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js'
        },
        module: {
            rules: [{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: [MiniCSSExtractPlugin.loader, {
                    loader: 'css-loader',
                    options: { sourceMap: true }
                },
                {
                    loader: 'sass-loader',
                    options: { sourceMap: true }
                }]
            }
            ]
        },
        plugins: [new MiniCSSExtractPlugin({
            filename: 'styles_bundle.css',
            chunkFilename: "styles/[id].css"
        })
        ,
        new webpack.DefinePlugin({
            'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
            'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
            'process.env.FIREBASE_DATABASEURL': JSON.stringify(process.env.FIREBASE_DATABASEURL),
            'process.env.FIREBASE_PROJECTID': JSON.stringify(process.env.FIREBASE_PROJECTID),
            'process.env.FIREBASE_STORAGEBUCKET': JSON.stringify(process.env.FIREBASE_STORAGEBUCKET),
            'process.env.FIREBASE_MESSAGINGSENDERID': JSON.stringify(process.env.FIREBASE_MESSAGINGSENDERID),
            'process.env.FIREBASE_APPID': JSON.stringify(process.env.FIREBASE_APPID),
            'process.env.FIREBASE_MEASUREMENTID': JSON.stringify(process.env.FIREBASE_MEASUREMENTID)
        })
    ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public'),
            historyApiFallback: true,
            publicPath: '/dist/'
        }
    }
}