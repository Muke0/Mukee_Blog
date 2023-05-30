
## 依赖管理
工程项目不可能只基于标准库搭建
### 依赖管理演进
GOPATH GOVENDOR GO MODULE
### GOPATH
结构
bin 项目编译的二进制文件
pkg 项目编译的中间产物，加速编译
src 项目源码
代码项目直接依赖src下的代码
go get下载最新版本的包到src目录下
弊端：
本地的两个项目依赖于一个package的不同版本时，无法实现package的多版本控制

### GOVENDOR
项目目录下增加vendor文件，所有依赖包以副本形式放在项目根目录下的vendor文件夹中
依赖寻址方式：vendor=>GOPATH
弊端：![GOVENDOR](/1dev/go/GOVENDOR.png "GOVENDOR")

### GOMODULE
通过go.mod文件管理依赖包版本
通过go get/go mod指令管理依赖包
实现目标：定义版本规则和管理项目依赖关系

### 依赖管理三要素
1配置文件 描述依赖 go.mod
2中心仓库管理依赖库 Proxy
3本地工具 go get/mod
类似java maven

### 依赖配置
```
module example/project/app //依赖管理基本单元

go 1.18 //原生库

require(//单元依赖
   example/lib1 v1.0.2 // indirect
   example/lib2 v3.2.0+incompatible
)
```

#### version
语义化版本${MAJOR}.${MINOR}.{PATH}
MAJOR版本之间不兼容
MINOR是新增内容
PATH是修复内容

基于commit伪版本
vx.0.0-yyyymmddhhmmss-abcdefgh1234
大版本号-时间戳-哈希校验码

#### indirect
间接依赖

#### incompatible
主版本2+模块会在模块路径增加/vN后缀
对于没有go.mod文件并且主版本2+的依赖，会+incompatible
意思是可能存在不兼容

#### 依赖图
![dependency_graph](/1dev/go/dependency_graph.png "deppendency_graph")

#### 依赖分发
github svn
回源：无法保证构建稳定性，无法保证依赖可用性，增加代码托管平台负载

Proxy
缓存依赖包内容
GOPROXY="https://proxy1.cn,https://prox2.cn,direct"
direct表示源站
从左往右找

### 工具
#### go get
go get example.org/pkg  
@update 默认
@none 删除依赖
@v1.1.2 语义版本
@23dfdd5 特定的commit
@master 分支最新的commit

#### go mod
go mod init/donload/tidy
初始化，创建go.mod文件/下载模块到本地缓存/增加需要的依赖，删除不需要的依赖