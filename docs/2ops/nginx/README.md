# nginx
## 1nginx的相关概念
### 正向代理和反向代理
![正向代理](/2ops/nginx/forward_proxy.png "正向代理")
正向代理隐藏客户端，原始服务器www.google.com会认为是代理服务器www.abc.com的访问。作用：1、访问原本客户端无法访问的服务器。2、加速访问服务器。3、Cache作用。4、客户端访问授权。5、隐藏访问者的行踪