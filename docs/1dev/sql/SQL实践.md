# SQL实践

## SELECT * FROM wechat WHERE open_id =#{openId} ORDER BY id DESC LIMIT 1

limit 1找到一条记录后就返回，提高效率。

为什么需要order by id主键

## SELECT COUNT(1) FROM table WHERE id = 5

在 MySQL 中，使用 `COUNT(1)` 和 `COUNT(*)` 都会产生相同的结果，因为它们都是用来计算行数的，而不是特定列的值。因此，将 `COUNT(*)` 改为 `COUNT(1)` 不会影响查询结果，两者都会返回满足条件的行数。而count(列名)计算的是指定列中不包含null值的行数，与count(1)和count(*)不一样。在innodb引擎下，count(*)和count(1)一样快，快于count(列名)。而在myisam下count(*)快于或等于count(1)，快于count(列名)。myisam存储了表的总行数，使用count(*)不走统计，直接读取，所以最快。使用count(1)时，假如第一列为not null，myisam也会直接读取总行数进行优化。

## @Transactional(readOnly = true)

### 被标注的方法如果含有多条查询语句，能够保证可重复读；如果只含有一条查询语句，可以优化查询。