// 侧边栏组件
import React from 'react'
import PropTypes from 'prop-types'
import { Icon, Switch } from 'antd'
import { config } from 'utils'
import styles from './Layout.less'
import Menus from './Menu'
import {Menu} from "antd"
const SubMenu=Menu.SubMenu
const Sider = ({
    siderFold, 
    darkTheme,
     location, 
     navOpenKeys,
      changeOpenKeys, 
      menu,
      changeSelectedMenu,
      navSelectedKeys,
    switchTheme,
    changeTheme
}) => {
    const menusProps = {
        menu,
        siderFold,
        darkTheme,
        location,
        navOpenKeys,
        changeOpenKeys,
        navSelectedKeys,
        changeSelectedMenu
    }
    return (
        <div>
            <div className={styles.logo}>
                <img alt="logo" src={config.logo} />
                {siderFold ? '' : <span>{config.name}</span>}
            </div>
            {/* <SubMenu> */}
                 <Menus {...menusProps} />
            {/* </SubMenu> */}
            {!siderFold ? <div className={styles.switchtheme}>
                <span><Icon type="bulb" />更换主题</span>
                <Switch onChange={changeTheme} defaultChecked={darkTheme} checkedChildren="白" unCheckedChildren="黑" />
            </div> : ''}
        </div>
    )
}

Sider.propTypes = {
    menu: PropTypes.array,
    siderFold: PropTypes.bool,
    darkTheme: PropTypes.bool,
    location: PropTypes.object,
    changeTheme: PropTypes.func,
    navOpenKeys: PropTypes.array,
    changeOpenKeys: PropTypes.func,
}

export default Sider
