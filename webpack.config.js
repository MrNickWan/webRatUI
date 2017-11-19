var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

var webpackConfig = {
    context: __dirname + '/ui',
    entry: './app.entry.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/static',
        filename: 'bundle.js'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                exclude: /(node_modules|bower_components)/
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: '**/*'
            }
        ], {
            ignore: [
                'app.entry.js',
                'app.controllers.js',
                'app.service.js',
                'testPage/testPage.controller.js',
                'root/root.controller.js',
                'user/signIn.controller.js',
                'ratReport/newReport.controller.js',
                'ratReport/newReport.service.js',
                'latestReports/latestReports.controller.js',
                'latestReports/latestReports.service.js',
                'viewReport/viewReport.controller.js',
                'viewReport/viewReport.service.js',
                'mapView/mapView.controller.js',
                'mapView/mapView.service.js',
                'graphView/graphView.controller.js',
                'graphView/graphView.service.js'
            ]
        }),
    ],
};

if (process.env.env === 'pr') {
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        mangle: false
    }))
}

module.exports = webpackConfig;