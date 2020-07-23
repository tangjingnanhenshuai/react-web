import modelExtent from "dva-model-extend";
import { pageModel } from "utils/model";
import { query, create, remove, update, creatUser ,creatUserPersonal,creatUserCompay,webuseradd,queryrepeat,queryrepeatpersonal} from "./service";
import queryString from "query-string";
import { message } from "antd";
export default modelExtent(pageModel, {
    namespace: "clientBusinessCard",
    state: {
        currentItem: {},
        modalVisible: false,
        modalType: "create",
        PersonalModal:false,
        isCompany:false,
        SubmitReturn:{},
        queryrepeatinfo:{}
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === "/client/businessCard") {
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
            // const types = yield call(querytype,payload);
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
        *create({payload},{call,put}){
            const data = yield call(creatUser,payload);
             if(data){
                 yield put({
                     SubmitReturn:data
                 })
                message.success("提交成功")
                yield put({type:"hidePersonalModal"})
             }
        },
        // 电话号码查重
        *mobilecrepeat({payload},{call,put,select}){
            const data = yield call(queryrepeat,payload);
              if(data){
                message.info("该手机号已注册")
                  yield put({
                      type:"updateState",
                      payload:{
                        queryrepeatinfo:data
                      }
                  })
              }else{
                yield put({
                    type:"updateState",
                    payload:{
                      queryrepeatinfo:{}
                    }
                })
              }
        },
        // 电话号码查重  （个人）
        *queryPersonal({payload},{call,put,select}){
            const data = yield call(queryrepeatpersonal,payload);
             if(data){
                message.info("该手机号已注册")
                yield put({
                    type:"updateState",
                    payload:{
                      queryrepeatinfo:data
                    }
                })
             }else{
                yield put({
                    type:"updateState",
                    payload:{
                      queryrepeatinfo:{}
                    }
                })
             }

        },
        *addwebUser({payload},{call,put}){
            const data = yield call(webuseradd,payload);
            if(data){
                 yield put({
                        type: "updataState",
                        payload:{
                                 SubmitReturn:data
                        }
                 })
                  message.success("提交成功")
                  const senddata={pageNo:1,pageSize:10,...queryString.parse(location.search)}
                yield put({type:"query",payload:{...senddata}})
                yield put({type:"hidePersonalModal"})
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
        showPersonalModal(state,{payload}){
            return { ...state, ...payload, PersonalModal:true};
        },
        hidePersonalModal(state,{payload}){
            return { ...state, ...payload, PersonalModal:false}
        },
        showCompany(state,{payload}){
            return { ...state, ...payload, isCompany:true};
        },
        hideCompany(state,{payload}){
            return {...state,...payload,isCompany:false};
        }
    }
});
