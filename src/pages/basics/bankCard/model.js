import modelExtent from "dva-model-extend";
import { pageModel } from "utils/model";
import { query, create, remove, update,queryBank } from "./service";
import queryString from "query-string";
import { message } from "antd";
export default modelExtent(pageModel, {
    namespace: "bankCard",
    state: {
        currentItem: {},
        modalVisible: false,
        modalType: "create",
        addModalVisible: false,
        isCompanyVisible:false,
        ankList: [],
        subbranchList: [],
        item: {},
        bankList:{}
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === "/basics/bankCard") {
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
        *query({ payload = {} }, { call, put }) {
            if (!payload.pageNo) {
                payload = { ...payload, ...queryString.parse(location.search) };
            }
            const data = yield call(query, payload);
            if (data) {
                yield put({
                    type: "updateState",
                    payload: {
                        list: data.result.data
                    }
                });
            }
        },
        *create({ payload }, { call, put }) {
            const data = yield call(create, payload);
            if (data) {
                message.success("添加成功");
                yield put({ type: "hideAddModal" });
                yield put({ type: "query" });
            } else {
                throw data;
            }
        },
        *update({ payload }, { select, call, put }) {
            const id = yield select(bankCard => bankCard.currentItem.id);
            const uid = yield select(app => app.user.id);
            const newData = { ...payload, id, uid };
            const data = yield call(updata, newData);
            if (data) {
                message.success("修改成功");
                yield put({ type: "hideModal" });
                yield put({ type: "query" });
            } else {
                throw data;
            }
        },
        *delect({ payload }, { call, put }) {
            const data = yield call(remove, { id: payload });
            if (data) {
                message.success("删除成功");
                yield put({ type: "query" });
            } else {
                throw data;
            }
        },
        //弹框获取银行名称
        *queryBankList({ payload }, { call, put }) {
            const data = yield call(queryBank, payload)
            if (data) {
                yield put({ type: 'updateState', payload: { bankList: {bankType:data.cardType,bankName:data.bankName} } })
            } else {
                throw data
            }
        },
    },
    reducers: {
        showModal(state, { payload }) {
            return { ...state, ...payload, modalVisible: true };
        },
        hideModal(state) {
            return { ...state, modalVisible: false };
        },
        showAddModal(state, { payload }) {
            return { ...state, ...payload, addModalVisible: true };
        },
        hideAddModal(state) {
            return { ...state, addModalVisible: false };
        },
        showCompanyVisible(state, { payload }) {
            return { ...state, ...payload, isCompanyVisible: true };
        },
        hideCompanyVisible(state) {
            return { ...state, isCompanyVisible: false };
        }
        
    }
});
