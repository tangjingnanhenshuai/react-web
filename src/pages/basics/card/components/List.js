import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal, Tag } from 'antd'
import { DropOption } from 'components'
import { bankCardStatus, formatDate, color } from 'utils'

const { confirm } = Modal
const { geekblue } = color

const List = ({
    onDeleteItem, onEditItem, onReviewImages, onShowDetail,
    location,
    ...tableProps
}) => {
    const handleMenuClick = (record, e) => {
        if (e.key === '1') {
            onEditItem(record)
        } else if (e.key === '2') {
            confirm({
                title: '确定删除该项吗?',
                okText: '确定',
                cancelText: '取消',
                onOk() {
                    onDeleteItem(record.id)
                }
            })
        } else if (e.key === '3') {
            onShowDetail(record)
        }
    }



    const columns = [

        {
            title: '账户',
            dataIndex: 'accountNo',
            key: 'accountNo',
            // width: '15%',
        }, {
            title: '账户名',
            dataIndex: 'accountName',
            key: 'accountName',
            // width: '10%',
        }, {
            title: '银行名',
            dataIndex: 'bankName',
            key: 'bankName',
            // width: '10%',
        }, {
            title: '银行卡支行',
            dataIndex: 'subbranchNo',
            key: 'subbranchNo',
            // width: '20%',
        }, {
            title: '预留手机号',
            dataIndex: 'bankMobile',
            key: 'bankMobile',
            // width: '10%',
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            // width: '10%',
            // render: (text) => bankCardStatus(text)
            render: text => {
                switch (text) {
                    case -1:
                        return <Tag color="red">驳回</Tag>
                        break
                    case 0:
                        return <Tag color="geekblue">未提交审核</Tag>
                        break
                    case 1:
                        return <Tag color="cyan">审核通过</Tag>
                        break
                    case 2:
                        return <Tag color="geekblue">审核中</Tag>
                        break
                    default:
                        return <Tag color="blue"> - - </Tag>
                }
            }
        }, {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            // width: '15%',
            render: (text) => formatDate(text)
        }, {
            title: '操作',
            key: 'operation',
            // width: '10%',
            render: (text, record) => {
                return <DropOption
                    onMenuClick={e => handleMenuClick(record, e)}
                    menuOptions={[
                        { key: '1', name: '编辑' },
                        { key: '2', name: '删除' },
                        { key: '3', name: '详情' },
                    ]}
                ></DropOption>
            }
        }
    ]

    return (
        <Table
            {...tableProps}
            bordered
            scroll={{ x: 1250 }}
            columns={columns}
            // simple
            pagination={false}
            rowKey={record => record.id}
        >
        </Table>
    )
}

List.prototype = {
    onDeleteItem: PropTypes.func,
    onEditItem: PropTypes.func,
    location: PropTypes.object
}


export default List
