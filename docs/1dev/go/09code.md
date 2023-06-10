# 高质量
## 什么是高质量
编写的代码能够达到正确可靠、简洁清晰的目标，可称之为高质量代码 
各种边界条件是否考虑完备 
异常情况处理， 稳定性保证 
易读易维护 
## 原则
### 简单性
消除“多余的复杂性”，以简单清晰的逻辑编写代码 
不理解的代码无法修复改进 
### 可读性
代码是写给人看的，而不只是机器 
编写可维护代码的第一步是确保代码可读 
### 生产力
团队整体工作效率非常重要 
## 编码规范
代码格式、注释、命名规范、控制流程、错误和异常处理
### 注释
公共符号始终要注释 
包中声明的每个公共的符号：变量、常量、函数以及结构都需要添加注释 
任何既不明显也不简短的公共功能必须予以注释 
无论长度或复杂程度如何，对苦衷的任何函数都必须进行注释 
 
注释应该解释代码作用，解释代码如何做，解释代码实现的原因，解释代码什么情况会出错 
好的代码有很多注释，坏代码需要很多注释
#### 推荐使用gofmt自动格式化代码
### 命名规范
简洁胜于冗长 
缩略词全大写，但当其位于变量开头且不需要导出时，使用全小写
ServeHttp 而不是 ServeHttp 
XMLHTTPRequest 或者 xmlHTTPRequest 
变量距离其使用的地方越远，则需要携带越多的上下文信息 
#### 函数名function
函数名不携带包名的上下文信息，因为包名和函数名总是成对出现的 
函数名尽量简短 
当名为 foo的包某个函数返回类型Foo时，可以省略类型信息；返回类型T时，可以在函数名中加入类型信息 
#### 包名package
只由小写字母组成 
简短并包含一定的上下文信息。例如schema、task 
不要与标准库同名 
不适用常用变量名作为包名。例如使用bufio而不是buf 
使用单数而不是复数。例如使用encoding而不是encodings 
谨慎地使用缩写。例如使用fmt在不破坏上下文的情况下比format更加简短 
 
 好的命名就像一个好笑话。如果你必须解释它，那就不好笑了。
### 控制流程 
避免嵌套，保持正常流程清晰 
```go
//bad
if foo {
    return x
} else {
    return nil
}

//good
if foo {
    return x
}
return nil
```
尽量保持正常代码路径为最小缩进 
优先处理错误情况/特殊情况，今早返回或继续循环来减少嵌套 
```go
//bad
func OneFunc() error {
    err := doSomething()
    if err == nil{
        err := doAnotherThing()
        if err ==nil {
            return nil
        }
        return err
    }
    return err//最后返回的错误，需要往上追溯匹配的左括号
}

//Good
func OneFunc() error {
    if err := doSomething(); err != nil {
        return err
    }
    if err := doAnotherThing(); err != nil {
        return err
    }
    return nil //normal case
}
```
避免复杂的嵌套分支 
提升代码可维护性和可读性 
故障问题大多出现在复杂的条件语句中
### 错误和异常处理 
#### 简单错误
简单的错误指的是仅出现一次的错误，且在其他地方不需要捕获该错误 
优先使用errors.New来创建匿名变量来直接表示简单错误 
如果有格式化的需求，使用fmt.Errorf 
```go
func defaultCheckRedirect(req *Request,via []*Request) error {
    if len(via) >= 10 {
        return errors.New("stopped after 10 redirects")
    }
    return nil
}
```

#### 复杂错误
##### 错误的Wrap和Unwrap 
错误的Warp实际上是提供了一个error嵌套另一个error的能力，从而生成一个error的跟踪链 
在fmt.Errorf中使用:%w 关键字来将
```go
list,_,err := c.GetBytes(cache.Suvkey(a.actionID,"srcfiles"))
if err != nil {
    return fmt.Errorf("reading srcfiles list: %w", err)
}
```
##### 错误判定 
在错误链上获取特定种类的的错误，使用errors.As 
```go
if _, err := os.Open("non-existing"); err != nil {
    var pathError *fs.PathError
    if errors.As(err,&pathError){
        fmt.Println("Failed at path:",pathError.Path)
    } else {
        fmt.Println(err)
    }
}
```
##### panic
当程序启动阶段发生不可逆转的错误时，可以在init或main函数中使用panic
```go
func main(){
    ctx,cancel := context.WithCancel(context.Background())
    client,err := sarama.NewConsumerGroup(strings.Split(brokers,","),group,config)
    if err != nil {
        log.Panicf("Error creating consumer group client: %v",err)
    }
}

//Panicf is equivalent to Printf() followed by a call to panic()
func Panicf(format string, v ...interface{}){
    s := fmt.Sprintf(format,v...)
    std.Output(2,s)
    panic(s)
}
```
##### recover
只能在被defer的函数中使用
如果想获取上下文，可以recover后再log中记录当前的调用栈