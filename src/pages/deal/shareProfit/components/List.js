import React from "react";
import PropTypes from "prop-types";
import { Table ,Tag } from "antd";
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
            title: "创建时间",
            dataIndex: "createdAt",
            key: "createdAt",
            render: text => formatDate(text)
        },
        {
            title: "用户名",
            dataIndex: "fromUserName",
            key: " fromUserName",
        },
        {
            title: "订单号",
            dataIndex: "payOrderNo",
            key: "payOrderNo"
        },
           {
            title: "分润类型",
            dataIndex: "type",
            key: "type",
            render: text => {
              switch (text) {
                  case 1:
                    return  <Tag color="cyan">广告分润</Tag>
                    break
                  case 2:
                    return  <Tag color="geekblue">大数据分润</Tag>
                    break
                //   case 3:
                //     return  <Tag color="cyan">短信分润</Tag>
                //     break
                //   case 4:
                //     return  <Tag color="red">提现</Tag>
                //     break
                    case 5:
                    return  <Tag color="blue">会员升级分润</Tag>
                    break
                //    case 6:
                //     return  <Tag color="geekblue">其他</Tag>
                //     break
                  default:
                    return <Tag color="blue"> - - </Tag>
              }
            }
        },
        {
            title: "消费金额（元）",
            dataIndex: "payAmount",
            key: "payAmount",
            render:(text)=>{
                return "￥"+amountFormat(text).toFixed(2)
                
            }
        },
        {
            title: "渠道类型",
            dataIndex: "channel",
            key: "channel",
            render:(text)=>{
            
              if(text){
                  return text
              }else {
                  return "/"
              }
            }
        },
        {
            title: "分润比例",
            dataIndex: "proportion",
            key: "proportion",
            render:text=>{
                 return text+"%"
            }
        },
        {
            title: "分润金额（元）",
            dataIndex: "splitAmount",
            key: "splitAmount",
            render:text=>{
                return "￥"+amountFormat(text).toFixed(2)
            }
        },
        // {
        //     title: "剩余余额",
        //     dataIndex: "currentBalance",
        //     key: "currentBalance",
        //     render: text => {
        //         return "￥"+amountFormat(text).toFixed(2)
        //     }
        // },
        // {
        //     title: "状态",
        //     dataIndex: "status",
        //     key: "status",
        //     render: text => {
        //         if (text) {
        //             return "可用";
        //         } else {
        //             return "不可用";
        //         }
        //     }
        // },
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
