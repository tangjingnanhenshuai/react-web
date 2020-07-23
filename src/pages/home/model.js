import modelExtent from "dva-model-extend";
import moment from "moment";
import { pageModel } from "utils/model";
import queryString from "query-string";
import { message } from "antd";
import { queryAccount, queryDataCount, queryUserData, queryTendencyChat, queryRanking, queryIncome, queryMonth, queryBank, queryCode, onCash} from "./service";
export default modelExtent(pageModel, {
    namespace: "home",
    state: {
        trendData: {},
        user: {},
        agentAccount: {},
        modalVisible: false,
        userdataCount:{},
        userData:{},
        tendencyChat:{},
        rankingData:{},
        incomeData:{},
        monthData:{},
        bankName:{},
        code:{},
        caseend:{},
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === "/home"|| location.pathname === '/') {
                    // dispatch({
                    //     type: "query"
                    // });
                }
            });
        }
    },
    effects: {
        *query({ payload = {} }, { call, put, select }) {
            const account = yield call(queryAccount);//账户余额
            const dataCount = yield call(queryDataCount);//业务数据变化
            const userData = yield call(queryUserData);//用户数据
            if (account&&dataCount&&userData) {
                yield put({
                    type: "updateState",
                    payload: {
                        agentAccount: "account",
                        userdataCount:"dataCount.result",
                        userData:"userData.result",
                        tendencyChat:"tendencyChat.result",
                        rankingData:"ranking",
                        incomeData:"Incomedata",
                        monthData:"monthdata",
                        bankName:"bankName.result.data",
                    }
                });
            }
        },
        *cash({ payload }, { call, put, select }){     // 提交提现
            const caseend = yield call(onCash,payload);
            if (caseend) {
                yield put({
                    type: "updateState",
                    payload: {
                        caseend: caseend
                    }
                });
            }
        },
        *queryCode({payload},{call,put,select}){
            const code = yield call(queryCode,payload);   // 获取验证码
            if(code){
                yield put({
                    type: "updateState",
                    payload: {
                       code:code 
                    }
                });
            }
        }
    },
    reducers: {
        showModal(state, { payload }) {
            return { ...state, ...payload, modalVisible: true };
        },
        hideModal(state) {
            return { ...state, modalVisible: false };
        }
    }
});
