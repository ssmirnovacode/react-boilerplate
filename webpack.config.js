const HtmlWebpackPlugin =require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {

    const { mode = 'development'} = options; // default

    const isProd = mode === 'production';
    const isDev = mode === 'development';

    const getStyleLoaders = () => {
        return [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader, css-loader'
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
                filename: isProd ? "main-[hash:8].css" :'main.css' // specifying the name of output file 
                /* main.css is default, alternative foe testing 'main-[hash:8].css':
                (browser is caching css, and if the name is the same in each build, it might not update it), 
                therefore we make it unique for each build with [hash:8] */
            }));
        }

        return plugins;
    }

    return {
        mode: isProd ? 'production' : isDev && 'development', // else it will be false and settings won´t be applied

        //Specifying output js file name:
        output: {
            filename: isProd ? "main-[hash:8].js" : 'main.js' // undefined - webpack will use default name
        },

        module: {
            rules: [
                // babel-loader to work with React ( processing JSX )
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader' // shorter syntax
                },
                //images loader
                {
                    test: /\.(png|jpg|jpeg|gif|ico)$/,  //choosing files to be processed by this loader
                    use: [ // array, each elem of which describes a loader and its config
                        {
                            loader: 'file-loader',
                            options: {
                                outputPath: 'images', // to save processed images to this folder
                                name: '[name]-[sha1:hash:7].[ext]' //original name + '-' +  first 7 symbols of hashed name
                            }
                        }
                        //there might be more loaders in this array
                    ]
                },
                //Fonts loader
                {
                    test: /\.(ttf|otf|eot|woff|woff2)$/,  //fonts extensions
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
                // SCSS processing
                {
                    test: /\.(scss)$/,
                    use: [ ...getStyleLoaders(), 'sass-loader'] 
                }
            ]
        },
    
        plugins: getPlugins(),
    
        devServer: {
            open: true // automatically opening the browser after build
        }
    }
};