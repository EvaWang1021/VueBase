const path =require('path')
// 导入html-webpack-plugin插件
const HtmlPlugin = require('html-webpack-plugin')
const FileLoader = require('file-loader')
// 每次打包发布自动清理dist插件
// 左侧的花括号代表解构赋值
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// new构造函数，创建插件实例对象
const htmlPlugin = new HtmlPlugin({
    template: './src/index.html',
    filename: './index.html'
})
// 使用node.js的导出语法，向外导出一个webpack的配置对象
module.exports = {
    // 在开发调试阶段，建议大家把devtool的值设为eval-source-map
    // devtool: 'eval-source-map',
    // 在发布的时候，建议把devtool设置为nosources-source-map或者直接关闭sourcemap
    // devtool: 'nosources-source-map',
    // 代表webpack运行的模式，可选值有两个development和production
    // 结论：开发的时候一定要用development,因为追求的是打包的速度，而不是体积
    mode: 'development',
    // entry:指定要处理哪个文件
    entry: path.join(__dirname, './src/index1.js'),
    // 指定生成的文件要存放在哪里
    output: {
        // 存放目录
        path: path.join(__dirname, 'dist'),
        // 生成的文件名
        filename: 'js/bundle.js'
    },    
    // 插件的数组
    plugins: [htmlPlugin, new CleanWebpackPlugin()],
    devServer: {
        // 首次打包成功后，自动打开浏览器
        open: true,
        // 在http协议中，如果端口号是80,则可以被省略
        port: 80,
        // 指定运行的主机地址
        host: '127.0.0.1'
    },
    module: {
        rules: [
            // 定义了不同模块对应的loader
            // test代表匹配的文件类型，use表示要调用的loader
            { test: /\.css/, use: ['style-loader', 'css-loader']},
            // 处理less文件的loader
            { test: /\.less/, use: ['style-loader', 'css-loader', 'less-loader']},
            // 处理图片的loader
            // 在配置url-loader时，多个参数之间，使用&进行分割
            { test: /\.jpg|.png|gif$/, use :'url-loader?limit=200&outputPath=images'},
            // 处理webpack无法处理的高级语法
            // 在配置babel-loader的时候，程序员只需把自己的代码进行转换即可，一定要排除node_module中的js文件，因为第三包的兼容性无需考虑
            { test: /\.js$/, use: 'babel-loader', exclude: '/node_modules/'}
        ]
    },
    resolve: {
        alias: {
            // @代表src这一层目录
            '@': path.join(__dirname, './src/')
        }
    }


}