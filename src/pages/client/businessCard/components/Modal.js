import React from "react";
import { Modal, Row, Col } from "antd";
import Imagemodal from "components/ImageModal"
const modal = ({ ...modalProps }) => {
    const { currentItem } = modalProps;
     let item = {}
     let mmp=false
     let isCompay=false
     if(currentItem.companyAuthStatus !=0 &&currentItem.personalAuthStatus==0){
            item=currentItem.companyCertification
            mmp=true
            isCompay=true
     } else if(currentItem.personalAuthStatus!=0 && currentItem.companyAuthStatus ==0){
            item=currentItem.personalCertification
            mmp=true
     }
    const modalOpts = {
        ...modalProps,
        footer: null,
        title: "订单详情"
    };
    const rowProps = {
        gutter: 8,
        style: {
            marginTop: 10,
            paddingLeft: 70,
            paddingRight: 70
        }
    };
    const rowPropsImage = {
        gutter: 180,
        style: {
            marginTop: 10,
            paddingLeft: 50,
            paddingRight: 50,
            height:200,
            display:"flex"
        }
    };
       const Xiangqing= React.memo(props=>{
           return (
   <Modal {...modalOpts}>
         {item &&  <Row {...rowProps}>
              { !isCompay && <Col span={12}>
                    用户名: &nbsp;&nbsp;
                    {item.realName}
                </Col> } 
                  { isCompay && <Col span={12}>
                    用户名: &nbsp;&nbsp;
                    {item.name}
                </Col> } 
                <Col span={12}>
                    认证类型:&nbsp;&nbsp;
                    {currentItem.companyAuthStatus == 0 && currentItem.personalAuthStatus == 0 ? "未认证" : currentItem.companyAuthStatus == 0 ? "个人认证" : "企业认证"}
                </Col>
            </Row>}  
           <Row {...rowProps}>
                 <Col span={12}>
                    手机号:&nbsp;&nbsp;
                    {currentItem.mobile || "无"}
                </Col>
               
                <Col span={12}>
                    认证状态:&nbsp;&nbsp;
                    {currentItem.companyAuthStatus == -1 || currentItem.personalAuthStatus == -1 ? "驳回" : currentItem.companyAuthStatus == 1 || currentItem.personalAuthStatus == 1 ? "已认证" : currentItem.companyAuthStatus == 2 || currentItem.personalAuthStatus == 2 ? "审核中" : "未认证"}
                </Col>
            </Row>
            <Row {...rowProps}>
                <Col span={12}>
                    认证信息 &nbsp;&nbsp;
                </Col>
            </Row>
           { isCompay && <Row {...rowProps}>
            <Col span={12}>
                    法人姓名:&nbsp;&nbsp;
                    {item.realName}
                </Col>
            </Row> } 
           {item.idNumber &&<Row {...rowProps}>
                <Col span={12}>
                    身份证号:&nbsp;&nbsp;
                    {item.idNumber || "--"}
                </Col>
            </Row> } 
            <Row {...rowProps}>
                <Col span={12}>
                    身份证照片:&nbsp;&nbsp;
                </Col>
            </Row>
            <Row {...rowPropsImage}>
                {item.idFrontImage && <Col span={24} style={{display:"flex"}}>
                    <Imagemodal images={item.idFrontImage} width={260} height={160} left={50}/>
                    <Imagemodal images={item.idBackImage} width={260} height={160} left={50}/>
                </Col>}
           </Row> 
             { currentItem.companyAuthStatus !=0  &&  <Row {...rowProps}>
                <Col span={12}>
                    企业营业执照:&nbsp;&nbsp;
                </Col>
            </Row>}
             { currentItem.companyAuthStatus !=0  &&  <Row {...rowPropsImage}>
                {item.licenseImage && <Col span={24} style={{display:"flex"}}>
                <Imagemodal images={item.licenseImage} width={260} height={160} left={50}/>
                </Col>}
            </Row> }
        </Modal>
           )
       })
        const Wuxiangqing=React.memo(props=>{
            return (
                 <Modal {...modalOpts}>
                       <h3>暂无详细信息</h3>
                 </Modal>
            )
        })
    return (
        <div>
        {mmp &&  <Xiangqing/> }
        {!mmp&& <Wuxiangqing/>}
        </div>
      
    );
};

export default modal;
