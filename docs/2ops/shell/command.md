# shell
## for
### 格式
``` shell
for var in 1 2 3 4 5 #最简单直接的for,空格分隔的值列表
do
    echo $var
done

for var in {1..5..1} #花括号序列{起始值..终止值..步进值}
do
    echo $var
done

for var in 'seq 1 1 5'#seq 起始值 步进值 终止值
do
    echo $var
done

for ((var=1;var<=5;var++))#双圆括号，语法类似c
do
    echo $var
done
```
## while
### 格式
``` shell
while command
do
    commands
done
```
### 示例
``` shell
#!/bin/bash
file=/etc/passwd
while read line
do
    echo $line
done < $file
```
可以用来显示文件内容，再加上替换、修改、删除、提取等，可以对文件内容进行处理。为了让脚本更加灵活，可以使用位置变量传递文件名
``` shell
#!/bin/bash
while read line
do
    echo $line
done < $1
```
while循环中还可以通过break退出循环，或使用双圆括号的形式书写命令或者条件部分
## until
### 格式
``` shell
until test commands
do
    other commands
done
```
和while刚好相反，当条件为假是循环
### 示例
``` shell
#!/bin/bash
until who | grep "user01" > /dev/null 2>&1
do
    sleep 10
done
echo "user01 is online"
```
监视用户user01是否登录，如果登陆了就打印提示信息。
## select
### 格式
``` shell
select 变量 in 值列表
do
    commands
done
```
### 示例
``` shell
#!/bin/bash
PS3="Please Select[1-5]:"
select m in new insert modify delete exit
do
    echo $m
    if [ $m == exit ]; then
        exit
    fi
done
```