### 记录新了解的知识点

* `text-transform` 设置转换字体

  * `none` : 防止任何转型
  * `uppercase` : 将所有文本转为大写
  * `lowercase` : 将所有文本转为小写
  * `capitalize` : 转换所有单词让其首字母大写
  * `full-width` : 将所有字形转换成固定宽度的正方形，类似于等宽字体，允许对齐。拉丁字符以及亚洲语言字形（如中文，日文，韩文）

* `text-decoration` 设置/取消字体上的文本装饰

  `text-decoration` 是缩写形式，由 `text-decoration-line` `text-decoration-style` `text-decoration-color` 构成，可多个属性组合, 如<span style="text-decoration: line-through red wavy;">text-decoration: line-through red wavy;</span>。
  可一次接受多个值，如<span style="text-decoration: underline overline;">text-decoration: underline overline;</span>

  * `none` : 取消已经存在的任何文本装饰
  * `underline` : 文本下划线
  * `overline` : 文本上划线
  * `line-through` : 穿过文本的线

* `text-shadow: 4px 4px 5px red;` 文本阴影

  * 4 个属性如下(按顺序):

    * 阴影与原始文本的水平偏移，可以使用大多数的 CSS 单位 length and size units, 但是 px 是比较合适的。这个值必须指定。
    * 阴影与原始文本的垂直偏移;效果基本上就像水平偏移，除了它向上/向下移动阴影，而不是左/右。这个值必须指定。
    * 模糊半径 - 更高的值意味着阴影分散得更广泛。如果不包含此值，则默认为0，这意味着没有模糊。可以使用大多数的 CSS 单位 length and size units.
    * 阴影的基础颜色，可以使用大多数的 CSS 颜色单位 CSS color unit. 如果没有指定，默认为 black.

  ```css
  /* 可以通过包含以逗号分隔的多个阴影值，将多个阴影应用于同一文本 */

  text-shadow: -1px -1px 1px #aaa,
               0px 4px 1px rgba(0,0,0,0.5),
               4px 4px 5px rgba(0,0,0,0.7),
               0px 0px 7px rgba(0,0,0,0.4);
  ```

* `background-image`
  
  可配置多个值

  ```css
  .a {
    background-image: url(image.png), url(background-tile.png);
  }
  .b {
    background: url(image.png) no-repeat 99% center,
                url(background-tile.png),
                linear-gradient(to bottom, yellow, #dddd00 50%, orange);
  }
  ```

* `border-radius: 10px 20px 30px 40px/20px 50px 30px 10px; `
  
  斜杠前面的一组四个值分别表示四个角的水平半径；斜杠后面的一组四个值分别表示四个角的垂直半径。
