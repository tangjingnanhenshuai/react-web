/* global document */
import React from "react";
import PropTypes from "prop-types";
import {
    Form,
    Button,
    Row,
    Col,
    Input,
    Select
} from "antd";
const Option = Select.Option

const { Search } = Input;

const ColProps = {
    xs: 24,
    sm: 12,
    style: {
        marginBottom: 16
    }
};

const TwoColProps = {
    ...ColProps,
    xl: 96
};

const Filter = ({
    onFilterChange,
    form: { getFieldDecorator, getFieldsValue,setFieldsValue }
}) => {
    

    const handleSubmit = () => {
        let fields = getFieldsValue();
        onFilterChange(fields);
    };
    const handleReset = () => {
        const fields = getFieldsValue()
        for (let item in fields) {
            if ({}.hasOwnProperty.call(fields, item)) {
                if (fields[item] instanceof Array) {
                    fields[item] = []
                } else {
                    fields[item] = undefined
                }
            }
        }
        setFieldsValue(fields)
        handleSubmit()
    }
    return (
        <Row gutter={24}>
         
            <Col {...ColProps} xl={{ span: 4}} md={{ span: 8 }}>
                {getFieldDecorator('level')(
                    <Select placeholder="用户等级" style={{ width: '100%' }} allowClear={true}>
                        <Option value={0}>普通会员</Option>
                        <Option value={1}>超级会员</Option>
                        <Option value={2}>营销合伙人</Option>
                    </Select>
                )}
            </Col>
            <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
                {getFieldDecorator('authStatus')(
                    <Select placeholder="认证状态" style={{ width: '100%' }} allowClear={true}>
                        <Option value={0}>未提交审核</Option>
                        <Option value={-1}>驳回</Option>
                        <Option value={1}>已认证</Option>
                        <Option value={2}>审核中</Option>
                    </Select>
                )}
            </Col>
            <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
                {getFieldDecorator("userMobile")(
                    <Search placeholder="电话号码" onSearch={handleSubmit} allowClear={true} />
                )}
            </Col>
            <Col
                {...TwoColProps}
                xl={{ span: 6 }}
                md={{ span: 12 }}
                sm={{ span: 12 }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap"
                    }}
                >
                    <div>
                        <Button
                            type="primary"
                            className="margin-right"
                            onClick={handleSubmit}
                        >
                            搜索
                        </Button>
                        <Button onClick={handleReset}>重置</Button>

                    </div>
                </div>
            </Col>
        </Row>
    );
};

Filter.propTypes = {
    onAdd: PropTypes.func,
    form: PropTypes.object,
    filter: PropTypes.object,
    onFilterChange: PropTypes.func
};

export default Form.create()(Filter);
