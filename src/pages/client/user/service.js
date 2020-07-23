import {request,config} from "utils"

const {api} =config
const { appUserInfo, userMobile} = api
export async function query(params) {
    return request({
        url: userMobile,
        method:'get',
        data:params
    })
}
export async function create(params) {
    return request({
        url: userMobile,
        method:'post',
        data:params
    })
}
export async function update(params) {
    return request({
        url: userMobile,
        method:'put',
        data:params
    })
}
export async function remove(params) {
    return request({
        url: userMobile,
        method:'delete',
        data:params
    })
}
