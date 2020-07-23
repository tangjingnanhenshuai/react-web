import { request, config } from "utils";

const { api } = config;
const { agentAccountRecord , AgentRecord} = api;
export async function query(params) {
    return request({
        url: AgentRecord,
        method: "get",
        data: params
    });
}
export async function create(params) {
    return request({
        url: AgentRecord,
        method: "post",
        data: params
    });
}
export async function update(params) {
    return request({
        url: AgentRecord,
        method: "put",
        data: params
    });
}
export async function remove(params) {
    return request({
        url: AgentRecord,
        method: "delete",
        data: params
    });
}
