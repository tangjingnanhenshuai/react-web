import React from "react";
import PropTypes from "prop-types";
import { routerRedux } from "dva/router";
import { connect } from "dva";
import { Page } from "components";
import List from "./components/List";
import Filter from "./components/Filter";
import Modal from "./components/Modal"

const MemberUp = ({ location, dispatch, memberUpgrade, loading }) => {
    const { query, pathname } = location;
    const { list, pagination ,currentItem,modalVisible} = memberUpgrade;

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
        // setFieldsValue(value){
        //     dispatch(routerRedux.push({
        //         pathname: location.pathname,
        //     }))
        // }
    };
    const listProps = {
        dataSource: list,
        loading: loading.effects["memberUpgrade/query"],
        pagination,
        location,
        currentItem,
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
                type: "memberUpgrade/delete",
                payload: id
            })
        },
        onEditItem(item) {
            dispatch({
                type: "memberUpgrade/showModal",
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
            dispatch({ type: "memberUpgrade/hideModal" });
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

MemberUp.propTypes = {
    MemberUp: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object
};

export default connect(({ memberUpgrade, loading }) => ({ memberUpgrade, loading }))(
    MemberUp
);
