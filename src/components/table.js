import React,{Component} from 'react';
import {Table,Button} from 'antd';
import {namesObj} from '@/utils/public'
import Request from '@/utils/request';

export default class TableCustom extends Component{
    constructor(props){
        super(props);
        this.state = {};
        this.download = this.download.bind(this);
    }
    download(){
        let methodNm = window.btoa(this.props.searchedInfo.methodNm);
        Request({
            url:'api/data/down',
            data:this.props.searchedInfo,
            // method:'POST',
            down:true,
            fileName:namesObj[methodNm]
        })
    }
    
    render(){
        return (
            <div className="table_wrapper">
                {
                    this.props.data&&this.props.data.tableList?
                    <Button className="float_right" onClick={this.download}>导出CSV</Button>
                    :''
                }
                {
                    this.props.data&&this.props.data.tableList?
                        <Table columns={this.props.data.tableHeader} bordered={true} 
                            dataSource={this.props.data.tableList} />
                    :''
                }
            </div>
        )
    }
}