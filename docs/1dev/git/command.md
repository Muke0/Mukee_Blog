# git命令
|  命令 | 作用 | 
| :---- | :---- |
|git init|初始化仓库|
|git clone|复制仓库|
|git add|添加跟踪文件|
|git commit -m ""|提交更改，并注释|
|git status|检查当前状态|
|git rm|删除文件|
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