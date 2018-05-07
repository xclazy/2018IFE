### 记录新了解的知识点

-----------------------------------

* Number类型 `toString` 两种模式

  * `toString()` 默认模式

    无论最初采用什么形式声明数字，返回的都是数字的十进制形式

  * `toString(n)` 基模式

    可用不同的基输出数字

    ```js
    var iNum = 10;
    alert(iNum.toString(2));  // 二进制，输出 "1010"
    alert(iNum.toString(8));  // 八进制，输出 "12"
    alert(iNum.toString(16));  // 十六进制，输出 "A"
    ```

* `parseFloat()`

  没有基模式， 字符串必须以十进制表示浮点数

* `slice()` 和 `substring()`

  对于负数参数，slice() 方法会用字符串的长度加上参数，substring() 方法则将其作为 0 处理（也就是说将忽略它）。

* `toLowerCase()` `toLocaleLowerCase()` `toUpperCase()` 和 `toLocaleUpperCase()`

  `toLowerCase()` 和 `toUpperCase()` 方法是原始的，是以 `java.lang.String` 中相同方法为原型实现的。

  `toLocaleLowerCase()` 和 `toLocaleUpperCase()` 方法是基于特定的区域实现的（与 localeCompare() 方法相同）。在许多区域中，区域特定的方法都与通用的方法完全相同。不过，有几种语言对 Unicode 大小写转换应用了特定的规则（例如土耳其语），因此必须使用区域特定的方法才能进行正确的转换。

  一般来说，如果不知道在以哪种编码运行一种语言，则使用区域特定的方法比较安全。

----------------------------------

#### 运算符

  * `delete`
  
    删除对以前定义的对象属性或方法的引用，不能删除开发者未定义的属性和方法。

    ```js
    var o = new Object;
    o.name = "David";
    alert(o.name);	// 输出 "David"
    delete o.name;
    alert(o.name);	// 输出 "undefined"
    ```

  * `void`

    void 运算符对任何值返回 undefined， 该运算符通常用于避免输出不应该输出的值。

  * `+` 

    一元加法对字符串使用会把字符串转换成数字。

    ```js
    var sNum = "20";
    alert(typeof sNum);	//输出 "string"

    var iNum = +sNum;
    alert(typeof iNum);	//输出 "number"
    ```
  
  * `~` 位运算 NOT

    位运算 NOT 是三步的处理过程：
    * 把运算数转换成 32 位数字
    * 把二进制数转换成它的二进制反码
    * 把二进制数转换成浮点数

    ```js
    var iNum1 = 25;		//25 等于 00000000000000000000000000011001
    var iNum2 = ~iNum1;	//转换为 11111111111111111111111111100110
    alert(iNum2);		//输出 "-26"
    ```
    
    位运算 NOT 实质上是对数字求负，然后减 1，因此 25 变 -26。用下面的方法也可以得到同样的方法：

    ```js
    var iNum1 = 25;
    var iNum2 = -iNum1 -1;
    alert(iNum2);	//输出 -26
    ```