import React from "react";
import PropTypes from "prop-types";
import { routerRedux } from "dva/router";
import { connect } from "dva";
import { Page } from "components";
import List from "./components/List";
import Filter from "./components/Filter";
import Modal from "./components/Modal";
import queryString from "query-string";
import AddModal from "./components/AddModal";

const bankCard = ({ dispatch, bankCard, loading }) => {
    const {
        list,
        pagination,
        currentItem,
        modalVisible,
        addModalVisible,
        isCompanyVisible,
        bankList,
        subbranchList,
        item,
        modalType
    } = bankCard;
    const { query, pathname } = location;
    const { pageSize } = pagination;
    const listProps = {
        list,
        loading: loading.effects["bankCard/query"],
        pagination,
        location,
        onChange(page) {
            dispatch(
                routerRedux.push({
                    pathname,
                    query: {
                        ...query,
                        pageNo: page.current,
                        pageSize: page.pageSize
                    }
                })
            );
        },
        onDeleteItem(id) {
            dispatch({
                type: "bankCard/delect",
                payload: id
            });
        },
        onEditItem(item) {
            dispatch({
                type: "bankCard/showModal",
                payload: {
                    modalType: "update",
                    currentItem: item
                }
            });
        },
        changeStatus(item) {
            dispatch({
                type: "bankCard/changeStatus",
                payload: {
                    item
                }
            });
        },
        changeAuthStatus(item) {
            dispatch({
                type: "bankCard/changeAuthStatus",
                payload: {
                    item
                }
            });
        }
    };
    const modalProps = {
        currentItem,
        visible: modalVisible,
        maskClosable: false,
        wrapClassName: "vertical-center-modal",
        width: "60%",

        onCancel() {
            dispatch({ type: "bankCard/hideModal" });
        }
    };
    const filterProps = {
        list,
        onAdd() {
            dispatch({
                type: "bankCard/showAddModal"
            });
        }
    };
    const addModalProps = {
        isCompanyVisible,item,
        visible: addModalVisible,
        maskClosable: false,
        title: "添加银行卡",
        bankList,
        wrapClassName: "vertical-center-modal",
        width: "60%",
        onCancel() {
            dispatch({
                type: "bankCard/hideAddModal"
            });
        },
        onOk(item) {
            dispatch({
                type: "bankCard/create",
                payload: item
            });
        },
        changeCompany(payload) {
            if(payload){
                dispatch({
                    type: "bankCard/showCompanyVisible"
                });
            }else{
                dispatch({
                    type: "bankCard/hideCompanyVisible"
                });
            }
            
        },
        queryBank(item){
            dispatch({
                type: "bankCard/queryBankList",
                payload:{cardNo:item}
            });
        },
    };
    return (
        <Page inner>
            <Filter {...filterProps} />
            <List {...listProps} />
            {addModalVisible && <AddModal {...addModalProps} />}
            {modalVisible && <Modal {...modalProps} />}
        </Page>
    );
};

bankCard.propTypes = {
    clientAgent: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object
};

export default connect(({ bankCard, loading }) => ({
    bankCard,
    loading
}))(bankCard);
