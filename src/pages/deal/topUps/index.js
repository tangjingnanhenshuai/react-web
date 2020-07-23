import React from "react";
import PropTypes from "prop-types";
import { routerRedux } from "dva/router";
import { connect } from "dva";
import { Page } from "components";
import List from "./components/List";
import Filter from "./components/Filter";
import Modal from "./components/Modal"

const TopUpsgrade=({location,dispatch,topupsModel,loading})=>{
    const {query,pathname}=location;
    const {list,pagination,currentItem,modalVisible}=topupsModel;
    const {pageSize}=pagination;
    const filterProps={
        filter:{...query},
        onFilterChange(value){
            dispatch(routerRedux.push({
                pathname:location.pathname,
                query:{
                    ...value,
                    pageNo: 1,
                    pageSize,
                },
            }))
        },
    };
   const listProps={
       dataSource:list,
       loading: loading.effects["topupsModel/query"],
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
            type: "topupsModel/delete",
            payload: id
        })
    },
    onEditItem(item) {
        dispatch({
            type: "topupsModel/showModal",
            payload: {
                currentItem: item
            }
        });
    }
   };
   const modalProps={
       currentItem,
       visible:modalVisible,
       maskClosable:false,
       wrapClassName:"vertical-center-modal",
       width:"60%",
       onCancel(){
           dispatch({type:"topupsModel/hideModal"});
       }
   };
   return (
       <Page inner>
           <Filter {...filterProps} />
            <List {...listProps} />
            {modalVisible && <Modal {...modalProps} />}
       </Page>
   )
};
TopUpsgrade.propTypes={
    TopUpsgrade:PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object
};


export default connect(({topupsModel,loading})=>({topupsModel,loading}))(
    TopUpsgrade
);
    
