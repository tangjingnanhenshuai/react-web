import { request, config } from 'utils'

const { api } = config
const { userBankCard, commonBank , bankCard } = api

export async function query(params) {
    return request({
        url: bankCard,
        method: 'get',
        data: params
    })
}

export async function create(params) {
    return request({
        url: userBankCard,
        method: 'post',
        data: params
    })
}

export async function remove(params) {
    return request({
        url: `${userBankCard}/${params.id}`,
        method: 'delete',
    })
}


export async function update(params) {
    return request({
        url: userBankCard,
        method: 'put',
        data: params
    })
}

//输入银行卡--获取银行名
export async function queryBank(params) {
    return request({
        url: commonBank,
        method: 'get',
        data: params,
    })
}

//根据省  市 银行名称 查询支行列表
export async function querySubbranch(params) {
    return request({
        url: commonBank + '/subbranch',
        method: 'get',
        data: params,
    })
}
