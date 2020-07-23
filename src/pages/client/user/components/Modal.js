import React from "react";
import { Modal, Row, Col } from "antd";
import moment from "moment";

const formatDate = (date, str) => {
    if (!date) {
        return "";
    }
    return moment(date).format(str ? str : "YYYY-MM-DD HH:mm:ss");
};

const modal = ({ ...modalProps }) => {
    const { currentItem } = modalProps;
    const item = currentItem;

    const modalOpts = {
        ...modalProps,
        footer: null,
        title: "用户详情"
    };

    const rowProps = {
        gutter: 8,
        style: {
            marginTop: 10,
            paddingLeft: 70,
            paddingRight: 70
        }
    };

    return (
        <Modal {...modalOpts}>
            <Row {...rowProps}>
                <Col span={12}>
                    用户名: &nbsp;&nbsp;
                    {item.userName}
                </Col>
                <Col span={12}>
                    用户手机号: &nbsp;&nbsp;
                    {item.userMobile}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    用户状态: &nbsp;&nbsp;
                    {item.status == 1 ? "正常" : "禁用"}
                </Col>
                <Col span={12}>
                    用户等级: &nbsp;&nbsp;
                    {item.level == 0 ? "普通会员" : item.level == 1 ? "超级会员" : item.level == 2 ? "营销合伙人" : "/"}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    地区: &nbsp;&nbsp;
                    {item.province + item.city || "未知"}
                </Col>
                <Col span={12}>
                    行业: &nbsp;&nbsp;
                    {item.industry||"无"}
                </Col>
            </Row>
            
            <Row {...rowProps}>
                <Col span={12}>
                    注册时间:   &nbsp;&nbsp;
                    {formatDate(item.createdAt) || "无"}
                </Col>
                <Col span={12}>
                    会员升级时间:   &nbsp;&nbsp;
                    {formatDate(item.memberUpgradeTime)||"无"}
                </Col>
              
            </Row>
        </Modal>
    );
};

export default modal;
