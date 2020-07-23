import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";
import styles from "./List.less";
import { DropOption } from "components";
import { formatDate } from "utils";
import { amountFormat } from "../../../../../utils/index";

const List = ({ onDeleteItem, onEditItem, location, ...tableProps }) => {
    const handleMenuClick = (record, e) => {
        if (e.key === "1") {
            onEditItem(record);
        }
    };
    const columns = [
        {
            title: "订单号",
            dataIndex: "targetId",
            key: "targetId"
        },
        {
            title: "创建时间",
            dataIndex: "createdAt",
            key: "createdAt",
            render: text => formatDate(text)
        },
        {
            title: "金额",
            dataIndex: "amount",
            key: "amount",
            render:(text)=>{
                return "￥"+amountFormat(text).toFixed(2)
            }
        },
        
        {
            title: "描述",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "剩余余额",
            dataIndex: "currentBalance",
            key: "currentBalance",
            render: text => {
                return "￥"+amountFormat(text).toFixed(2)
            }
        },
        {
            title: "状态",
            dataIndex: "status",
            key: "status",
            render: text => {
                if (text) {
                    return "可用";
                } else {
                    return "不可用";
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
