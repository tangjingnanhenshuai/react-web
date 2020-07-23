// 面包屑组件
import React from "react";
import PropTypes from "prop-types";
import { Breadcrumb, Icon } from "antd";
import { Link } from "react-router-dom";
import pathToRegexp from "path-to-regexp";
import { queryArray } from "utils";
import styles from "./Layout.less";

const Bread = ({ menu, location }) => {
    // 匹配当前路由
    let pathArray = [];
    let current;
    for (let index in menu) {
        if (
            menu[index].url &&
            pathToRegexp(menu[index].url).exec(location.pathname)
        ) {
            current = menu[index];
            break;
        }
    }

    const getPathArray = item => {
        pathArray.unshift(item);
        if (item.pid) {
            getPathArray(queryArray(menu, item.pid, "id"));
        }
    };

    let paramMap = {};
    if (!current) {
        pathArray.push(
            menu[0] || {
                id: 1,
                icon: "home",
                title: "首页",
            }
        );
        pathArray.push({
            id: 404,
            title: "Not Found"
        });
    } else {
        getPathArray(current);

        let keys = [];
        let values = pathToRegexp(current.url, keys).exec(
            location.pathname.replace("#", "")
        );
        if (keys.length) {
            keys.forEach((currentValue, index) => {
                if (typeof currentValue.title !== "string") {
                    return;
                }
                paramMap[currentValue.title] = values[index + 1];
            });
        }
    }

    // 递归查找父级
    const breads = pathArray.map((item, key) => {
        const content = (
            <span>
                {item.icon ? (
                    <Icon type={item.icon} style={{ marginRight: 4 }} />
                ) : (
                    ""
                )}
                {item.title}
            </span>
        );
        return (
            <Breadcrumb.Item key={key}>
                {pathArray.length - 1 !== key ? (
                    <Link
                        to={
                            pathToRegexp.compile(item.url || "")(paramMap) ||
                            "#"
                        }
                    >
                        {content}
                    </Link>
                ) : (
                    content
                )}
            </Breadcrumb.Item>
        );
    });

    return (
        <div className={styles.bread}>
            <Breadcrumb>{breads}</Breadcrumb>
        </div>
    );
};

Bread.propTypes = {
    menu: PropTypes.array,
    location: PropTypes.object
};

export default Bread;
