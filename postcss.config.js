module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-lazyimagecss'),
    require('postcss-nested'),
    require('postcss-pxtorem')({
      rootValue: 40,
      propList: ['*'],
      mediaQuery: false,
      minPixelValue: 2
    }),
    // require('postcss-cssnext'),
    require('autoprefixer')({
      browsers: ['> 1%', 'last 2 versions', 'not ie <= 8']
    }),
    require('cssnano')
  ]
};
