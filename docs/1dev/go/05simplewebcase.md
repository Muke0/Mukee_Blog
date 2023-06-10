# go实践简单web服务
## 需求描述
社区话题页面 
展示话题（标题，文字描述）和回帖列表 
暂不考虑前端页面实现，仅仅实现一个本地web服务 
话题和回帖数据用文件存储 

## 需求用例
使用者和使用功能模块
![simplewebcase_1](/1dev/go/simplewebcase_1.png "simplewebcase_1") 

## ER图
实体之间的关系，实体的所有属性
![simplewebcase_2](/1dev/go/simplewebcase_1.png "simplewebcase_2") 

## 分层结构
数据层处理输入的数据，当输入文件和输入数据库记录时，暴露的接口不变。
逻辑层将数据打包成实体
视图层暴露api接口
![simplewebcase_3](/1dev/go/simplewebcase_1.png "simplewebcase_3") 

## 组件工具
Gin高性能go web 框架 
https://github.com/gin-gonic/gin#installation 
Go Mod 
go mod init 
go get gopkg.in/gin-gonic/gin.v1@v1.3.0 

## Repository
QueryTopicById 通过话题id查询话题
QueryPostsByParentId 通过话题id查询帖子

### Repository-index
通过数据行映射成map
```go
var(
        topicIndexMap map[int64]*Topic
        postIndexMap map[int64][]*Post
)
```
## service
## view
## 课后作业
支持发布帖子 
本地Id生成需要保证不重复、唯一性
Append文件，更新所有，注意Map的并发安全问题