import React from "react";
import PropTypes from "prop-types";
import { Table, Modal, Card, Row, Col, Icon } from "antd";
import { Link } from "react-router-dom";
import styles from "./List.less";

const { confirm } = Modal;
const { Meta } = Card;

const List = ({
    onDeleteItem,
    onDetailsItem,
    location,
    onAudit,
    onEditItem,
    list,
    ...tableProps
}) => {
    const handleMenuClick = (item) => {
        confirm({
            title: "确定删除吗?",
            onOk() {
                onDeleteItem(item.id);
            }
        });
    };

    const item = list.length>0?list.map(item => {
        if (item) {
            return (
                <Row key={item.id}>
                    <Col xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 24 }}>
                        <div className={styles.cardItem}>
                            <div className={styles.cardInfo}>
                                <div className={styles.title}>
                                    {item.bankName}
                                </div>
                                <div className={styles.No}>
                                    {item.accountNo}
                                </div>
                            </div>
                        </div>
                        <div className={styles.cardHandle}>
                            <span onClick={() => onEditItem(item)}>详情</span>
                            <span onClick={()=>handleMenuClick(item)}>删除</span>
                        </div>
                    </Col>
                </Row>
            );
        } 
    }): <div>暂无银行卡，请添加</div>;;

    return <div className={styles.bankItem}>{item}</div>;
};

List.propTypes = {
    onDetailsItem: PropTypes.func,
    onDeleteItem: PropTypes.func,
    onAudit: PropTypes.func,
    location: PropTypes.object
};

export default List;
