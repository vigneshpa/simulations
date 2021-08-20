const { readdirSync, statSync, stat } = require('fs');
const { join } = require('path');
const { task } = require('gulp');
const webpack = require('webpack');
const DevServer = require('webpack-dev-server');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const SveltePreprocess = require('svelte-preprocess');

const srcDir = join(__dirname, 'src');
const distDir = join(__dirname, 'docs');

const sims = readdirSync(srcDir).filter(sim => statSync(join(srcDir, sim)).isDirectory());
const configs = sims.map(sim => ({
  entry: join(srcDir, sim, 'index.ts'),
  module: {
    rules: [
      {
        test: /\.svelte$/i,
        loader: 'svelte-loader',
        options: {
          preprocess: SveltePreprocess(),
          emitCss: true,
          sourceMap: true,
        },
      },
      {
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.ts$/i,
        use: 'ts-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'source-map-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(wasm)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: { extensions: ['.js', '.jsm', '.ts', '.json'] },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  plugins: [
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: ['svgo'],
      },
    }),
    new MiniCssExtractPlugin({ filename: 'assets/style.css' }),
    new HtmlWebpackPlugin({
      inject: 'head',
      scriptLoading: 'defer',
      filename: 'index.html',
      minify: true,
      title: sim.charAt(0).toUpperCase() + sim.slice(1),
    }),
  ],
  output: {
    filename: 'assets/bundle.js',
    assetModuleFilename: 'assets/[name][ext][query]',
    path: join(distDir, sim),
    clean: true,
    publicPath: './',
  },
  devServer: {
    contentBase: join(srcDir, sim),
    compress: true,
  },
  mode: 'production',
  devtool: 'source-map',
}));

sims.forEach((sim, index) => task(sim, cb => webpackCompile(configs[index], cb)));
sims.forEach((sim, index) => task('dev-' + sim, cb => webpackWatch(configs[index], cb)));
const buildAll = cb => webpackCompile(configs, cb);
exports.default = buildAll;

function webpackCompile(config, cb) {
  webpack(config, (err, stats) => {
    console.log(stats.toString({ colors: true }));
    if (err) throw err;
    cb();
  });
}
function webpackWatch(config, cb) {
  if (config.mode) config.mode = 'development';
  if (config.devtool) config.devtool = 'eval-source-map';
  new DevServer(webpack(config)).listen(
    3000,
    '0.0.0.0',
    err => (err ? console.error(err) : console.log('Development server is running at port 3000')),
    config.devServer
  );
}
