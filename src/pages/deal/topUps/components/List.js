import React from "react";
import PropTypes from "prop-types";
import { Table ,Tag} from "antd";
import styles from "./List.less";
import { DropOption } from 'components'
import { amountFormat , formatDate} from "../../../../utils/index";


const List = ({ onDeleteItem, onEditItem, location, ...tableProps }) => {
    const handleMenuClick = (record, e) => {
        if (e.key === "1") {
            onEditItem(record);
        } else if (e.key === "2") {
            confirm({
                title: "确定删除该项嘛?",
                onOk() {
                    onDeleteItem(record.id);
                }
            });
        }
    };
    const columns = [
        {
            title: "创建日期",
            dataIndex: "createdAt",
            key: "createdAt",
            render:(text,record)=>{
                return formatDate(text)
            }
        },
        {
            title: "用户名",
            dataIndex: "userName",
            key: "userName",
        },
       
        {
            title: "交易流水号",
            dataIndex: "tn",
            key: "tn",
            // render:text=>{
            //     return (text) ? tex : "/"
            // }
        },
        // {
        //     title: "用户名",
        //     dataIndex: "userName",
        //     key: "userName",
        // },
        {
            title: "订单号",
            dataIndex: "orderNo",
            key: "orderNo"
        },
        {
            title: "充值金额（元）",
            dataIndex: "totalFee",
            key: "totalFee",
            render:text=>{
                 return "￥"+(parseInt(text)/1000).toFixed(2)
            }
        },
        // {
        //     title: "手续费",
        //     dataIndex: "serviceCharge",
        //     key: "serviceCharge",
        //      render:text=>{
        //          return (parseInt(text)/1000).toFixed(2)
        //      }
        // },
        {
            title: "支付方式",
            dataIndex: "payType",
            key: "payType",
            render:(text,record)=>{
                if(record.payType===1){
                    return "支付宝"
                }else if(record.payType===2){
                    return "微信"
                }
            }
        },
        {
            title: "状态",
            dataIndex: "status",
            key: "status",
            render:(text,record)=>{
                if(record.status===0){
                    return  <Tag color="red">未支付</Tag>
                }else{
                    return <Tag color="cyan">支付成功</Tag>
                }
            }
        },
        {
            title: "备注",
            dataIndex: "comment",
            key: "comment",
        },
     
        {
            title: "操作",
            key: "operation",
            width: 100,
            render: (text, record) => {
                // console.log(text,record)
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
