import { request, config } from "utils";

const { api } = config;
const { vipOrder } = api;
export async function query(params) {
    return request({
        url: vipOrder,
        method: "get",
        data: params
    });
}
export async function create(params) {
    return request({
        url: vipOrder,
        method: "post",
        data: params
    });
}
export async function update(params) {
    return request({
        url: vipOrder,
        method: "put",
        data: params
    });
}
export async function remove(params) {
    return request({
        url: vipOrder,
        method: "delete",
        data: params
    });
}
