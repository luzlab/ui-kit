const path = require('path');
const PackageImporter = require('node-sass-package-importer');
const inliner = require('sass-inline-svg');

const cwd = process.cwd();

module.exports = ({ config }) => {
  config.context = cwd;
  config.mode = 'development';

  config.resolve.alias['@project/stories'] = require.resolve('src/__stories__/index.ts', { paths: [cwd] });
  config.resolve.extensions.push('.ts', '.tsx', '.js');
  config.resolve.modules = [...(config.resolve.modules || []), path.resolve('./')];

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: [path.resolve(cwd, 'src')],
    use: [
      {
        loader: require.resolve('ts-loader'),
        options: {
          onlyCompileBundledFiles: true, // https://github.com/TypeStrong/ts-loader#onlycompilebundledfiles-boolean-defaultfalse
        },
      },
    ],
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          ident: 'postcss',
          plugins: loader => [require('postcss-import'), require('autoprefixer')],
        },
      },
      'resolve-url-loader',
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          importer: [PackageImporter()],
          functions: {
            'svg-icon': inliner(path.resolve('dist', 'styles', 'icons'), {
              // run through SVGO first
              optimize: true,
              // minimal "uri" encoding is smaller than base64
              encodingFormat: 'uri',
            }),
          },
        },
      },
    ],
    include: path.resolve(__dirname, '../'),
  });

  return config;
};
