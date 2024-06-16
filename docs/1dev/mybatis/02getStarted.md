# mybatis 快速入门
## 查询user表中所有数据步骤
1. 创建user表
2. 创建模块导入坐标
3. 编写配置文件，替换连接信息

4. 编写sql映射文件，替换sql语句
5. 编码
``` java
//1.加载核心配置文件，获取sqlSessionFactory
String resource = "mybatis-config.xml";
InputStream inputStream = Resources.getResourceAsStream(resource);
SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//2.获取sqlSession
SqlSession sqlSession = sqlSessionFactory.openSession();
//3.执行sql
List<User> users = sqlSession.selectList("test.selectAll");
System.out.println(users);
```

mybatis-config.xml

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <!--数据库连接信息-->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://127.0.0.1:3309/hmdp?useSSL=false&amp;serverTimezone=UTC"/>
                <property name="username" value="root"/>
                <property name="password" value="zhaokedi"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="UserMapper.xml"/>
    </mappers>
</configuration>
```

userMapper.xml

``` xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="test">
    <select id="selectAll" resultType="org.example.pojo.User">
        select * from tb_user
    </select>
</mapper>
```
## 多参数注意点
mybatis在参数传递中遇到多参数时，会将多个参数封装为map。mapper多参数写法：
```java
User selectByIdOrName(@Param("id")int id, @Param("nick_name")String nick_name);//传入多个参数时，需要用注解指定参数名称
```