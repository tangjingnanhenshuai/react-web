/*
 * @Author: 满楼 
 * @Date: 2018-09-12 17:45:28 
 * @Last Modified by: 满楼
 * @Last Modified time: 2018-09-13 11:51:57
 * 查看图片组件
 */

import React from 'react'
import { Modal } from 'antd'
import styles from './ImageModal.less'




class ImageModal extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            visible: false,
            img: ''
        }
    }

    onHideModal = () => {
        this.setState({
            visible: false
        })
    }


    onShowModal = (img) => {
        this.setState({
            visible: true,
            img: img
        })
    }
    render() {
        const { images, width } = this.props
        //instanceof只能用来判断对象和函数，不能用来判断字符串和数字等
        let data = [];

        if (images instanceof Array) {
            data = images
        }

        if (typeof (images) == 'string') {
            data.push(images)
        }

        return (
            <div className={styles.imageModal}>
                <Modal
                    visible={this.state.visible}
                    width={'80%'}
                    footer={null}
                    wrapClassName='vertical-center-modal'
                    onCancel={this.onHideModal}>

                    <div className={styles.imgModalDiv}>
                        <img src={this.state.img} alt="图片" className={styles.classImage} />
                    </div>
                </Modal>

                <div>
                    {
                        data.map((i, v) => {
                            return <img className={styles.imagesBox} key={v} src={i} alt="图片"
                                style={{ width: this.props.width,height:this.props.height,marginLeft:this.props.left }}
                                onClick={() => this.onShowModal(i)} />
                        })
                    }
                </div>
            </div>
        )
    }
}


export default ImageModal