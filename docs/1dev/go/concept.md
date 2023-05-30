# go概念
## go语言优势
1. 高性能、高并发
2. 语法简单、学习曲线平缓
3. 丰富的标准库
4. 完善的工具链
5. 静态链接
6. 快速编译
7. 跨平台
8. 垃圾回收
# go语法
## 变量常量定义
可以不用定义类型
```go
var a="initial" //字符串变量
var b,c int =1,2 //int变量
var d= true //bool变量
var e float 64 //浮点变量
f := float32(e) //浮点变量
const s string = "constant" //字符串常量
const h = 50000 //int常量
```
## if
条件不用加括号，必须在条件后加大括号
```go
if 7%2 == 0 {
    fmt.Println("7 is even")
} else {
    fmt.Println("7 is odd")
}
if num :=9; num<0 {
    fmt.Println(num,"is negatve")
} else if num<10 {
    fmt.Println(num,"has 1 digit")
} else{
    fmt.Println(num,"has multiple digits")
}
```
## for
没有while和do while循环
```go
i :=1
for {//什么条件都不写，死循环
    fmt.Println("loop")
    break
}
for j := 7 ; j < 9; j++{
    fmt.Println(j)
}
for n :=0 ; n < 5; n++{
    if n%2 == 0{
        continue
    }
    fmt.Println(n)
} 
for i<=3 {
    fmt.Println(i)
    i=i+1
}
```

## case
switch后的条件不止可以放字符，功能比较强大，可以用来替代ifelse分支，比较清晰
```go
a := 2
switch a {
case 1:
    fmt.Println("one")
case 2:
    fmt.Println("two")
case 3:
    fmt.Println("three")
case 4,5:
    fmt.Println("four or five")
default:
    fmt.Println("other")
}
t := time.Now()
switch {
case t.Hour() < 12:
    fmt.Println("It's before noon")
default:
    fmt.Println("It's after noon")
}
```

## 数组
```go
var a [5]int
a[4] = 100
fmt.Println(a[4],len(a))
b := [5]int{1,2,3,4,5}
fmt.Println(b)

var twoD [2][3]int
for i := 0; i<2;i++{
    for j :=0; j<3;j++{
        twoD[i][j] = i + j
    }
}
```

## 切片
可变长度的数组
```go
package main

import "fmt"

func main() {
   // 用make创建切片，需要指定初始长度
   s := make([]string, 3)
   s[0] = "a"
   s[1] = "b"
   s[2] = "c"
   fmt.Println("get:", s[2])   // c
   fmt.Println("len:", len(s)) // 3

   // 新增，需要用一个切片变量接收，容量不够会扩容，返回一个新的slice
   s = append(s, "d")
   sNew := append(s, "e", "f")
   fmt.Println(sNew)

   // copy
   a := make([]string, len(sNew))
   copy(a, sNew)
   fmt.Println(a)

   // 切片操作
   fmt.Println(a[:])   // 所有
   fmt.Println(a[2:5]) // 区间[2,5)
   fmt.Println(s[:3])  // [0,3)
   fmt.Println(s[1:])  // 1到结尾

   // 简易定义
   good := []string{"g", "o", "o", "d"}
   fmt.Println(good)
   good = append(good, "!")
   fmt.Println(good)
   // 区别数组：   b := [5]int{1, 2, 3, 4, 5}，是需要指定长度的
}

/**
切片是一个可变长数组，不用指定其长度。[]类型
*/
```
## map
``` go
package main

import "fmt"

func main() {
   // key string, value int
   m := make(map[string]int)
   m["one"] = 1
   m["two"] = 2
   fmt.Println(m)
   fmt.Println(len(m))     //2
   fmt.Println(m["one"])   //1
   fmt.Println(m["two"])   //2
   fmt.Println(m["three"]) //0

   // ok 获取map中是否有这个key存在
   r, ok := m["three"]
   //fmt.Println(r)
   //fmt.Println(ok)
   fmt.Println(r, ok)

   // 删除key为one
   delete(m, "one")

   // 简易定义
   m2 := map[string]int{"one": 1, "two": 2}
   fmt.Println(m2)

   // 遍历map，同理可以遍历数组
   for key, value := range m {
      println(key, value) // key,value
   }
}

/**
map 是无序的
*/

```

## range
``` go
package main

import "fmt"

func main() {
   arr := [3]int{}
   arr[0] = 1
   arr[1] = 2
   arr[2] = 3

   // index是数组下标，value对应的值
   for index, value := range arr {
      fmt.Println(index, value)
   }

   m := map[string]int{"one": 1, "two": 2}
   
   //key是map的key，value是map的value
   for key, value := range (m) {
      fmt.Println(key, value)
   }
}
```
## 函数
``` go
package main

func main() {
   println(add(1, 2))
   println(exists(map[string]int{"one": 1}, "two"))
}

// 函数名add，参数a,b均为int，返回值为int
func add(a, b int) int {
   return a + b
}

// 支持多值返回
func exists(m map[string]int, key string) (int, bool) {
   value, ok := m[key]
   return value, ok
}
```
## 指针
``` go
package main

func main() {
   n := 5
   add(n)
   println(n) // 5
   add2(&n)
   println(n) // 7
}

// 两个函数均没有返回值
func add(n int) {
   // 此时的n是add的局部变量，修改完后，当add函数执行完毕后，n消亡，不影响外部的变量值
   n += 2
}

func add2(n *int) {
   // 此时的n是一个指针，改动会改变原值
   *n += 2
}

/**
指针的主要用途，对传入的参数进行修改
*/

```
## 结构体、类以及方法
``` go
package main

import "fmt"

func main() {
   // 直接初始化时指定
   user := User{name: "chengyunlai", password: "root"}
   fmt.Println(user) // {chengyunlai root}
   // 修改名称
   user.name = "Cheng"
   fmt.Println(user) // {Cheng root}

   // 定义一个变量再指定属性
   user2 := User{}
   user2.name = "GoLang"
   fmt.Println(user2) //{GoLang }

   fmt.Println(checkPassword(&user, "123"))
   fmt.Println(user.checkPassword("123"))

}

type User struct {
   name     string
   password string
}

// 指针可以减少拷贝开销，也可以修改原值
func checkPassword(u *User, pass string) bool {
   return (*u).password == pass
}

// 结构体方法
func (u *User) resetPassword(password string) {
   u.password = password
}

func (u *User) resetUserName(userName string) {
   u.name = userName
}

func (u *User) checkPassword(pass string) bool {
   return (*u).password == pass
}
```
## 错误处理
``` go
package main

import (
   "errors"
   "fmt"
)

func main() {
   fmt.Println(isEquals("张三", "李四")) //false 不等
   fmt.Println(isEquals("张三", "张三")) //false 不等

   value, err := isEquals("张三", "李四")
   if err != nil {
      // 打印错误消息
      fmt.Println(err)
   } else {
      fmt.Println(value)
   }
}

// 错误是error类型，通过errors.xx 创建相应的错误
func isEquals(name, input string) (bool, error) {
   if name != input {
      return false, errors.New("不等")
   }
   // nil 表示 null
   return true, nil
}

```
## 字符串操作
``` go
package main

import (
	"fmt"
	"strings"
)

func main() {
	a := "hello"
	fmt.Println(strings.Contains(a, "ll"))                // true
	fmt.Println(strings.Count(a, "l"))                    // 2
	fmt.Println(strings.HasPrefix(a, "he"))               // true
	fmt.Println(strings.HasSuffix(a, "llo"))              // true
	fmt.Println(strings.Index(a, "ll"))                   // 2
	fmt.Println(strings.Join([]string{"he", "llo"}, "-")) // he-llo
	fmt.Println(strings.Repeat(a, 2))                     // hellohello
	fmt.Println(strings.Replace(a, "e", "E", -1))         // hEllo
	fmt.Println(strings.Split("a-b-c", "-"))              // [a b c]
	fmt.Println(strings.ToLower(a))                       // hello
	fmt.Println(strings.ToUpper(a))                       // HELLO
	fmt.Println(len(a))                                   // 5
	b := "你好"
	fmt.Println(len(b)) // 6
}
```

## 字符串格式化
``` go
package main

import "fmt"

type point struct {
	x, y int
}

func main() {
	s := "hello"
	n := 123
	p := point{1, 2}
	fmt.Println(s, n) // hello 123
	fmt.Println(p)    // {1 2}

	fmt.Printf("s=%v\n", s)  // s=hello
	fmt.Printf("n=%v\n", n)  // n=123
	fmt.Printf("p=%v\n", p)  // p={1 2}
	fmt.Printf("p=%+v\n", p) // p={x:1 y:2}
	fmt.Printf("p=%#v\n", p) // p=main.point{x:1, y:2}

	f := 3.141592653
	fmt.Println(f)          // 3.141592653
	fmt.Printf("%.2f\n", f) // 3.14
}

```

## JSON处理
```go
package main

import (
	"encoding/json"
	"fmt"
)

type userInfo struct {
	Name  string
	Age   int `json:"age"`
	Hobby []string
}

func main() {
	a := userInfo{Name: "wang", Age: 18, Hobby: []string{"Golang", "TypeScript"}}
	buf, err := json.Marshal(a)
	if err != nil {
		panic(err)
	}
	fmt.Println(buf)         // [123 34 78 97...]
	fmt.Println(string(buf)) // {"Name":"wang","age":18,"Hobby":["Golang","TypeScript"]}

	buf, err = json.MarshalIndent(a, "", "\t")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(buf))

	var b userInfo
	err = json.Unmarshal(buf, &b)
	if err != nil {
		panic(err)
	}
	fmt.Printf("%#v\n", b) // main.userInfo{Name:"wang", Age:18, Hobby:[]string{"Golang", "TypeScript"}}
}

```

## 时间处理
```go
package main

import (
	"fmt"
	"time"
)

func main() {
	now := time.Now()
	fmt.Println(now) // 2022-03-27 18:04:59.433297 +0800 CST m=+0.000087933
	t := time.Date(2022, 3, 27, 1, 25, 36, 0, time.UTC)
	t2 := time.Date(2022, 3, 27, 2, 30, 36, 0, time.UTC)
	fmt.Println(t)                                                  // 2022-03-27 01:25:36 +0000 UTC
	fmt.Println(t.Year(), t.Month(), t.Day(), t.Hour(), t.Minute()) // 2022 March 27 1 25
	fmt.Println(t.Format("2006-01-02 15:04:05"))                    // 2022-03-27 01:25:36
	diff := t2.Sub(t)
	fmt.Println(diff)                           // 1h5m0s
	fmt.Println(diff.Minutes(), diff.Seconds()) // 65 3900
	t3, err := time.Parse("2006-01-02 15:04:05", "2022-03-27 01:25:36")
	if err != nil {
		panic(err)
	}
	fmt.Println(t3 == t)    // true
	fmt.Println(now.Unix()) // 1683795669
}

```

## 数字解析
```go
package main

import (
	"fmt"
	"strconv"
)

func main() {
	f, _ := strconv.ParseFloat("1.234", 64)
	fmt.Println(f) // 1.234

	n, _ := strconv.ParseInt("111", 10, 64)
	fmt.Println(n) // 111

	n, _ = strconv.ParseInt("0x1000", 0, 64)
	fmt.Println(n) // 4096

	n2, _ := strconv.Atoi("123")
	fmt.Println(n2) // 123

	n2, err := strconv.Atoi("AAA")
	fmt.Println(n2, err) // 0 strconv.Atoi: parsing "AAA": invalid syntax
}

```

## 进程信息
```go
package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	// go run example/20-env/main.go a b c d
	fmt.Println(os.Args)           // [/var/folders/8p/n34xxfnx38dg8bv_x8l62t_m0000gn/T/go-build3406981276/b001/exe/main a b c d]
	fmt.Println(os.Getenv("PATH")) // /usr/local/go/bin...
	fmt.Println(os.Setenv("AA", "BB"))

	buf, err := exec.Command("grep", "127.0.0.1", "/etc/hosts").CombinedOutput()
	if err != nil {
		panic(err)
	}
	fmt.Println(string(buf)) // 127.0.0.1       localhost
}

```