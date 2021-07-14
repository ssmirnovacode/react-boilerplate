module.exports = {
    mode: "development",

    module: {
        rules: [
            {
                test: /\.png$/,  //choosing files to be processed by this loader
                use: [ // array, each elem of which describes a loader and its config
                    {
                        loader: 'file-loader'
                    }
                    //there might be more loaders in this array
                ]
            }
        ]
    }
};