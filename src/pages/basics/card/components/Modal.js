import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Cascader, Icon, Row, Col, Select, Button, message, Radio, Modal } from 'antd'
import { city } from '../../../../utils/city'
import PicturesWall from '../../../../components/FileUpload/PicturesWall'


const FormItem = Form.Item

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 12,
    },
}
const FormModal = ({
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        getFieldValue,
        resetFields,
        setFieldsValue,
    },
    ...modalProps
}) => {
    const {
        onOk, bankNameQuery, subbranchList, updateItem, item, getSubbranchByBankName, queryBankName,
    } = modalProps
    // console.log(item);
    const handleOk = () => {
        validateFields((errors, values) => {
            console.log(errors,values.imageUrl[0])
            if (errors) {
                return
            }
            const data = {
                ...item,
                ...updateItem,
                ...values,
                // imageUrl: values.imageUrl ? values.imageUrl.join(',') : values.imageUrl, 
                imageUrl: values.imageUrl[0],
                isCompany: 0,
                status: 0
            }
            delete data.subbranchLabelInValue
            delete data.addressPCA
            // console.log(data)
            onOk(data)
        })
    }

    const changeImg = (imageUrl, url) => {
        setFieldsValue({ [imageUrl]: url })
    }

    const getBankName = () => {
        validateFields(["accountNo"], (errors, value) => {
            if (errors) {
                return
            }
            queryBankName(value.accountNo)
        })
    }
    const onChangeAddress = (value, addressOptions) => {
        if (addressOptions.length !== 0) {
            updateItem.province = addressOptions[0].name
            updateItem.city = addressOptions[1].name
            updateItem.provinceCode = addressOptions[0].value
            updateItem.cityCode = addressOptions[1].value
            // updateItem.subbranchNo = null
            // updateItem.subbranch = null
            validateFields(["bankName"], (errors, value) => {
                if (errors) {
                    return
                }
                getSubbranchByBankName({ bankName: value.bankName, provinceName: updateItem.province, cityName: updateItem.city,provinceCode: updateItem.provinceCode,cityCode:updateItem.cityCode })
            })
        }
    }
     // key={subbranch.bankNumber}
    const subbranchSelectOptions = subbranchList.map((subbranch,i) => {
        return <Select.Option value={subbranch.bankName} key={i} >{subbranch.bankName}</Select.Option>
    })
    const onChangeSubbranch = (key) => {
        const bankSubbranchListNew = subbranchList.filter((bankSubbranch) => { return bankSubbranch.bank_number === key })
        updateItem.subbranchNo = key
        if (bankSubbranchListNew && bankSubbranchListNew[0]) {
            updateItem.subbranch = bankSubbranchListNew[0].bank_name
        }
    }
    //以数组形式--编辑图片上传
    const imageArr = []
    item.imageUrl && imageArr.push(item.imageUrl)

    const modalOpts = {
        ...modalProps,
        onOk: handleOk,
    }
    return (
        <Modal {...modalOpts}>
            <Form layout="horizontal">
                <FormItem
                    {...formItemLayout}
                    label="开户名"
                >
                    {getFieldDecorator('accountName', {
                        initialValue: item.accountName,
                        rules: [
                            {
                                required: true,
                                message: '请输入开户名',
                            }
                        ],
                    })(
                        <Input placeholder="请输入开户名" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="银行卡号"
                >
                    {getFieldDecorator('accountNo', {
                        initialValue: item.accountNo,
                        rules: [
                            {
                                required: true,
                                pattern: /^\d{14,23}$/,
                                message: '银行卡号格式不正确'
                            }
                        ],
                    })(
                        <Input placeholder="请输入银行卡号" onBlur={getBankName} />
                    )}
                </FormItem>
                <FormItem label="银行卡正面照片"  {...formItemLayout}>
                    {getFieldDecorator('imageUrl', {
                        initialValue: imageArr,
                        rules: [
                            {
                                required: true,
                                message: '请上传银行卡正面照片'
                            },
                        ],
                    })(
                        <PicturesWall
                            handleSubmit={changeImg}
                            text="上传银行卡正面照片"
                            length={1}
                            imgName="imageUrl"
                            fileList={imageArr}
                        />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="银行名称">
                    {getFieldDecorator('bankName', {
                        initialValue: bankNameQuery.bankName || item.bankName,
                        rules: [
                            {
                                required: true,
                                message: '银行名不能为空'
                            }
                        ],
                    })(
                        <Input placeholder="请输入银行名称" />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="开户城市"
                >
                    {getFieldDecorator('addressPCA', {
                        initialValue: item.provinceCode && [item.provinceCode, item.cityCode],
                        rules: [
                            {
                                required: true,
                                message: '请选择开户城市',
                            }
                        ],
                    })(
                        <Cascader options={city(2)} placeholder="请选择开户城市" onChange={onChangeAddress} />
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="银行卡支行"
                >
                    {getFieldDecorator('subbranchLabelInValue', {
                        initialValue: item.subbranch,
                        rules: [
                            {
                                required: true,
                                message: '请选择银行卡支行',
                            }
                        ],
                    })(
                        <Select onChange={onChangeSubbranch} showSearch={true} optionFilterProp="children" placeholder="请选择银行卡支行">
                            {subbranchSelectOptions}
                        </Select>
                    )}
                </FormItem>
                {/* <FormItem
                    {...formItemLayout}
                    label="联行行号"
                >
                    {getFieldDecorator('subbranchNo', {
                        // initialValue: item.subbranchNo,
                        rules: [
                            {
                                required: true,
                                message: '请选择支行',
                            }
                        ],
                    })(
                        <Input placeholder="请输入联行行号" />
                    )}
                </FormItem> */}
                {/* <FormItem label="法人姓名" {...formItemLayout}>
                    {getFieldDecorator('userName', {

                        rules: [
                            {
                                required: true,
                                message: '请输入法人姓名',
                            },
                        ],
                    })(<Input placeholder="请输入法人姓名" />)}
                </FormItem>
                <FormItem label="法人身份证号" {...formItemLayout}>
                    {getFieldDecorator('userIdNumber', {

                        rules: [
                            {
                                required: true,
                                message: '请输入法人身份证号',
                            },
                        ],
                    })(<Input placeholder="请输入法人身份证号" />)}
                </FormItem> */}
                <FormItem
                    {...formItemLayout}
                    label="预留手机号"
                >
                    {getFieldDecorator('bankMobile', {
                        initialValue: item.bankMobile,
                        rules: [
                            {
                                required: true,
                                len: 11,
                                pattern: /^1[345789]\d{9}$/,
                                message: '预留手机号格式不正确!',
                            },
                        ],
                    })(
                        <Input placeholder='请输入银行卡预留手机号' />
                    )}
                </FormItem>
            </Form>
        </Modal>
    )
}

FormModal.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    item: PropTypes.object,
    onOk: PropTypes.func,
}

export default Form.create()(FormModal)
