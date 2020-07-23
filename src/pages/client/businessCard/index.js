import React from "react";
import PropTypes from "prop-types";
import { routerRedux } from "dva/router";
import { connect } from "dva";
import { Page } from "components";
import List from "./components/List";
import Filter from "./components/Filter";
import Modal from "./components/Modal";
import Personal from "./components/Personal";

const ClientBusinessCard = ({ location, dispatch, clientBusinessCard, loading }) => {
    const { query, pathname } = location;
    const { list, pagination, currentItem, modalVisible, PersonalModal, isCompany, SubmitReturn,queryrepeatinfo} = clientBusinessCard;
    
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
        onshowpersonmodal(){
             dispatch({
                 type:"clientBusinessCard/showPersonalModal",
             })
        }
    };
    const listProps = {
        dataSource: list,
        loading: loading.effects["clientBusinessCard/query"],
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
                type: "clientBusinessCard/delete",
                payload: id
            })
        },
        onEditItem(item) {
            dispatch({
                type: "clientBusinessCard/showModal",
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
        loading,
        wrapClassName: "vertical-center-modal",
        width: "60%",
        onCancel() {
            dispatch({ type: "clientBusinessCard/hideModal" });
        }
    };
    const personalProps={
        visible: PersonalModal,
        queryrepeatinfo,
        currentItem,
        loading: loading.effects["clientBusinessCard/query"],
        SubmitReturn,
        isCompany:isCompany,
        maskClosable: false,
        destroyOnClose: true,
        wrapClassName: "vertical-center-modal",
        width: "60%",
        okText:"提交",
        cancelText:"取消",
        onCancel() {
            dispatch({ type: "clientBusinessCard/hidePersonalModal",payload:{queryrepeatinfo:{}}});
        },
         onCompany() {
              dispatch({ type: "clientBusinessCard/showCompany" });
        },
        onpersonal() {
            dispatch({ type: "clientBusinessCard/hideCompany" });
        },
        onCreate(data){
            dispatch({ type:"clientBusinessCard/create",payload:data})
        },
        onaddwebUser(data){
            dispatch({ type:"clientBusinessCard/addwebUser",payload:data})
        },
        onRepeat(data){
             dispatch({
                 type:"clientBusinessCard/mobilecrepeat",
                 payload:data
             })
        },
        onRepeatPersonal(data){
            dispatch({
                type:"clientBusinessCard/queryPersonal",
                payload:data
            })
        },
        ondetetexiangq(data){
            dispatch({
                type:"clientBusinessCard/updateState",
                payload:{queryrepeatinfo:{}}
            })
        }
        
    }
    return (
        <Page inner>
            <Filter {...filterProps} />
            <List {...listProps} />
        {/* 详情 */}
            {modalVisible && <Modal {...modalProps} />}
        {/* 添加客户 */}
            <Personal {...personalProps} />         
        </Page>
    );
};

ClientBusinessCard.propTypes = {
    clientUser: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object
};
export default connect(({ clientBusinessCard, loading }) => ({ clientBusinessCard, loading }))(
    ClientBusinessCard
);
