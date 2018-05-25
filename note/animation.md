lottie

lottie_light.js 不含canvas，只能使用svg

import 'lottie' 默认加载lottie.js 压缩需指定路径lottie-web/build/player/lottie_light.js，
webpack可配置

      // 根据环境选择文件
      lottie: process.env.NODE_ENV === 'production'
        ? 'lottie-web/build/player/lottie.min.js'
        : 'lottie-web/build/player/lottie_light.js',


AE安装bodymovin插件 https://blog.csdn.net/jhl122/article/details/56665374

----------------------------

### 实现方法

* css/js动画库

  如 [Animate.css](https://daneden.github.io/animate.css/) 
  [Velocity.js](http://www.mrfront.com/docs/velocity.js/index.html)

  * 简单易用
  * 动效有限制

* 纯代码Css/Js/svg

  [demo](https://codepen.io/Alireza29675/pen/KwgwMy)

  * 占用空间小
  * 复杂图形代码量很大
  * 需要处理兼容性问题

* Gif 

  * 不便交互
  * 不能按比例放大匹配大和高密度屏幕

* 帧动画 

  生成工具 [gka](https://gka.js.org)

  * 占用空间大
  * 不能按比例放大匹配大和高密度屏幕

* 开源库 
  
  如 `Lottie` `Keyframe`，将AE导出的动画资源直接在项目中应用。

  * 动效的自由度大
  * 提高了开发效率及减轻工作量
  * 部分AE属性不适用，需设计配合
  * 库占用空间较大


lottie

[github](https://github.com/airbnb/lottie-web)
json文件在线预览页 https://www.lottiefiles.com/preview

Bodymovin 直接根据 AE 上的动画文件导出 json 文件，这个 json 文件描述了该动画的一些关键点的坐标以及运动轨迹


transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-
bezier(n,n,n,n);

cubic-bezier(n,n,n,n)	：在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。

参考

[最全最好用的动效落地方法、都帮你总结好了（上）](https://zhuanlan.zhihu.com/p/34501702)
[最全最好用的动效落地方法、都帮你总结好了（下）](https://zhuanlan.zhihu.com/p/34815524)
[如何看待 Airbnb 新发布的 Lottie？](https://www.zhihu.com/question/55315505)