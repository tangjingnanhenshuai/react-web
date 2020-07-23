/* global document */
import React from "react";
import PropTypes from "prop-types";
import { LocaleProvider } from 'antd';
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
    DatePicker,
} from "antd";
const Option = Select.Option
const { RangePicker } = DatePicker
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
                {getFieldDecorator("payOrderNo")(
                    <Search placeholder="订单编号" onSearch={handleSubmit} />
                )}
            </Col>
            <Col {...ColProps} xl={{ span: 4}} md={{ span: 8 }}>
                {getFieldDecorator('type')(
                    <Select placeholder="分润类型" style={{ width: '100%' }}>
                        <Option value={1}>广告分润</Option>
                        <Option value={2}>大数据分润</Option>
                        {/* <Option value={3}>短信分润</Option> */}
                        {/* <Option value={4}>提现</Option> */}
                        <Option value={5}>会员升级分润 </Option>
                        {/* <Option value={6}>其他 </Option> */}
                    </Select>
                )}
            </Col>
          
            <Col
                {...TwoColProps}
                xl={{ span: 5 }}
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
            <LocaleProvider locale={zh_CN}>
            <Col {...ColProps} xl={{ span: 8 }} md={{ span: 8 }} sm={{ span: 12 }} id="createTimeRangePicker">
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
