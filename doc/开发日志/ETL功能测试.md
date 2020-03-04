项目测试

- 测试环境

  测试平台的数据ETL功能。测试环境为

  - 毕业设计项目项目

    项目部署在 Windows 10 操作系统，启动前端和后端项目

  - Hadoop 大数据集群

    测试环境Windows 10 中使用 VirtualBox中搭建Hadoop集群，集群系统使用CentOS7，里面安装了Apache Hadoop 2.6.0，、Apache Spark 2.3.3 、 Apache Livy 0.7 incubating。

- 测试数据

  测试数据使用电影评分数据，数据存放于集群中的`hdfs://192.168.4.101:9000/graduation/data/movies.csv`位置，部分数据格式

  ```csv
  userId,movieId,title,rating,genres
  1,1,Toy Story (1995),4.0,Adventure|Animation|Children|Comedy|Fantasy
  1,3,Grumpier Old Men (1995),4.0,Comedy|Romance
  1,6,Heat (1995),4.0,Action|Crime|Thriller
  1,47,Seven (a.k.a. Se7en) (1995),5.0,Mystery|Thriller
  ```

- 测试要求

  对数据进行进行分组统计，统计评分人数最多的前10部电影

- 新建ETL工程

在数据ETL界面点击添加