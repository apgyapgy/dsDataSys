import React,{Component} from 'react';
// import store from '@/store/store';
import Search from '@/components/search';
import Table from '@/components/table';
import LineChart from '@/components/lineChart';
import {getSearchList,qryData,qryByTraceId} from '@/utils/public'
// import Request from '@/utils/request';
export default class CourierAdd extends Component{
    constructor(props){
        super(props);
        this.state={
            searchInfo:{},
            searchedInfo:{},
            dataList:{},
            down:true,
            lineData:{
                title: '快递员新增',
	  			xAxis: {
	                type: 'category',
	                data: []
	            },
	            legend:[],
	  			series:[
	            ]
            },
            methodNm:'sjb.couriers.new.query'
        };
        this.initData = this.initData.bind(this);
    }
    componentDidMount(){
        this.initSearchInfo();
    }
    initSearchInfo(){
        let searchInfo = {
            spendTime:0,
            showChartDateRange:true,
            dtTp:'1',
            branchIdx:0,
            regionIdx:1,
            provIdx:2,
            cityIdx:3,
            managerIdx:4,
            dateIdx:6,
            list:[
                {
                    label:'大区',
                    type:'area',
                    multi:true,
                    name:'region',
                    data:[],
                    value:[]
                },{
                    label:'区域',
                    type:'select',
                    multi:true,
                    name:'area',
                    data:[],
                    value:[]
                },{
                    label:'省',
                    name:'provCode',
                    type:'prov',
                    multi:true,
                    data:[],
                    value:[]
                },{
                    label:'市',
                    type:'city',
                    multi:true,
                    name:'cityCode',
                    data:[],
                    value:[]
                },{
                    label:'片区负责人',
                    name:'manager',
                    type:'manager',
                    multi:true,
                    data:[],
                    value:[]
                },{
                    label:'',
                    name:'hostId',
                    type:'input',
                    placeholder:'请输入快递柜id',
                    value:''
                },{
                    label:'时间区间',
                    name:'dateRange',
                    type:'date',
                    multi:true,
                    value:[]
                }
            ]
        };
        this.setState({
            searchInfo:searchInfo,
            searchedInfo:{
                methodNm:'sjb.couriers.new.query',
				dtTp:'1',
				traceId:''
            }
        },()=>{
            this.getSearchInfo();
        });
    }
    getSearchInfo(type){
        getSearchList(this,type);
    }
    getTableHeader(){
        return [
            {
                title:'时间',
                dataIndex:'calendar',
                key:'calendar'
            },{
                title:'快递员新增数',
                dataIndex:'count',
                key:'count'
            }
        ]
    }
    async initData(){
        console.log("initData",this)
        // let _this = this;
        let data;
        // let data = await qryData(this.state.searchInfo,this.state.methodNm);
        let searchedInfo = this.state.searchedInfo;
        searchedInfo.traceId = '6DE72E632DD6795854625EED5F1CA1AC'; //data.traceId;
        searchedInfo.dtTp = this.state.searchInfo.dtTp;
        searchedInfo.methodNm = this.state.methodNm;
        qryByTraceId(searchedInfo,res=>{
            console.log("qryByTraceId:",res);
            if(res.length){
                let lineData = this.state.lineData;
                lineData.xAxis = {type:'category'};
                lineData.dataset = {
                    dimensions:[
                        {
                            name:'calendar',
                            displayName:'时间'
                        },{
                            name:'count',
                            displayName:'快递员新增数'
                        }
                    ],
                    source:res
                };
                lineData.series = [{type:'line'}]
                let dataList = {
                    tableHeader:this.getTableHeader(),
                    tableList:res.map((item,idx)=>{
                        item.key = idx;
                        return item;
                    })
                }
                this.setState({
                    dataList:dataList,
                    searchedInfo:searchedInfo,
                    lineData:lineData
                });
            }
        });
    }
    render(){
        return (
            <div className="main_content">
                <Search searchInfo={this.state.searchInfo} obj={this} initData={this.initData} />
                <LineChart data={this.state.lineData}/>
                <Table data={this.state.dataList} down={true} />
            </div>
        )
    }
}