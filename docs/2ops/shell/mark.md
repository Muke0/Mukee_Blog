使用点命令载入脚本之后，再修改脚本内容，不影响已经载入的函数
``` shell

```
set可以查看当前内存中已经定义和载入的函数
unset可以清除

## grep sort cut > |
``` shell
#输出每行末尾为Y的
grep "^.*Y" customers > /home/shiyanlou/vip
#每行升序排序customers
sort customers > /home/shiyanlou/asc
#输出倒数第四和倒数第三位为“HZ”的行数
grep -c "^.*HZ.." customers > /home/shiyanlou/hz
#删除customers的重复行 一定要先排序，uniq只会删除在一起的重复行
sort customers | uniq > uniqcustomers
#将每行文字按;分割，按第三个区域排序，输出为customers.bak
sort -t ";" -k 3 ~/04/uniqcustomers > /home/shiyanlou/customers.bak
#将每行文字按;分割，取第二个区域，排序后输出为email
cut -d \; -f 2 ~/04/uniqcustomers | sort > email
#去除文件中的重复行，然后将customers的文件中所有来自NB的VIP用户的电子邮件信息提取出来，按字典序升序排序后，保存到当前用户（shiyanlou）家目录下的vip_email文件中。
grep "^.*NB;Y" ~/04/uniqcustomers | cut -d \; -f 2 | sort > vip_email
#删除空行和注释行
grep -v "^#" sshd_config | grep -v "^$" > ~/sshd_config.bak
```

## 用户管理
``` shell
sudo adduser lilei #创建用户
sudo passwd lilei #设置密码
groups shiyanlou #查看用户组
```