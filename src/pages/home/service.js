
import { request, config } from "utils";

const { api } = config;
const { agentAccount, dataCount, userData, tendencyChat, ranking, agentAccountTotal, tendecyMonth, bankCard, codeMobile, agentCash} = api;
// const { userBankCard, commonBank, bankCard } = api
export async function queryMonth(param) {
      return request({
         url:tendecyMonth,
         method:"get",
         data:param
      })
  }
export async function queryIncome(params) { 
    return request({
        url:agentAccountTotal,
        method:"get",
        data:params
    })
 }

export async function queryRanking(params){ // 首页-- 消费排名
   return request({
       url:ranking,
       method:"get",
       data:params
   })
}

export async function queryAccount(params) {//获取余额
    return request({
        url: `${agentAccount}`,
        method: "get",
        data: params
    });
}
export async function queryDataCount(params) {//获取业务数据
    return request({
        url: `${dataCount}`,
        method: "get",
        data: params
    });
}
export async function queryUserData(params) {//获取用户数据
    return request({
        url: `${userData}`,
        method: "get",
        data: params
    });
}
export async function queryTendencyChat(params) {//获取趋势图数据
    return request({
        url: `${tendencyChat}`,
        method: "get",
        data: params
    });
}
export async function create(params) {
    return request({
        url: agentAccount,
        method: "post",
        data: params
    });
}
export async function update(params) {
    return request({
        url: agentAccount,
        method: "put",
        data: params
    });
}
export async function remove(params) {
    return request({
        url: agentAccount,
        method: "delete",
        data: params
    });
}
export async function queryBank(param) {  // 获取提现功能 -- 选择银行卡
    return request({
        url: bankCard,
        method: "get",
        data: param
    })
}
export async function queryCode(param) {  // 获取提现功能 -- 获取验证码
    return request({
        url: codeMobile,
        method: "get",
        data: param
    })
}
export async function onCash(param) {  // 获取提现功能 -- 提现 提交
    return request({
        url: agentCash,
        method: "put",
        data: param
    })
}