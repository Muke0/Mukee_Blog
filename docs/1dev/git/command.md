# git命令
|  命令 | 语法 | 作用 | 
| :---- | :----| :---- |
|SELECT|SELECT column FROM table_name (WHERE )|查找|
|INSERT INTO|	INSERT INTO table_name VALUES (value1, value2, value3,....) or INSERT INTO table_name (column1, column2, column3,...) VALUES (value1, value2, value3,....)|插入|
|UPDATE|UPDATE table_name SET column1=value, column2=value,... WHERE some_column=some_value|更新|
|DELETE|DELETE FROM table_name WHERE some_column=some_value|删除|
|SELECT DISTINCT|SELECT DISTINCT column1, column2, ... FROM table_name;|查找唯一不同的值|
|SELECT LIMIT|SELECT column_name(s) FROM table_name LIMIT number;|规定要返回的记录的数目|
# git ssh连接
```shell
ssh-keygen -t rsa -C "youremail@example.com" #先在终端生成ssh密钥
```
在~/.ssh/目录下可以看到id_rsa和id_rsa.pub，其中id_rsa.pub是公钥，将id_rsa.pub中的内容复制到github setting里
![newsshkey](/1dev/git/newsshkey.png "newsshkey")
![addnew](/1dev/git/addnew.png "addnew")
添加成功后，回到终端输入命令
```
ssh -T git@github.com
git remote rm origin
git remote add origin git@github.com:Muke0/Mukee_Blog.git  
```
ssh连接建立成功