const { readdirSync, statSync } = require('fs');
const { resolve, join } = require('path');
const { task } = require('gulp');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const SveltePreprocess = require('svelte-preprocess');

const srcDir = resolve('src');
const distDir = resolve('docs');

const sims = readdirSync(srcDir).filter(sim => sim !== 'lib' && statSync(join(srcDir, sim)).isDirectory());
const configs = sims.map(sim => ({
  entry: [join('@/', sim, 'index.ts')],
  module: {
    rules: [
      {
        test: /\.svelte$/i,
        loader: 'svelte-loader',
        options: {
          preprocess: SveltePreprocess(),
          emitCss: true,
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
  resolve: {
    alias: {
      '@': resolve('src'),
      '@lib': resolve('src/lib'),
    },
    mainFields: ['svelte', 'browser', 'module', 'main'],
    extensions: ['.js', '.mjs', '.ts', '.svelte', '.json'],
  },
  optimization: {
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  plugins: [
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: ['svgo'],
      },
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      inject: 'head',
      scriptLoading: 'defer',
      filename: 'index.html',
      minify: true,
      title: sim.charAt(0).toUpperCase() + sim.slice(1),
    }),
  ],
  output: {
    assetModuleFilename: '[name][ext][query]',
    path: join(distDir, sim),
    clean: true,
  },
  devServer: {
    contentBase: join(srcDir, sim),
    compress: true,
    port: 3000,
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
    if (err) return cb(err);

    console.log(stats.toString({ colors: true }));
    cb();
  });
}
function webpackWatch(config, cb) {
  const express = require('express');
  if (config.mode) config.mode = 'development';
  if (config.devtool) config.devtool = 'eval-source-map';
  config.module.rules[0].options.emitCss = false;
  config.module.rules[0].options.compilerOptions = { dev: true };
  config.module.rules[0].options.hotReload = true;
  config.module.rules[0].options.hotOptions = { preserveLocalState: true };
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.entry = ['webpack-hot-middleware/client', ...config.entry];

  const compiler = webpack(config);
  const devApp = express();
  devApp.use(require('morgan')('combined'));
  devApp.use(require('webpack-dev-middleware')(compiler));
  if (config.devServer.compress) devApp.use(require('compression')());
  devApp.use(express.static(config.devServer.contentBase));
  devApp.use(require('webpack-hot-middleware')(compiler));
  devApp.listen(config.devServer.port, () => console.log(`Developement server is listening on port ${config.devServer.port}!`));
}
