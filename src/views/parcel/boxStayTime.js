import React, { Component } from 'react';
import Search from '@/components/search';
import Table from '@/components/table';
import LineChart from '@/components/lineChart';
import { getSearchList , qryByTraceId, qryData } from '@/utils/public';

export default class BoxStayTime extends Component {
    methodNm = window.atob('c2piLnBhY2thZ2Uuc3RheS50aW1lLnF1ZXJ5')
    constructor( props ) {
        super(props);
        this.state= {
            searchInfo: {},
            searchedInfo: {},
            dataList: {},
            down: true,
            lineData: {
                title: '包裹箱格停留时间',
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

    componentDidMount() {
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
                }, {
                    label: '包裹类型：',
                    name: 'pkgType',
                    type: 'parcel',
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
                title: '0-4',
                dataIndex: 'pickup_num0',
                key: 'pickup_num0'
            }, {
                title: '4-8',
                dataIndex: 'pickup_num4',
                key: 'pickup_num4'
            }, {
                title: '8-12',
                dataIndex: 'pickup_num8',
                key: 'pickup_num8'
            }, {
                title: '12-16',
                dataIndex: 'pickup_num12',
                key: 'pickup_num12'
            }, {
                title: '16-20',
                dataIndex: 'pickup_num16',
                key: 'pickup_num16'
            }, {
                title: '20-24',
                dataIndex: 'pickup_num20',
                key: 'pickup_num20'
            }, {
                title: '24-28',
                dataIndex: 'pickup_num24',
                key: 'pickup_num24'
            }, {
                title: '28-32',
                dataIndex: 'pickup_num28',
                key: 'pickup_num28'
            }, {
                title: '32-36',
                dataIndex: 'pickup_num32',
                key: 'pickup_num32'
            }, {
                title: '36-40',
                dataIndex: 'pickup_num36',
                key: 'pickup_num36'
            }, {
                title: '40-44',
                dataIndex: 'pickup_num40',
                key: 'pickup_num40'
            }, {
                title: '44-48',
                dataIndex: 'pickup_num44',
                key: 'pickup_num44'
            }, {
                title: '48-52',
                dataIndex: 'pickup_num48',
                key: 'pickup_num48'
            }, {
                title: '52-56',
                dataIndex: 'pickup_num52',
                key: 'pickup_num52'
            }, {
                title: '56-60',
                dataIndex: 'pickup_num56',
                key: 'pickup_num56'
            }, {
                title: '60-64',
                dataIndex: 'pickup_num60',
                key: 'pickup_num60'
            }, {
                title: '64-68',
                dataIndex: 'pickup_num64',
                key: 'pickup_num64'
            }, {
                title: '68-72',
                dataIndex: 'pickup_num68',
                key: 'pickup_num68'
            }, {
                title: '72+',
                dataIndex: 'pickup_num72',
                key: 'pickup_num72'
            }
        ]
    }

    sortData(data) {
        let dataArr = [];
        for (var key = 0; key <= 72; key += 4) {
            dataArr.push({
                name: key,
                value: data['pickup_num' + key]
            });
        }
        return dataArr;
    }

    async initData() {
        let data = await qryData(this.state.searchInfo,this.state.methodNm);
        let searchedInfo = this.state.searchedInfo;
        searchedInfo.traceId = data.traceId;
        searchedInfo.dtTp = this.state.searchInfo.dtTp;
        searchedInfo.methodNm = this.state.methodNm;
        qryByTraceId(searchedInfo, res => {
            if(res.length) {
                let sortedData = this.sortData(res[0]);
                let lineData = this.state.lineData;
                lineData.xAxis = { type : 'category' };
                lineData.dataset = {
                    dimensions: [
                        'name',
                        {
                            name: 'value',
                            displayName: '包裹数'
                        }
                    ],
                    source: sortedData
                };
                lineData.series = [{ type: 'line' }]
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
                <Search searchInfo={ this.state.searchInfo } obj={ this } initData={ this.initData } />
                <LineChart data={ this.state.lineData }/>
                <Table data={ this.state.dataList } down={ true } searchedInfo={ this.state.searchedInfo } />
            </div>
        )
    }
}