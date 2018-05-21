lottie

lottie_light.js 不含canvas，只能使用svg

import 'lottie' 默认加载lottie.js 压缩需指定路径lottie-web/build/player/lottie_light.js，
webpack可配置

      // 根据环境选择文件
      lottie: process.env.NODE_ENV === 'production'
        ? 'lottie-web/build/player/lottie.min.js'
        : 'lottie-web/build/player/lottie_light.js',

