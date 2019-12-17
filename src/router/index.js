import Dashboard from '@/views/dashboard/index'
// import Index from '@/views/index/index';
// const courierFiles = require.context('@/views/courier/', true, /\.js$/);
// import {CourierActive,CourierAdd,CourierRetentionRate,CourierTotal} from '@/views/courier/';
import CourierActive from '@/views/courier/active';
import CourierAdd from '@/views/courier/add';
import CourierRetentionRate from '@/views/courier/retentionRate';
import CourierTotal from '@/views/courier/total';

import BoxStayTime from '@/views/parcel/boxStayTime';
import ParcelDelivery from '@/views/parcel/delivery';
import ParcelDeliveryTime from '@/views/parcel/deliveryTime';
import ParcelOverdueRate from '@/views/parcel/overdueRate';
import ParcelRecipientActiveNum from '@/views/parcel/recipientActiveNum';
import ParcelRecipientAddNum from '@/views/parcel/recipientAddNum';
import ParcelRecipientNum from '@/views/parcel/recipientNum';
import ParcelRecoveryRate from '@/views/parcel/recoveryRate';
import ParcelTackTime from '@/views/parcel/tackTime';

import ContractColumn from '@/views/cabinet/contractColumn';
import ContractedNums from '@/views/cabinet/contractedNums';
import ContractOfCourier from '@/views/cabinet/contractOfCourier';
import ContractOfCourierAdd from '@/views/cabinet/contractOfCourierAdd';
import CourierConsume from '@/views/cabinet/courierConsume';
import CourierGradeConsumeRate from '@/views/cabinet/courierGradeConsumeRate';
import CourierRetainParcelRate from '@/views/cabinet/courierRetainParcelRate';
import CourierRevenuesBalance from '@/views/cabinet/courierRevenuesBalance';
import CourierRevenuesOrders from '@/views/cabinet/courierRevenuesOrders';
import CourierRevenuesOrdersAmt from '@/views/cabinet/courierRevenuesOrdersAmt';
import NumberOfOverdueConsume from '@/views/cabinet/numberOfOverdueConsume';
import Revenues from '@/views/cabinet/revenues';

import AverageIncomeOfCabinet from '@/views/manager/averageIncomeOfCabinet';
import CabinetTurnover from '@/views/manager/cabinetTurnover';

import Operate from '@/views/operate/operate';
export const routes = [
    {
        path:'/',
        // component:Index,
        name:'dashboard',
        breadcrumbName:'首页',
        meta:{title:'首页',icon:'home'},
        children:[
            {
                path:'/',
                name:'home',
                breadcrumbName:'首页',
                meta:{title:'首页',icon:'home'},
                component:Dashboard
                // component:Index
                // component:import('@/views/dashboard/index')
            }
        ]
    },{
        path:'/courier',
        // component:Index,
        name:'courier',
        breadcrumbName:'快递员相关查询',
        meta:{title:'快递员相关查询',icon:'team'},
        children:[
            {
                path:'/courier/add',
                name:'courierAdd',
                // component:import('@/views/courier/add'),
                component:CourierAdd,
                breadcrumbName:'快递员新增',
                meta:{title:'快递员新增'}
            },{
                path:'/courier/total',
                name:'courierTotal',
                // component:import('@/views/courier/total'),
                component:CourierTotal,
                breadcrumbName:'快递员总数',
                meta:{title:'快递员总数'}
            },{
                path:'/courier/active',
                name:'courierActive',
                // component:import('@/views/courier/active'),
                component:CourierActive,
                breadcrumbName:'活跃快递员人数',
                meta:{title:'活跃快递员人数'}
            },{
                path:'/courier/retentionRate',
                name:'courierRetentionRate',
                // component:import('@/views/courier/retentionRate'),
                component:CourierRetentionRate,
                breadcrumbName:'新注册快递员留存率',
                meta:{title:'新注册快递员留存率'}
            }
        ]
    },{
        path:'/parcel',
        // component:Index,
        name:'parcel',
        breadcrumbName:'包裹分析',
        meta:{title:'包裹分析',icon:'inbox'},
        children:[
            {
                path:'/parcel/delivery',
                name:'parcelDelivery',
                component:ParcelDelivery,
                // component:import('@/views/parcel/delivery'),
                breadcrumbName:'包裹投递总数',
                meta:{title:'包裹投递总数'}
            },{
                path:'/parcel/recoveryRate',
                name:'parcelRecoveryRate',
                component:ParcelRecoveryRate,
                // component:import('@/views/parcel/recoveryRate'),
                breadcrumbName:'包裹回收率',
                meta:{title:'包裹回收率'}
            },{
                path:'/parcel/overdueRate',
                name:'parcelOverdueRate',
                component:ParcelOverdueRate,
                // component:import('@/views/parcel/overdueRate'),
                breadcrumbName:'包裹逾期率',
                meta:{title:'包裹逾期率'}
            },{
                path:'/parcel/boxStayTime',
                name:'boxStayTime',
                component:BoxStayTime,
                // component:import('@/views/parcel/boxStayTime'),
                breadcrumbName:'包裹箱格停留时间',
                meta:{title:'包裹箱格停留时间'}
            },{
                path:'/parcel/deliveryTime',
                name:'parcelDeliveryTime',
                component:ParcelDeliveryTime,
                // component:import('@/views/parcel/deliveryTime'),
                breadcrumbName:'包裹投递时间分时统计',
                meta:{title:'包裹投递时间分时统计'}
            },{
                path:'/parcel/tackTime',
                name:'parcelTackTime',
                component:ParcelTackTime,
                // component:import('@/views/parcel/tackTime'),
                breadcrumbName:'包裹取出时间分时统计',
                meta:{title:'包裹取出时间分时统计'}
            },{
                path:'/parcel/recipientNum',
                name:'recipientNum',
                component:ParcelRecipientNum,
                // component:import('@/views/parcel/recipientNum'),
                breadcrumbName:'收件人总数',
                meta:{title:'收件人总数'}
            },{
                path:'/parcel/recipientAddNum',
                name:'recipientAddNum',
                component:ParcelRecipientAddNum,
                // component:import('@/views/parcel/recipientAddNum'),
                breadcrumbName:'收件人新增数',
                meta:{title:'收件人新增数'}
            },{
                path:'/parcel/recipientActiveNum',
                name:'recipientActiveNum',
                component:ParcelRecipientActiveNum,
                // component:import('@/views/parcel/recipientActiveNum'),
                breadcrumbName:'收件人活跃人数',
                meta:{title:'收件人活跃人数'}
            }
        ]
    },{
        path:'/cabinet',
        // component:Index,
        name:'cabinet',
        breadcrumbName:'快递柜业务收入',
        meta:{title:'快递柜业务收入',icon:'hdd'},
        children:[
            {
                path:'/cabinet/revenues',
                name:'revenues',
                component:Revenues,
                // component:import('@/views/cabinet/revenues'),
                breadcrumbName:'快递柜业务收入汇总',
                meta:{title:'快递柜业务收入汇总'}
            },{
                path:'/cabinet/courierRevenuesBalance',
                name:'courierRevenuesBalance',
                component:CourierRevenuesBalance,
                // component:import('@/views/cabinet/courierRevenuesBalance'),
                breadcrumbName:'快递员充值总余额',
                meta:{title:'快递员充值总余额'}
            },{
                path:'/cabinet/courierRevenuesOrders',
                name:'courierRevenuesOrders',
                component:CourierRevenuesOrders,
                // component:import('@/views/cabinet/courierRevenuesOrders'),
                breadcrumbName:'快递员充值订单数',
                meta:{title:'快递员充值总订单数'}
            },{
                path:'/cabinet/courierRevenuesOrdersAmt',
                name:'courierRevenuesOrdersAmt',
                component:CourierRevenuesOrdersAmt,
                // component:import('@/views/cabinet/courierRevenuesOrdersAmt'),
                breadcrumbName:'快递员充值订单分金额统计',
                meta:{title:'快递员充值订单分金额统计'}
            },{
                path:'/cabinet/courierConsume',
                name:'courierConsume',
                component:CourierConsume,
                // component:import('@/views/cabinet/courierConsume'),
                breadcrumbName:'快递员消费构成',
                meta:{title:'快递员消费构成'}
            },{
                path:'/cabinet/courierGradeConsumeRate',
                name:'courierGradeConsumeRate',
                component:CourierGradeConsumeRate,
                // component:import('@/views/cabinet/courierGradeConsumeRate'),
                breadcrumbName:'快递员分等级消费比例',
                meta:{title:'快递员分等级消费比例'}
            },{
                path:'/cabinet/contractColumn',
                name:'contractColumn',
                component:ContractColumn,
                // component:import('@/views/cabinet/contractColumn'),
                breadcrumbName:'承包列数',
                meta:{title:'承包列数'},
                hidden:true
            },{
                path:'/cabinet/contractedNums',
                name:'contractedNums',
                component:ContractedNums,
                // component:import('@/views/cabinet/contractedNums'),
                breadcrumbName:'承包快递柜数',
                meta:{title:'承包快递柜数'},
                hidden:true
            },{
                path:'/cabinet/contractOfCourier',
                name:'contractOfCourier',
                component:ContractOfCourier,
                // component:import('@/views/cabinet/contractOfCourier'),
                breadcrumbName:'承包中快递员数',
                meta:{title:'承包中快递员数'},
                hidden:true
            },{
                path:'/cabinet/contractOfCourierAdd',
                name:'contractOfCourierAdd',
                component:ContractOfCourierAdd,
                // component:import('@/views/cabinet/contractOfCourierAdd'),
                breadcrumbName:'承包快递员增长数',
                meta:{title:'承包快递员增长数'},
                hidden:true
            },{
                path:'/cabinet/courierRetainParcelRate',
                name:'courierRetainParcelRate',
                component:CourierRetainParcelRate,
                // component:import('@/views/cabinet/courierRetainParcelRate'),
                breadcrumbName:'快递员续包率',
                meta:{title:'快递员续包率'},
                hidden:true
            },{
                path:'/cabinet/numberOfOverdueConsume',
                name:'numberOfOverdueConsume',
                component:NumberOfOverdueConsume,
                // component:import('@/views/cabinet/numberOfOverdueConsume'),
                breadcrumbName:'逾期消费人数',
                meta:{title:'逾期消费人数'}
            }
        ]
    },{
        path:'/manager',
        // component:Index,
        name:'manager',
        breadcrumbName:'负责人相关查询',
        meta:{title:'负责人相关查询',icon:'user'},
        children:[
            {
                path:'/manager/cabinetTurnover',
                name:'cabinetTurnover',
                component:CabinetTurnover,
                // component:import('@/views/manager/cabinetTurnover'),
                breadcrumbName:'快递柜周转率统计',
                meta:{title:'快递柜周转率统计'}
            },{
                path:'/manager/averageIncomeOfCabinet',
                name:'averageIncomeOfCabinet',
                component:AverageIncomeOfCabinet,
                // component:import('@/views/manager/averageIncomeOfCabinet'),
                breadcrumbName:'台均收入',
                meta:{title:'台均收入'}
            }
        ]
    },{
        path:'/operate',
        // component:Index,
        name:'operate',
        breadcrumbName:'埋点数据',
        meta:{title:'埋点数据',icon:'line-chart'},
        children:[
            {
                path:'/operate',
                name:'operates',
                component:Operate,
                // component:import('@/views/operate/operate'),
                breadcrumbName:'埋点数据',
                meta:{title:'埋点数据',icon:'line-chart'},
            }
        ]
    }
]
export const filterRoutes = routes;