import { request, config } from "utils";

const { api } = config;
const { userBankCard,commonBank} = api;
export async function query(params) {
    return request({
        url: userBankCard,
        method: "get",
        data: params
    });
}
export async function create(params) {
    return request({
        url: userBankCard,
        method: "post",
        data: params
    });
}
export async function update(params) {
    return request({
        url: userBankCard,
        method: "put",
        data: params
    });
}
export async function remove(params) {
    return request({
        url: `${userBankCard}/${params.id}`,
        method: "delete",
        data: params
    });
}
export async function queryBank(params) {
    return request({
        url: commonBank,
        method: 'get',
        data: params,
    })
}
