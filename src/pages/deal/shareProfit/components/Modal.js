import React from "react";
import { Modal, Row, Col ,Tag} from "antd";
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
                 创建时间: &nbsp;&nbsp;
                    {formatDate(item.createdAt)}
                </Col>
                <Col span={12}>
                来源用户:&nbsp;&nbsp;
                    {item.fromUserName}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                订单号:&nbsp;&nbsp;
                {item.payOrderNo}
                </Col>
                <Col span={12}>
                消费金额:&nbsp;&nbsp;
                {"￥" +amountFormat(item.payAmount)+'元'}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                渠道类型:&nbsp;&nbsp;
                    {item.channel}
                </Col>
                <Col span={12}>
                分润比例:&nbsp;&nbsp;
                    {item.proportion+"%"}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                分润金额:&nbsp;&nbsp;
                    {"￥"+amountFormat(item.splitAmount)+'元'}
                </Col>
                <Col span={12}>
                来源用户编号:&nbsp;&nbsp;
                    {item.fromUid}
                </Col>
            </Row>
        </Modal>
    );
};

export default modal;
