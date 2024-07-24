# 线程池
## 线程池的背景
线程池是一种池化技术，实现了对于线程的复用。解决了线程数量不可控和线程频繁创建和销毁带来的开销。
## 线程池的参数
### 核心线程数量
不管任务数量，常驻的线程。
### 最大线程数量
当阻塞队列满之后，再有新任务加入，线程池就会在核心线程数量之外新创建线程（扩容），来执行新加入的任务。
### 阻塞队列
核心线程被用完后，新任务加入会进入阻塞队列。不同的阻塞队列
### 线程最大空闲时间
当非核心线程不执行任务超过这个时间，非核心线程就会被销毁，节约资源。
### 超时单位
### 拒绝策略
### 线程工厂
## 问题
### 为什么不建议使用Java自带的Executors创建线程池？
原因：线程池的参数不是由我们自己控制的。Java自带四种线程池，FixedThreadPool,SingleThreadExecutor,CachedThreadPool,ScheduledThreadPool。前两种线程池的阻塞队列长度为Integer.Max_VALUE，可能会堆积大量请求，导致OOM。后两种线程池最大线程数量为Integer.MAX_VALUE，可能会创建大量线程，导致OOM。
### 线程池参数应该如何设置
业务分为两种类型，计算密集型应用和IO密集型应用。
#### 计算密集型应用
需要大量的CPU计算。虽然可以拆成多个任务执行，但切换成本过大。因此，最高效的方法是让同时执行的任务数量等于CPU的核心数量。
#### IO密集型应用
涉及到IO操作（网络IO、磁盘IO）一般都是IO密集型应用。在这类场景下，CPU消耗很少，程序大部分时间都被IO操作阻塞。所以线程越多，CPU利用率越高。但线程过多会导致OOM。
#### 计算公式
##### IO密集型应用
```
最大线程数 = Ncpu / （1 - 阻塞系数）
```
阻塞系数需要采用性能分析工具或java.lang.management API来确定IO操作喻CPU米级人物所耗时间的比值，常见数值为0.7-0.9.如果任务计算式90%的时间双核CPU都在闲置，线程则应设置为20。
##### 计算密集型应用
```
最大线程数 = Ncpu + 1
```
+1的原因：需要有一个核心完成线程上下文的调度
##### 核心线程数
```
核心线程数 = 最大线程数 * 0.2
```
## 思想
### 生产者-消费者模型
可以把基于阻塞队列的生产者消费者模型放大一下，就是分布式消息队列。而这个模型就是线程级别的消息队列。
### 扩容与缩容
### 拒绝策略
保证系统的安全性。