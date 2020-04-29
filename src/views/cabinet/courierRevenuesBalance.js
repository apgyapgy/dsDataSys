import React, { Component } from 'react';

import Search from '@/components/search';
import Table from '@/components/table';
import LineChart from '@/components/lineChart';
import { getSearchList, qryData } from '@/utils/public'; //qryByTraceId

export default class CourierRevenuesBalance extends Component {
    methodNm = window.atob('c2piLmhvc3QuY2hhcmdlLnRvdGFsLmJhbGFuY2UucXVlcnk=')
    constructor( props ) {
        super(props);
        this.state= {
            searchInfo: {},
            searchedInfo: {},
            dataList: {},
            down: true,
            lineData: {
                title: '快递员充值总余额',
	  			xAxis: {
	                type: 'category',
	                data: []
	            },
	            legend: [],
	  			series: [
                ]
            },
            methodNm: this.methodNm
        };
        this.initData = this.initData.bind( this );
    }

    UNSAFE_componentWillMount() {
        this.initSearchInfo();
    }

    initSearchInfo() {
        let searchInfo = {
            spendTime : 0,
            showChartDateRange : true,
            dtTp: '1',
            branchIdx: 0,
            regionIdx: 1,
            provIdx: 2,
            cityIdx: 3,
            managerIdx: 4,
            dateIdx: 6,
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
                    label: '',
                    name: 'hostId',
                    type: 'input',
                    placeholder: '请输入快递柜id',
                    value: ''
                }, {
                    label: '时间区间',
                    name: 'dateRange',
                    type: 'date',
                    multi: true,
                    value: []
                }
            ]
        };
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

    getTableHeader() {
        return [
            {
                title: '日期',
                dataIndex: 'calendar',
                key: 'calendar'
            }, {
                title: '充值总余额',
                dataIndex: 'totalAmtYuan',
                key: 'totalAmtYuan'
            }
        ]
    }

    async initData() {
        let data = await qryData(this.state.searchInfo, this.state.methodNm);
        let searchedInfo = this.state.searchedInfo;
        searchedInfo.traceId = data.traceId;
        searchedInfo.dtTp = this.state.searchInfo.dtTp;
        searchedInfo.methodNm = this.state.methodNm;
        if (data.items.length) {
            let lineData = this.state.lineData;
            lineData.xAxis = { type : 'category' };
            lineData.dataset = {
                dimensions: [
                    { name: 'calendar'},
                    { displayName: '充值总余额', name: 'totalAmtYuan' }
                ],
                source: data.items
            };
            lineData.series = [
                { type: 'line' }
            ];
            let dataList = {
                tableHeader: this.getTableHeader(),
                tableList: data.items.map((item, idx) => {
                    item.key = idx;
                    return item;
                })
            }
            this.setState({
                dataList: dataList,
                searchedInfo: searchedInfo,
                lineData: lineData
            });
        }
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