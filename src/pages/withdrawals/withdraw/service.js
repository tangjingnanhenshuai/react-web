import { request, config } from "utils";

const { api } = config;
const { agentAccountRecord ,AgentRecord ,Withdrawals} = api;
export async function query(params) {
    return request({
        url: Withdrawals,
        method: "get",
        data: params
    });
}
export async function create(params) {
    return request({
        url: Withdrawals,
        method: "post",
        data: params
    });
}
export async function update(params) {
    return request({
        url: Withdrawals,
        method: "put",
        data: params
    });
}
export async function remove(params) {
    return request({
        url: Withdrawals,
        method: "delete",
        data: params
    });
}
