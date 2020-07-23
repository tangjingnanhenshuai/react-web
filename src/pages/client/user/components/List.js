import React from "react";
import PropTypes from "prop-types";
import { Table ,Tag} from "antd";
import styles from "./List.less";
import { DropOption,ImageModal } from 'components'
import { formatDate } from "../../../../utils/index"


const List = ({ onDeleteItem, onEditItem, location, ...tableProps }) => {
    const handleMenuClick = (record, e) => {
        if (e.key === "1") {
            onEditItem(record);
        }
    };
    const columns = [
        {
            title: "用户名",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "手机号码",
            dataIndex: "userMobile",
            key: "userMobile"
        },
     
        {
            title: "用户等级",
            dataIndex: "level",
            key: "level",
            render:text=>{
                switch (text) {
                    case 0:
                        return <Tag color="silver"> 普通会员</Tag>
                        break;
                    case 1:
                        return <Tag color="cyan"> 超级会员</Tag>
                        break;
                    case 2:
                        return <Tag color="red"> 营销合伙人</Tag>
                        break;
                    default:
                        break;
                }
            }
        },
        {
            title: "认证状态",
            dataIndex: "authStatus",
            key: "authStatus",
            render: text=> {
                switch (text) {
                    case -1:
                        return <Tag color="#f50">驳回</Tag>
                        break
                    case 0:
                        return <Tag color="purple">未提交审核</Tag>
                        break
                    case 1:
                        return <Tag color="orange">已认证</Tag>
                        break
                    case 2:
                        return <Tag color="#87d068">审核中</Tag>
                        break
                    default:
                        return "/"
                }
            }
        },
        {
            title: "邀请人",
            dataIndex: "inviterUid",
            key: "inviterUid"
        },
           {
            title: "创建时间",
               dataIndex: "createdAt",
               key: "createdAt",
            render:(text,record)=>{
                if(text){
                    return formatDate(record.createdAt)
                }
            }
        },
        {
            title: "最后登录时间",
            dataIndex: "lastLoginTime",
            key: "lastLoginTime",
            render: text => {
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
