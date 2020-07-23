import React from "react";
import PropTypes from "prop-types";
import { routerRedux } from "dva/router";
import { connect } from "dva";
import { Page } from "components";
import List from "./components/List";
import Filter from "./components/Filter";
import Modal from "./components/Modal";

const Share = ({ location, dispatch, loading, list, ...share }) => {
    const { query, pathname } = location;
    const { pagination, currentItem, modalVisible } = share;

    const { pageSize } = pagination;
    const filterProps = {
        filter: {
            ...query
        },
        onFilterChange(value) {
            dispatch(
                routerRedux.push({
                    pathname: location.pathname,
                    query: {
                        ...value,
                        pageNo: 1,
                        pageSize
                    }
                })
            );
        }
    };
   
    const listProps = {
        dataSource: list,
        loading: loading.effects["shareProfit/query"],
        pagination,
        location,
        currentItem,
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
                type: "shareProfit/delete",
                payload: id
            });
        },
        onEditItem(item) {
            dispatch({
                type: "shareProfit/showModal",
                payload: {
                    currentItem: item
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
            dispatch({ type: "shareProfit/hideModal" });
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

Share.propTypes = {
    memberUpgrade: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object
};

export default connect(({ share, loading }) => ({ share, loading }))(Share);
