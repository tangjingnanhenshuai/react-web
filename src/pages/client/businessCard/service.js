import {request,config} from "utils"
import qs from "qs"
const {api} =config
const { businessCard, webCustomer, userWeb, userWebCreate,webAdduserPersonal,webAdduserCompay,addwebUser,agentInfoQuery,repeatPersonal} = api
export async function query(params) {
    return request({
        url: userWeb,
        method:'get',
        data:params
    })
}
export async function creatUser(params) {
    return request({
        url: userWebCreate,
        method: 'post',
        data: params
    })
}
export async function creatUserPersonal(params) {
    return request({
        url: webAdduserPersonal,
        method: 'post',
        data: params
    })
}
export async function creatUserCompay(params) {
    return request({
        url: webAdduserCompay,
        method: 'post',
        data: params
    })
}
export async function create(params) {
    return request({
        url: userWeb,
        method:'post',
        data:params
    })
}
export async function update(params) {
    return request({
        url: userWeb,
        method:'put',
        data:params
    })
}
export async function remove(params) {
    return request({
        url: userWeb,
        method:'delete',
        data:params
    })
}
 //  新增web用户
export async function webuseradd(params) {
    return request({
        url: addwebUser,
        method:'post',
        data:params
    })
}
// 添加的时候 手机号码查重
export async function queryrepeat(params) {
    return request({
        url: `${agentInfoQuery}/?${qs.stringify(params)}`,
        method: "get",
    })
}
// 添加的时候 手机号码查重(个人)
export async function queryrepeatpersonal(params) {
    return request({
        url: `${repeatPersonal}/?${qs.stringify(params)}`,
        method: "get",
    })
}
