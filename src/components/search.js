import React from 'react';
import { Select , Input , DatePicker , Button , TreeSelect } from 'antd';
import { updateSearchInfo , formatDate , updateOperateType } from '@/utils/public';
// import Request from '@/utils/request';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import { operateIds } from '@/utils/operateIds';
import 'moment/locale/zh-cn';
moment.locale( 'zh-cn' );

const { Option } = Select;
const { RangePicker } = DatePicker;
export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chartDataRange: [
                {
                    label: '按天' ,
                    value: '1'
                }, {
                    label: '按周' ,
                    value: '2'
                }, {
                    label: '按月' ,
                    value: '3'
                }
            ],
            courierLevel: [//快递员等级
                {
                    label: 's' ,
                    value: "'s'"
                }, {
                    label: 'a' ,
                    value: "'a'"
                }, {
                    label: 'b' ,
                    value: "'b'"
                }, {
                    label: 'c' ,
                    value: "'c'"
                }, {
                    label: 'd' ,
                    value: "'d'"
                }
            ],
            operateTypeArr: [
                {
                    label: '计数类' ,
                    value: '0'
                }, { 
                    label: '计时类' ,
                    value: '1'
                }
            ],
            pickerOptions: {//设置日历组件只能选择今天及之前日期
                disabledDate(time) {
                  return time.getTime() > Date.now() - 8.64e6;
                }
            }, 
            parcelArr: [//包裹类型数组
                {
                    label: '韵达' ,
                    value: '3'
                }, {
                      label: '承包' ,
                      value: '2'
                }, {
                      label: '收费投递' ,
                      value: '0'
                }, {
                      label: '免费投递' ,
                      value: '1'
                }
            ],
            pickArr: [//取出类型
                {
                    label: '取件码取件' ,
                    value: '00'
                }, {
                    label: 'app开箱取件' ,
                    value: '02'
                }, {
                    label: '远程开箱取件' ,
                    value: '01'
                }, {
                    label: '微信扫码开箱取件' ,
                    value: '04'
                }
            ],
            initDateFlag: false,//是否初始化过日期
        }
        this.handleDateChange = this.handleDateChange.bind( this );
        this.changeDateRange = this.changeDateRange.bind( this );
        this.handleOperateChange = this.handleOperateChange.bind( this );
        this.handleOperateTypeChange = this.handleOperateTypeChange.bind( this );
    }

    componentDidMount() {
        // console.log("searchInfo:",this.props)
    }

    componentDidUpdate() {
        // console.log("searchInfo:",this.props)
        if (!this.state.initDateFlag) {
            this.setState({
                initDateFlag: true
            });
            this.setInitDate();
        }
    }

    renderSearchItem() {//渲染条件维度
        return this.props.searchInfo.list.map((item, idx) => {
            switch (item.type) {
                case 'input': return (
                    <div className="filter_item" key={ idx }>
                        <Input placeholder={ item.placeholder ? item.placeholder : '请输入' } 
                            value={ item.value } onChange={ (event) => this.handleInputChange(event, idx, item.name) } />
                    </div>
                );
                case 'date':  return (
                    <div className="filter_item" key={idx}>
                        {item.label} ：
                        <RangePicker value={ item.value.map((date) => moment(date, 'YYYYMMDD') ) } 
                            locale={ locale }
                            format="YYYY-MM-DD" onChange={ this.handleDateChange }
                            disabledDate={ (current) => current && current > moment().endOf('day') }
                        />
                    </div>
                );
                case 'operate': return '' ;
                default:
                    let datasObj = {
                        'courier': 'courierLevel' ,
                        'parcel': 'parcelArr' ,
                        'pick': 'pickArr'
                    };
                    let dataName = datasObj[item.type];
                    let datas = dataName ? this.state[dataName] : item.data;
                    return (
                        <div className="filter_item" key={idx}>
                            {item.label} ： 
                            <Select mode={ item.multi ? 'multiple' : '' }
                                key={ item.name }
                                style={ { width: 200 } }
                                onChange={ (e) => this.handleChange(e, item.name, idx) }
                                placeholder={ item.placeholder ? item.placeholder : '请选择' }
                                maxTagCount={ 1 }
                                value={ item.value }
                                allowClear
                            >
                                { datas.length ? this.renderSelectItem(datas) : '' }
                            </Select>
                        </div>
                    );
            }
        })
    }

    renderSelectItem(datas) {//渲染下拉列表框选项
        return datas.map( (data) => <Option value={ data.value } key={ data.value }>{ data.label }</Option> )
    }

    handleChange(value, name, idx) {//选择下拉列表框
        updateSearchInfo(this.props.obj, value, idx, name );
    }

    handleEnter(e) {
        // e.persist()
        console.log("handleEnter:", e)
    }

    handleDateChange(dates, dateStrings) {//选择日期
        // console.log("handleDateChange:",dates,dateStrings)
        dateStrings = dateStrings.map((item,idx) => item.split('-').join('') );
        updateSearchInfo(this.props.obj, dateStrings, this.props.searchInfo.dateIdx, 'dateRange');
    }

    handleOperateTypeChange(data) {//选择埋点类型
        console.log("handleOperateTypeChange:", data)
        updateOperateType(this.props.obj, data);
        updateSearchInfo(this.props.obj, [], this.props.searchInfo.operateIdx, 'actionId');
    }

    handleOperateChange(data, label, extra) {//选择埋点id
        console.log("onOperateChange:", data, label, extra);
        updateSearchInfo(this.props.obj, data, this.props.searchInfo.operateIdx);
    }

    handleInputChange(e, idx, name) {
        const { value } = e.target;
        updateSearchInfo(this.props.obj, value, idx, name);
    }

    resetCondition() {//重置条件
        let obj = this.props.obj ;
        let searchInfo = obj.state.searchInfo ;
        for (var key in searchInfo.list) {
            let item = searchInfo.list[key];
            searchInfo.list[key].value = item.multi ? [] : '' ;
        }
        obj.setState({
            searchInfo: searchInfo
        });
    }

    toSearch() {//查询
        let obj = this.props.obj;
        let searchInfo = obj.state.searchInfo;
        searchInfo.traceId = '';
        let dataList = obj.state.dataList;
        dataList.tableList = [];
        let lineData = obj.state.lineData;
        lineData.series = [];
        this.props.obj.setState({
            searchInfo: searchInfo,
            dataList: dataList,
            lineData: lineData
        })
        this.props.initData();
    }

    changeDateRange(value) {//选择按天、按周或按月
        let obj = this.props.obj,
            searchInfo = this.props.searchInfo ;
        searchInfo.dtTp = value;
        obj.setState({ searchInfo: searchInfo })
    }

    setInitDate() {//初始化日期
        let endDate = new Date();
        let beginDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        updateSearchInfo(this.props.obj, [formatDate(beginDate, ''), formatDate(endDate, '')], this.props.searchInfo.dateIdx, 'dateRange');
    }

    render(){
        return (
            <div className="search_wrapper">
                <div className="filter_container clearfix">
                    { this.props.searchInfo ?. list ? this.renderSearchItem() : '' }
                </div>
                {this.props.searchInfo.operateIdx?
                    <div className="filter_container clearfix">
                        <div className="filter_item">
                            埋点类型：
                            <Select style={{ width: 200 }}
                                onChange={ (e) => this.handleOperateTypeChange(e) }
                                placeholder='请选择埋点类型'
                                value={ this.props.searchInfo.operateType }
                            >
                                <Option value="0" key="0">计数类</Option>
                                <Option value="1" key="1">计时类</Option>
                            </Select>
                        </div>
                        <TreeSelect style={{width:'340px'}}
                            className="filter_item operate"
                            showSearch
                            value={ this.props.searchInfo.list[this.props.searchInfo.operateIdx].value }
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="请选择埋点id"
                            allowClear
                            multiple
                            maxTagCount={3}
                            treeData={ operateIds[this.props.searchInfo.operateType].children }
                            onChange={ this.handleOperateChange } key={ this.props.searchInfo.operateIdx }
                        >
                        </TreeSelect>
                    </div>
                    :null
                }
                <div className="filter_container clearfix">
                    <Button type="primary" onClick={ () => this.resetCondition() }>重置条件</Button>
                    <Button className="float_right" type="primary" onClick={ () => this.toSearch() }>查询</Button>
                    <Select className="float_right"
                        value={ this.props.searchInfo.dtTp }
                        onChange={ this.changeDateRange }
                    >
                        { this.state.chartDataRange.map((item) => <Option value = { item.value } key = { item.value } > { item.label } </Option> )}
                    </Select>
                </div>
            </div>
        )
    }
}
/*  searchInfo值
	{
  			showChartDateRange:true,//是否显示按日、周、月选择下拉列表框
  			list:[//搜索的条件们
	  			{
	  				label:'大区：',//label名
	  				//类型，select下拉列表，input输入框,date日期,prov省,city市,manager负责人,courier快递员等级,parcel包裹类型,pick取出类型,operate埋点id
	  				type:'select',
	  				multi:true,//是否支持多选
	  				data:[//下拉列表框内容
			  			{
				          value: '选项1',
				          label: '黄金糕'
				        }
	  				],
	  				value:''   //选择的数据
	  			}
  			]
  	}
*/