const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {

    const getPlugins = () => {
        const plugins = [
          new HtmlWebpackPlugin({
            title: 'Williams-Sonoma, Inc. Front-End Coding Challenge',
            template: 'public/index.html'
          }),
          new MiniCssExtractPlugin()
        ];
        return plugins;
    };

    return {
        mode: 'development',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.(s[ac]ss)$/,
                    use: [
                      MiniCssExtractPlugin.loader,
                      'css-loader',
                      'sass-loader'
                    ]
                }
            ]
        },
        plugins: getPlugins(),
        devServer: {
            open: true
        }
    }
}