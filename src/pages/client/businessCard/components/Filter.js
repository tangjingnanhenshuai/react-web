/* global document */
import React from "react";
import PropTypes from "prop-types";
import {
    Form,
    Button,
    Row,
    Col,
    DatePicker,
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
    onshowpersonmodal,
    filter,
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
    const showPersonalModal=()=>{
        onshowpersonmodal()
    }
    return (
        <Row gutter={24}>
            <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
                {getFieldDecorator("mobile")(
                    <Search placeholder="电话号码" onSearch={handleSubmit} />
                )}
            </Col>
         
            <Col {...ColProps} xl={{ span: 3 }} md={{ span: 8 }}>
                {getFieldDecorator('personalAuthStatus')(
                    <Select placeholder="个人认证" style={{ width: '100%' }} allowClear={true}>
                        <Option value={-1}>驳回</Option>
                        <Option value={0}>未认证</Option>
                        {/* <Option value={0}>个人认证</Option> */}
                        {/* <Option value={1 || 2 || -1}>企业认证</Option> */}
                        <Option value={1}>已认证</Option>
                        <Option value={2}>审核中</Option>
                    </Select>
                )}
            </Col>
            <Col {...ColProps} xl={{ span: 3 }} md={{ span: 8 }}>
                {getFieldDecorator('companyAuthStatus')(
                    <Select placeholder="企业认证" style={{ width: '100%' }} allowClear={true}>
                        <Option value={-1}>驳回</Option>
                        <Option value={0}>未认证</Option>
                        {/* <Option value={0}>个人认证</Option> */}
                        {/* <Option value={1 || 2 || -1}>企业认证</Option> */}
                        <Option value={1}>已认证</Option>
                        <Option value={2}>审核中</Option>
                    </Select>
                )}
            </Col>
            <Col
                {...TwoColProps}
                xl={{ span: 10 }}
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
            <Col  xl={{ span: 4 }}  md={{ span: 12 }}  sm={{ span: 12 }}>
            <Button onClick={showPersonalModal}
                    style={{marginLeft:"20px"}}
                    >添加客户</Button>
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
