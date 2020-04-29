import React,{Component} from 'react';
import {Card, Tooltip} from 'antd';
import {formatDate, qryPanelByTraceId, setValue} from '@/utils/public';
import Request from '@/utils/request';
import {Link} from 'react-router-dom';

import './index.scss';
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            panelList: [],
            traceIdList: [],//traceId列表
            yesterDay: '',
            yesterDayLast: '',//前日
            yesterDayWeek: '',//上周
            yesterDayYear: '',//去年
            dateRange: []
        }
    }

    UNSAFE_componentWillMount() {
        this.getDateRange();
        this.initPanelList();
        this.qryPanel();
    }

    getDateRange() {
        let date = new Date();
        let pre30Date = new Date(date - 24 * 60 * 60 * 1000 * 30);
        this.setState({ 
            dateRange: [formatDate(pre30Date, ''), formatDate(date, '')] 
        });
    }

    qryPanel() {
        let _this = this;
        Request({
            url:'api/data/panel',
            success(res) {
                if(!res.data) {
                    return;
                }
                let data = res.data;
                let params = {
                    homeTraceId: data.homeTraceId
                }
                qryPanelByTraceId(params, ress=> {
                    if(!ress.data) {
                        return;
                    }
                    let data = ress.data;
                    let panelList = _this.state.panelList;
                    panelList[0].data = setValue(data.yesterDayIncome);
                    panelList[0].linkRelativeRatio = setValue(data.incomeHuanBi);
                    panelList[0].weekComparedRatio = setValue(data.incomeTongBiWeek);
                    panelList[0].yearToYear = setValue(data.incomeTongBiYear);

                    panelList[1].data = setValue(data.yesterPkgNum);
                    panelList[1].linkRelativeRatio = setValue(data.pkgNumHuanBi);
                    panelList[1].weekComparedRatio = setValue(data.pkgNumTongBiWeek);
                    panelList[1].yearToYear = setValue(data.pkgNumTongBiYear);

                    panelList[2].data = setValue(data.yesterKdyNum);
                    panelList[2].linkRelativeRatio = setValue(data.kdyNumHuanBi);
                    panelList[2].weekComparedRatio = setValue(data.kdyNumTongBiWeek);
                    panelList[2].yearToYear = setValue(data.kdyNumTongBiYear);

                    panelList[3].data = setValue(data.yesterTurnover);
                    panelList[3].linkRelativeRatio = setValue(data.turnoverHuanBi);
                    panelList[3].weekComparedRatio = setValue(data.turnoverTongBiWeek);
                    panelList[3].yearToYear = setValue(data.turnoverTongBiYear);

                    _this.setState({
                        panelList: panelList,
                        yesterDay: setValue(data.yesterDay, ''),
                        yesterDayLast: setValue(data.yesterDayLast, ''),
                        yesterDayWeek: setValue(data.yesterDayWeek, ''),
                        yesterDayYear: setValue(data.yesterDayYear, '')
                    });
                })
            }
        })
    }

    initPanelList() {//无数据时，首页显示默认值
        let panelList = [
            {
                title: '快递柜业务总收入',
                latestDate: '昨日',
                data: '0',
                dataUnit: '元',
                linkRelativeRatio: '0',
                weekComparedRatio: '0',
                yearToYear: '0',
                path: '/cabinet/revenues'
            }, {
                title: '包裹投递总数',
                latestDate: '昨日',
                data: '0',
                dataUnit: '次',
                linkRelativeRatio: '0',
                weekComparedRatio: '0',
                yearToYear: '0',
                path: '/parcel/delivery'
            }, {
                title: '活跃快递员人数',
                latestDate: '昨日',
                data: '0',
                dataUnit: '人',
                linkRelativeRatio: '0',
                weekComparedRatio: '0',
                yearToYear:'0',
                path: '/courier/active'
            }, {
                title: '快递柜周转率',
                latestDate: '昨日',
                data: '0',
                dataUnit: '%',
                linkRelativeRatio: '0',
                weekComparedRatio: '0',
                yearToYear: '0',
                path: '/manager/cabinetTurnover'
            }
        ];
        this.setState({panelList: panelList});
    }

    toUrl(path) {
        // browserHistory.push(path);
    }

    renderCardItem(item, idx) {
        let state = this.state;
        return (
            <Link to={item.path + '?date=' + this.state.dateRange} key={idx}>
                <Card className="card_wrapper" key={idx} onClick={() => this.toUrl(item.path)}>
                    <p className="card_title">{item.title}</p>
                    <p className="card_dates">昨日</p>
                    <p className="card_data">{item.data}<span className="card_unit">{item.dataUnit}</span></p>
                    <div className="card_ratio">
                        <span className="card_ratio_label">环比</span>
                        <Tooltip placement="topLeft" 
                            className={ `card_rate ${item.linkRelativeRatio > 0 ? 'text_green' : 'text_red'} ${item.linkRelativeRatio}`}
                            title={`对比${state.yesterDayLast}${item.linkRelativeRatio === 0 ? '持平' : (item.linkRelativeRatio>0 ? '上升' : '下降') + Math.abs(item.linkRelativeRatio) + '%'}`}
                        >
                            {Math.abs(item.linkRelativeRatio)}%
                        </Tooltip>
                        <span className="card_ratio_label">周同比</span>
                        <Tooltip placement="topLeft" 
                            className={`card_rate ${item.weekComparedRatio > 0 ? 'text_green' : 'text_red'} ${item.weekComparedRatio}`}
                            title={`对比${state.yesterDayWeek }${item.weekComparedRatio === 0 ? '持平' : (item.weekComparedRatio > 0 ? '上升' : '下降') + Math.abs(item.weekComparedRatio) + '%'}`}
                        >
                            { Math.abs(item.weekComparedRatio)}%
                        </Tooltip>
                        <span className="card_ratio_label">年同比</span>
                        <Tooltip placement="topLeft" 
                            className={`card_rate ${item.yearToYear > 0 ? 'text_green' : 'text_red'} ${item.yearToYear > 0}`}
                            title={`对比${state.yesterDayYear}${item.yearToYear === 0 ? '持平' : (item.yearToYear > 0 ? '上升' : '下降') + Math.abs(item.yearToYear) + '%'}`}
                        >
                            { Math.abs(item.yearToYear)}%
                        </Tooltip>
                    </div>
                </Card>
            </Link>
        )
    }

    render() {
        return (
            <div className="main_content">
                {
                    this.state.panelList 
                    ?
                        this.state.panelList.map((item, idx) => {
                            return this.renderCardItem(item, idx);
                        })
                    :
                        null
                }
            </div>
        )
    }
}