import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Skeleton, Row, Col ,Tabs} from "antd";
import { Page } from "components";
import  styles from "./index.less"
import Myvideo from "./components/myvideo"
const TabPane = Tabs.TabPane;
const Home = ({ home, dispatch, loading }) => {
    const { trendData, agentAccount, modalVisible, userdataCount, userData, tendencyChat, rankingData, incomeData, monthData, bankName,} = home;
    const businessProps = {
        userData,
        trendData,
        agentAccount,
        userdataCount,
        incomeData,
        monthData,
        showModal() {
            dispatch({
                type: "home/showModal"
            });
        }
    };


    return (
        <div>
           <Myvideo />
        </div>
    );
};

Home.propTypes = {
    dispatch: PropTypes.func,
    home: PropTypes.object,
    loading: PropTypes.object
};
export default connect(({ home, loading }) => ({ home, loading }))(Home);
