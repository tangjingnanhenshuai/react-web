import React from "react";
import PropTypes from "prop-types";
import { Table ,Tag} from "antd";
import styles from "./List.less";
import { ImageModal,DropOption } from 'components'
import { formatDate } from "utils";

const List = ({ onDeleteItem, onEditItem, location, ...tableProps }) => {
    const handleMenuClick = (record, e) => {
        if (e.key === "1") {
            onEditItem(record)
        } 
    };
    const columns = [
        {
            title: "用户名",
            dataIndex: "name",
            key: "name",
            // className:styles.avatar,
            // render:(text,record)=>{
            //     return <ImageModal width={60} height={60} images={text} />
            // }
        },
        {
            title: "手机号",
            dataIndex: "mobile",
            key: "mobile"
        },
     
        {
            title: "认证类型",
            dataIndex: "personalAuthStatus",
            key: "personalAuthStatus",
            render:(text,value)=>{
             if (value.companyAuthStatus !=0){
                    switch (value.companyAuthStatus) {
                        case -1:
                            return <Tag color="blue">企业认证</Tag>
                            break
                        case 1:
                            return <Tag color="blue">企业认证</Tag>
                            break
                        case 2:
                            return <Tag color="blue">企业认证</Tag>
                            break
                        default:
                            return <Tag color="cyan">个人认证</Tag>
                    }
                } else if (value.personalAuthStatus!=0){
                    return <Tag color="cyan">个人认证</Tag>
                } else{
                  return  <Tag color="gray">未认证</Tag>
                }
        
            }
        },
        {
            title: "认证状态",
            dataIndex: "companyAuthStatus",
            key: "companyAuthStatus",
            render:(text,value)=>{
                if(text==0){
                    switch(value.personalAuthStatus){
                      case -1:
                            return <Tag color="red">驳回</Tag>
                        break
                      case 1:
                            return <Tag color="green">已认证</Tag>
                        break
                      case 2:
                            return <Tag color="cyan">审核中</Tag>
                        break
                       default:
                            return <Tag color="gray">未认证</Tag>
                    }
                }else{
                    switch(text){
                        case -1:
                            return <Tag color="red">驳回</Tag>
                          break
                        case 1:
                            return <Tag color="green">已认证</Tag>
                          break
                        case 2:
                            return <Tag color="cyan">审核中</Tag>
                          break
                         default:
                            return <Tag color="gray">未认证</Tag>
                      }
                }
             }
        },
        {
            title: "最后登录时间",
            dataIndex: "updatedAt",
            key: "updatedAt",
            render:(text)=>{
                return formatDate(text)
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
