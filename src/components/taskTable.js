import React, { Component } from 'react';
import { Table } from 'antd';
export default class TaskTable extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        let _this = this;
        return (
            <Table columns={this.props.tableHeader} dataSource={this.props.tableList}
                scroll={{x: true}} 
                rowSelection={{
                    selectedRowKeys: this.props.selectedRowKeys,
                    onChange(selectedRowKeys, selectedRows) {
                        _this.props.setSelectedRowKeys(selectedRowKeys)
                    }
                }}
                pagination={{
                    total: this.props.total,
                    pageSize: this.props.pageSize ? this.props.pageSize : 10,
                    hideOnSinglePage: true,
                    onChange: (page) => {
                        _this.props.initData(page);
                    }
                }}
            />
        )
    }
}