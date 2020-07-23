import React from "react";
import PropTypes from "prop-types";
import { Row, Col ,Button, Modal} from "antd";
import styles from "./List.less";
import { ImageModal } from "components";
import { formatDate } from "utils";
import { amountFormat } from "../../../../utils/index";
import qr from 'qr-image'
import svgpath from 'svgpath'
const Info = ({ info }) => {
    const colProps = {};
    let [visible, setvisible]=React.useState(false)
    const handleOk=()=>{
        setvisible(false)
    }
    const handleCancel=()=>{
        handleOk()
    }
    const show=()=>{
        setvisible(true)
    }
     const originPath = qr.svgObject(info.qrcode + '').path
    // const originPath = qr.svgObject("http://192.168.6.47:8088/inviteAgent?inviteCode=YUBL4T&ref=153****6126" + '').path
    // const originPath = qr.svgObject("https://h5.kukr.com/agentInvite?inviteCode=YJ49YF&ref=131****6686" + '').path

    const scaledPath = svgpath(originPath).scale(5, 5).toString()
    return (
        <div className={styles.infoItem}>
            <Row gutter={24}>
                <Col xs={10} sm={3} md={3} lg={4} xl={6} span={7}>
                    <div className={styles.label}>姓名:</div>
                    <div className={styles.labelValue}>{info.userName}</div>
                </Col>
                <Col xs={10} sm={3} md={3} lg={4} xl={4} span={4}>
                   <Button onClick={show}>邀请二维码</Button>
                </Col>
                <Col xs={24} sm={4} md={6} lg={8} xl={10} span={12} className={styles.clear}>
                    <div className={styles.label}>合同生效时间:</div>
                    <div className={styles.labelValue}>{formatDate(info.takeEffect)}</div>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col xs={24} sm={4} md={6} lg={8} xl={10} className={styles.clear}>
                    <div className={styles.label}>手机号码:</div>
                    <div className={styles.labelValue}>{info.userMobile}</div>
                </Col>
                <Col xs={24} sm={4} md={6} lg={8} xl={10} className={styles.clear}>
                    <div className={styles.label}>合同终止时间:</div>
                    <div className={styles.labelValue}>{formatDate(info.termination)}</div>
                </Col>
             
            </Row>
            <Row gutter={24}>
                <Col xs={24} sm={4} md={6} lg={8} xl={10} className={styles.clear}>
                    <div className={styles.label}>代理地区:</div>
                    <div className={styles.labelValue}>
                        {info.province ? info.province : ""}
                        {info.city ? info.city : ""}
                        {info.area ? info.area : ""}
                        {info.address ? info.address : ""}
                    </div>
                </Col>
                <Col xs={24} sm={4} md={6} lg={8} xl={10} className={styles.clear}>
                    <div className={styles.label}>身份证号:</div>
                    <div className={styles.labelValue}>
                        {info.idNumber}
                    </div>
                </Col>
                
            </Row>
         
          {info.companyIdFrontImage && <Row gutter={24}>
                <Col xs={24} sm={4} md={6} lg={8} xl={10} className={styles.clear}>
                    <div className={styles.label}>企业法人身份证:</div>
                    {info.idFrontImage && <div style={{ display: "flex", marginTop: "40px", marginLeft: "50px", height: "220px", width: "800px" }}>
                        <img src={info.idFrontImage} className={styles.idimg} />
                        <img src={info.idBackImage} className={styles.idimg} />
                    </div>}
                </Col>
            </Row>} 
            {info.companyIdFrontImage =="null" ? <Row gutter={24}>
                <Col xs={24} sm={4} md={6} lg={8} xl={10} className={styles.clear}>
                    <div className={styles.label}>身份证照片:</div>
                    { info.idFrontImage && <div  style={{display:"flex",marginTop:"40px",marginLeft:"50px",height:"220px",width:"800px"}}>
                    <ImageModal images={info.idFrontImage} width={360} />
                    <ImageModal images={info.idBackImage} width={360} />
                    {/* <img src={info.idFrontImage} className={styles.idimg}/> */}
                    {/* <img src={info.idBackImage} className={styles.idimg}/> */}
                    </div>}
                </Col>
           </Row> : ""}
            {info.idFrontImage && <Row gutter={24}>
                <Col xs={24} sm={4} md={6} lg={8} xl={10} className={styles.clear}>
                    <div className={styles.label}>企业营业执照:</div>
                    <div className={styles.idlabelValue} style={{display:"flex",marginTop:"40px",marginLeft:"50px",height:"220px"}}>
                         <ImageModal images={info.licenseImage} width={360} />
                        {/* <img src={info.licenseImage} className={styles.idimg}/> */}
                      {/* <img src= "../../public/img/card.png" className={styles.idimg}/> */}
                    </div>
                </Col>
            </Row>}
            <Modal
                title="代理商专属于APP邀请二维码"
                visible={visible}
                onOk={handleOk} okText="确定" cancelText="取消"
                onCancel={handleCancel}
            > <Row></Row>
               {scaledPath &&   <svg
               ref={(ref) => info.qrcode = info.qrcode}
                 width="500px"
                 height="200px"
                 style={{
                    marginLeft: '140px',
                    marginTop: '90px',
                    marginBottom:'60px',
                }}>
                  <path d={scaledPath} /> 
                </svg>} 
               <Row></Row>
            </Modal>
        </div>
    );
};
Info.propTypes = {
    Info: PropTypes.object
};

export default Info;
