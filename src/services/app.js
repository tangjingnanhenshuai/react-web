import { request, config } from 'utils'
import qs from "qs"
const { api } = config
const { user, userLogout, userLogin ,userResetPwd} = api

export function login (params) {
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

export function logout (params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export function query (params) {
  // return request({
  //   url: "user",
  //   method: 'get',
  //   data: params,
  // })
  return true
}

export function resetPwd (params) {
  return request({
    url: `${userResetPwd}?oldPassword=${params.oldPassword}&newPassword=${params.newPassword}`,
    method: 'put',
  })
}
