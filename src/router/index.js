import Bundle from '@/utils/loadable';
export const routes = [
    {
        path: '/' ,
        name: 'dashboard' ,
        breadcrumbName: '首页' ,
        title: '首页' ,
        icon: 'home' ,
        component: Bundle(() => import( '@/views/dashboard/index' )),
    }, {
        path: '/courier' ,
        name: 'courier' ,
        breadcrumbName: '快递员相关查询' ,
        title: '快递员相关查询' ,
        icon: 'team' ,
        children: [
            {
                path: '/courier/add',
                name: 'courierAdd',
                component: Bundle( () => import( '@/views/courier/add' ) ),
                breadcrumbName: '快递员新增',
                title: '快递员新增'
            }, {
                path: '/courier/total',
                name: 'courierTotal',
                component: Bundle( () => import( '@/views/courier/total' ) ),
                breadcrumbName: '快递员总数',
                title: '快递员总数'
            }, {
                path: '/courier/active',
                name: 'courierActive',
                component: Bundle( () => import( '@/views/courier/active' ) ),
                breadcrumbName: '活跃快递员人数',
                title: '活跃快递员人数'
            }, {
                path: '/courier/retentionRate',
                name: 'courierRetentionRate',
                component: Bundle( () => import( '@/views/courier/retentionRate' ) ),
                breadcrumbName: '新注册快递员留存率',
                title: '新注册快递员留存率'
            }
        ]
    }, {
        path: '/parcel' ,
        // component:Index,
        name: 'parcel' ,
        breadcrumbName: '包裹分析' ,
        title: '包裹分析' ,
        icon: 'inbox' ,
        children: [
            {
                path: '/parcel/delivery',
                name: 'parcelDelivery',
                component: Bundle(() => import('@/views/parcel/delivery')),
                breadcrumbName: '包裹投递总数',
                title: '包裹投递总数'
            }, {
                path: '/parcel/recoveryRate',
                name: 'parcelRecoveryRate',
                component: Bundle(() => import('@/views/parcel/recoveryRate')),
                breadcrumbName: '包裹回收率',
                title: '包裹回收率'
            }, {
                path: '/parcel/overdueRate',
                name: 'parcelOverdueRate',
                component: Bundle(() => import('@/views/parcel/overdueRate')),
                breadcrumbName: '包裹逾期率',
                title: '包裹逾期率'
            }, {
                path: '/parcel/boxStayTime',
                name: 'boxStayTime',
                component: Bundle(() => import('@/views/parcel/boxStayTime')),
                breadcrumbName: '包裹箱格停留时间',
                title: '包裹箱格停留时间'
            }, {
                path: '/parcel/deliveryTime',
                name: 'parcelDeliveryTime',
                component: Bundle(() => import('@/views/parcel/deliveryTime')),
                breadcrumbName: '包裹投递时间分时统计',
                title: '包裹投递时间分时统计'
            }, {
                path: '/parcel/tackTime',
                name: 'parcelTackTime',
                component: Bundle(() => import('@/views/parcel/tackTime')),
                breadcrumbName: '包裹取出时间分时统计',
                title: '包裹取出时间分时统计'
            }, {
                path: '/parcel/recipientNum',
                name: 'recipientNum',
                component: Bundle(() => import('@/views/parcel/recipientNum')),
                breadcrumbName: '收件人总数',
                title: '收件人总数'
            }, {
                path: '/parcel/recipientAddNum',
                name: 'recipientAddNum',
                component: Bundle(() => import('@/views/parcel/recipientAddNum')),
                breadcrumbName: '收件人新增数',
                title: '收件人新增数'
            }, {
                path: '/parcel/recipientActiveNum',
                name: 'recipientActiveNum',
                component: Bundle(() => import('@/views/parcel/recipientActiveNum')),
                breadcrumbName: '收件人活跃人数',
                title: '收件人活跃人数'
            }
        ]
    }, {
        path: '/cabinet',
        // component:Index,
        name: 'cabinet',
        breadcrumbName: '快递柜业务收入',
        title: '快递柜业务收入',
        icon: 'hdd',
        children: [
            {
                path: '/cabinet/revenues',
                name: 'revenues',
                component: Bundle(() => import('@/views/cabinet/revenues')),
                breadcrumbName: '快递柜业务收入汇总',
                title: '快递柜业务收入汇总'
            }, {
                path: '/cabinet/courierRevenuesBalance',
                name: 'courierRevenuesBalance',
                component: Bundle(() => import('@/views/cabinet/courierRevenuesBalance')),
                breadcrumbName: '快递员充值总余额',
                title: '快递员充值总余额'
            }, {
                path: '/cabinet/courierRevenuesOrders',
                name: 'courierRevenuesOrders',
                component: Bundle(() => import('@/views/cabinet/courierRevenuesOrders')),
                breadcrumbName: '快递员充值订单数',
                title: '快递员充值总订单数'
            }, {
                path: '/cabinet/courierRevenuesOrdersAmt',
                name: 'courierRevenuesOrdersAmt',
                component: Bundle(() => import('@/views/cabinet/courierRevenuesOrdersAmt')),
                breadcrumbName: '快递员充值订单分金额统计',
                title: '快递员充值订单分金额统计'
            }, {
                path: '/cabinet/courierConsume',
                name: 'courierConsume',
                component: Bundle(() => import('@/views/cabinet/courierConsume')),
                breadcrumbName: '快递员消费构成',
                title: '快递员消费构成'
            }, {
                path: '/cabinet/courierGradeConsumeRate',
                name: 'courierGradeConsumeRate',
                component: Bundle(() => import('@/views/cabinet/courierGradeConsumeRate')),
                breadcrumbName: '快递员分等级消费比例',
                title: '快递员分等级消费比例'
            }, {
                path: '/cabinet/contractColumn',
                name: 'contractColumn',
                component: Bundle(() => import('@/views/cabinet/contractColumn')),
                breadcrumbName: '承包列数',
                title: '承包列数',
                hidden: true
            }, {
                path: '/cabinet/contractedNums',
                name: 'contractedNums',
                component: Bundle(() => import('@/views/cabinet/contractedNums')),
                breadcrumbName: '承包快递柜数',
                title: '承包快递柜数',
                hidden: true
            }, {
                path: '/cabinet/contractOfCourier',
                name: 'contractOfCourier',
                component: Bundle(() => import('@/views/cabinet/contractOfCourier')),
                breadcrumbName: '承包中快递员数',
                title: '承包中快递员数',
                hidden: true
            }, {
                path: '/cabinet/contractOfCourierAdd',
                name: 'contractOfCourierAdd',
                component: Bundle(() => import('@/views/cabinet/contractOfCourierAdd')),
                breadcrumbName: '承包快递员增长数',
                title: '承包快递员增长数',
                hidden: true
            }, {
                path: '/cabinet/courierRetainParcelRate',
                name: 'courierRetainParcelRate',
                component: Bundle(() => import('@/views/cabinet/courierRetainParcelRate')),
                breadcrumbName: '快递员续包率',
                title: '快递员续包率',
                hidden: true
            }, {
                path: '/cabinet/numberOfOverdueConsume',
                name: 'numberOfOverdueConsume',
                component: Bundle(() => import('@/views/cabinet/numberOfOverdueConsume')),
                breadcrumbName: '逾期消费人数',
                title: '逾期消费人数'
            }
        ]
    }, {
        path: '/manager',
        // component:Index,
        name: 'manager',
        breadcrumbName: '负责人相关查询',
        title: '负责人相关查询',
        icon: 'user',
        children: [
            {
                path: '/manager/cabinetTurnover',
                name: 'cabinetTurnover',
                // component:CabinetTurnover,
                // component:import('@/views/manager/cabinetTurnover'),
                component: Bundle(() => import('@/views/manager/cabinetTurnover')),
                breadcrumbName: '快递柜周转率统计',
                title: '快递柜周转率统计'
            }, {
                path: '/manager/averageIncomeOfCabinet',
                name: 'averageIncomeOfCabinet',
                // component:AverageIncomeOfCabinet,
                // component:import('@/views/manager/averageIncomeOfCabinet'),
                component: Bundle(() => import('@/views/manager/averageIncomeOfCabinet')),
                breadcrumbName: '台均收入',
                title: '台均收入'
            }
        ]
    }, {
        path: '/operate',
        name: 'operate',
        breadcrumbName: '埋点数据',
        title: '埋点数据',
        icon: 'line-chart',
        component: Bundle(() => import('@/views/operate/operate')),
    }, {
        path: '/tool',
        name: 'tool',
        breadcrumbName: '任务管理',
        title: '任务管理',
        icon: 'profile',
        children: [
            {
                path: '/tool/index',
                name: 'toolIndex',
                component: Bundle(() => import('@/views/tool/taskList')),
                breadcrumbName: '任务列表',
                icon: 'profile',
                title: '任务列表'
            }, {
                path: '/tool/edit',
                name: 'toolEdit',
                component: Bundle(() => import('@/views/tool/taskEdit')),
                breadcrumbName: '任务编辑',
                title: '任务编辑',
                hidden: true
            }, {
                path: '/tool/process',
                name: 'toolProcess',
                component: Bundle(() => import('@/views/tool/taskProcess')),
                breadcrumbName: '完成情况',
                title: '完成情况',
                hidden: true
            }
        ]
    }, {
        path: '/toolRegion',
        name: 'toolRegion',
        breadcrumbName: '任务管理',
        title: '任务管理',
        icon: 'profile',
        children: [
            {
                path: '/toolRegion/index',
                name: 'toolRegionIndex',
                component: Bundle(() => import('@/views/toolRegion/taskList')),
                breadcrumbName: '任务列表',
                icon: 'profile',
                title: '任务列表'
            }, {
                path: '/toolRegion/receive',
                name: 'toolRegionEdit',
                component: Bundle(() => import('@/views/toolRegion/taskRece')),
                breadcrumbName: '任务',
                title: '任务',
                hidden: true
            }, {
                path: '/toolRegion/summary',
                name: 'toolProcess',
                component: Bundle(() => import('@/views/toolRegion/taskSummary')),
                breadcrumbName: '情况汇总',
                title: '情况汇总',
                hidden: true
            }
        ]
    }
]
export const filterRoutes = routes;