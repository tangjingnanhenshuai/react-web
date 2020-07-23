import React from "react";
import PropTypes from "prop-types";
import { connect } from "dva";
import { Button, Row, Form, Input, Col, Checkbox } from "antd";
import { config } from "utils";
import styles from "./index.less";
import { Link } from "dva/router";
import MobileCode from '../../components/MobileCode/MobileCode'

const { codeImgUrl } = config.api;

const FormItem = Form.Item;

const ResetPwd = ({
    resetpwd,
    dispatch,

    form: { getFieldDecorator, validateFieldsAndScroll }
}) => {
    const {
        ctoken,
        loginLoading,
        mobileCodeLoding,
        mobileCodeButtonDisable
    } = resetpwd;
    function handleOk() {
        validateFieldsAndScroll((errors, values) => {
            if (errors) {
                return;
            }
            values.ctoken = ctoken;
            dispatch({ type: "resetpwd/login", payload: values });
        });
    }
    const changeCodeImg = () => {
        dispatch({ type: "resetpwd/changeCtoken" });
    };
    const sendMobileCode = () => {
        validateFieldsAndScroll(["mobile", "captcha"], (errors, values) => {
            if (errors) {
                return;
            }
            dispatch({
                type: `resetpwd/sedMsg`,
                payload: {
                    mobile: values.mobile,
                    ctoken,
                    captcha: values.captcha
                }
            });
        });
    };
    const enableMobileCodeButton = () => {
        dispatch({
            type: "resetpwd/updateState",
            payload: {
                mobileCodeButtonDisable: false
            }
        });
    };
    return (
        <div className={styles.form}>
            <div className={styles.logo}>
                <img alt="logo" src={config.logo} />
                <span>{config.name}</span>
            </div>
            <form>
                <FormItem hasFeedback>
                    {getFieldDecorator("mobile", {
                        rules: [
                            {
                                required: true,
                                pattern: /^[1][345789][0-9]{9}$/,
                                message: "请输入手机号"
                            }
                        ]
                    })(
                        <Input
                            onPressEnter={handleOk}
                            placeholder="请输入手机号"
                        />
                    )}
                </FormItem>

                <FormItem hasFeedback className={styles.captcha}>
                    <Row>
                        <Col span={12}>
                            {getFieldDecorator("captcha", {
                                rules: [
                                    {
                                        required: true,
                                        pattern: /^.{4}$/,
                                        message: "请输入验证码"
                                    }
                                ]
                            })(
                                <Input
                                    onPressEnter={handleOk}
                                    placeholder="请输入验证码"
                                />
                            )}
                        </Col>
                        <Col span={12}>
                            <img
                                height={30}
                                src={codeImgUrl + "?ctoken=" + ctoken}
                                onClick={changeCodeImg}
                            />
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Row gutter={8}>
                        <Col span={12}>
                            {getFieldDecorator("authCode", {
                                rules: [
                                    {
                                        required: true,
                                        message: "手机验证码不能为空!"
                                    }
                                ]
                            })(
                                <Input
                                    size="large"
                                    onPressEnter={handleOk}
                                    placeholder="请输入手机验证码"
                                />
                            )}
                        </Col>
                        <Col span={12}>
                            <MobileCode
                                loading={mobileCodeLoding}
                                sendMobileCode={sendMobileCode}
                                mobileCodeButtonDisable={
                                    mobileCodeButtonDisable
                                }
                                enableMobileCodeButton={enableMobileCodeButton}
                            />
                        </Col>
                    </Row>
                </FormItem>
                <FormItem hasFeedback>
                    {getFieldDecorator("password", {
                        rules: [
                            {
                                required: true,
                                message: "请输入新密码"
                            }
                        ]
                    })(
                        <Input
                            type="password"
                            onPressEnter={handleOk}
                            placeholder="请输入新密码"
                        />
                    )}
                </FormItem>
               
                <Button
                    type="primary"
                    className="login-form-button"
                    onClick={handleOk}
                    loading={loginLoading}
                >
                    找回密码
                </Button>
                <Link to="login" style={{ float: "right" }}>
                    返回登录
                </Link>
            </form>
        </div>
    );
};

ResetPwd.propTypes = {
    form: PropTypes.object,
    dispatch: PropTypes.func,
    resetpwd: PropTypes.object
};

export default connect(({ resetpwd }) => ({ resetpwd }))(
    Form.create()(ResetPwd)
);
