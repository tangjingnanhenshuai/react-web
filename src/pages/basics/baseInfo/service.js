import {request,config} from "utils"

const {api} =config
const {baseInfo} = api
export async function query(params) {
    return request({
        url:`${baseInfo}`,
        method:'get',
        // data:params
    })
}
export async function create(params) {
    return request({
        url:baseInfo,
        method:'post',
        data:params
    })
}
export async function update(params) {
    return request({
        url:baseInfo,
        method:'put',
        data:params
    })
}
export async function remove(params) {
    return request({
        url:baseInfo,
        method:'delete',
        data:params
    })
}
