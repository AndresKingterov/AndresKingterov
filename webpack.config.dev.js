//Crear archivo de Configuracion de WEBPACK

const path = require('path');   // Traera el elemnto path
const HtmlWebpackPlugin = require('html-webpack-plugin'); //Integracion de webpack HTML
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //Integracion de webpack CSS
const CopyPluginWebapack = require('copy-webpack-plugin'); // Integracion copy webpack plugin
const Dotenv = require('dotenv-webpack'); 

module.exports = {  //configuracion deseada
    entry: './src/index.js',   //por donde ingresa
    output: {
        path: path.resolve(__dirname, 'dist'), // salida de la aplicacion
        filename: '[name].[contenthash].js', //nombre del archivo resultante por la conpilacion del WEBPACK
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode:'development',
    resolve:{
        extensions:[ '.js' ], //Todas las extensiones que va permitir
        alias: {
            '@utils':path.resolve(__dirname,'src/utils/'),
            '@templates':path.resolve(__dirname,'src/templates/'),
            '@styles':path.resolve(__dirname,'src/styles/'),
            '@images':path.resolve(__dirname,'src/assets/images/')
        }
    },
    module: {
        rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader'
          }
        },
        {
            test: /\.css|.styl$/i,
            use: [
                 MiniCssExtractPlugin.loader,
                'css-loader',
                'stylus-loader'
            ],
          },
          {
              test: /\.png/,
              type: 'asset/resource'
          },
          {
              test: /\.(woff|woff2)$/,
              use: {
                  loader: 'url-loader',
                  options:{
                      limit: 10000,
                      mimetype:"aplication/font-woff",
                      name:"[name].[contenthash].[ext]",
                      outputPath :"./assets/fonts/",
                      publiPath: "../assets/fonts/",
                      esModule: false
                  }
              }
          }
    ]
            },
    plugins: [                                     // De esta forma se agrega la extension de HTML a webṕack
            new HtmlWebpackPlugin({
                inject: true,
                template:'./public/index.html',
                filename: './index.html',
            }),
            new MiniCssExtractPlugin({
                filename: 'assets/[name].[contenthash].css'
            }),
            new CopyPluginWebapack({
                patterns:[
                    {
                        from: path.resolve(__dirname,"src","assets/images"),
                        to: "assets/images"

                    }
                ]
            }),
            new Dotenv(),
        ]

}
