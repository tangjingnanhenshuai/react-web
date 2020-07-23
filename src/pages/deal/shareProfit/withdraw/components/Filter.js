/* global document */
import React from "react";
import PropTypes from "prop-types";

import { FilterItem } from 'components'
import moment from 'moment'
import zh_CN from 'antd/lib/locale-provider/zh_CN';

import 'moment/locale/zh-cn';
import {
    Form,
    Button,
    Row,
    Col,
    Input,
    Select,
    LocaleProvider,
    DatePicker,
} from "antd";
const { RangePicker } = DatePicker

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
    filter,
    form: { getFieldDecorator, getFieldsValue,setFieldsValue }
}) => {
    const handleFields = (fields) => {
        const { createTime } = fields
        if (createTime.length) {
            fields.startTime = createTime[0].format('YYYY-MM-DD HH:mm:ss')
            fields.endTime = createTime[1].format('YYYY-MM-DD HH:mm:ss')
        }
        delete fields.createTime
        return fields
    }

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
    const handleChange =(key,value)=>{
        let fields = getFieldsValue()
        fields[key]=value
        fields=handleFields(fields)
        onFilterChange(fields)
   }
   const { userName, type } = filter
   let initialCreateTime = []
   if (filter.startTime) {
       initialCreateTime[0] = moment(filter.startTime)
   }
   if (filter.endTime) {
       initialCreateTime[1] = moment(filter.endTime)
   }
    return (
        <Row gutter={24}>
            <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
                {getFieldDecorator("userName")(
                    <Search placeholder="搜索用户" onSearch={handleSubmit} allowClear={true} />
                )}
            </Col>
            <Col {...ColProps} xl={{ span: 4}} md={{ span: 8 }}>
                {getFieldDecorator('status')(
                    <Select placeholder="订单状态" style={{ width: '100%' }} allowClear={true}>
                        <Option value={0}>不可用</Option>
                        <Option value={1}>可用</Option>
                    </Select>
                )}
            </Col>
            <LocaleProvider locale={zh_CN}>
            <Col {...ColProps} xl={{ span: 6 }} md={{ span: 8 }} sm={{ span: 12 }} id="createTimeRangePicker">
                <FilterItem label="创建时间">
                    {getFieldDecorator('createTime', { initialValue: initialCreateTime })(<RangePicker
                        style={{ width: '100%' }}
                        allowClear={true} showToday={true}
                        onChange={handleChange.bind(null, 'createTime')}
                        getCalendarContainer={() => {
                            return document.getElementById('createTimeRangePicker')
                        }}
                    />)}
                </FilterItem>
            </Col>
            </LocaleProvider>
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
