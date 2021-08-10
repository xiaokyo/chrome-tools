const path = require('path')
const CopyPlugin = require("copy-webpack-plugin");
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

module.exports = {
    mode: "development",
    devtool: false,
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
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    require('autoprefixer')()
                                ]
                            }
                        }
                    }
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
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public", to: "./" },
            ],
        }),
        new ChromeExtensionReloader()
    ],
    devServer: {
        writeToDisk: true
    }
}