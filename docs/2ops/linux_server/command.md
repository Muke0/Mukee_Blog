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

## cat(Concatenate)
将文件或标准输入组合输出到标准输出。这个命令常用来显示文件内容，或者将几个文件连接起来显示，或者从标准输入读取内容并显示，它常与重定向符号配合使用。
```shell
cat [选项] [文件]
cat -b #对非空输出行编号
cat -E #在每行结束处显示$
cat -n #对输出的所有行编号
cat -s #有连续两行以上的空白行，就代换为一行空白行
tac #反向显示
cat -ns 1.log > 2.log #把1.log的文件内容加上行号后输入2.log这个文件里，多行空行换成一行输出
```

## more
功能类似 cat ，cat 命令是将整个文件的内容从上到下显示在屏幕上。 more 命令会一页一页的显示，方便使用者逐页阅读，而最基本的指令就是按空格键（space）往下一页显示，按 B 键就会往回（back）一页显示，而且还有搜寻字串的功能。more 命令从前向后读取文件，因此在启动时就加载整个文件。
```shell
more [选项] [文件]
more +n #从第n行开始显示
more -n #定义屏幕大小为n行
more +/pattern #在每个档案显示前搜寻该字串（pattern），然后从该字串前两行之后开始显示
more -c #从顶部清屏，然后显示
more -s #把连续的多个空行显示为一行
more -u #把文件内容中的下划线去掉
ll /etc | more -10 #显示/etc目录信息，每页显示10个文件
```
常用操作</br>
|  操作 | 作用 |
| :---- | ----: |
|=|输出当前行的行号|
|q|退出more|
|空格键|向下滚动一屏|
|b|返回上一屏|

## less
less 命令也是对文件或其它输出进行分页显示的工具，应该说是 Linux 正统查看文件内容的工具，功能极其强大。
```shell
less [选项] 文件
less -e #当文件显示结束后，自动离开
less -f #强迫打开特殊文件，例如外围设备代号、目录和二进制文件
less -i #忽略搜索时的大小写
less -m #显示类似more命令的百分比
less -N #显示每行的行号
less -s #显示连续空行为一行
```
常用操作</br>
|  操作 | 作用 |
| :---- | ----: |
|/字符串|向下搜索“字符串”的功能|
|?字符串|向上搜索“字符串”的功能|
|n|重复前一个搜索|
|N|反向重复前一个搜索|
|b|向前翻一页|
|d|向后翻半页|
|q|退出less命令|
|空格键|向后翻一页|
|向上键|向上翻动一行|
|向下键|向下翻动一行|

## 用户和组管理
``` shell
userdel -r guest2 #将用户和用户目录同时删除
usermod guest1 -u 2000 -d /tmp/tempuser -g guest #将guest1用户的uid改成2000，并将guest用户组作为其主用户组，同时创建目录/tmp/tempuser作为guest1的家目录
groupadd guest #创建guest用户组
useradd -d /home/vsftpduser -s /usr/sbin/nologin vsftpduser #创建虚拟用户vsftpduser,创建目录/home/vsftpduser目录作为vsftpduser的家目录
chown -R vsftpduser:vsftpduser /home/vsftpduser #将/home/vsftpduser的所属用户改为vsftpduser,所属用户组改为vsftpduser组
chmod -R 744 /home/vsftpduser #将权限修改为只有vsftpduser有完整权限，组用户和其他用户只有读权限 rwx

useradd -g projectx dev #添加用户dev，属于projectx用户组
sudo chown -R dev:projectx /srv/projectx #将/srv/projectx目录的所属用户改为dev，所属用户组改为/srv/projectx

grep 'bash$' /etc/passwd | cut -d ":" -f 1,3 > ~/users.txt #将当前系统中所有使用bash作为默认shell的可登录用户，提取用户名和uid，保存到当前用户加目录下的users.txt文件中

sudo su #切换到root
passwd stu #给stu改密码
usermod -p #使用这种方式，修改的是加密后的密码，所以无法登录
```

## vmstat
监视linux系统状态
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