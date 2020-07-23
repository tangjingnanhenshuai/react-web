import React from "react";
import PropTypes from "prop-types";
import { Table ,Tag} from "antd";
import styles from "./List.less";
import { DropOption } from "components";
import { formatDate } from "utils";
import { amountFormat } from "../../../../utils/index";

const List = ({ onDeleteItem, onEditItem, location, ...tableProps }) => {
    const handleMenuClick = (record, e) => {
        if (e.key === "1") {
            onEditItem(record);
        }
    };
    const columns = [
        {
            title: "提现时间",
            dataIndex: "createdAt",
            key: "createdAt",
            render: text => formatDate(text),
            // width:200
        },
        {
            title: "交易流水号",
            dataIndex: "tn",
            key: "tn",
        },
        {
            title: "订单号",
            dataIndex: "orderNo",
            key: "orderNo",
            width:200
        },
      
        {
            title: "提现金额(元)",
            dataIndex: "totalFee",
            key: "totalFee",
            render:(text)=>{
                return "￥"+amountFormat(text).toFixed(2)
            }
        },
        {
            title: "手续费(元)",
            dataIndex: "serviceCharge",
            key: "serviceCharge",
            render:(text)=>{
                return "￥"+amountFormat(text).toFixed(2)
            }
        },
        {
            title: "实得金额(元)",
            dataIndex: "payAmount",
            key: "payAmount",
            render:(text)=>{
                return "￥"+amountFormat(text).toFixed(2)
            }
        },
        {
            title: "状态",
            dataIndex: "status",
            key: "status",
            render: text => {
                switch(text){
                    case 0 :
                    return <Tag color="blue">待审核</Tag>
                    break 
                    case 1 :
                    return <Tag color="cyan">审核通过</Tag>
                    break 
                    case 2:
                    return <Tag color="blue">提交代付中</Tag>
                    break 
                    case 3:
                    return <Tag color="green">成功</Tag>
                    break 
                    case 4:
                    return <Tag color="red">失败</Tag>
                    break 
                    case 5:
                    return <Tag color="red">审核不通过</Tag>
                    break 
                    default :
                    return <Tag color="red">--</Tag>
                    
                }
            }
        },
        {
            title: "操作",
            key: "operation",
            width: 100,
            render: (text, record) => {
                const menuOptions = [{ key: "1", name: "详情" }];
                return (
                    <DropOption
                        onMenuClick={e => handleMenuClick(record, e)}
                        menuOptions={menuOptions}
                    />
                );
            }
        }
    ];

    return (
        <Table
            {...tableProps}
            className={styles.table}
            bordered
            scroll={{ x: 1250 }}
            columns={columns}
            simple
            rowKey={record => record.id}
        />
    );
};

List.propTypes = {
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    location: PropTypes.object
};

export default List;
