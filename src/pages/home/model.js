import modelExtent from "dva-model-extend";
import moment from "moment";
import { pageModel } from "utils/model";
import queryString from "query-string";
import { message } from "antd";
import { queryAccount ,homeVideo} from "./service";
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
            console.log(queryAccount)
            const account = yield call(queryAccount) 
             console.log(account)
            // if (account&&dataCount&&userData) {
            //     yield put({
            //         type: "updateState",
            //         payload: {
            //             agentAccount: "account",
            //             userdataCount:"dataCount.result",
            //             userData:"userData.result",
            //             tendencyChat:"tendencyChat.result",
            //             rankingData:"ranking",
            //             incomeData:"Incomedata",
            //             monthData:"monthdata",
            //             bankName:"bankName.result.data",
            //         }
            //     });
            // }
        },
    
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
