module.exports = {
  // 配置高于chainWebpack中关于 css loader 的配置
  css: {
    // false 时只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块
    // true 时可以去掉文件名中的 .module， 并将所有的 *.(css|scss|sass|less|styl(us)?) 文件视为 CSS Modules 模块
    modules: false,

    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
    // 生产环境下是 true，开发环境下是 false
    extract: true,

    // 是否构建样式地图，设置为 true 之后可能会影响构建的性能
    sourceMap: false,

    // css预设器配置项
    loaderOptions: {
      postcss: {
        // 这是rem适配的配置  注意： remUnit在这里要根据lib-flexible的规则来配制，如果您的设计稿是750px的，用75就刚刚好。
        plugins: [
          require('postcss-px2rem')({
            remUnit: 37.5,
          }),
        ],
      },
    },
  },
  devServer: {
    hot: true,
    proxy: {
      '/api': {
        target: 'http://property.unicrom.cn/',
      },
    },
  },
};
