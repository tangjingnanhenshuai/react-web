// header组件
import React from "react";
import PropTypes from "prop-types";
import { Menu, Icon, Popover, Layout } from "antd";
import classnames from "classnames";
import styles from "./Header.less";
import Menus from "./Menu";

const { SubMenu } = Menu;

const Header = ({
    logout,
    switchSider,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    location,
    switchMenuPopover,
    navOpenKeys,
    changeOpenKeys,
    menu,
    resetpwd
}) => {
    // let handleClickMenu = e => e.key === "logout" && logout();
    let handleClickMenu = (e)=>{
        if(e.key==="logout"){
            logout()
        }
        if(e.key==="restpwd"){
            resetpwd()
        }
    }
    const menusProps = {
        menu,
        siderFold: false,
        darkTheme: false,
        isNavbar,
        handleClickNavMenu: switchMenuPopover,
        location,
        navOpenKeys,
        changeOpenKeys
    };
    return (
        <Layout.Header className={styles.header}>
            {isNavbar ? (
                <Popover
                    placement="bottomLeft"
                    onVisibleChange={switchMenuPopover}
                    visible={menuPopoverVisible}
                    overlayClassName={styles.popovermenu}
                    trigger="click"
                    content={<Menus {...menusProps} />}
                >
                    <div className={styles.button}>
                        <Icon type="bars" />
                    </div>
                </Popover>
            ) : (
                <div className={styles.button} onClick={switchSider}>
                    <Icon
                        type={classnames({
                            "menu-unfold": siderFold,
                            "menu-fold": !siderFold
                        })}
                    />
                </div>
            )}
            {/* <div className={styles.rightWarpper}>
                <div className={styles.button}>
                    <Icon type="mail" />
                </div>
                <Menu mode="horizontal" onClick={handleClickMenu}>
                    <SubMenu
                        style={{
                            float: "right"
                        }}
                        title={
                            <span>
                                <Icon type="user" />
                            </span>
                        }
                    >
                        <Menu.Item key="restpwd">重置密码</Menu.Item>
                        <Menu.Item key="logout">退出</Menu.Item>
                    </SubMenu>
                </Menu>
            </div> */}
        </Layout.Header>
    );
};

Header.propTypes = {
    menu: PropTypes.array,
    logout: PropTypes.func,
    restpwd: PropTypes.func,
    switchSider: PropTypes.func,
    siderFold: PropTypes.bool,
    isNavbar: PropTypes.bool,
    menuPopoverVisible: PropTypes.bool,
    location: PropTypes.object,
    switchMenuPopover: PropTypes.func,
    navOpenKeys: PropTypes.array,
    changeOpenKeys: PropTypes.func
};

export default Header;
