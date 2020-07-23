import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Page } from 'components'
import Filter from './components/Filter'
import List from './components/List'
import Modal from './components/Modal'
import Detail from './components/Detail'


const Index = ({
    baseCard, loading, location, dispatch
}) => {
    const { query, pathname } = location
    const {
        list, pagination, currentItem, modalVisible, modalType, detailVisible, bankNameQuery, subbranchList, updateItem,
    } = baseCard

    const { pageSize } = pagination

    const filterProps = {
        list,
        filter: {
            ...query,
        },
        onFilterChange(value) {
            dispatch(routerRedux.push({
                pathname: location.pathname,
                query: {
                    ...value,
                    pageNo: 1,
                    pageSize,
                },
            }))
        },
        onAdd() {
            dispatch({
                type: 'baseCard/showModal',
                payload: {
                    modalType: 'create',
                },
            })
        },
    }
    const listProps = {
        dataSource: list,
        loading: loading.effects['baseCard/query'],
        location,
        pagination,
        onChange(page) {
            dispatch(routerRedux.push({
                pathname,
                query: {
                    ...query,
                    pageNo: page.current,
                    pageSize: page.pageSize,
                },
            }))

        },
        onDeleteItem(id) {
            dispatch({
                type: 'baseCard/remove',
                payload: id
            })
        },
        onEditItem(item) {
            dispatch({
                type: 'baseCard/showModal',
                payload: {
                    modalType: 'update',
                    currentItem: item
                }
            })
        },
        onShowDetail(item) {
            dispatch({
                type: 'baseCard/showDetailModal',
                payload: {
                    currentItem: item
                }
            })
        }
    }
  
    const modalProps = {
        bankNameQuery, subbranchList, updateItem,
        // updateItem: {},
        item: modalType === 'create' ? {} : currentItem,
        visible: modalVisible,
        width: 1000,
        maskClosable: false,
        confirmLoading: loading.effects[`task/${modalType}`],
        title: modalType === 'create' ? '添加结算卡' : '编辑结算卡',
        wrapClassName: 'vertical-center-modal',
        onOk(data) {
            dispatch({
                type: `baseCard/${modalType}`,
                payload: data
            })
        },
        onCancel() {
            dispatch({
                type: 'baseCard/updateState',
                payload: { bankNameQuery: {} }
            })
            dispatch({
                type: 'baseCard/hideModal'
            })
        },

        //输入卡号--获取银行名
        queryBankName(params) {
            dispatch({
                type: 'baseCard/queryBankName',
                payload: { cardNo: params }
            })
        },

        //获取银行支行列表
        getSubbranchByBankName(params) {
            dispatch({
                type: 'baseCard/queryBankSubbranch',
                payload: params
            })
        }
    }

    const detailProps = {
        item: currentItem,
        visible: detailVisible,
        title: '详情',
        width: 1000,
        footer: null,
        maskClosable: false,
        wrapClassName: 'vertical-center-modal',
        onCancel() {
            dispatch({
                type: 'baseCard/hideDetailModal'
            })
        }
    }

    return (
        <Page inner>
            <Filter {...filterProps} />
            <List {...listProps} />
            {detailVisible && <Detail {...detailProps}></Detail>}
            {modalVisible && <Modal {...modalProps}></Modal>}
        </Page>
    )
}

Index.propTypes = {
    baseCard: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object,
}

export default connect(({
    baseCard, loading
}) => ({
    baseCard, loading
}))(Index);
