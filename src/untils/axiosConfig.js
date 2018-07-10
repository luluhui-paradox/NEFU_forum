'use strict'

import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {    // 这里的config包含每次请求的内容
  //config.headers.accept
  // 判断localStorage中是否存在api_token
  if (sessionStorage.getItem('token')) {
    //  存在将api_token写入 request header,需要格式化字符串
    config.headers.Authorization=JSON.parse(sessionStorage.getItem('token'));
  }
  return config;
}, err => {
  return Promise.reject(err);
});

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
});

function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 ||
    response.status === 400||response.status===201)) {
    return response
  }
  if (response.status===401){
    this.$store.dispatch("logout")
  }
  //
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: ''
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    alert(res.msg)
  }
  if (res.data && (!res.data.success)) {
    // alert(res.data.error_msg)
  }
  return res
}
export default axios;

// 请求方式的配置
// export default {
//   post (url, data) {  //  post
//     return axios({
//       method: 'post',
//       baseURL: '/backapis',
//       url,
//       data: JSON.stringify(data),
//       timeout: 5000,
//       headers: {
//         'X-Requested-With': 'XMLHttpRequest',
//         'Content-Type': 'application/json; charset=UTF-8'
//       }
//     }).then(
//       (response) => {
//         return checkStatus(response)
//       }
//     ).then(
//       (res) => {
//         return checkCode(res)
//       }
//     )
//   },
//   get (url, params) {  // get
//     return axios({
//       method: 'get',
//       baseURL: '/backapis',
//       url,
//       params, // get 请求时带的参数
//       timeout: 5000,
//       headers: {
//         'X-Requested-With': 'XMLHttpRequest'
//       }
//     }).then(
//       (response) => {
//         return checkStatus(response)
//       }
//     ).then(
//       (res) => {
//         return checkCode(res)
//       }
//     )
//   }
// }
