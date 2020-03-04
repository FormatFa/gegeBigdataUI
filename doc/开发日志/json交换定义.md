每个转换都有对应的前端组件，前端循环，根据type和组件名的映射来动态生成vue组件，组件再支持返回json。提交时从组件里获取json，拼接成结果，返回



选择列时，得获取到现在的列名，在元数据里得获取到列名，所以执行transform前得先获取到元数据的字段。或者手动输入要选择的字段

所以处理流程要是，一开始选择数据源，设置数据源的字段，每次添加前要测试前一步成功了才行,添加后会执行操作，获取，组件的状态？



**元数据卡片，展示数据包括:**

- 当前数据的字段
- 当前数据的条数(需要action计算)

**调试查看，在编辑时可以调试**

- 显示当前的session
- 包括，重启会话，开始会话，开始会话时会使用第一个数据源的数据读取原信息
- 

支持回退操作



元数据定义,schema

```
{
字段
	columns:[]
	//对应的类型
	,dtypes:[],
	//字段描述,默认为空
	descs:[]
}
```



source,sink,transfrom都抽象为一个component,每个component包括

```json
[{
    //组件的唯一id
    compid:"",
    //组件的名字
    name:"",
    //组件的其他配置参数,里面的键值由各个组件定义
    conf:{
        
    }
}]
```

data传递给二级组件



sources

```json

```

sinks

```json
{
    //保存到哪里
    "type":"",
    "path":"",
}
```

## Sources

### source-csv

```
{
"path":"",
//分隔符
"separator":","

}
```



### 转换操作

操作为，对象_操作 组成,

前端设计成可以通过输入框输入和通过下拉框选择(如果有原数据的话d)

col_select

conf参数定义

```json
{
    //columns 表示 要提取的列名
    "columns":["col1","col2"]
}
```

row_delete

删除行

```json
{
//删除模式 , 包含任意空值,某列包含空值isNull , 包含指定字符串contains,等于指定字符串equals
 "mode":""，
//空值
"nullString":"default",
//指定列,*任意列
"columns":["*"],
//contains等对应的值
"values":[]
}
```



col_groupby

分组聚合操作,暂时只对单一的列进行操作



```json
{
//分组的字段,一个
"columns":"",
  //聚合后的字段,多个
    //多个
  agg:[
      //列名
    "column":""
      //操作,求和，计数等,avg,sum,count
      "operation":""
      //别名,聚合后的新名字
      "newname":""
    ]  
}


{
//分组的字段,可多个
columns":""
  //聚合后计算的字段,
    "aggColumn":""
      //操作,求和，计数等,avg,sum,count
      "operation":""
      //别名,聚合后的新名字
      "alias":""
    ]  
}
```

row-limit 提取前几行数据

```
{
//提取的行数
"num"
}
```

orderby

按照某列排序

```json
{
    排序的字段
    column:
    //升序还是降序,asc,desc
    order:
}
```



## Sinks

### sink-csv

保存数据成类似csv的格式,

```json
{
    //保存路径
    "path":"",
    //字段之间的分割符
    "seperator":""
    
}
```



sink-console

打印到日志

```json
{
    //限制最大的打印显示行数
    "limit":500
}
```



### 统计操作

