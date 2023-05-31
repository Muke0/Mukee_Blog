
## 并发概念及语法
### 协程和线程
协程：用户态，轻量级线程，栈KB级别 
线程：内核态，线程跑多个协程，栈MB级别 
例子 
```go
package main

import (
	"fmt"
	"time"
)

func hello(i int) {
	println("hello goroutine :" + fmt.Sprint(i))
}
func HelloGoRoutine() {
	for i := 0; i < 5; i++ {
		go func(j int) {
			hello(j)
		}(i)
	}
	time.Sleep(time.Second)
}

func main() {
	HelloGoRoutine()
}

```
### CSP(Communicating Sequential Processes)
![CSP](/1dev/go/CSP.png "CSP")
go提倡通过通信共享内存，而不是通过共享内存而实现通信 

### Channel
make(chan 元素类型,[缓冲大小]) 
无缓冲通道 make(chan int) 
有缓冲通道 make(chan int,2) 
```go
func CalSquare() {
	src := make(chan int)     //无缓冲队列
	dest := make(chan int, 3) //有缓冲队列
	go func() {
		defer close(src)
		for i := 0; i < 10; i++ {
			src <- i //将i发送到src这个channel中
		}
	}()
	go func() {
		defer close(dest)
		for i := range src { //获取src中的数字
			dest <- i * i
		}
	}()
	for i := range dest { //从dest中获得最终结果
		println(i)
	}
}
```

### 并发安全Lock
```go
var (
	x    int64
	lock sync.Mutex
)

func addWithLock() {
	for i := 0; i < 2000; i++ {
		lock.Lock()
		x += 1
		lock.Unlock()
	}
}

func addWithoutLock() {
	for i := 0; i < 2000; i++ {
		x += 1
	}
}

func Add() {
	x = 0
	for i := 0; i < 500; i++ { //在数量级很小时，有可能加不加锁结果相同
		go addWithoutLock()
	}
	time.Sleep(time.Second)
	println("WithoutLock:", x)
	x = 0
	for i := 0; i < 500; i++ {
		go addWithLock()
	}
	time.Sleep(time.Second)
	println("WithLock:", x)
}
```

### WaitGroup
暴露三个方法 
Add(delta int) 计数器+delta 
Done() 计数器-1 
Wait(阻塞直到计数器为0) 
```go
func ManyGoWait() {
	var wg sync.WaitGroup
	wg.Add(5)
	for i := 0; i < 5; i++ {
		go func(j int) {
			defer wg.Done()
			hello(j)
		}(i)
	}
	wg.Wait()//等到子进程执行结束
}
```