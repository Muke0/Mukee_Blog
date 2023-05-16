# Linux服务器常用命令
## cd(Change Directory)
更改当前目录
```shell
cd [目录名]
cd / #系统根目录
cd .. #父目录
cd ~ #当前用户主目录
```
## pwd(Print Working Directory)
打印当前目录
```shell
pwd [选项]
pwd #当前目录路径
pwd -P #当前目录的物理路径
pwd -L #当前用户的连接路径
```
## ls(List)
列出当前目录下的文件
```shell
ls [选项] [目录名]
ls -a #列出所有文件，包括以.开头的隐含文件
ls -l #文件名加上权限，所有者，文件大小等信息
ls -h #human-readable 以容易理解的格式列出文件大小，（例如1K）
ls -t #以文件修改时间排序
ls -S #以文件大小排序
ls -r #反向排序
```
## nginx常用命令
```shell
nginx -h #帮助
nginx -s (start/reload/stop) #启动/重启/停止
nginx -t #配置文件
nginx -V 2>&1 | sed 's/ /\n/g' #版本和配置参数信息
cat /etc/nginx/nginx.conf | grep -vE "#|^$" #查看配置文件时不显示注释和空白行
```
## apt常用命令
```shell
apt install (name) #下载
apt update #更新
apt remove #删除
```
## docker常用命令
```shell
docker images #列出所有镜像
docker run -d -p8080:80 [image_name] #8080映射到宿主机80端口
docker rm -f [container_id] #删除容器
docker exec -it [container_id] /bin/bash #进入容器命令行
docker cp 本地文件路径 [container_id]:容器路径  #复制文件到容器中
service apache2 restart #重启apache2服务器
docker commit -m="has update" -a="mukee" [container_id] runoob/ubuntu:v2 #更新镜像
docker restart [container_id] #重启容器
```