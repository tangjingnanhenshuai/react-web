import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Modal, Radio, Cascader} from "antd";
import PicturesWall from '../../../../components/FileUpload/FileUpload2'
import city from "../../../../utils/city"


// import styles from "./modal.less";
// import { amountFormat } from "../../../utils/index";
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 12
    }
};

const personal = ({
    // onOk,
    // onCode,
    form: { getFieldDecorator, validateFields, getFieldsValue, setFieldsValue, resetFields},
    queryrepeatinfo,
    onRepeat,
    // ...modalProps
    onRepeatPersonal,
    ondetetexiangq,
    SubmitReturn,
    onCreate,
    onaddwebUser,
    onCompany,
    onpersonal,
    // isCompany,
    ...personalProps,
}) => {
    // const renderFields = () => {
    //     let fields = getFieldsValue();
    //     const data = {
    //         ...fields,
    //         status: 0
    //     };
    //     return data;
    // };
    React.useEffect(()=>{
        if(queryrepeatinfo && queryrepeatinfo.idBackImage !=undefined){
            setFieldsValue({idBackImage:queryrepeatinfo.idBackImage})
          }else{
            setFieldsValue({idBackImage:undefined})
          }
          if(queryrepeatinfo&& queryrepeatinfo.idFrontImage !=undefined){
            setFieldsValue({idFrontImage:queryrepeatinfo.idFrontImage})
          }else{
            setFieldsValue({idFrontImage:undefined})
          }
          if(queryrepeatinfo && queryrepeatinfo.licenseImage !=undefined){
            setFieldsValue({licenseImage:queryrepeatinfo.licenseImage})
          }else{
            setFieldsValue({licenseImage:undefined})
          }
          setProvince(queryrepeatinfo.province?queryrepeatinfo.province:undefined)
          setProvincec(queryrepeatinfo.provinceCode?queryrepeatinfo.provinceCode:undefined)
          setCitys(queryrepeatinfo.city?queryrepeatinfo.city:undefined)
          setCitysc(queryrepeatinfo.cityCode?queryrepeatinfo.cityCode:undefined)
          setQu(queryrepeatinfo.area?queryrepeatinfo.area:undefined)
          setQuc(queryrepeatinfo.areaCode?queryrepeatinfo.areaCode:undefined)
    },[queryrepeatinfo])

   const onChange=(e)=>{
    ondetetexiangq()
    resetFields()
       if (e.target.value==1){
           setisCompany(true)
       } else if (e.target.value == 0){
        setisCompany(false)
       }
    }
    let [province,setProvince]=React.useState()
    let [citys,setCitys]=React.useState()
    let [area,setQu]=React.useState()
    let [provinceCode, setProvincec] = React.useState()
    let [cityCode, setCitysc] = React.useState()
    let [areaCode, setQuc] = React.useState()
    let imageArr = []
    const changeImg = (imageUrl, url)=>{
        setFieldsValue({[imageUrl]: url[0] })
    }
    const handleFields=(data)=>{
        let newdata=data
        const { startTime, endTime, money, provinces} = data
      if(startTime){
          newdata.startTime=moment(startTime).format('YYYY-MM-DD')
      }
        if(endTime){
          newdata.endTime=moment(endTime).format('YYYY-MM-DD')
      }
        if (money){
            newdata.money=(money*10000).toFixed(2)
        }
        if (provinces){
            newdata.province = province
            newdata.provinceCode = provinceCode
            newdata.city = citys
            newdata.cityCode = cityCode
            newdata.area = area
            newdata.areaCode = areaCode
            delete newdata.provinces
        }
        return newdata
    }
    const onChangeAddress =(e,value)=>{
        setProvince(value[0].name)
        setProvincec(value[0].id)
        setCitys(value[1].name)
        setCitysc(value[1].id)
        setQu(value[2].name)
        setQuc(value[2].id)
    }
    const handleOk=()=>{
         validateFields(errors => {
            if (errors) {
                return;
            }
            const data = getFieldsValue();
            if (data.isCompanyCertification === 0) {
                const fields = handleFields(data)
              const {userName,mobile,isCompanyCertification,...qita}=fields
                 const senddata={userName,isCompanyCertification,mobile,personalCertification:{...qita}}
                 onaddwebUser(senddata)
            } else {
                const fields = handleFields(data)
                const {userName,mobile,isCompanyCertification,...qita}=fields
                   const senddata={ userName,   mobile,isCompanyCertification, companyCertification:{...qita}    }
                   onaddwebUser(senddata)
            }
        });
     }
     const infoQuery =()=>{
        const data = getFieldsValue().mobile
        const a = /^1[345789]\d{9}$/
        const re = new RegExp(a);
        if( re.test(data)==true ){
             const datas={mobile:data}
             getFieldsValue().isCompanyCertification==0?onRepeatPersonal(datas): onRepeat(datas)
        }
    }
    const modalOpts = {
        ...personalProps,
        onOk: handleOk,
        title: "添加客户"
    };
    let [isCompany,setisCompany]=React.useState(false)
    return (
        <Modal {...modalOpts}>
            <Form>
                 <FormItem {...formItemLayout} label= {isCompany ? "法人姓名" :"用户姓名"} >
                    {getFieldDecorator("userName", {
                        initialValue:queryrepeatinfo.userName,
                        rules: [
                            {
                                required: true,
                                message: isCompany ? "法人姓名" :"用户姓名"
                            }
                        ]
                    })(    
                        <Input placeholder= {isCompany ? "法人姓名" :"用户姓名"} /> 
                        )}
                </FormItem>
            <FormItem {...formItemLayout} label="手机号">
                    {getFieldDecorator("mobile", {
                        rules: [
                            {
                                required: true,
                                len: 11,
                                pattern: /^1[345789]\d{9}$/,
                                message: '预留手机号格式不正确!',
                            }
                        ]
                    })(<Input placeholder="手机号码" onBlur={infoQuery} />)}
                </FormItem>

                <FormItem {...formItemLayout} label="认证类型">
                    {getFieldDecorator("isCompanyCertification", {
                        initialValue:isCompany?1:0,
                        rules: [
                            {
                                required: true,
                                message: "选择认证类型",
                            }
                        ]
                    })(<RadioGroup onChange={onChange}>
                        <Radio value={0}>个人认证</Radio>
                        <Radio value={1}>企业认证</Radio>
                    </RadioGroup>)}
                </FormItem>
                {isCompany && <FormItem {...formItemLayout} label="公司名称">
                    {getFieldDecorator("name", {
                            initialValue:queryrepeatinfo.name||undefined,
                        rules: [
                            {
                                required: true,
                                message: "请输入公司名称",
                            }
                        ]
                    })(
                        <Input placeholder="公司名称"  disabled={queryrepeatinfo.name?true:false}/>
                    )}
                </FormItem>}
                {isCompany && <FormItem {...formItemLayout} label="所属行业">
                    {getFieldDecorator("industry", {
                      initialValue:queryrepeatinfo.industry||undefined
                    })(
                        <Input placeholder="所属行业" />
                    )}
                </FormItem>}
                {isCompany && <FormItem {...formItemLayout} label="所在地区">
                    {getFieldDecorator("provinces", {
                    initialValue:queryrepeatinfo.provinceCode?[queryrepeatinfo.provinceCode, queryrepeatinfo.cityCode,queryrepeatinfo.areaCode]:undefined,
                    })(
                        <Cascader options={city} placeholder='所在地区'  onChange={onChangeAddress}  allowClear={false} disabled={queryrepeatinfo.provinceCode?true:false} />
                    )}
                </FormItem>}
                {isCompany && <FormItem {...formItemLayout} label="详细地址">
                    {getFieldDecorator("address", {
                       initialValue:queryrepeatinfo.address||undefined,
                    })(
                        <Input placeholder="详细地址"   disabled={queryrepeatinfo.address?true:false}/>
                    )}
                </FormItem>}
              <FormItem {...formItemLayout} label= {isCompany ? "法人证件号码" : "证件号"}  >
                    {getFieldDecorator("idNumber", {
                        initialValue:queryrepeatinfo.idNumber||undefined,
                        rules: [
                            {
                                required: true,
                                  message: "请输入正确的证件号码",
                                  }
                         ]
                    })(<Input placeholder={isCompany ? "法人证件号码" : "用户身份证号码"} key={queryrepeatinfo.idNumber} disabled={queryrepeatinfo.idNumber?true:false} />)}
                </FormItem>
                {isCompany && <FormItem {...formItemLayout} label="营业执照号">
                    {getFieldDecorator("licenseNo", {
                        initialValue:queryrepeatinfo.licenseNo||undefined,
                        rules: [
                            {
                                required: true,
                                message: "请输入营业执照号",
                            }
                        ]
                    })(  
                        <Input placeholder="营业执照编号" disabled={queryrepeatinfo.licenseNo?true:false} />
                    )}
                </FormItem>}
                {isCompany && <FormItem {...formItemLayout} label="营业执照">
                    {getFieldDecorator("licenseImage", {
                        rules: [
                            {
                                required: true,
                                message: "请上传营业执照",
                            }
                        ]
                    })(
                        <PicturesWall
                            handleSubmit={changeImg}
                            text="上传营业执照"
                            length={1}
                            imgName="licenseImage"
                            fileList={queryrepeatinfo.licenseImage}
                            key={queryrepeatinfo.licenseImage}
                            disabled={queryrepeatinfo.licenseImage?true:false} 
                        />
                    )}
                </FormItem>}
             <FormItem {...formItemLayout} label= {isCompany ? "法人身份证正面照片" : "身份证正面照片"}>
                    {getFieldDecorator("idFrontImage", {
                        rules: [
                            {
                                required: true,
                                message: isCompany ? "请上传法人身份证正面照片" : "请上传身份证正面照片"
                            }
                        ]
                    })(
                        <PicturesWall
                            handleSubmit={changeImg}
                            text= "上传身份证正面照片"
                            length={1}
                            imgName="idFrontImage"
                            fileList={queryrepeatinfo.idFrontImage}
                            key={queryrepeatinfo.idFrontImage}
                            disabled={queryrepeatinfo.idFrontImage?true:false} 

                        />
                    )}
                </FormItem>
             
                <FormItem {...formItemLayout} label= {isCompany ? "法人身份证反面照片" : "身份证反面照片"}>
                    {getFieldDecorator("idBackImage", {
                        rules: [
                            {
                                required: true,
                                message: "请上传身份证反面照片",
                            }
                        ]
                    })(
                        <PicturesWall
                            handleSubmit={changeImg}
                            text= "上传身份证反面照片"
                            length={1}
                            imgName="idBackImage"
                            fileList={queryrepeatinfo.idBackImage}
                            key={queryrepeatinfo.idBackImage}
                            disabled={queryrepeatinfo.idBackImage?true:false} 

                        />
                    )}
                </FormItem>
            </Form>
        </Modal>
    );
};

personal.propTypes = {
    form: PropTypes.object.isRequired,
    type: PropTypes.string,
    item: PropTypes.object,
    onOk: PropTypes.func,
    changeConsignor: PropTypes.func
};

export default Form.create()(personal);
