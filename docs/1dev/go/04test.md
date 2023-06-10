# go 测试
## 测试类型
回归测试，集成测试，单元测试，从左到右覆盖率不断变大，成本不断降低
### 单元测试
![unit_testing](/1dev/go/unit_testing.png "unit_testing")
#### 单元测试规则
所有测试文件以_test.go结尾 
```go
func TestPublishPost(t *testing.T){

}

func TestMain(m *testing.M){
    //测试前：数据装载、配置初始化等前置工作
    code := m.Run()
    //测试后：释放资源等收尾工作
    os.Exit(code)
}
```
#### 单元测试例子
```go
func HelloTom string{
    return "Jerry"
}
func TestHelloTom(t *testing.T){
    output := HelloTom()
    expectOutput:="Tom"
    if output ！= expectOutput{
        t.Errorf("Expexted %s do not match actual %s",expectOutput,output)
    }
}
```
![unit_testing1](/1dev/go/unit_testing1.png "unit_testing1")

#### 单元测试覆盖率
assert包获取方式 
终端输入
```shell
go get github.com/stretchr/testify/assert
```
judement_test.go
```go
package main

import (
	"github.com/stretchr/testify/assert"
	"os"
	"testing"
)

func TestJudgePassLineTrue(t *testing.T) {
	isPass := JudgePassLine(70)
	assert.Equal(t, true, isPass)
}

func TestMain(m *testing.M) {
	//测试前：数据装载、配置初始化等前置工作
	code := m.Run()
	//测试后：释放资源等收尾工作
	os.Exit(code)
}
```
judement.go
```go
package main

func JudgePassLine(score int16) bool {
	if score >= 60 {
		return true
	}
	return false
}

```
在项目目录下运行go test ./judement_test.go ./judgment.go --cover获取覆盖率结果 
已经测试的两行/总共三行代码
![unit_testing2](/1dev/go/unit_testing2.png "unit_testing2")
如何提高单元覆盖率 
增加测试的行数
```go
func TestJudgePassLineFalse(t *testing.T) {//测试失败分支
	isPass := JudgePassLine(50)
	assert.Equal(t, false, isPass)
}
```
一般覆盖率50%~60%,较高覆盖率80%+ 
覆盖率过高会导致成本较高 
测试分支相互独立、全面覆盖 
测试单元粒度足够小，函数单一职责
#### 单元测试-依赖
![unit_testing3](/1dev/go/unit_testing3.png "unit_testing3")
#### 单元测试-文件处理

#### 单元测试-Mock
monkey: https://github.com/bouk/monkey 
快速Mock函数 
为一个函数打桩 
为一个方法打桩 
相当于直接将数据写在程序中，而不依赖本地文件
```go
//Patch replaces a function with another
func Patch(target,replacement interface{}) *PatchGuard{
    t:=reflect.ValueOf(target)
    r:=reflect.ValueOf(replacement)
    patchValue(t,r)

    return &PatchGuard{t,r}
}

//Unpatch removes any monkey patches on target
//returns whether target was patched in the first place
func Unpatch(target interface{}) bool{
    return unpatchValue(reflect.ValueOf(target))
}
```
```go
package main

import (
	"bou.ke/monkey"
	"github.com/stretchr/testify/assert"
	"os"
	"testing"
)

// func TestProcessFirstLine(t *testing.T) {
// 	firstLine := ProcessFirstLine
// 	assert.Equal(t, "line00", firstLine)
// }

func TestProcessFirstLineWithMock(t *testing.T) {
	monkey.Patch(ReadFirstLine, func() string {
		return "line110"
	})
	defer monkey.Unpatch(ReadFirstLine)
	line := ProcessFirstLine()
	assert.Equal(t, "line000", line)
}

func TestMain(m *testing.M) {
	//测试前：数据装载、配置初始化等前置工作
	code := m.Run()
	//测试后：释放资源等收尾工作
	os.Exit(code)
}

```
这里的monkey包在下载之后，需要移动包的位置来正确执行。 
将go/src/github.com目录下的bou.ke包移动到go/src目录下。
### 基准测试
优化代码，需要对当前代码分析 
内置的测试框架提供了基准测试的能力 
使用方法类似单元测试 
#### 负载均衡例子
select.go
```go
package main

import (
	"math/rand"
)

var ServerIndex [10]int

func InitServerIndex() {
	for i := 0; i < 10; i++ {
		ServerIndex[i] = i + 100
	}
}

func Select() int {
	return ServerIndex[rand.Intn(10)]
}

```
select_test.go
```go
package main

import (
	"os"
	"testing"
)

func BenchmarkSelect(b *testing.B) {
	InitServerIndex()
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		Select()
	}
}

func BenchmarkSelectParallel(b *testing.B) {
	InitServerIndex()
	b.ResetTimer()
	b.RunParallel(func(pb *testing.PB) {
		for pb.Next() {
			Select()
		}
	})
}

func TestMain(m *testing.M) {
	//测试前：数据装载、配置初始化等前置工作
	code := m.Run()
	//测试后：释放资源等收尾工作
	os.Exit(code)
}
```
![benchmark_1](/1dev/go/benchmark_1.png "benchmark_1")
并行情况下性能较差，原因：Select用到了rand函数，该函数为了保证全局随机性和并发安全，持有全局锁 
为了解决随机函数的性能问题，采用fastrand函数，地址：https//github.com/byteDance/gopkg 
fastrand 牺牲了随机数列的一致性
```go
func FastSelect() int {
    return ServerIndex[fastrand.Intn(10)]
}
```
```go
func BenchmarkFastSelectParallel(b *testing.B) {
	InitServerIndex()
	b.ResetTimer()
	b.RunParallel(func(pb *testing.PB) {
		for pb.Next() {
			FastSelect()//修改位置
		}
	})
}
```