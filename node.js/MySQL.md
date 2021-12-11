#### 查看`MySQL`安装

```
mysql --version
```

#### 查看所有数据

```mysql
SHOW DATABASES;
```

#### 使用某一个数据

```mysql
USE coderwhy;
```

#### 查看当前正在使用的数据库

```mysql
SELECT DATABASE();
```

#### 创建新的数据库

```mysql
CREATE DATABASE bilibili;
CREATE DATABASE IF NOT EXISTS bilibili;
CREATE DATABASE IF NOT EXISTS bilibili
			DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
```

#### 删除数据库

```mysql
DROP DATABASE bilibili;
DROP DATABASE IF NOT bilibili;
```

#### 修改数据库

```mysql
ALTER DATABASE bilibili CHARACTER SET = utf8 COLLATE = utf8_unicode_ai
```

#### 查看数据表

```mysql
#查看所有数据表
SHOW TABLES;
#查看某一个表结构
DESC user;	
```

#### 表约束

```mysql
#主键
PRIMARY KEY
#唯一
UNIQUE
#不能为空
NOT NULL
#默认值
DEFAULT
#自动递增
AUTO_INCREMENT
```

#### 创建数据表

```mysql
CREATE TABLE IF NOT EXISTS `user` (
	name VARCHAR(20),
  age INT,
  height DOUBLE
);
```

#### 删除数据表

```mysql
DROP TABLE user;
DROP TABLE IF EXISTS user;
```

#### 修改表

```mysql
# 1.修改表名
ALTER TABLE `moments` RENAME TO `moment`;
# 2.添加一个新的列
ALTER TABLE `moment` ADD `publishTime` DATETIME;
ALTER TABLE `moment` ADD `updateTime` DATETIME;
# 3.删除一列数据
ALTER TABLE `moment` DROP `updateTime`;
# 4.修改列的名称
ALTER TABLE `moment` CHANGE `publishTime` `publishDate` DATE;
# 5.修改列的数据类型
ALTER TABLE `moment` MODIFY `id` INT;
```

#### 根据一个表创建另一个表

```mysql
# 根据一个表结构去创建另外一张表
CREATE TABLE `user2` LIKE `user`;
# 根据另外一个表中的所有内容，创建一个新的表
CREATE TABLE `user3` (SELECT * FROM `user`); 
```

#### 插入数据

```mysql
INSERT INTO `products` (`title`, `description`, `price`, `publishTime`) 
						VALUES ('iPhone', 'iPhone12只要998', 998.88, '2020-10-10'); 
INSERT INTO `products` (`title`, `description`, `price`, `publishTime`) 
						VALUES ('huawei', 'iPhoneP40只要888', 888.88, '2020-11-11');
```

#### 删除数据

```mysql
# 会删除表中所有的数据
DELETE FROM `products`;
# 会删除符合条件的数据
DELETE FROM `products` WHERE `title` = 'iPhone';
```

#### 修改数据

```mysql
# 会修改表中所有的数据
UPDATE `products` SET `title` = 'iPhone12', `price` = 1299.88;
# 会修改符合条件的数据
UPDATE `products` SET `title` = 'iPhone12', `price` = 1299.88 WHERE `title` = 'iPhone';
```

如果我们希望修改完数据后，直接可以显示最新的更新时间：

```mysql
ALTER TABLE `products` ADD `updateTime` TIMESTAMP 
             DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP; 
```

#### 基本查询

```mysql
#查询所有的数据并且显示所有的字段：
SELECT * FROM `products`;
#查询title、brand、price：
SELECT title, brand, price FROM `products`;
#我们也可以给字段起别名：
 	#别名一般在多张表或者给客户端返回对应的key时会使用到；
SELECT title as t, brand as b, price as p FROM `products`;
```

#### where查询

```mysql
#比较运算符
# 查询价格小于1000的手机
SELECT * FROM `products` WHERE price < 1000;
# 查询价格大于等于2000的手机
SELECT * FROM `products` WHERE price >= 2000;
# 价格等于3399的手机
SELECT * FROM `products` WHERE price = 3399;
# 价格不等于3399的手机
SELECT * FROM `products` WHERE price = 3399;
# 查询华为品牌的手机
SELECT * FROM `products` WHERE `brand` = '华为';

#逻辑运算符
# 查询品牌是华为，并且小于2000元的手机
SELECT * FROM `products` WHERE `brand` = '华为' and `price` < 2000;
SELECT * FROM `products` WHERE `brand` = '华为' && `price` < 2000;
# 查询1000到2000的手机（不包含1000和2000）
SELECT * FROM `products` WHERE price > 1000 and price < 2000;
# OR: 符合一个条件即可
# 查询所有的华为手机或者价格小于1000的手机
SELECT * FROM `products` WHERE brand = '华为' or price < 1000;
# 查询1000到2000的手机（包含1000和2000）
SELECT * FROM `products` WHERE price BETWEEN 1000 and 2000;
# 查看多个结果中的一个
SELECT * FROM `products` WHERE brand in ('华为', '小米');

#模糊匹配
	# %表示匹配任意个的任意字符
	# _表示匹配一个的任意字符
# 查询所有以v开头的title
SELECT * FROM `products` WHERE title LIKE 'v%';
# 查询带M的title
SELECT * FROM `products` WHERE title LIKE '%M%';
# 查询带M的title必须是第三个字符
SELECT * FROM `products` WHERE title LIKE '__M%';
```

#### 查询结果排序

```mysql
#ORDER BY有两个常用的值：
	# ASC：升序排列；
	# DESC：降序排列；
SELECT * FROM `products` WHERE brand = '华为' or price < 1000 ORDER BY price ASC;
```

#### 分页查询

```mysql
SELECT * FROM `products` LIMIT 30 OFFSET 0;
SELECT * FROM `products` LIMIT 30 OFFSET 30;
SELECT * FROM `products` LIMIT 30 OFFSET 60;
# 另外一种写法：offset, row_count
SELECT * FROM `products` LIMIT 90, 30;
```

#### 聚合函数

 聚合函数表示对值集合进行操作的组（集合）函数。

```mysql
# 华为手机价格的平均值
SELECT AVG(price) FROM `products` WHERE brand = '华为';
# 计算所有手机的平均分
SELECT AVG(score) FROM `products`;
# 手机中最低和最高分数
SELECT MAX(score) FROM `products`;
SELECT MIN(score) FROM `products`;
# 计算总投票人数
SELECT SUM(voteCnt) FROM `products`;
# 计算所有条目的数量
SELECT COUNT(*) FROM `products`;
# 华为手机的个数
SELECT COUNT(*) FROM `products` WHERE brand = '华为';
```

#### Group By

GROUP BY通常和聚合函数一起使用，表示我们先对数据进行分组，再对每一组数据，进行聚合函数的计算

```mysql
# 需求：
	# 根据品牌进行分组；
  # 计算各个品牌中：商品的个数、平均价格
  # 也包括：最高价格、最低价格、平均评分
SELECT brand, 
	COUNT(*) as count, 
	ROUND(AVG(price),2) as avgPrice,
	MAX(price) as maxPrice,
	MIN(price) as minPrice,
	AVG(score) as avgScore
FROM `products` GROUP BY brand;
```

给Group By查询到的结果添加一些约束，可以使用：HAVING

```mysql
SELECT brand, 
	COUNT(*) as count, 
	ROUND(AVG(price),2) as avgPrice,
	MAX(price) as maxPrice,
	MIN(price) as minPrice,
	AVG(score) as avgScore
FROM `products` GROUP BY brand 
HAVING avgPrice < 4000 and avgScore > 7;
```

