import React from "react";
import { Modal, Row, Col } from "antd";
import { formatDate } from "utils";
import { amountFormat } from "../../../../utils/index";
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
                    用户名: &nbsp; &nbsp;
                    {item.userName}
                </Col>
                <Col span={12}>
                    订单号:&nbsp; &nbsp;
                    {item.orderNo}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    单价:&nbsp; &nbsp;
                    {"￥" +amountFormat(item.price).toFixed(2)+"元"}
                </Col>
                <Col span={12}>
                    实付金额:&nbsp; &nbsp;
                    {"￥" +amountFormat(item.totalFee).toFixed(2)+"元"}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    支付方式:&nbsp; &nbsp;
                    {item.payType === 1 ? "支付宝" : "微信"}
                </Col>
                <Col span={12}>
                    订单状态:&nbsp; &nbsp;
                    {item.status ? "支付成功" : "未支付"}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    支付时间:&nbsp; &nbsp;
                    {formatDate(item.payTime)}
                </Col>
                <Col span={12}>
                    流水号:&nbsp; &nbsp;
                    {item.tn}
                </Col>
            </Row>
          
            <Row {...rowProps}>
                {/* <Col span={12}>
                    优惠金额:
                    {item.rebate.toFixed(2)}
                </Col> */}
                <Col span={12}>
                    地址:
                    {item.province&&item.province + item.city + item.area + item.address}
                </Col>
                <Col span={12}>
                    优惠信息:&nbsp; &nbsp;
                    {item.rebate}
                </Col>
            </Row>
        </Modal>
    );
};

export default modal;
