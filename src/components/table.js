import React,{Component} from 'react';
import {Table,Button} from 'antd';

export default class TableCustom extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    download(){}
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