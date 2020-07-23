import React from "react";
import PropTypes from "prop-types";
import { routerRedux } from "dva/router";
import { connect } from "dva";
import { Page } from "components";
import List from "./components/List";
import Filter from "./components/Filter";
import Modal from "./components/Modal"

const ClientUser = ({ location, dispatch, clientUser, loading }) => {
    const { query, pathname } = location;
    const { list, pagination,currentItem,modalVisible } = clientUser;

    const { pageSize } = pagination;
    const filterProps = {
        filter: {
            ...query
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
    };
    const listProps = {
        dataSource: list,
        loading: loading.effects["clientUser/query"],
        pagination,
        location,
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
                type: "clientUser/delete",
                payload: id
            })
        },
        onEditItem(item) {
            dispatch({
                type: "clientUser/showModal",
                payload: {
                    modalType: "update",
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
            dispatch({ type: "clientUser/hideModal" });
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

ClientUser.propTypes = {
    clientUser: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object
};

export default connect(({ clientUser, loading }) => ({ clientUser, loading }))(
    ClientUser
);
