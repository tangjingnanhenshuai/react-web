import modelExtend from 'dva-model-extend'
import { query, create, remove, update, queryBank, querySubbranch } from './service'
import { pageModel } from 'utils/model'
import { message } from 'antd'
import queryString from 'query-string'

export default modelExtend(pageModel, {
    namespace: 'baseCard',

    state: {
        updateItem: {},
        currentItem: {},
        modalVisible: false,
        detailVisible: false,
        modalType: 'create',
        bankNameQuery: {},
        subbranchList: [],
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/basics/card') {
                    const payload = location.query || { page: 1, pageSize: 10 }
                    dispatch({
                        type: 'query',
                        payload
                    })
                }
            })
        }
    },

    effects: {
        *query({ payload = {} }, { call, put }) {
            if (!payload.pageNo) {
                payload = { ...payload, ...queryString.parse(location.search) }
            }
            const data = yield call(query, payload)
            if (data) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        list: data.result.data,
                        pagination: {
                            current: Number(payload.pageNo) || 1,
                            pageSize: Number(payload.pageSize) || 10,
                            total: data.result.total
                        }
                    }
                })
            } else {
                throw data
            }
        },

        *create({ payload }, { call, put }) {
            const data = yield call(create, payload)
            if (data) {
                message.success('添加成功', 1)
                yield put({ type: 'hideModal' })
                yield put({ type: 'query' })
            } else {
                throw data
            }
        },

        *remove({ payload }, { call, put }) {
            const data = yield call(remove, { id: payload })
            if (data) {
                message.success('删除成功', 1)
                yield put({ type: 'query' })
            } else {
                throw data
            }
        },

        *update({ payload }, { call, put, select }) {
            const data = yield call(update, payload)
            if (data) {
                message.success('更新成功', 1)
                yield put({ type: 'hideModal' })
                yield put({ type: 'query' })
            } else {
                throw data
            }
        },

        //输入银行卡号--获取银行名称
        *queryBankName({ payload }, { call, put }) {
            const data = yield call(queryBank, payload)
            console.log("queryBankName")
            if (data) {
                yield put({ type: 'updateState', payload: { bankNameQuery: data } })
            } else {
                throw data
            }
        },

        //获取银行支行
        *queryBankSubbranch({ payload }, { call, put }) {
            const data = yield call(querySubbranch, payload)
            if (data) {
                yield put({ type: 'updateState', payload: { subbranchList: data } })
            } else {
                throw data
            }
        },
    },

    reducers: {
        showModal(state, { payload }) {
            return { ...state, ...payload, modalVisible: true }
        },
        hideModal(state, { payload }) {
            return { ...state, modalVisible: false }
        },
        showDetailModal(state, { payload }) {
            return { ...state, ...payload, detailVisible: true }
        },
        hideDetailModal(state, { payload }) {
            return { ...state, detailVisible: false }
        },
        updateState(state,{payload}){
            return {...state,...payload}
        }
    }
})
