import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Modal, Radio ,Select,Cascader} from "antd";
import ImageUpload from "../../../../components/FileUpload/ImageUpload";
import city from '../../../../utils/city'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 12
    }
};
const formItemLayoutTwo = {
    labelCol: {
        span: 10
    },
    wrapperCol: {
        span: 8
    }
};
const FormModal = ({
    onOk,
    isCompanyVisible,
    changeCompany,
    item,
    queryBank,
    bankList,
    form: { getFieldDecorator, validateFields, getFieldsValue ,setFieldsValue},
    ...modalProps
}) => {
    const renderFields = () => {
        let fields = getFieldsValue();
        const data = {
            ...item,
            ...fields,
            ...bankList,
            status: 0
        };
        delete data.addressPCA
        delete data.area
        delete data.areaCode
        return data;
    };
    const isCompany = e => {
        if (e.target.value == 1) {
            changeCompany(true);
        } else if (e.target.value == 0) {
            changeCompany(false);
        }
    };
    const changeImg = url => {
        setFieldsValue({ imageUrl: url });
    };
    const onChangeAdress = (value, addressOptions) => {
        if (addressOptions.length !== 0) {
            item.province = addressOptions[0].name;
            item.city = addressOptions[1].name;
            if (addressOptions.length > 2) {
                //东莞等特殊市没有区
                item.area = addressOptions[2].name;
                item.areaCode = addressOptions[2].value;
            }
            item.provinceCode = addressOptions[0].value;
            item.cityCode = addressOptions[1].value;
            item.subbranchNo = null;
            item.subbranch = null;
        }
    };
    const handleOk = () => {
        validateFields(errors => {
            if (errors) {
                return;
            }
            const data = renderFields();
            if(data.isCompany){
                data.bankMobile=""
            }
            onOk(data);
        });
    };
    const queryBankName = () => {
        validateFields(["accountNo"], (errors, value) => {
            if (errors) {
                return;
            }
            queryBank(value.accountNo);
        });
    };
    const modalOpts = {
        ...modalProps,
        onOk: handleOk
    };
    return (
        <Modal {...modalOpts}>
            <Form>
                <FormItem {...formItemLayout} label="开户名">
                    {getFieldDecorator("accountName", {
                        rules: [
                            {
                                required: true,
                                message: "请输入开户名"
                            }
                        ]
                    })(<Input placeholder="请输入开户名" />)}
                </FormItem>

                
                <FormItem {...formItemLayout} label="银行卡号">
                    {getFieldDecorator("accountNo", {
                        rules: [
                            {
                                required: true,
                                pattern: /^(\d{15}|\d{16}|\d{19})$/,
                                message: "银行卡号格式不正确"
                            }
                        ]
                    })(<Input placeholder="请输入银行卡号" onBlur={queryBankName}/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="银行名称">
                    {getFieldDecorator("bankName", {
                        initialValue: bankList.bankName,
                        rules: [
                            {
                                required: true,
                                message: "银行名不能为空"
                            }
                        ]
                    })(<Input placeholder="输入卡号自动检索" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="银行类型">
                    {getFieldDecorator("bankType",{
                        initialValue: bankList.bankType,
                    })(
                        <Input placeholder="请输入银行类型" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="开户城市">
                    {getFieldDecorator("addressPCA", {
                        rules: [
                            {
                                required: true,
                                message: "请选择开户城市"
                            }
                        ]
                    })(
                        <Cascader
                            options={city}
                            placeholder="请选择开户城市"
                            onChange={onChangeAdress}
                        />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="银行地址">
                    {getFieldDecorator("address")(
                        <Input placeholder="请输入银行地址" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="银行卡支行">
                    {getFieldDecorator("subbranch")(
                        <Input placeholder="请输入支行" />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="是否对公">
                    {getFieldDecorator("isCompany", {
                        initialValue: 0,
                        rules: [
                            {
                                required: true
                            }
                        ]
                    })(
                        <RadioGroup onChange={isCompany}>
                            <Radio value={0}>对私账户</Radio>
                            <Radio value={1}>对公账户</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                {!isCompanyVisible && (
                    <FormItem {...formItemLayout} label="预留手机号">
                        {getFieldDecorator("bankMobile", {
                            rules: [
                                {
                                    required: true,
                                    len: 11,
                                    pattern: /^1[345789]\d{9}$/,
                                    message: "预留手机号格式不正确"
                                }
                            ]
                        })(<Input placeholder="请输入银行卡预留手机号" />)}
                    </FormItem>
                )}
                {isCompanyVisible && (
                    <FormItem {...formItemLayout} label="公司营业执照编号">
                        {getFieldDecorator("licenseNo", {
                            rules: [
                                {
                                    required: true,
                                    message: "请输入公司营业执照编号"
                                }
                            ]
                        })(<Input placeholder="请输入公司营业执照编号" />)}
                    </FormItem>
                )}
                {isCompanyVisible && (
                    <FormItem
                        {...formItemLayoutTwo}
                        label="银行卡正面照片或开户许可证正面照片"
                    >
                        {getFieldDecorator("imageUrl", {
                            rules: [
                                {
                                    required: true
                                }
                            ]
                        })(
                            <ImageUpload
                                handleSubmit={changeImg}
                                okText="上传正面照片"
                            />
                            // <Input placeholder="请输入图片地址(暂时)" />
                        )}
                    </FormItem>
                )}
            </Form>
        </Modal>
    );
};

FormModal.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    item: PropTypes.object,
    onOk: PropTypes.func,
    changeConsignor: PropTypes.func
};

export default Form.create()(FormModal);
