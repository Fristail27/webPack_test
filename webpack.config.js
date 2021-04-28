const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugim = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugim(),
            new TerserWebpackPlugin()
        ]
    }

    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = (extra) => {
    const loaders = [{
        loader: MiniCssExtractPlugin.loader,
        options: {
            // TODO hrm: isDev,
            // reloadAll: true
        },
    }, 'css-loader']
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}

const babelOptions = (preset) => {
    const opt = {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
    }

    if (preset) {
        opt.presets.push(preset)
    }

    return opt
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }]
    if (isDev) {
        loaders.push({loader:'eslint-loader'})
    }
    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main:['@babel/polyfill','./index.jsx'],
        analytics: './analytics.ts'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve:{
        extensions: ['.js','.json', '.png'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        open: true,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]}),
        new MiniCssExtractPlugin({
            filename: filename('css')
        })
    ],
    module: {
        rules: [
            {
                test:/\.css$/,
                use: cssLoaders()
            },
            {
                test:/\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test:/\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test:/\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.js$/,
                use: jsLoaders(),
                exclude: '/node_modules/',
            },
            {
                test: /\.ts$/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions('@babel/preset-typescript')
                },
                exclude: '/node_modules/',
            },
            {
                test: /\.jsx$/,
                use: {
                    loader: "babel-loader",
                    options: babelOptions('@babel/preset-react')
                },
                exclude: '/node_modules/',
            },
        ]
    }
}