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
                    创建时间: &nbsp; &nbsp; 
                    {formatDate(item.createdAt)}
                </Col>
                <Col span={12}> 
                  提现订单号:  &nbsp; &nbsp;
                    {item.orderNo}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    提现金额: &nbsp; &nbsp; 
                    {"￥"+ amountFormat(item.totalFee).toFixed(2)+"元"}
                </Col>
                <Col span={12}>
                    提现费率: &nbsp; &nbsp; 
                    {item.feeRate+"%"}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    单笔结算费: &nbsp; &nbsp; 
                    {"￥"+ amountFormat(item.serviceCharge).toFixed(2)+"元"}
                </Col>
                <Col span={12}>
                    实际到账金额: &nbsp; &nbsp; 
                    {"￥"+ amountFormat(item.payAmount).toFixed(2)+"元"}
                </Col>
            </Row>
          
            <Row {...rowProps}>
            <Col span={12}>
                订单状态:   &nbsp; &nbsp;
                 {item.status==0 ? "待审核" : item.status==1 ? "审核通过" : item.status==2 ? "提交代付中" : item.status==3 ? "成功" : item.status==4 ? "失败" :item.status==5 ? "审核未通过" :"/"}
                </Col>
              
                <Col span={12}>
                    订单状态:  &nbsp; &nbsp; 
                    {item.status ? "可用" : "不可用"}
                </Col>
                
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    代付订单号: &nbsp; &nbsp; 
                    {item.remitOrderNo}
                </Col>
                <Col span={12}>
                    代付请求时间: &nbsp; &nbsp; 
                    {formatDate(item.payTime)}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    交易流水号:&nbsp; &nbsp; 
                    {item.tn}
                </Col>
                <Col span={12}>
                    支付类型:&nbsp; &nbsp; 
                    {item.payType==1 ? "银行手动转帐" :item.payType==2 ? "代付系统" : "/"}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    提现账号:&nbsp; &nbsp; 
                    {item.accountNo}
                </Col>
                <Col span={12}>
                    提现用户:&nbsp; &nbsp; 
                    {item.accountName}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    开户银行:&nbsp; &nbsp; 
                    {item.bankName}
                </Col>
                <Col span={12}>
                   开户支行:&nbsp; &nbsp; 
                    {item.bankSubbranch}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    地址:&nbsp; &nbsp; 
                    {item.province+item.city+item.area}
                </Col>
                <Col span={12}>
                  提现操作所在的地址:&nbsp; &nbsp; 
                    {item.address}
                </Col>
            </Row>
        </Modal>
    );
};

export default modal;
