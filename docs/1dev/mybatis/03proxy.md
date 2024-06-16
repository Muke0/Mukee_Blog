# mybatis Mapper代理开发
## 作用
首先它不依赖于字符串字面值，会更安全一点；其次，如果你的 IDE 有代码补全功能，那么代码补全可以帮你快速选择到映射好的 SQL 语句。
## 步骤
1. 定义与sql映射文件同名的Mapper接口，并将mapper接口和sql映射文件放置在同一目录下。具体步骤https://blog.csdn.net/zxd1435513775/article/details/79710493，一种方式是，在resource文件下新建目录，目录名称为将mapper接口路径中的.改为/，此时mybatis会自动解析，打包时放在同一目录下。
2. 设置sql映射文件的namespace属性为Mapper接口全限定名
3. 在Mapper接口中定义方法，方法名为sql映射文件中sql语句的id，并保持参数类型和返回值类型一致
```java
    List<User> selectAll();//xml方式

    @Select("SELECT * FROM tb_user")
    List<User> select();//注解方式
```
4. 编码
```java
UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
List<User> users = userMapper.selectAll();//代理方式
//List<User> users = sqlSession.selectList("test.selectAll");//普通方式
System.out.println(users);
```