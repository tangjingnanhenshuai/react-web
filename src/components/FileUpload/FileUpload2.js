import React from 'react'
import { Upload, Icon, Modal, message } from 'antd';

class PicturesWall extends React.Component {
    state = {
        text: this.props.text,
        previewVisible: false,
        previewImage: '',
        fileList: [],
        length:this.props.length,
        images:this.props.fileList,
        imageurls:[],
    };
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    componentWillMount(){
         if(this.state.images!=undefined &&  typeof( this.state.images)=="object" ){
             let obj=[]
             let urls=[]
             this.state.images.map((v,i)=>{
                 obj.push({uid:i,url:v})
                 urls.push(v)
             })
             this.setState({fileList:obj,imageurls:urls})
         }else if( this.state.images!=undefined &&  typeof( this.state.images)=="string" ){
            let obj=[{
                uid:1,url:this.state.images
            }]
            this.setState({fileList:obj})
         }
    }
    handleChange = (info) => {
       if(this.props.disabled){return}
        this.setState({ fileList: info.fileList })
        if (info.file.status !== 'uploading') {
        }
        if (info.file.status === 'done') {
            let urlList = []
            this.state.fileList.map(_ => {
                if(_.url){
                    urlList.push(_.url)
                }else{
                    urlList.push(_.response)
                }
            } )
            if (this.props.handleSubmit) {
                this.props.handleSubmit(this.props.imgName, urlList)
            }
        } else if (info.file.status === 'removed') {
            let urlList = []
            this.state.fileList.map(_ => {
                if(_.url){
                    urlList.push(_.url)
                }else{
                    urlList.push(_.response)
                }
            })
            if (this.props.handleSubmit) {
                this.props.handleSubmit(this.props.imgName , urlList)
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败.`);
            //上传文件过期自动跳转到登录页
            if (info.file.error.status === 401) {
                window.location.href = "/login"
            }
        }
    }
    // handleChange = (info) => {
    //     this.setState({ fileList: info.fileList })
    //     if (info.file.status !== 'uploading') {
    //     }
    //     if (info.file.status === 'done') {
    //         if (this.props.handleSubmit) {
    //             this.props.handleSubmit(this.props.imgName, info.file.response)
    //         }
    //     } else if (info.file.status === 'error') {
    //         message.error(`${info.file.name} 上传失败.`);
    //     }
    // }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
      
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">{this.state.text}</div>
            </div>
        );
        return (
            <div className="clearfix">
                <Upload
                    name='image'
                    action="/api/v1/common/image/upload"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    {fileList.length >= this.state.length ? null : uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </div>
        );
    }
}

export default PicturesWall
