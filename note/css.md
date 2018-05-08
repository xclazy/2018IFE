### 记录新了解的知识点

------------------------------
#### 样式属性

  * `text-transform` 设置转换字体

    * `none` : 防止任何转型。
    * `uppercase` : 将所有文本转为大写。
    * `lowercase` : 将所有文本转为小写。
    * `capitalize` : 转换所有单词让其首字母大写。
    * `full-width` : 将所有字形转换成固定宽度的正方形，类似于等宽字体，允许对齐。拉丁字符以及亚洲语言字形（如中文，日文，韩文）。

  * `text-decoration` 设置/取消字体上的文本装饰

    `text-decoration` 是缩写形式，由 `text-decoration-line` `text-decoration-style` `text-decoration-color` 构成，可多个属性组合, 如<span style="text-decoration: line-through red wavy;">text-decoration: line-through red wavy;</span>。
    可一次接受多个值，如<span style="text-decoration: underline overline;">text-decoration: underline overline;</span>

    * `none` : 取消已经存在的任何文本装饰。
    * `underline` : 文本下划线。
    * `overline` : 文本上划线。
    * `line-through` : 穿过文本的线。

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
  * `background-origin` 
    
    指定背景图片属性的原点位置，当 `backgournd-attachmenet: fixed` 该属性无效

    * `padding-box` 从padding区域（含padding）开始显示背景图像。
    * `border-box` 从border区域（含border）开始显示背景图像。
    * `content-box` 从content区域开始显示背景图像。

  * `background-clip`  设置元素的背景（背景图片或颜色）是否延伸到边框下面

    * `border-box` : 背景延伸到边框外沿（但是在边框之下）。
    * `padding-box` : 边框下面没有背景，即背景延伸到内边距外沿。
    * `content-box` : 背景裁剪到内容区 (content-box) 外沿。
    * `text` : 背景被裁剪为文字的前景色(只有chrome支持)。

  * `flex-flow` flex-direction 和 flex-wrap 缩写

    ```css
    div {
      flex-direction: row;
      flex-wrap: wrap;
    }
    /* 等同 */
    div {
      flex-flow: row wrap;
    }
    ```
  * `order` 改变flex项的布局位置，不会影响到DOM顺序

    * 所有flex项默认 `order` 为0
    * `order` 值大的显示顺序靠后，可设负值
    * 相同值按DOM顺序排列

---------------------------

#### 层叠和继承

  * 选择器专用性 - 高覆盖低的样式

    一个选择器具有的专用性的量是用四种不同的值（或组件）来衡量的，它们可以被认为是千位，百位，十位和个位——在四个列中的四个简单数字：

    * 千位：如果声明是在style 属性中该列加1分（这样的声明没有选择器，所以它们的专用性总是1000。）否则为0。
    * 百位：在整个选择器中每包含一个ID选择器就在该列中加1分。
    * 十位：在整个选择器中每包含一个类选择器、属性选择器、或者伪类就在该列中加1分。
    * 个位：在整个选择器中每包含一个元素选择器或伪元素就在该列中加1分。

    ```css
      /* 注释中包含了专用性值 */
      /* specificity: 0101 */
      #outer a {
        background-color: red;
      }

      /* specificity: 0201 */
      #outer #inner a {
        background-color: blue;
      }

      /* specificity: 0104 */
      #outer div ul li a {
        color: yellow;
      }

      /* specificity: 0113 */
      #outer div ul .nav a {
        color: white;
      }

      /* specificity: 0024 */
      div div li:nth-child(2) a:hover {
        border: 10px solid black;
      }

      /* specificity: 0023 */
      div li:nth-child(2) a:hover {
        border: 10px dashed black;
      }

      /* specificity: 0033 */
      div div .nav:nth-child(2) a:hover {
        border: 10px double black;
      }
    ```

    专用性同值时，源码顺序后覆盖前

  * 继承

    处理继承的四种通用属性值：

    * `inherit` : 选定元素的属性值设置为与其父元素一样。
    * `initial` : 选定元素的属性值设置为与浏览器默认样式表中该元素设置的值一样。如果浏览器默认样式表中没有设置值，并且该属性是自然继承的，那么该属性值就被设置为 `inherit`。
    * `unset` : 将属性重置为其自然值，即如果属性是自然继承的，那么它就表现得像 `inherit`，否则就是表现得像 `initial`。
    * `revert` : 如果当前的节点没有应用任何样式，则将该属性恢复到它所拥有的值。换句话说，属性值被设置成自定义样式所定义的属性（如果被设置）， 否则属性值被设置成用户代理的默认样式。

-----------------

#### 盒子模型

  * 外边距合并/折叠

    块级元素的上外边距和下外边距有时会合并（或折叠）为一个外边距，其大小取其中的最大者。

    出现条件：

    * 相邻元素之间

      毗邻的两个元素之间的外边距会折叠（除非后一个元素需要清除之前的浮动）。

    * 父元素与其第一个或最后一个子元素之间

      如果在父元素与其第一个子元素之间不存在边框、内边距、行内内容，也没有创建块格式化上下文、或者清除浮动将两者的 margin-top 分开；或者在父元素与其最后一个子元素之间不存在边框、内边距、行内内容、height、min-height、max-height将两者的 margin-bottom 分开，那么这两对外边距之间会产生折叠。此时子元素的外边距会“溢出”到父元素的外面。

    * 空的块级元素

      如果一个块级元素中不包含任何内容，并且在其 margin-top 与 margin-bottom 之间没有边框、内边距、行内内容、height、min-height 将两者分开，则该元素的上下外边距会折叠。
      
    * 一些需要注意的地方：

      * 上述情况的组合会产生更复杂的外边距折叠。
      * 即使某一外边距为0，这些规则仍然适用。因此就算父元素的外边距是0，第一个或最后一个子元素的外边距仍然会“溢出”到父元素的外面。
      * 如果参与折叠的外边距中包含负值，折叠后的外边距的值为最大的正边距与最小的负边距（即绝对值最大的负边距）的和。
      * 如果所有参与折叠的外边距都为负，折叠后的外边距的值为最小的负边距的值。这一规则适用于相邻元素和嵌套元素。
      
---------------------

#### 3D transform

* 总结无能_(:з」∠)_ 看[连接](http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)