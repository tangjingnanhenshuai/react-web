import { request, config } from "utils";

const { api } = config;
const { vipOrder, userTopups} = api;
export async function query(params) {
    return request({
        url: userTopups,
        method: "get",
        data: params
    });
}
export async function create(params) {
    return request({
        url: userTopups,
        method: "post",
        data: params
    });
}
export async function update(params) {
    return request({
        url: userTopups,
        method: "put",
        data: params
    });
}
export async function remove(params) {
    return request({
        url: userTopups,
        method: "delete",
        data: params
    });
}
