import baseUrl from './baseUrl';
import { message } from 'antd';
const Request = function(opts){
    let initDatas = {
        cache:'no-cache',
        // credentials:'include',//'same-origin',//'include',
        headers:{
            'Accept':'application/json,text/plain,*/*',
            'user-agent':'Mozilla/4.0 MDN Example',
            'content-type':'application/x-www-form-urlencoded;charset=UTF-8',
            // 'Cache-Control':'no-cache'
        },
        method:opts.method?opts.method:'GET'
    }
    let url = baseUrl+opts.url;
    if(opts.method === 'POST'){
        initDatas.body = opts.data?JSON.stringify(opts.data):{}
    }else{
        let paramStr = formatParams(opts.data);
        if(paramStr){
            url += '?' + paramStr;
        }
    }
    fetch(url,initDatas)
    .then(res=>{
        console.log("res:",res);
        if(opts.down){
            if(res.ok){
                return res.blob();
            }else{
                message.error('系统异常!');
            }
        }else{
            return res.json();
        }
    })
    .then(data=>{
        console.log("data:",data);
        if(opts.down){
            let url = window.URL.createObjectURL(data);
            var a = document.createElement('a');
            a.href = url;
            a.target = '_blank';
            a.download = `${opts.fileName?opts.fileName:'数据系统'}.xls`;
            document.body.appendChild(a);
            a.click();
            let timer = setTimeout(()=>{
                console.log("url:",url);
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
                clearTimeout(timer);
            },1000);
            return;
        }
        if(data.code === 200){
            if(opts.success){
                opts.success(data);
            }
        }else{
            message.info(data.desc);
            if(opts.fail){
                opts.fail(data);
            }
        }
    })
}
function formatParams(params){
    let keys = Object.keys(params);
    let paramsArr = [];
    for(var key in keys){
        paramsArr.push(`${keys[key]}=${params[keys[key]]}`)
    }
    return paramsArr.join('&');
}
export default Request;