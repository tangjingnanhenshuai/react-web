/* global document */
import React from "react";
import PropTypes from "prop-types";
import {
    Form,
    Button,
    Row,
    Col,
} from "antd";


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
    onAdd,
    list
}) => {
    const onhandle = () =>{
        onAdd()
    }

    return (
        <Row gutter={24}>
            <Col
                {...TwoColProps}
                xl={{ span: 10 }}
                md={{ span: 24 }}
                sm={{ span: 24 }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap"
                    }}
                >
                    <div>
                        <Button onClick={onhandle} disabled={list.length>0?true:false}>添加</Button>
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
