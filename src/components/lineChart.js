import React,{Component} from 'react';
import echarts from 'echarts';
// import echarts from 'echarts/lib/echarts';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
export default class LineChart extends Component{
    componentDidMount(){
        var myChart = echarts.init(document.getElementById('cus_chart'));
        this.chart = myChart;
    }
    componentDidUpdate(){
        // console.log("componentDidUpdate:",this.props);
        this.setOption(this.props.data);
    }
    setOption(opts){
        if(opts.series === undefined || !opts.series.length ){
            return;
        }
        let options = {
            title:{
                text:opts.title?opts.title:'标题',
                left:'left'
            },
            tooltip:opts.tooltip?opts.tooltip:{trigger: 'axis',axisPointer: {type: 'cross'}},
            legend: {
                type:'scroll',
                bottom: true,
                padding:0,
                data:opts.legend?opts.legend:[],
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis:opts.xAxis?opts.xAxis:[],
            yAxis:opts.yAxis?opts.yAxis:{min:'dataMin'},
            series:opts.series?opts.series:[]
        }
        if(opts.dataset){
            options.dataset = opts.dataset;
            options.legend = {
                type:'scroll',
                bottom: true,
                padding:0,
            };
        }
        this.chart.setOption(options,true);
    }
    render(){
        return (
            <div id="cus_chart">aaa</div>
        )
    }
}