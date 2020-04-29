import React, {Component} from 'react';

import Search from '@/components/search';
import Table from '@/components/table';
import LineChart from '@/components/lineChart';
import {getSearchList, qryByTraceId, qryData} from '@/utils/public';

export default class ParcelRecipientActiveNum extends Component {
    methodNm = window.atob('c2piLnBhY2thZ2UucGlja3VwLmFjdGl2ZS5xdWVyeQ==')
    constructor(props) {
        super(props);
        this.state= {
            searchInfo: {},
            searchedInfo: {},
            dataList: {},
            down: true,
            lineData: {
                title: '收件人活跃人数',
	  			xAxis: {
	                type: 'category',
	                data: []
	            },
	            legend: [],
	  			series: []
            },
            methodNm: this.methodNm
        };
        this.initData = this.initData.bind(this);
    }

    UNSAFE_componentWillMount() {
        this.initSearchInfo();
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
                title: '时间',
                dataIndex: 'calendar',
                key: 'calendar'
            }, {
                title: '7日',
                dataIndex: 'days07',
                key: 'days07'
            }, {
                title: '15日',
                dataIndex: 'days15',
                key: 'days15'
            }, {
                title: '30日',
                dataIndex: 'days30',
                key: 'days30'
            }, {
                title: '60日',
                dataIndex: 'days60',
                key: 'days60'
            }, {
                title: '90日',
                dataIndex: 'days90',
                key: 'days90'
            }
        ]
    }

    async initData() {
        let data = await qryData(this.state.searchInfo, this.state.methodNm);
        let searchedInfo = this.state.searchedInfo;
        searchedInfo.traceId = data.traceId;
        searchedInfo.dtTp = this.state.searchInfo.dtTp;
        searchedInfo.methodNm = this.state.methodNm;
        qryByTraceId(searchedInfo, res => {
            if (res.length) {
                let lineData = this.state.lineData;
                lineData.xAxis = {type : 'category'};
                lineData.dataset = {
                    dimensions: [
                        'calendar',
                        {
                            name: 'days07',
                            displayName: '7日'
                        }, {
                            name: 'days15',
                            displayName: '15日'
                        }, {
                            name: 'days30',
                            displayName: '30日'
                        }, {
                            name: 'days60',
                            displayName: '60日'
                        }, {
                            name: 'days90',
                            displayName: '90日'
                        }
                    ],
                    source: res
                };
                lineData.series = [{type: 'line'}, {type: 'line'}, {type: 'line'}, {type: 'line'}, {type: 'line'}]
                let dataList = {
                    tableHeader: this.getTableHeader(),
                    tableList: res.map((item, idx) => {
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
        });
    }

    render() {
        return (
            <div className="main_content">
                <Search searchInfo={this.state.searchInfo} obj={this} initData={this.initData} />
                <LineChart data={this.state.lineData}/>
                <Table data={this.state.dataList} down={true} searchedInfo={this.state.searchedInfo} />
            </div>
        )
    }
}