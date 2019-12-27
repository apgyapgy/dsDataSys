import Request from '@/utils/request'; 
import { message } from 'antd';
export function getSearchList(obj,type){
    let searchInfo = obj.state.searchInfo;
    let params = {
        provCdStr:'',
        cityCdStr:'',
        regionFlag:''
    };
    let list = searchInfo.list;
    if(type){
		params.provCdStr = getParams(list[searchInfo.provIdx].value);
		params.cityCdStr = getParams(list[searchInfo.cityIdx].value);
		if(params.provCdStr && params.cityCdStr){
			params.regionFlag = 'A';
		}else if(params.provCdStr){
			params.regionFlag = 'P';
		}else if(params.cityCdStr){
			params.regionFlag = 'C';
		}
    }
    if(list[searchInfo.provIdx].localValue&&list[searchInfo.provIdx].localValue.length){
		params.provCdStr = getParams(list[searchInfo.provIdx].localValue);
		params.regionFlag = 'P';
	}
	if(list[searchInfo.cityIdx].localValue&&list[searchInfo.cityIdx].localValue.length){
		params.cityCdStr = getParams(list[searchInfo.cityIdx].localValue);
		params.regionFlag = params.regionFlag==='P'?'A':'C';
    }
    Request({
        url:'api/data/cond',
        data:params,
        success(res){
            console.log("cond:",res);
            let data = res.data;
            if(type){
                //选择省，市和负责人清空;选择市,负责人清空
                if(type === 'provCode'){
                    searchInfo.list[searchInfo.cityIdx].value = [];
                    searchInfo.list[searchInfo.cityIdx].data = formatSelectData(data.cityList,'regionNmCn','fyRegionCd');
                }
                searchInfo.list[searchInfo.managerIdx].value = [];
                searchInfo.list[searchInfo.managerIdx].data = formatSelectData(data.userList,'userNameCn','userId');
                
            }else{
                searchInfo.list[searchInfo.cityIdx].data = formatSelectData(data.cityList,'regionNmCn','fyRegionCd');
                searchInfo.list[searchInfo.cityIdx].value = list[searchInfo.cityIdx].localValue?list[searchInfo.cityIdx].localValue:[];
                searchInfo.list[searchInfo.cityIdx].localValue = '';
                searchInfo.list[searchInfo.managerIdx].data = formatSelectData(data.userList,'userNameCn','userId');
                searchInfo.list[searchInfo.managerIdx].value = list[searchInfo.managerIdx].localValue?list[searchInfo.managerIdx].localValue:[];
                searchInfo.list[searchInfo.branchIdx].data = formatSelectData(data.branchList,'name','id');
                searchInfo.list[searchInfo.branchIdx].value = list[searchInfo.branchIdx].localValue?list[searchInfo.branchIdx].localValue:[];
                searchInfo.list[searchInfo.regionIdx].data = formatSelectData(data.regionList,'name','id');
                searchInfo.list[searchInfo.regionIdx].value = list[searchInfo.regionIdx].localValue?list[searchInfo.regionIdx].localValue:[];
                searchInfo.list[searchInfo.provIdx].data = formatSelectData(data.provList,'provNmCn','fyProvCd');
                searchInfo.list[searchInfo.provIdx].value = list[searchInfo.provIdx].localValue?list[searchInfo.provIdx].localValue:[];
                searchInfo.list[searchInfo.provIdx].localValue = '';
            }
            obj.setState({searchInfo : searchInfo});
        }
    });
}

export function formatSelectData(datas,labelName,valueName){//格式化下拉列表选项
    let arr = [];
    for(var key in datas){
        arr.push({
            label:datas[key][labelName],
            value:datas[key][valueName]
        });
    }
    return arr;
}

export function getParams(data){//下拉多选框参数拼接
    let dataArr = [];
    for(var key in data){
        dataArr.push(data[key]);
    }
    return dataArr.join(',');
}

export function updateSearchInfo(obj,val,idx,name){
    // console.log("updateSearchInfo:",obj,val,idx,name);//return;
    let searchInfo = obj.state.searchInfo;
    searchInfo.list[idx].value = val;
    obj.setState({
        searchInfo:searchInfo
    },()=>{
        // console.log("searchInfo:",obj.state.searchInfo);
    });
    if(name === 'provCode' || name === 'cityCode'){
        getSearchList(obj,name);
    }
}

export function getQueryParams(searchInfo,methodNm){
    let params = {};
    params.methodNm = methodNm;
    params.dtTp = '1';
    let list = searchInfo.list;
    for(var key in list){
        let name = list[key].name;
        params[name] = list[key].value?list[key].value.toString():''
    }
    if(searchInfo.showChartDateRange){
        params.dtTp = searchInfo.dtTp?searchInfo.dtTp:'1';
    }
    return params;
}

export function qryData(data,methodNm){//查询数据
    return new Promise((resolve,reject)=>{
        Request({
            url:'api/data/qry',
            data:getQueryParams(data,methodNm),
            success(res){
                resolve(res.data);
            },
        });
    })
    
}

export function qryByTraceId(data,success,fail){//根据traceId查询数据
    let params = {
        methodNm:data.methodNm,
        traceId:data.traceId
    };
    let queryCount = 200;
    let timer = null;
    query();
    function query(){
        Request({
            url:'api/data/qry',
            data:params,
            success(res){
                console.log("qryByTraceId:",res);
                if(res.data && res.data.items){
                    if((res.data.item&&!res.data.item.length)||(res.data.items&&!res.data.items.length)){
                        message.info('暂无数据!');
                    }
                    if(res.data.item){
                        let item = [];
                        item.push(res.data.item);
                        success(item);
                    }else{
                        success(res.data.items);
                    }
                    clearTimeout(timer);
                }else{
                    queryCount--;
                    if(queryCount){
                        timer = setTimeout(()=>{
                            query();
                        },3000);
                    }else{
                        MessageChannel.info('查询失败!');
                    }
                }
            }
        })
    }
    return new Promise((resolve,reject)=>{
        
    })
}