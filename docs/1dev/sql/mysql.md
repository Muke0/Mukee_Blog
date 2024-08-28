# mysql
## 为什么mysql需要使用redo log来完成数据库的持久化而不是直接写入底层的ibd文件
如果直接对ibd文件进行写入，是磁盘的随机写入效率较低。而如果使用redo log写入，是磁盘的顺序写入，效率较高，接近内存的随机写入；
## MVCC多版本并发控制
### MVCC机制是保证快照读，四个隔离级别下的快照读。
隔离级别 | 解决的问题 |  
| :---- | :----|
|读未提交(Read Uncommited) | 没有解决任何问题| 
|读已提交(Read Commited)   | 不会出现脏读|
|可重复读(Read Repeatable) | 不会出现脏读、不可重复读|
|串行化(serializable)      | 不会出现脏读、不可重复读、幻读|
## 锁
### 表级锁
#### 意向锁，可以通过该锁快速判断表中是否有记录被加锁
### 行级锁
#### 记录锁(record lock)，锁住的时某一条记录
记录锁是对索引加的，如果不通过索引条件检索数据，记录锁会升级为表锁  
在insert，update，delete时会自动添加写记录锁  
select不加任何锁，select lock in share mode加读记录锁(8.0后可以使用select for share),select for update加写记录锁  

#### 间隙锁(gap lock)，锁住的是范围，例如，四条记录1，2，3，5，select lock in share mode where id = 5锁住id范围（3，5）后，无法插入4。
只存在于可重复读级别，目的是为了解决可重复读下当前读的幻读问题。  
#### 临键锁(next-key lock)是记录锁和间隙锁的组合，例如，可以锁住（3,5]

### 可重复读的幻读情况
事务A先快照读（select），B插入，A再当前读（select for update），会发生幻读情况。
#### 使用可重复读时，为了避免幻读情况，应该先当前读，锁住记录后再进行其他操作

