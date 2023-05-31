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