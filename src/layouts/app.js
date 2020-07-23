/* global window */
/* global document */
import React from 'react';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import { Loader, MyLayout } from 'components';
import { BackTop, Layout } from 'antd';
import { classnames, config } from 'utils';
import { Helmet } from 'react-helmet';
import { withRouter } from 'dva/router';
import Error from '../pages/404';
import '../themes/index.less';
import './app.less';
import Modal from './Modal';

const { Content, Footer, Sider } = Layout;
const { Header, Bread, styles } = MyLayout;
const { prefix, openPages } = config;

let lastHref;

const App = ({ children, dispatch, app, loading, location }) => {
    const {
        siderFold,
        darkTheme,
        isNavbar,
        menuPopoverVisible,
        navOpenKeys,
        menu,
        permissions,
        modalVisible,
        navSelectedKeys
    } = app;
    let { pathname } = location;
    pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
    const { iconFontJS, iconFontCSS, logo } = config;
    const current = menu.filter(item => pathToRegexp(item.url || '').exec(pathname));
    const hasPermission = current.length ? permissions.visit.includes(current[0].url) : false;
    const { href } = window.location;

    if (lastHref !== href) {
        NProgress.start();
        if (!loading.global) {
            NProgress.done();
            lastHref = href;
        }
    }

    const headerProps = {
        menu,
        location,
        siderFold,
        isNavbar,
        menuPopoverVisible,
        navOpenKeys,
        switchMenuPopover() {
            dispatch({ type: 'app/switchMenuPopver' });
        },
        logout() {
            dispatch({ type: 'app/logout' });
        },
        resetpwd() {
            dispatch({ type: 'app/showModal' });
        },
        switchSider() {
            dispatch({ type: 'app/switchSider' });
        },
        changeOpenKeys(openKeys) {
            dispatch({
                type: 'app/handleNavOpenKeys',
                payload: { navOpenKeys: openKeys }
            });
        }
    };

    const siderProps = {
        menu,
        location,
        siderFold,
        darkTheme,
        navOpenKeys,
        navSelectedKeys,
        changeTheme() {
            dispatch({ type: 'app/switchTheme' });
        },
        changeOpenKeys(openKeys) {
            window.localStorage.setItem(`${prefix}navOpenKeys`, JSON.stringify(openKeys));
            dispatch({
                type: 'app/handleNavOpenKeys',
                payload: { navOpenKeys: openKeys }
            });
        },
        changeSelectedMenu(openKeys, selectedKeys) {
            dispatch({
                type: 'app/handleClickNavMenu',
                payload: {
                    navOpenKeys: openKeys,
                    navSelectedKeys: selectedKeys
                }
            });
        }
    };

    const breadProps = {
        menu,
        location
    };

    if (openPages && openPages.includes(pathname)) {
        return (
            <div>
                <Loader fullScreen spinning={loading.effects['app/query']} />
                {children}
            </div>
        );
    }
    const modalProps = {
        visible: modalVisible,
        maskClosable: false,
        title: '修改密码',
        wrapClassName: 'vertical-center-modal',
        onOk(data) {
            dispatch({
                type: 'app/resetPwd',
                payload: {
                    ...data
                }
            });
        },
        onCancel() {
            dispatch({
                type: 'app/hideModal'
            });
        }
    };
    return (
        <div>
            {/* <Loader fullScreen spinning={loading.effects['app/query']} /> */}
            {/* <Helmet>
                <title>代理商后台</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href={logo} type="image/x-icon" />
                {iconFontJS && <script src={iconFontJS} />}
                {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
            </Helmet> */}

            <Layout
                className={classnames({
                    [styles.dark]: darkTheme,
                    [styles.light]: !darkTheme
                })}
            >
                {!isNavbar && (
                    <Sider trigger={null} collapsible collapsed={siderFold}>
                        {siderProps.menu.length === 0 ? null : <MyLayout.Sider {...siderProps} />}
                    </Sider>
                )}
                <Layout style={{ height: '100vh', overflow: 'scroll' }} id="mainContainer">
                    <BackTop target={() => document.getElementById('mainContainer')} />
                    <Header {...headerProps} />
                    <Content>
                        <Bread {...breadProps} />
                        {children}
                        {modalVisible && <Modal {...modalProps} />}
                    </Content>
                    <Footer>{config.footerText}</Footer>
                </Layout>
            </Layout>
        </div>
    );
};

App.propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object,
    dispatch: PropTypes.func,
    app: PropTypes.object,
    loading: PropTypes.object
};

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App));
