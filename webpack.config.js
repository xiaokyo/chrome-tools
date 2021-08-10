const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

const isDev = process.env.NODE_ENV == 'development'

const plugins = [
    new CopyPlugin({
        patterns: [
            { from: "public", to: "./" },
        ],
    }),
]
if (isDev) {
    plugins.push(new ChromeExtensionReloader())
}

module.exports = {
    mode: isDev ? "development" : 'production',
    entry: {
        "content-script": [path.resolve(__dirname, "./src/content-script")],
        "background": [path.resolve(__dirname, "./src/background")]
    },
    output: {
        path: path.resolve(__dirname, "dev"),
        filename: "[name].js",
        publicPath: "/",
        libraryTarget: "umd"
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        },
        extensions: ["*", ".jsx", ".js", ".json"],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            [
                                "@babel/plugin-transform-runtime",
                                {
                                    "regenerator": true,
                                }
                            ],
                        ]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: true, // 图片都以base64格式来打包
                        },
                    },
                ],
            },
        ]
    },
    plugins,
    devServer: isDev ? {
        writeToDisk: true
    } : undefined
}