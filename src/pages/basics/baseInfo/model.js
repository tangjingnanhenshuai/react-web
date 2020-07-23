import modelExtent from "dva-model-extend";
import { pageModel } from "utils/model";
import { query, create, remove, update } from "./service";
import queryString from "query-string";
import { message } from "antd";
export default modelExtent(pageModel, {
    namespace: "baseInfo",
    state: {
        info:{}
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === "/basics/baseInfo") {
                    dispatch({
                        type: "query"
                    });
                }
            });
        }
    },
    effects: {
        *query({ payload }, { select, call, put }) {
            const data = yield call(query, payload);
            if (data) {
                yield put({
                    type: "updateState",
                    payload: {
                        info: data,
                    }
                });
            }
        }
    },
    reducers: {
          
    }
});
