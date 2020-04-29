import React, {Component} from 'react';
import Search from '@/components/search';
import Table from '@/components/table';
import LineChart from '@/components/lineChart';
import {getSearchList, showMessage, getQueryParams, qryData, qryByTraceId} from '@/utils/public';//qryData qryByTraceId

export default class Operate extends Component {
    constructor(props) {
        super(props);
        this.state={
            searchInfo: {},
            searchedInfo: {},
            dataList: {
                tableHeader: [],
                tableList: [],
            },
            down: true,
            lineData: {
                title: '快递员新增',
	  			xAxis: {
	                type: 'category',
	                data: []
	            },
	            legend: [],
	  			series: []
            },
            methodNm: '',
            traceId: '',
        };
        this.checkData = this.checkData.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.initSearchInfo();
    }
    
    methodNm = '';

    getTimeTableHeader() {//设置计时类表格头部
        let tableHeader = [
            {
                title: '埋点id',
                dataIndex: 'actionId',
                key: 'actionId',
            }, {
                title: '备注',
                dataIndex: 'actionDesc',
                width: 200,
                key: 'actionDesc',
                textWrap: 'word-break',
            }
        ];
        for(let key = 0; key <= 61; key++) {
            tableHeader.push({
                title: key < 61 ? key + 's' : '60s以上',
                dataIndex:'count' + key,
                key: 'count' + key
            });
        }
        tableHeader.push({
            title: '日期（可选择）',
            dataIndex: 'calendar',
            minWidth: 160,
            key: 'calendar'
        });
        return tableHeader;
    }

    initSearchInfo() {
        let searchInfo = {
            spendTime: 0,
            showChartDateRange: true,
            dtTp: '1',
            branchIdx: 0,
            regionIdx: 1,
            provIdx: 2,
            cityIdx: 3,
            managerIdx: 4,
            dateIdx: 5,
            operateIdx: 6,
            operateType: '0',//埋点类型
            list: [
                {
                    label: '大区',
                    type: 'area',
                    multi: true,
                    name: 'region',
                    data: [],
                    value: []
                }, {
                    label: '区域',
                    type: 'select',
                    multi: true,
                    name: 'area',
                    data: [],
                    value: []
                }, {
                    label: '省',
                    name: 'provCode',
                    type: 'prov',
                    multi: true,
                    data: [],
                    value: []
                }, {
                    label: '市',
                    type: 'city',
                    multi: true,
                    name: 'cityCode',
                    data: [],
                    value: []
                }, {
                    label: '片区负责人',
                    name: 'manager',
                    type: 'manager',
                    multi: true,
                    data: [],
                    value: []
                }, {
                    label: '时间区间',
                    name: 'dateRange',
                    type: 'date',
                    multi: true,
                    value: []
                }, {
                    label: '埋点id：',
                    name: 'actionId',
                    type: 'operate',
                    data: [],
                    value: [],
                }
            ]
        };
        if (this.state.operateType === '0') {//计数类
            this.methodNm = window.atob('c2piLmJ1cmllZC5wb2ludC5jb3VudC5xdWVyeQ==');
        } else if (this.state.operateType === '1') {//计时类
            this.methodNm = window.atob('c2piLmJ1cmllZC5wb2ludC50aW1lLnF1ZXJ5')
        }
        this.setState({
            searchInfo: searchInfo,
            searchedInfo: {
                methodNm: this.methodNm,
				dtTp: '1',
				traceId: ''
            }
        }, () => {
            this.getSearchInfo();
        });
    }

    getSearchInfo(type) {
        getSearchList(this, type);
    }

    checkData() {
        let searchInfo = this.state.searchInfo;
        let operateIdArr = searchInfo.list[searchInfo.operateIdx].value;
        // if(!operateIdArr.length) {
        //     showMessage('请选择埋点id!');
        //     return;
        // }
        this.initData(searchInfo.operateType)
    }
    async initData(type) {
        console.log('initData:', type)
        let methodNm = `sjb.buried.point.${type === '0' ? 'count' : 'time'}.query`;
        let searchInfo = this.state.searchInfo;
        let params = getQueryParams(searchInfo, methodNm);
        let actionId = params.actionId.split(',');
        for(let key in actionId) {
            actionId[key] = `"${actionId[key]}"`;
        }
        params.actionId = actionId.join(',');
        localStorage.oprType = type;

        let data = await qryData(params, this.state.methodNm, true);
        let searchedInfo = this.state.searchedInfo;
        searchedInfo.traceId = data.traceId;
        searchedInfo.dtTp = this.state.searchInfo.dtTp;
        searchedInfo.methodNm = methodNm;
        let _this = this;

        // qryByTraceId(searchedInfo, res => {
            let res = [
                {
                    "actionDesc":"中间按钮进入页面的停留时间",
                    "actionId":"A0011","calendar":"20200328",
                    "count0":45,"count1":17,"count10":0,"count11":0,"count12":0,"count13":0,
                    "count14":0,"count15":1,"count16":0,"count17":0,"count18":0,"count19":1,
                    "count2":12,"count20":0,"count21":0,"count22":0,"count23":0,"count24":0,
                    "count25":0,"count26":0,"count27":0,"count28":0,"count29":0,"count3":4,
                    "count30":0,"count31":0,"count32":0,"count33":0,"count34":0,"count35":0,
                    "count36":0,"count37":0,"count38":0,"count39":0,"count4":3,"count40":0,
                    "count41":0,"count42":0,"count43":0,"count44":0,"count45":0,"count46":0,
                    "count47":0,"count48":0,"count49":0,"count5":4,"count50":0,"count51":0,
                    "count52":0,"count53":0,"count54":0,"count55":0,"count56":0,"count57":0,
                    "count58":0,"count59":0,"count6":3,"count60":0,"count61":1,"count7":2,
                    "count8":0,"count9":1,
                },{
                    "actionDesc":"取件广告播放时长","actionId":"A0005","calendar":"20200328",
                    "count0":128913,"count1":127588,"count10":21079,
                    "count11":624,"count12":485,"count13":424,"count14":348,"count15":2022,
                    "count16":218,"count17":161,"count18":135,"count19":94,"count2":30119,
                    "count20":18417,"count21":0,"count22":0,"count23":0,"count24":1,"count25":1,
                    "count26":0,"count27":0,"count28":0,"count29":0,"count3":11669,"count30":40,
                    "count31":0,"count32":0,"count33":0,"count34":0,"count35":0,"count36":0,
                    "count37":0,"count38":0,"count39":0,"count4":6499,"count40":0,"count41":0,
                    "count42":0,"count43":0,"count44":0,"count45":0,"count46":0,"count47":0,
                    "count48":0,"count49":0,"count5":4249,"count50":0,"count51":0,"count52":0,
                    "count53":0,"count54":0,"count55":0,"count56":0,"count57":0,"count58":0,
                    "count59":0,"count6":3003,"count60":0,"count61":0,"count7":2219,"count8":1721,
                    "count9":1222,"deliverAmtYuan":"0.00","kdgTotalAmtYuan":"0",
                    "overdueAmtYuan":"0.00","totalAmtYuan":"0.00"
                }
            ]
            // if (type === 0) {} else {
                _this.handleTimeData(res, searchInfo.list[searchInfo.operateIdx].value, params.dateRange);
            // }

            if (res.length) {
                _this.setState({
                    traceId: data.traceId,
                    searchedInfo: searchedInfo,
                    methodNm: methodNm
                });
            }
        // });
    }
    handleTimeData(data, ids, dates) {
        console.log('handleTimeData:', data, ids, dates);
        let lineData = this.state.lineData;
        lineData.xAxis = { type : 'category' };
        lineData.dataset = {
            dimensions: [
                'calendar',
                ...ids
            ],
            source: data
        };
        lineData.series = new Array(ids.length).fill({type: 'line'});
        let dataList = {
            tableHeader: this.getTimeTableHeader(),
            tableList: data.map((item, idx) => {
                item.key = idx;
                return item;
            })
        }
        console.log('handleTimeData:', dataList)
        this.setState({
            dataList: dataList,
            // lineData: lineData
        });
    }

    render() {
        return (
            <div className="main_content">
                <Search searchInfo={this.state.searchInfo} obj={this} initData={this.checkData} />
                {/* <LineChart data={this.state.lineData}/> */}
                <Table data={this.state.dataList} down={true} searchedInfo={this.state.searchedInfo} />
            </div>
        )
    }
}