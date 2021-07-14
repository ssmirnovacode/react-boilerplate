module.exports = {
    mode: "development",

    module: {
        rules: [
            // babel-loader to work with React ( processing JSX )
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            },

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
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'}
                ]
            },
            // SCSS processing
            {
                test: /\.(scss)$/,
                use: [
                    {loader: 'style-loader'},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'}
                ]
            }
        ]
    }
};