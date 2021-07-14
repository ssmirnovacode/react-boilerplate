const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {

    const { mode = 'development'} = options; 

    const isProd = mode === 'production';
    const isDev = mode === 'development';

    const getStyleLoaders = () => {
        return [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'
        ];
    };

    const getPlugins = () => {
        const plugins = [
            new HtmlWebpackPlugin({
                title: 'My customized React app',
                buildTime: new Date().toString(),
                template: 'public/index.html'
            })
        ];
        if (isProd) {
            plugins.push(new MiniCssExtractPlugin({
                filename: "main-[hash:8].css"  
                /* main.css is default, alternative for testing 'main-[hash:8].css':
                (browser is caching css, and if the name is the same in each build, it might not update it), 
                therefore we make it unique for each build with [hash:8] */
            }));
        }

        return plugins;
    }

    return {
        mode: isProd ? 'production' : isDev && 'development', // else it will be false and settings apply

        output: {
            filename: isProd ? "main-[hash:8].js" : 'main.js' // undefined - webpack will use default name
        },

        module: {
            rules: [
                // babel-loader for React ( JSX )
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader' // shorter syntax without 'use' array
                },
                //Images loader
                {
                    test: /\.(png|jpg|jpeg|gif|ico)$/,  
                    use: [ 
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images', 
                                name: '[name]-[sha1:hash:7].[ext]' //original name + '-' +  first 7 symbols of hashed name
                            }
                        }
                        //there might be more loaders in this array
                    ]
                },
                //Fonts loader
                {
                    test: /\.(ttf|otf|eot|woff|woff2)$/, 
                    use: [ 
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'fonts', 
                                name: '[name]-[sha1:hash:7].[ext]'
                            }
                        }
                        
                    ]
                },
                // CSS loader           
                {
                    test: /\.(css)$/,
                    use: getStyleLoaders()
                },
                // SCSS loader 
                {
                    test: /\.(scss)$/,
                    use: [ ...getStyleLoaders(), 'sass-loader'] 
                }
            ]
        },
    
        plugins: getPlugins(),
    
        devServer: {
            open: true // automatically opening the browser after npm start (npx webpack serve)
        }
    }
};