import modelExtent from "dva-model-extend";
import { pageModel } from "utils/model";
import { query, create, remove, update } from "./service";
import queryString from "query-string";
import { message } from "antd";
export default modelExtent(pageModel, {
    namespace: "clientUser",
    state: {
        currentItem: {},
        modalVisible: false,
        modalType: "create",
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === "/client/user") {
                    const payload = location.query || { page: 1, pageSize: 10 };
                    dispatch({
                        type: "query",
                        payload
                    });
                }
            });
        }
    },
    effects: {
        *query({ payload = {} }, { call, put ,select}) {
            if (!payload.pageNo) {
                payload = { ...payload, ...queryString.parse(location.search) };
            }
            const data = yield call(query, payload);
            if (data) {
                yield put({
                    type: "querySuccess",
                    payload: {
                        list: data.result.data,
                        pagination: {
                            current: Number(payload.pageNo) || 1,
                            pageSize: Number(payload.pageSize) || 10,
                            total: data.result.total
                        }
                    }
                });
            }
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
