import React from "react";
import { Modal, Icon, Row, Col, Switch, Card, Button } from "antd";
import styles from "./List.less";
import { formatDate } from "utils";
import { ImageModal } from "components";

const modal = ({ ...modalProps }) => {
    const { currentItem } = modalProps;
    const item = currentItem;

    const modalOpts = {
        ...modalProps,
        footer: null,
        title: "银行卡详情"
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
                    户名:
                    {item.accountName}
                </Col>
                <Col span={12}>
                    账户:
                    {item.accountNo}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    所属银行:
                    {item.bankName}
                </Col>
                <Col span={12}>
                    银行类型:
                    {item.bankType}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    预留电话:
                    {item.bankMobile}
                </Col>
                <Col span={12}>
                    开户省行:
                    {item.province}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    城市:
                    {item.city}
                </Col>
                <Col span={12}>
                    银行卡地址:
                    {item.address}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    银行卡支行:
                    {item.subbranch}
                </Col>
                <Col span={12}>
                    联行行号:
                    {item.subbranchNo}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    账户类型:
                    {item.isCompany ? "对公账户" : "对私账户"}
                </Col>
                <Col span={12}>
                    账户状态:
                    {item.status == 0
                        ? "待审核"
                        : item.status == 1
                            ? "已审核"
                            : "驳回"}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    公司营业执照编号:
                    {item.isCompany == 1 ? item.licenseNo : "无"}
                </Col>
                
            </Row>

            <Row {...rowProps}>
                <Col span={12}>
                    照片:
                    {item.isCompany == 1 ? (
                        <ImageModal width={200} images={item.imageUrl} />
                    ) : (
                        "无"
                    )}
                </Col>
            </Row>
        </Modal>
    );
};

export default modal;
