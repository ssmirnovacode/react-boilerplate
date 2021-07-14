module.exports = {
    mode: "development",

    module: {
        rules: [
            {
                test: /\.png$/,  //choosing files to be processed by this loader
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
            }
        ]
    }
};