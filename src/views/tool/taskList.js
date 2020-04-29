import React, { Component } from 'react';
import TaskTable from '@/components/taskTable';
import {Button, Popover} from 'antd';
import {EditOutlined} from '@ant-design/icons'
export default class taskEidt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHeader: [],
            selectedRowKeys: [],
            taskList: [],
            pageSize: 1,
            total: 1,
        };
        this.setSelectedRowKeys = this.setSelectedRowKeys.bind(this);
    }
    UNSAFE_componentWillMount() {
        this.setTableHeader();
        this.getTaskList();
    }
    setTableHeader() {
        let tableHeader = [
            {
                title: '任务模板列表',
                dataIndex: 'taskName',
                key: 'taskName',
                render: (taskName, row) => {
                    return <span>
                        {taskName} 
                        <EditOutlined className="task_edit_icon" onClick={() => this.editTask(row.taskNo)} />
                    </span>
                }
            }, {
                title: '任务派发人数',
                dataIndex: 'sendNums',
                key: 'sendNums',
                align: 'center',
            }, {
                title: '任务量',
                dataIndex: 'taskNums',
                key: 'taskNums',
                align: 'center',
            }, {
                title: '完成数',
                dataIndex: 'doneNums',
                key: 'doneNums',
                align: 'center',
                render: (doneNums, row) => {
                    let content = <div>
                        <p>昨日完成量：{row.lastDoneNums}</p>
                        <p>7日完成量：{row.weekDoneNums}</p>
                    </div>
                    return  (
                        <Popover content={content} title="完成量">
                            <span className="task_orange">{doneNums}</span>
                        </Popover>
                    )
                }
            }, {
                title: '成功数',
                dataIndex: 'successNums',
                key: 'successNums',
                align: 'center',
                render: (successNums, row) => {
                    let content = <div>
                        <p>昨日成功量：{row.lastSuccessNums}</p>
                        <p>7日成功量：{row.weekSuccessNums}</p>
                    </div>
                    return  (
                        <Popover content={content} title="成功量">
                            <span className="task_red">{successNums}</span>
                        </Popover>
                    )
                }
            }, {
                title: '失败数',
                dataIndex: 'failNums',
                key: 'failNums',
                align: 'center',
                render: (failNums, row) => {
                    let content = <div>
                        <p>昨日失败量：{row.lastFailNums}</p>
                        <p>7日失败量：{row.weekFailNums}</p>
                    </div>
                    return  (
                        <Popover content={content} title="失败量">
                            <span className="task_green">{failNums}</span>
                        </Popover>
                    )
                }
            }, {
                title: '跟进中',
                dataIndex: 'followNums',
                key: 'followNums',
                align: 'center',
                render: (followNums, row) => {
                    let content = <div>
                        <p>昨日跟进中量：{row.lastFollowNums}</p>
                        <p>7日跟进中量：{row.weekFollowNums}</p>
                    </div>
                    return  (
                        <Popover content={content} title="跟进中量">
                            <span>{followNums}</span>
                        </Popover>
                    )
                }
            }, {
                title: '无跟进',
                dataIndex: 'unFollowNums',
                key: 'unFollowNums',
                align: 'center',
            }, {
                title: '任务状态',
                dataIndex: 'statusStr',
                key: 'statusStr',
                align: 'center',
                render: statusStr => {
                    let statusClass = 'task_grey';
                    switch(statusStr) {
                        case '已到期':
                            statusClass = 'task_red';
                            break;
                        case '进行中':
                            statusClass = 'task_green';
                            break;
                        default: 
                            statusClass = 'task_grey';
                    }
                    return <span className={statusClass}>{statusStr}</span>
                }
            }, {
                title: '',
                dataIndex: 'operates',
                key: 'operates',
                render: (operates, row) => {
                    return <span>
                        <Button onClick={() => {this.toTaskProgress(row.taskNo)}}>完成情况</Button>
                        <Button className="task_left_10" onClick={() => {this.exportExcel(row.taskNo)}}>导出详情至excel</Button>
                    </span>
                }
            }
        ]
        this.setState({
            tableHeader
        });
    }
    toTaskProgress(taskNo) {//跳转到完成情况页
        console.log('toTaskProgress:', taskNo);
        this.props.history.push(`/tool/process?no=${taskNo}`);
    }
    exportExcel(taskNo) {//导出详情至excel
        console.log('exportExcel:', taskNo);
    }
    setSelectedRowKeys(rowKeys) {
        this.setState({
            selectedRowKeys: rowKeys
        });
    }
    editTask(taskNo) {
        let url = '/tool/edit';
        if(taskNo) {
            url += `?no=${taskNo}`;
        }
        this.props.history.push(url);
    }
    getTaskList(page = 1) {
        let res = {
            "broadSuccess":true,"code":200,"desc":"成功",
            "list":[
                {
                    "crtTs":"2020-04-21 09:20:43","doneNums":36,"expireTs":"2020-04-26 00:00:00.0",
                    "failNums":20,"feedbackFlag":1,"followNums":73,"lastDoneNums":-1,"lastFailNums":0,
                    "lastFollowNums":1,"lastSuccessNums":-1,
                    "progress":"需一线人员提交优质终端现失联的原因、处理计划、处理时间、引导进展及需要的支持。",
                    "remark":"定时到期:2020-04-26 00:05:00。","reserve1":"","sendNums":78,
                    "startTs":"2020-04-21 00:00:00.0","status":2,"successNums":16,
                    "taskDesc":"12月优质终端（周转率30%以上）现失联排查，跟进终端失联原因、处理计划、时间节点、引导进展及需要的支持等。",
                    "taskName":"去年12月周转率30%以上现失联终端跟进","taskNo":2004212000000003,"taskNums":161,"unFollowNums":53,
                    "updTs":"2020-04-28 18:36:32","weekDoneNums":-2,"weekFailNums":-1,"weekFollowNums":-12,"weekSuccessNums":-1
                }, {
                    "crtTs":"2020-04-21 09:18:20","doneNums":418,"expireTs":"2030-04-26 00:00:00","failNums":184,"feedbackFlag":1,
                    "followNums":848,"lastDoneNums":-30,"lastFailNums":0,"lastFollowNums":-132,"lastSuccessNums":-30,
                    "progress":"需一线人员提交优质终端现沉默的原因、处理计划、处理时间、引导进展及需要的支持。","remark":"","reserve1":"",
                    "sendNums":128,"startTs":"2020-04-21 00:00:00.0","status":1,"successNums":234,
                    "taskDesc":"12月优质终端（周转率30%以上）现沉默（周转率低于30%）排查，跟进终端沉默原因、处理计划、时间节点、引导进展及需要的支持等。",
                    "taskName":"去年12月周转率30%以上现沉默终端跟进","taskNo":2004212000000002,"taskNums":1959,"unFollowNums":693,
                    "updTs":"2020-04-28 14:17:50","weekDoneNums":1,"weekFailNums":-1,"weekFollowNums":-32,"weekSuccessNums":2
                }, {
                    "crtTs":"2020-04-17 21:30:21","doneNums":4,"expireTs":"2020-04-23 00:00:00.0","failNums":0,"feedbackFlag":1,
                    "followNums":21,"lastDoneNums":0,"lastFailNums":0,"lastFollowNums":-2,"lastSuccessNums":0,
                    "progress":"失联原因、处理进度、预计解决方案、解决时间，如果已处理好则回复已处理好，其他情况请如实回复",
                    "remark":"定时到期:2020-04-23 00:05:00。","reserve1":"","sendNums":24,"startTs":"2020-04-17 00:00:00.0","status":2,
                    "successNums":4,"taskDesc":"12月周转率30%以上终端本周显示失联，需要排查是否确认失联，失联原因，解决方案，解决时间等并直至跟进解决",
                    "taskName":"失联终端排查（12月周转率30%以上）","taskNo":2004172000000005,"taskNums":44,"unFollowNums":19,
                    "updTs":"2020-04-27 23:33:51","weekDoneNums":-1,"weekFailNums":0,"weekFollowNums":-2,"weekSuccessNums":-1
                }, {
                    "crtTs":"2020-04-17 20:05:54","doneNums":3,"expireTs":"2020-04-22 00:00:00.0","failNums":1,"feedbackFlag":1,
                    "followNums":3,"lastDoneNums":0,"lastFailNums":0,"lastFollowNums":0,"lastSuccessNums":0,
                    "progress":"现场排查情况，失联原因、故障类型等，跟进工作","remark":"定时到期:2020-04-22 00:05:00。","reserve1":"",
                    "sendNums":5,"startTs":"2020-04-18 00:00:00.0","status":2,"successNums":2,"taskDesc":"失联终端排查原因、解决问题，恢复正常",
                    "taskName":"失联终端排查","taskNo":2004172000000004,"taskNums":7,"unFollowNums":1,"updTs":"2020-04-22 00:05:00",
                    "weekDoneNums":0,"weekFailNums":0,"weekFollowNums":0,"weekSuccessNums":0
                }
            ],
            "pageSize":10,"success":true,"totalNums":4
        };
        let list = res.list;
        list = list.map(item => {
            item.statusStr = ['待开始', '进行中', '已到期'][item.status];
            item.key = item.taskNo;
            return item;
        })
        this.setState({
            taskList: list,
            pageSize: res.pageSize,
            total: res.totalNums
        });
    }
    render() {
        return (
            <div className="main_content">
                <TaskTable tableHeader={this.state.tableHeader} tableList={this.state.taskList} 
                    setSelectedRowKeys={this.setSelectedRowKeys} selectedRowKeys={this.state.selectedRowKeys}
                    pageSize={this.state.pageSize} total={this.state.total} initData={this.getTaskList}
                />
                <Button className="task_add_btn" onClick={() => {this.editTask()}}>新增任务</Button>
            </div>
        )
    }
}