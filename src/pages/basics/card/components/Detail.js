import React from 'react'
import { Modal, Row, Col, Tag } from 'antd'
import { ImageModal } from 'components'
import PropTypes from 'prop-types'
import { bankCardStatus, formatDate } from 'utils'
import styles from '../index.less'

const Detail = ({
    item = {},
    ...modalProps
}) => {

    return (
        <Modal {...modalProps}>
            <div className={styles.detail}>
                <Row gutter={{ xs: 8, sm: 16, md: 24 }} span={24}>
                    {/* <Col xs={24} md={12} className={styles.contentCol}>
                        <div className={styles.label}>代理商:</div>       
                        <div>{item.accountNo}</div>          
                    </Col> */}
                    <Col xs={24} md={12} className={styles.contentCol}>
                        <div className={styles.label}>用户名:</div>
                        <div>{item.accountName}</div>
                    </Col>
                    <Col xs={24} md={12} className={styles.contentCol}>
                        <div className={styles.label}>银行卡号:</div>
                        <div >{item.accountNo}</div>
                    </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24 }} span={24}>
                  
                    <Col xs={24} md={12} className={styles.contentCol}>
                        <div className={styles.label}>银行名:</div>
                        <div >{item.bankName}</div>
                    </Col>
                    <Col xs={24} md={12} className={styles.contentCol}>
                        <div className={styles.label}>银行支行:</div>
                        <div >{item.subbranchNo}</div>
                    </Col>
                </Row>

                <Row gutter={{ xs: 8, sm: 16, md: 24 }} span={24}>
                    <Col xs={24} md={12} className={styles.contentCol}>
                        <div className={styles.label}>银行预留手机号:</div>
                        <div >{item.bankMobile}</div>
                    </Col>
                    <Col xs={24} md={12} className={styles.contentCol}>
                        <div className={styles.label}>开户城市:</div>
                        <div > {item.province}{item.city}</div>
                    </Col>
                </Row>

                {/* <Row gutter={{ xs: 8, sm: 16, md: 24 }} span={24}>
                    <Col xs={24} md={12} className={styles.contentCol}>
                        <div className={styles.label}>银行卡支行:</div>
                        <div >{item.subbranch}</div>
                    </Col>
                    <Col xs={24} md={12} className={styles.contentCol}>
                        <div className={styles.label}>联行行号:</div>
                        <div > {item.subbranchNo} </div>
                    </Col>
                </Row> */}

                {/* <Row gutter={{ xs: 8, sm: 16, md: 24 }} span={24}>
                    <Col xs={24} md={12} className={styles.contentCol}>
                        <div className={styles.label}>银行卡正面照:</div>
                        <div ><ImageModal width={100} height={100} images={item.imageUrl} /></div>
                    </Col>
                    <Col xs={24} md={12} className={styles.contentCol}>
                        <div className={styles.label}>是否对公:</div>
                        <div >{item.isCompany === 1 ? "是" : "否"}</div>
                    </Col>
                </Row> */}
                <Row gutter={{ xs: 8, sm: 16, md: 24 }} span={24}>
                    <Col xs={24} md={12} className={styles.contentCol}>
                        <div className={styles.label}>银行卡状态:</div>
                        <div >{bankCardStatus(item.status)}</div>
                    </Col>
                    <Col xs={24} md={12} className={styles.contentCol}>
                        <div className={styles.label}>创建时间:</div>
                        <div >{formatDate(item.createdAt)}</div>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

Detail.prototype = {
    item: PropTypes.object,
}

export default Detail
