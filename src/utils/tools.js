// import Vue from 'vue'
// 工具类，封装常用函数
// 将a1清空，用a2填充进去
export function arrayFill(a1,a2)
{
    a1.splice(0,a1.length)
    for(let i =0;i<a2.length;i+=1)
    {
        a1.push(a2[i])
    }

}
// 格式化文件大小
export function formatFileSize(size)
{
    if(size<1024){
        return (size)+ "b"
    }
    else if(size<1024*1024)
    {
        return (size/1024).toFixed(2)+"k"
    }
    else if(size<1024*1024*1024)
    {
        return (size/1024/1024).toFixed(2)+"m"
    }
    else if(size<1024*1024*1024*1024)
    {
        return (size/1024/1024/1024).toFixed(2)+"g"
    }

}
// 通用错误框
export function errorDialog(vue,message)
{
    vue.$alert(message,"发生错误",{
        confirmButtonText:"确定"
      })
}