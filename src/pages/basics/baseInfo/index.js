import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { routerRedux } from "dva/router";
import { Page } from "components";
import List from "./components/List";
import styles from "./components/List.less"
const baseInfo = ({  loading, baseInfo }) => {
    const { info } = baseInfo;
    const listProps = {
        info,
        loading: loading.effects["baseInfo/query"],
    };
    return (
        <Page inner>
            <h3 className={styles.title}>基本信息</h3>
            <List {...listProps} />
        </Page>
    );
};
baseInfo.propTypes = {
    baseInfo: PropTypes.object,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    loading: PropTypes.object
};
export default connect(({ baseInfo, loading }) => ({
    baseInfo,
    loading
}))(baseInfo);
