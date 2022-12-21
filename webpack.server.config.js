const path = require('path')
const nodeExternals = require('webpack-node-externals')
const WebpackShellPlugin = require('webpack-shell-plugin-next')
const debug = process.env.NODE_ENV !== 'production'
const plugins = []

if (debug) {
    plugins.push(
        new WebpackShellPlugin({
            onBuildStart: {
                scripts: ['npm run clean:server'],
                blocking: true,
                parallel: false
            },
            onBuildEnd: {
                scripts: ['nodemon ./dist/index.js'],
                blocking: false,
                parallel: true
            }
        })
    )
}

module.exports = {
    entry: ['./src/server.ts'],
    target: 'node',
    mode: debug ? 'development' : 'production',
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    devtool: debug ? 'source-map' : false,
    watch: debug,
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.ttf$|\.eot$|\.svg$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'assets',
                    name: '[name].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.mjml'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index.js',
        devtoolModuleFilenameTemplate: '[resource-path]'
    },
    plugins
}
