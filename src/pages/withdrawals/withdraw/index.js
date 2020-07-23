import React from "react";
import PropTypes from "prop-types";
import { routerRedux } from "dva/router";
import { connect } from "dva";
import { Page } from "components";
import queryString from "query-string";

import List from "./components/List";
import Filter from "./components/Filter";
import Modal from "./components/Modal"

const Table = ({ location, dispatch, withdrawals, loading }) => {
    const { query, pathname } = location;
    const { list, pagination, currentItem, modalVisible } = withdrawals;
    const { pageSize }=pagination;
    const filterProps={
        filter:{...query},
        onFilterChange(value){
            dispatch(routerRedux.push({
               pathname:location.pathname,
               query:{
                   ...value,
                   pageNo:1,
                   pageSize,
               },
            }))
        },
    };
    const listProps={
        dataSource:list,
        loading:loading.effects["withdrawals/query"],
        pagination,
        location,
        currentItem,
        onChange(page){
            dispatch(routerRedux.push({
                pathname,
                query:{
                    ...query,
                    pageNo:page.current,
                    pageSize:page.pageSize,
                },
            }))
        },
        onDeleteItem(id){
            dispatch({
                type: "withdrawals/delete",
                payload: id
            })
        },
        onEditItem(item) {
            dispatch({
                type: "withdrawals/showModal",
                payload: {
                    modalType: "update",
                    currentItem: item
                }
            });
        }
    };
    const modalProps={
         currentItem,
         visible: modalVisible,
         maskClosable: false,
         wrapClassName:"vertical-center-modal",
         width:"60%",
         onCancel(){
             dispatch({type:"withdrawals/hideModal"})
         }
    };
 

    return (
        <Page inner>
             <Filter {...filterProps} />
            <List {...listProps} />
            {modalVisible && <Modal {...modalProps} />}
        </Page>
    );
};

Table.propTypes = {
    Table: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object
};

export default connect(({ withdrawals, loading }) => ({
    withdrawals,
    loading
}))(Table);
