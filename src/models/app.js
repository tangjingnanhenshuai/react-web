/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */

import { routerRedux } from "dva/router";
import { parse } from "qs";
import config from "config";
import { query, logout, resetPwd } from "services/app";
const { prefix, openPages } = config;
import { message } from "antd";
export default {
    namespace: "app",
    state: {
        user: {},
        permissions: {
            visit: []
        },
        modalVisible: false,
        menu: [
            {
                id: 1,
                icon: "home",
                title: "首页",
                url: "/home"
            },
            // {
            //     id: 3,
            //     icon: "user",
            //     title: "客户管理"
            // },
            // {
            //     id: 31,
            //     pid: 3,
            //     icon: "user",
            //     title: "移动端用户管理",
            //     url: "/client/user"
            // },
            // {
            //     id: 32,
            //     pid: 3,
            //     icon: "idcard",
            //     title: "web端客户管理",
            //     url: "/client/businessCard"
            // },
            // {
            //     id: 4,
            //     icon: "money-collect",
            //     title: "交易管理"
            // },
            // {
            //     id: 10,
            //     pid: 4,
            //     icon: "user",
            //     title: "会员升级订单",
            //     url: "/deal/memberUpgrade"
            // },
            // {
            //     id: 11,
            //     pid: 4,
            //     icon: "rise",
            //     title: "分润订单",
            //     url: "/deal/shareProfit"
            // },
            // {
            //     id: 12,
            //     pid: 4,
            //     icon: "credit-card",
            //     title: "用户充值订单",
            //     url: "/deal/topUps"
            // },


            // {
            //     id: 8,
            //     icon: "solution",
            //     title: "结算管理",
            // },
            // {
            //     id: 81,
            //     pid: 8,
            //     icon: "credit-card",
            //     title: "提现记录",
            //      url: "/withdrawals/withdraw"
            // },
            // {
            //     id: 2,
            //     icon: "setting",
            //     title: "系统设置"
            // },
            // {
            //     id: 6,
            //     pid: 2,
            //     icon: "info-circle",
            //     title: "基本信息",
            //     url: "/basics/baseInfo"
            // },
            // {
            //     id: 7,
            //     pid: 2,
            //     icon: "credit-card",
            //     title: "银行卡管理",
            //     url: "/basics/card"
            // },
         
        ],
        permissions: {
            visit:[
                "/home","/client/user","/client/businessCard","/deal/memberUpgrade","/deal/shareProfit","/basics/baseInfo","/basics/bankCard"
            ]
        },
        menuPopoverVisible: false,
        siderFold: window.localStorage.getItem(`${prefix}siderFold`) === "true",
        darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === "true",
        isNavbar: document.body.clientWidth < 769,
        navOpenKeys:
            JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) ||
            [],
        locationPathname: "",
        locationQuery: {},
    },
    subscriptions: {
        setup({ dispatch }) {
            if (!(openPages && openPages.includes(location.pathname))) {
                dispatch({
                    type: "query"
                });
            }
        }
    },
    effects: {
        *query({ payload }, { call, put }) {
            const data = yield call(query, payload);
            if (data) {
                yield put({
                    type: "updateState",
                    payload: {
                        user: data
                    }
                });
                if (location.pathname === "/login") {
                    yield put(routerRedux.push("/"));
                }
            }
        },

        *logout({ payload }, { call, put }) {
            const data = yield call(logout, parse(payload));
            if (data) {
                yield put({ type: "query" });
                yield put(routerRedux.push("/login"));
            } else {
                throw data;
            }
        },
        *resetPwd({ payload }, { call, put }) {
            const data = yield call(resetPwd, parse(payload));
            if (data) {
                yield put({ type: "hideModal" });
                message.success("密码修改成功");
                yield put(routerRedux.push("/login"));
            } else {
                throw data;
            }
        },
        *changeNavbar(action, { put, select }) {
            const { app } = yield select(_ => _);
            const isNavbar = document.body.clientWidth < 769;
            if (isNavbar !== app.isNavbar) {
                yield put({ type: "handleNavbar", payload: isNavbar });
            }
        }
    },
    reducers: {
        updateState(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },

        switchSider(state) {
            window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold);
            return {
                ...state,
                siderFold: !state.siderFold
            };
        },

        switchTheme(state) {
            window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme);
            return {
                ...state,
                darkTheme: !state.darkTheme
            };
        },

        switchMenuPopver(state) {
            return {
                ...state,
                menuPopoverVisible: !state.menuPopoverVisible
            };
        },

        handleNavbar(state, { payload }) {
            return {
                ...state,
                isNavbar: payload
            };
        },

        handleNavOpenKeys(state, { payload: navOpenKeys }) {
            return {
                ...state,
                ...navOpenKeys
            };
        },
        handleClickNavMenu(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        showModal(state, { payload }) {
            return { ...state, ...payload, modalVisible: true };
        },

        hideModal(state) {
            return { ...state, modalVisible: false };
        }
    }
};
