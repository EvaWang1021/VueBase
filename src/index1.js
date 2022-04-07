// 使用es6语法，导入jquery
import $ from 'jquery'

// 导入样式（在webpack中，一切皆模块，都可以通过es6语法导入和使用）
import './css/index.css'
import './css/index.less'

// 1.导入图片，得到图片文件
import logo from './images/logo.jpg'
// 2.给img标签的src动态赋值
$('.box').attr('src', logo)

// 定义jquery入口函数
$(function(){
    $('li:even').css('background-color','red')
    $('li:odd').css('background-color','pink')
})

// 定义装饰器函数
function info(target){
    target.info = 'Person info'
}

// 定义装饰器修饰普通类
@info
class Person{}

console.log(Person.info)