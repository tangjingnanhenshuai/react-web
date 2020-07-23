import React from "react";
import { Modal, Row, Col } from "antd";

const modal = ({ ...modalProps }) => {
    const { currentItem } = modalProps;
    const item = currentItem;

    const modalOpts = {
        ...modalProps,
        footer: null,
        title: "订单详情"
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
                    订单号:
                    {item.targetId}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    金额:
                    {"￥"+item.amount.toFixed(2)}
                </Col>
                <Col span={12}>
                    当前余额:
                    {"￥"+item.currentBalance.toFixed(2)}
                </Col>
            </Row>
            <Row {...rowProps}>
            <Col span={12}>
                    创建时间:
                    {item.createdAt}
                </Col>
                <Col span={12}>
                    订单状态:
                    {item.status ? "可用" : "不可用"}
                </Col>
                
            </Row>
            <Row {...rowProps}>
            <Col span={12}>
                    描述:
                    {item.description}
                </Col>
            </Row>
           
        </Modal>
    );
};

export default modal;
