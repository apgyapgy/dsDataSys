import React,{ Component } from 'react';
import { Card , Tooltip } from 'antd';
import { formatDate , qryPanelByTraceId } from '@/utils/public';
import Request from '@/utils/request';
import { Link } from 'react-router-dom';

import './index.scss';
export default class Home extends Component{
    constructor( props ){
        super( props );
        this.state = {
            homeDataList : [],
            traceIdList : [],//traceId列表
            yesterDay : '',
            yesterDayLast : '',//前日
            yesterDayWeek : '',//上周
            yesterDayYear : '',//去年
            dateRange : []
        }
    }

    componentDidMount(){
        this.getDateRange();
        this.handleEmptyPanelData();
        this.qryPanel();
    }

    getDateRange(){
        let date = new Date();
        let pre30Date = new Date( date - 24*60*60*1000*30 );
        this.setState({ 
            dateRange : [ formatDate( pre30Date , '' ) , formatDate( date , '' ) ] 
        });
    }

    qryPanel(){
        let _this = this;
        Request({
            url :'api/data/panel',
            success( res ){
                if( !res.data ){
                    _this.handleEmptyPanelData();
                    return;
                }
                let data = res.data;
                let params = {
                    homeTraceId : data.homeTraceId
                }
                qryPanelByTraceId( params , ress=> {
                    if( !ress.data ){
                        _this.handleEmptyPanelData();
                        return;
                    }
                    let data = ress.data;
                    let panelList = _this.state.homeDataList;
                    panelList[0].data = data.yesterDayIncome ? data.yesterDayIncome : 0;
                    panelList[0].linkRelativeRatio = data.incomeHuanBi ? data.incomeHuanBi : 0;
                    panelList[0].weekComparedRatio = data.incomeTongBiWeek ? data.incomeTongBiWeek : 0;
                    panelList[0].yearToYear = data.incomeTongBiYear ? data.incomeTongBiYear : 0;

                    panelList[1].data = data.yesterPkgNum ? data.yesterPkgNum : 0;
                    panelList[1].linkRelativeRatio = data.pkgNumHuanBi ? data.pkgNumHuanBi : 0;
                    panelList[1].weekComparedRatio = data.pkgNumTongBiWeek ? data.pkgNumTongBiWeek : 0;
                    panelList[1].yearToYear = data.pkgNumTongBiYear ? data.pkgNumTongBiYear : 0;

                    panelList[2].data = data.yesterKdyNum ? data.yesterKdyNum : 0;
                    panelList[2].linkRelativeRatio = data.kdyNumHuanBi ? data.kdyNumHuanBi : 0;
                    panelList[2].weekComparedRatio = data.kdyNumTongBiWeek ? data.kdyNumTongBiWeek : 0;
                    panelList[2].yearToYear = data.kdyNumTongBiYear ? data.kdyNumTongBiYear : 0;

                    panelList[3].data = data.yesterTurnover ? data.yesterTurnover : 0;
                    panelList[3].linkRelativeRatio = data.turnoverHuanBi ? data.turnoverHuanBi : 0;
                    panelList[3].weekComparedRatio = data.turnoverTongBiWeek ? data.turnoverTongBiWeek : 0;
                    panelList[3].yearToYear = data.turnoverTongBiYear ? data.turnoverTongBiYear : 0;

                    _this.setState({
                        homeDataList : panelList,
                        yesterDay : data.yesterDay ? data.yesterDay : '',
                        yesterDayLast : data.yesterDayLast ? data.yesterDayLast : '',
                        yesterDayWeek : data.yesterDayWeek ? data.yesterDayWeek : '',
                        yesterDayYear : data.yesterDayYear ? data.yesterDayYear : ''
                    });
                })
            }
        })
    }

    handleEmptyPanelData(){//无数据时，首页显示默认值
        let panelList = [
            {
                title : '快递柜业务总收入',
                latestDate : '昨日',
                data : '0',
                dataUnit : '元',
                linkRelativeRatio : '0',
                weekComparedRatio : '0',
                yearToYear : '0',
                path : '/cabinet/revenues'
            },{
                title : '包裹投递总数',
                latestDate : '昨日',
                data : '0',
                dataUnit : '次',
                linkRelativeRatio : '0',
                weekComparedRatio : '0',
                yearToYear : '0',
                path : '/parcel/delivery'
            },{
                title : '活跃快递员人数',
                latestDate : '昨日',
                data : '0',
                dataUnit : '人',
                linkRelativeRatio : '0',
                weekComparedRatio : '0',
                yearToYear :'0',
                path : '/courier/active'
            },{
                title : '快递柜周转率',
                latestDate : '昨日',
                data : '0',
                dataUnit : '%',
                linkRelativeRatio : '0',
                weekComparedRatio : '0',
                yearToYear : '0',
                path : '/manager/cabinetTurnover'
            }
        ];
        this.setState({ homeDataList : panelList });
    }

    toUrl( path ){
        // browserHistory.push(path);
    }

    renderCardItem( item , idx ){
        let state = this.state;
        return (
            <Link to={ item.path + '?date=' + this.state.dateRange } key={ idx }>
                <Card className="card_wrapper" key={ idx } onClick={ () => this.toUrl( item.path ) }>
                    <p className="card_title">{ item.title }</p>
                    <p className="card_dates">昨日</p>
                    <p className="card_data">{ item.data }<span className="card_unit">{ item.dataUnit }</span></p>
                    <div className="card_ratio">
                        <span className="card_ratio_label">环比</span>
                        <Tooltip placement="topLeft" 
                            className={ `card_rate ${ item.linkRelativeRatio > 0 ? 'text_green' : 'text_red' } ${ item.linkRelativeRatio }`}
                            title={`对比${ state.yesterDayLast }${ item.linkRelativeRatio === 0 ? '持平' : (                                      item.linkRelativeRatio>0?'上升':'下降')+Math.abs(item.linkRelativeRatio)+'%'}`}
                        >
                            { Math.abs( item.linkRelativeRatio ) }%
                        </Tooltip>
                        <span className="card_ratio_label">周同比</span>
                        <Tooltip placement="topLeft" 
                            className={`card_rate ${ item.weekComparedRatio > 0 ? 'text_green' : 'text_red' } ${item.weekComparedRatio}`}
                            title={`对比${ state.yesterDayWeek }${ item.weekComparedRatio === 0 ? '持平' : ( item.weekComparedRatio > 0 ? '上升' : '下降' ) + Math.abs( item.weekComparedRatio ) + '%' }`}
                        >
                            { Math.abs( item.weekComparedRatio ) }%
                        </Tooltip>
                        <span className="card_ratio_label">年同比</span>
                        <Tooltip placement="topLeft" 
                            className={`card_rate ${ item.yearToYear > 0 ? 'text_green' : 'text_red' } ${ item.yearToYear > 0 }`}
                            title={`对比${ state.yesterDayYear }${ item.yearToYear === 0 ? '持平' : ( item.yearToYear > 0 ? '上升' : '下降' ) + Math.abs( item.yearToYear ) + '%' }`}
                        >
                            { Math.abs( item.yearToYear ) }%
                        </Tooltip>
                    </div>
                </Card>
            </Link>
        )
    }

    render(){
        return (
            <div className="main_content">
                {
                    this.state.homeDataList 
                    ?
                        this.state.homeDataList.map( ( item , idx ) => {
                            return this.renderCardItem( item , idx );
                        })
                    :
                        null
                }
            </div>
        )
    }
}