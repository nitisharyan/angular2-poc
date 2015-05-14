var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var TRACEUR_RUNTIME = require('traceur-compiler-loader').runtime;

module.exports = {
    devtool: '#source-map',
    devServer: {
        contentBase: 'dist',
    },
    debug: true,
    cache: false   ,
    context: __dirname,
    publicPath: 'dist',
    entry: {
        app: './src/js/app'
    },
    output: {
        path: 'dist',
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js'
    },
    stats: {
        colors: true,
        reasons: true
    },
    resolve: {
        root: __dirname,
        extensions: [
            '',
            '.js',
            '.es6',
            '.es6.js',
            '.es7',
            '.ts',
            '.json',
        ],
        alias: {
            'actions': 'src/js/actions',
            'components': 'src/js/components',
            'constants': 'src/js/constants',
            'decorators': 'src/js/decorators',
            'dispatcher': 'src/js/dispatcher',
            'utils': 'src/js/utils',
            'services': 'src/js/services',
            'stores': 'src/js/stores',
            'templates': 'src/html/templates',
        },
        modulesDirectories: [
            'node_modules',
        ]
    },
    module: {
        loaders: [
            // Support for *.json files.
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            // html raw content loader
            {
                test: /\.html$/,
                loader: 'raw'
            },
            // Support for AtScript files.
            {
                test: /^(?!.*node_modules)+.+\.js$/,
                loader: ['traceur-compiler-loader'].concat([
                    // 'inputSourceMap=true',
                    'imports=true',
                    'runtime=true',
                    'sourceMaps=true',
                    'moduleName=true',
                    'modules=commonjs',
                    'experimental',
                    'types',
                    'annotations',
                    'memberVariables',
                    'typeAssertionModule="rtts_assert/rtts_assert"'
                ].join('&')).join('?')
            }
        ],
        noParse: [
            new RegExp(TRACEUR_RUNTIME),
            /rtts_assert\/src\/rtts_assert/
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),
        // new webpack.ProvidePlugin({
        //     Zone: "zone.js",
        //     zone: "zone.js",
        // }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

function isDirectory(dir) {
    return fs.lstatSync(dir).isDirectory();
}
