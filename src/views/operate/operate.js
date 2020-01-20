import React , { Component } from 'react';
import Search from '@/components/search';
import Table from '@/components/table';
import LineChart from '@/components/lineChart';
import { getSearchList , qryByTraceId } from '@/utils/public';//qryData
export default class Operate extends Component {
    constructor( props ) {
        super( props );
        this.state={
            searchInfo : {},
            searchedInfo : {},
            dataList : {},
            down : true,
            lineData : {
                title : '快递员新增',
	  			xAxis : {
	                type : 'category',
	                data : []
	            },
	            legend : [],
	  			series : [
	            ]
            },
            methodNm : this.methodNm
        };
        this.initData = this.initData.bind( this );
    }

    componentDidMount() {
        this.initSearchInfo();
    }
    
    methodNm = '';

    getTimeTableHeader() {//设置计时类表格头部
        let tableHeader = [
            {
                label : '埋点id',
                prop : 'actionId'
            },{
                label : '备注',
                prop : 'actionDesc',
                minWidth : 200
            }
        ];
        for(let key = 0 ; key <= 61 ; key++) {
            tableHeader.push({
                label : key < 61 ? key + 's' : '60s以上',
                prop :'count' + key
            });
        }
        tableHeader.push({
            label : '日期（可选择）',
            prop : 'calendar',
            minWidth : 160
        });
        return tableHeader;
    }

    initSearchInfo() {
        let searchInfo = {
            spendTime : 0,
            showChartDateRange : true,
            dtTp : '1',
            branchIdx : 0,
            regionIdx : 1,
            provIdx : 2,
            cityIdx : 3,
            managerIdx : 4,
            dateIdx : 5,
            operateIdx : 6,
            operateType : '0',//埋点类型
            list:[
                {
                    label : '大区',
                    type : 'area',
                    multi : true,
                    name : 'region',
                    data : [],
                    value : []
                },{
                    label : '区域',
                    type : 'select',
                    multi : true,
                    name : 'area',
                    data : [],
                    value : []
                },{
                    label : '省',
                    name : 'provCode',
                    type : 'prov',
                    multi : true,
                    data : [],
                    value : []
                },{
                    label : '市',
                    type : 'city',
                    multi : true,
                    name : 'cityCode',
                    data : [],
                    value : []
                },{
                    label : '片区负责人',
                    name : 'manager',
                    type : 'manager',
                    multi : true,
                    data : [],
                    value : []
                },{
                    label : '时间区间',
                    name : 'dateRange',
                    type : 'date',
                    multi : true,
                    value : []
                },{
                    label : '埋点id：',
                    name : 'actionId',
                    type : 'operate',
                    data : [],
                    value : [],
                }
            ]
        };
        if( this.state.operateType === '0' ) {//计数类
            this.methodNm = window.atob( 'c2piLmJ1cmllZC5wb2ludC5jb3VudC5xdWVyeQ==' );
        } else if( this.state.operateType === '1' ) {//计时类
            this.methodNm = window.atob( 'c2piLmJ1cmllZC5wb2ludC50aW1lLnF1ZXJ5' )
        }
        this.setState({
            searchInfo : searchInfo,
            searchedInfo : {
                methodNm : this.methodNm,
				dtTp : '1',
				traceId : ''
            }
        }, () => {
            this.getSearchInfo();
        });
    }

    getSearchInfo( type ) {
        getSearchList( this , type );
    }

    initData() {
        console.log( "initData" )
    }

    render() {
        return (
            <div className="main_content">
                <Search searchInfo={ this.state.searchInfo } obj={ this } initData={ this.initData } />
                <LineChart data={ this.state.lineData }/>
                <Table data={ this.state.dataList } down={ true } searchedInfo={ this.state.searchedInfo } />
            </div>
        )
    }
}