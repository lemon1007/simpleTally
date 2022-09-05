/*eslint-disable*/
const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tally-website/'
    : '/',
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons');

    config.module
      .rule('svg-sprite')
      .test(/\.svg$/)
      .include.add(dir).end() // 包含 icons 目录
      // 加载loader
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()
      .use('svgo-loader').loader('svgo-loader')
      // 使用svgo-loader中方法，当发现svg中存在fill属性时，自动将其移除
      .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end();
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}]);
    config.module.rule('svg').exclude.add(dir); // 其他 svg loader 排除 icons 目录
  }
};