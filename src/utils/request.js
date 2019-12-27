import baseUrl from './baseUrl';
import { message } from 'antd';
const Request = function(opts){
    let initDatas = {
        cache:'no-cache',
        // credentials:'include',//'same-origin',//'include',
        headers:{
            'Accept':'application/json,text/plain,*/*',
            'user-agent':'Mozilla/4.0 MDN Example',
            'content-type':'application/x-www-form-urlencoded',
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
    .then(res=>res.json())
    .then(data=>{
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