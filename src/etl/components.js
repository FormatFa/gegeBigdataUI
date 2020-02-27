// 所有的ETL操作组件,格式是直接用于element-ui的级联选择器
// 数据源
let sources = [
    {
        value: "source-csv",
        label: "类似csv的数据源",
        // 默认的配置
        conf: {
            // 数据源的路径
            path:"",
            // 分隔符
            separator:",",
        }

    }
];
// 转换
let transforms = [
    {
        value: "col-select",
        label: "选择某些列",
        conf:{
            //选择的列
            columns:'字段1,字段2'
        }
    },
    {
        value:"col-groupby",
        label:"分组聚合计算",
        conf:{
            // 
            columns:"",
            // 聚合的字段
            aggColumn:"",
            operation:"",
            // 聚合后的名字
            alias:""
        }
    },{
        value:"row-limit",
        label:"提取前面N行",
        conf:{
            num:10
        }
    },{
        value:"orderby",
        label:"按字段排序",
        conf:{
            // 字段名字
            column:"",
            // 顺序,默认降序
            order:"desc",
        }
    }
]
;
let sinks = [
    {
        value: "sink-csv",
        label: "保存数据",
        conf:{
            //保存的路径
            path:"",
            // 数据分割符
            separator:","
        }
    },
    {
        value:"sink-console",
        label:"打印到日志",
        conf:{
            // 限制的行数
            limit:500
        }

    }
];
// sink，保存
let options = [
    {
        value: "sources",
        label: "数据读取",
        children:sources
    },
    {
        value: "transforms",
        label: "转换操作",
        children:transforms
    },
    {
        value: "sinks",
        label: "数据输出",
        children:sinks
    },
]
export default options