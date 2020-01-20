import React, { Component } from 'react';

import Search from '@/components/search';
import Table from '@/components/table';
import LineChart from '@/components/lineChart';
import { getSearchList , qryByTraceId, qryData } from '@/utils/public';

export default class ParcelTackTime extends Component {
    methodNm = window.atob('c2piLnBhY2thZ2UucGlja3VwLnRpbWUucXVlcnk=')
    constructor( props ) {
        super(props);
        this.state= {
            searchInfo: {},
            searchedInfo: {},
            dataList: {},
            down: true,
            lineData: {
                title: '包裹取出时间分时统计',
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
                },  {
                    label: '包裹类型：',
                    name:' pkgType',
                    type: 'parcel',
                    multi: true,
                    value: []
                }, {
                    label: '取出类型',
                    name: 'pickupType',
                    type: 'pick',
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
                title: '1小时',
                dataIndex: 'deliver_num1',
                key: 'deliver_num1'
            }, {
                title: '2小时',
                dataIndex: 'deliver_num2',
                key: 'deliver_num2'
            }, {
                title: '3小时',
                dataIndex: 'deliver_num3',
                key: 'deliver_num3'
            }, {
                title: '4小时',
                dataIndex: 'deliver_num4',
                key: 'deliver_num4'
            }, {
                title: '5小时',
                dataIndex: 'deliver_num5',
                key: 'deliver_num5'
            }, {
                title: '6小时',
                dataIndex: 'deliver_num6',
                key: 'deliver_num6'
            }, {
                title: '7小时',
                dataIndex: 'deliver_num7',
                key: 'deliver_num7'
            }, {
                title: '8小时',
                dataIndex: 'deliver_num8',
                key: 'deliver_num8'
            }, {
                title: '9小时',
                dataIndex: 'deliver_num9',
                key: 'deliver_num9'
            }, {
                title: '10小时',
                dataIndex: 'deliver_num10',
                key: 'deliver_num10'
            }, {
                title: '11小时',
                dataIndex: 'deliver_num11',
                key: 'deliver_num11'
            }, {
                title: '12小时',
                dataIndex: 'deliver_num12',
                key: 'deliver_num12'
            }, {
                title: '13小时',
                dataIndex: 'deliver_num13',
                key: 'deliver_num13'
            }, {
                title: '14小时',
                dataIndex: 'deliver_num14',
                key: 'deliver_num14'
            }, {
                title: '15小时',
                dataIndex: 'deliver_num15',
                key: 'deliver_num15'
            }, {
                title: '16小时',
                dataIndex: 'deliver_num16',
                key: 'deliver_num16'
            }, {
                title: '17小时',
                dataIndex: 'deliver_num17',
                key: 'deliver_num17'
            }, {
                title: '18小时',
                dataIndex: 'deliver_num18',
                key: 'deliver_num18'
            }, {
                title: '19小时',
                dataIndex: 'deliver_num19',
                key: 'deliver_num19'
            }, {
                title: '20小时',
                dataIndex: 'deliver_num20',
                key: 'deliver_num20'
            }, {
                title: '21小时',
                dataIndex: 'deliver_num21',
                key: 'deliver_num21'
            }, {
                title: '22小时',
                dataIndex: 'deliver_num22',
                key: 'deliver_num22'
            }, {
                title: '23小时',
                dataIndex: 'deliver_num23',
                key: 'deliver_num23'
            }, {
                title: '24小时',
                dataIndex: 'deliver_num24',
                key: 'deliver_num24'
            }
        ]
    }

    sortedData(data) {
        let dataArr = [];
        for (var key = 1; key <= 24; key++) {
            dataArr.push({
                name: key,
                value: data['deliver_num' + key]
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
                let sortedData = this.sortedData(res[0]);
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