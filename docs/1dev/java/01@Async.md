## 异步@Async使用

### 背景

在微信公众号向所有员工推送消息时，不作任何异步处理，调用feign发送微信模板消息，时间开销过大，对一个员工发送请求到接受请求需要0.2~0.3s左右，十个员工就需要2~3s。

### 解决方案

因为不需要发送模板消息的响应，所以可以异步发送消息，将发送消息的方法加上@Async。

但是，@Async是通过aop代理实现的，而调用自己类的异步方法会绕过aop，解决方法为使用spring上下文取得代理对象。

```java
        for (Employee employee : employeeMapper.selectList(wrapper)) {
            WechatBinding binding = wechatBindingMapper.selectByPhone(employee.getPhone());
            if (binding!=null) {
                wechatOffiaccountPushService.sendPushMessage(binding.getOpenId(), order,userPhone);
            }else{
                /*
                @Async注解是通过aop代理实现的，而调用自己类的异步方法时，绕过了aop代理从而导致其异步失效，
                可以从spring上下文中取得代理对象，继而调用其异步方法。
                 */
                OrderService orderService = applicationContext.getBean(OrderService.class);
                orderService.sendPushSms(order,employee.getPhone(),userPhone);
            }
        }
```

### 异步导致的其他问题

由于异步是新开一个线程执行任务，导致无法读取原线程session中的信息。因此如果要使用session中的信息，需提前取出，作为参数传入。




















