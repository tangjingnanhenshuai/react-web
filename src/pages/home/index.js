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
    const list = [ { id: 1,
        name: '高德地图自定义地图样式区域搜索',
        url: 'http://localhost:3001/video/qysy.mp4',
        img: 'http://localhost:3001/img/qysy.png',
        date: '2020-7-28' },
      { id: 2,
        name: '地盘倾斜转动自动手动点击切换展示内容',
        url: 'http://localhost:3001/video/sjgk.mp4',
        img: 'http://localhost:3001/img/sjgk.png',
        date: '2020-7-28' },
      { id: 3,
        name: '条幅滚动大屏',
        url: 'http://localhost:3001/video/tfgddp.mp4',
        img: 'http://localhost:3001/img/tfgddp.png',
        date: '2020-7-28' },
      { id: 4,
        name: '飞线滑动高亮中国地图',
        url: 'http://localhost:3001/video/china.mp4',
        img: 'http://localhost:3001/img/china.png',
        date: '2020-7-28' },
      { id: 5,
        name: '实时全省税收情况、滚动数字、地区选中高亮',
        url: 'http://localhost:3001/video/sskjj.mp4',
        img: 'http://localhost:3001/img/sskjj.png',
        date: '2020-7-28' },
      { id: 6,
        name: '增长趋势概况大屏',
        url: 'http://localhost:3001/video/zzqs.mp4',
        img: 'http://localhost:3001/img/zzqs.png',
        date: '2020-7-28' },
      { id: 7,
        name: '地图带重点坐标，地图下钻、企业下钻',
        url: 'http://localhost:3001/video/zdsy.mp4',
        img: 'http://localhost:3001/img/zdsy.png',
        date: '2020-7-28' },
      { id: 8,
        name: '地图数量用颜色深度区分、左右联动可下钻',
        url: 'http://localhost:3001/video/fpdsj.mp4',
        img: 'http://localhost:3001/img/fpdsj.png',
        date: '2020-7-28' },
      { id: 9,
        name: '办税大厅实时数据',
        url: 'http://localhost:3001/video/bsdt.mp4',
        img: 'http://localhost:3001/img/bsdt.png',
        date: '2020-7-28' },
      { id: 10,
        name: '大屏项目效果总览',
        url: 'http://localhost:3001/video/xgzl.mp4',
        img: 'http://localhost:3001/img/xgzl.png',
        date: '2020-7-28' } ]
    const test={
            img: require( "../../../public/public/img/card.png")
    }

    return (
       
        <div className={styles.zbox}>
            <h1> 数据可视化大屏项目 </h1>
            {
                  list.map(v=>{
                    return <div key={v.id} className={styles.videobox}> <Myvideo {...v} /> </div> 
                })
            }
          
        </div>
    );
};

Home.propTypes = {
    dispatch: PropTypes.func,
    home: PropTypes.object,
    loading: PropTypes.object
};
export default connect(({ home, loading }) => ({ home, loading }))(Home);
