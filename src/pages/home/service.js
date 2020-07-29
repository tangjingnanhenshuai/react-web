
import { request, config } from "utils";

const { api } = config;
const { agentAccount ,homeVideo } = api;
// const { userBankCard, commonBank, bankCard } = api

export async function queryAccount(params) {//获取余额
    return request({
        url: `${homeVideo}`,
        method: "get",
        data: params
    });
}

