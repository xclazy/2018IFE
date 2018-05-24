lottie

lottie_light.js 不含canvas，只能使用svg

import 'lottie' 默认加载lottie.js 压缩需指定路径lottie-web/build/player/lottie_light.js，
webpack可配置

      // 根据环境选择文件
      lottie: process.env.NODE_ENV === 'production'
        ? 'lottie-web/build/player/lottie.min.js'
        : 'lottie-web/build/player/lottie_light.js',


AE安装bodymovin插件 https://blog.csdn.net/jhl122/article/details/56665374

1. css 
2. gif 不便交互 占用空间大
3. 帧动画 占用空间更大
gka https://gka.js.org
4. 开源库

Bodymovin 直接根据 AE 上的动画文件导出 json 文件，这个 json 文件描述了该动画的一些关键点的坐标以及运动轨迹，使用于


transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-
bezier(n,n,n,n);

cubic-bezier(n,n,n,n)	：在 cubic-bezier 函数中定义自己的值。可能的值是 0 至 1 之间的数值。


<iframe src="https://codepen.io/Alireza29675/pen/KwgwMy" height=498 width=510> </iframe>