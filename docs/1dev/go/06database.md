# 存储与数据库
## 经典案例
json形式字符串从前端发送到后端服务器，再到数据库持久化下来 
校验数据合法性->修改内存->写入存储介质 
## 存储系统
一个提供了读写、控制类接口，能够安全有效地把数据持久化的软件，就可以成为存储系统
### 存储系统系统特点
性能敏感容易受硬件影响 代码既简单又复杂（简单：为了效率 复杂：为了安全）
### 存储器层级结构
![database_1](/1dev/go/database_1.png "database_1") 
### 数据怎么从应用到存储介质 
![database_2](/1dev/go/database_2.png "database_2") 
### RAID
Redundant Array of Inexpensive Disks
出现背景：
单块大容量磁盘的价格>多块小容量磁盘 
单块磁盘的写入性能<多块磁盘的并发写入性能 
单块磁盘的容错能力有限，不够安全 
RAID 0
多块磁盘简单组合 没有额外的容错设计
RAID 1 
一块磁盘对应另外一块额外镜像盘 容错能力强 
RAID 0+1
结合RAID0和RAID1
## 数据库
### 关系
关系就是集合 任意元素组成的若干有序偶对 
反映了事物间的关系 
SQL 方便人类阅读的关系代数表达式
### 关系型数据库
结构化数据友好 支持事务（ACID） 支持复杂查询语言 
### 非关系型数据库
半结构化数据友好 可能支持事务(ACID) 可能支持复杂查询语言
### 数据库和经典存储对比
#### 结构化存储
写入关系型数据库时，以表形式管理 
写入文件时，自行定义和管理结构，在byte级别上操作
#### 事务能力 
事务ACID:
Atomicity 事务内的操作要么全做，要么不做 
Consistency 事务执行前后，数据状态是一致的 
Isolation 可以隔离多个并发事务，避免影响 
Durability 事务一旦提交成功，数据保证持久性
#### 复杂查询能力 
查询出名字以xiao开头，且密码提示问题小于10个字的人，并按性别分组统计人数 
```sql
Select gender,count(*) from user where user_name like 'xiao%' and len(password_hint) < 10
group by gender
```
灵活简洁
### 数据库使用方式 
Everything is Domain Specific Language  -> maybe SQL 

## 主流产品剖析 
### 单机存储 
单个计算机节点上的存储软件系统
#### 本地文件系统
Linux 一切皆文件
文件系统的管理单元:文件 
文件系统接口：VFS 所有文件系统都遵循VFS的统一抽象接口 
Linux文件系统的两大数据结构:Index Node & Directory Entry 
Index Node: 记录文件元数据，如id、大小、权限、磁盘位置等 inode是一个文件的唯一表示，会被存储到磁盘上；inode的总数在格式化文件系统时就固定了 
Directory Entry: 记录文件名、inode指针，层级关系（parent）等；dentry是内存结构，与inode的关系是N:1（hardlink的实现）
#### key-value存储
常见使用方式： put(k,v)&get(k) 
常见数据结构：LSM-Tree，某种程度上牺牲读性能，追求写入性能 
![database_3](/1dev/go/database_3.png "database_3") 
### 分布式存储
在单机存储基础上实现了分布式协议，涉及大量网络交互
#### HDFS
时代背景：专用的高级硬件很贵，同时数据存量很大，要求超高吞吐 
HDFS核心特点：支持海量数据存储；高容错性；弱POSIX语义；使用普通x86服务器，性价比高
![database_4](/1dev/go/database_4.png "database_4") 
#### Ceph
核心特点：一套系统支持对象接口、块接口、文件接口，但是一切皆对象；数据写入采用主备复制模型；数据分布模型采用CRUSH算法（HASH+权重+抽签）
![database_5](/1dev/go/database_5.png "database_5") 
### 单机关系型数据库 
商业产品Oracle，开源产品mySQL&PostgreSQL 
通用组件： 
Query Engine 负责解析query,生成查询计划 
Txn Manager 负责事务并发管理
Lock Manager 负责锁相关策略 
Storage Engine 负责组织内存/磁盘数据结构 
Replication 负责主备同步 
 
关键内存数据结构：B-Tree\B+-Tree\LRU List等 
关键磁盘数据结构 WriteAheadLog(RedoLog)\Page
### 单机非关系型数据库
### 分布式数据库