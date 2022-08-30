import axios from 'axios'
import router from "../router/index"
import {config} from '../interface/httpType'

export default function request(config:config) {
  // 创建axios的实例
  const instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 10000,
    headers:{
      "Content-Type":"application/x-www-form-urlencoded; charset=utf-8"
    }
  })
  // 请求拦截器
  instance.interceptors.request.use(function (config) {
    console.log('请求发出前拦截器')
    return config;
  }, function (error) {
    console.log('请求发出前拦截器出现了错误')
    return Promise.reject(error);
  });

  // 响应拦截器配置
  instance.interceptors.response.use(function (response) {
    console.log('响应拦截器')
    // console.log(response)
    // const { authorization } = response.headers
    // console.log(authorization)
    // authorization && localStorage.setItem('token', authorization)
    return response;
  }, function (error) {
    console.log('响应拦截器出现了错误')
    switch(error.response.status){
      case 401:
        console.log('无权访问')
        router.push({path:'/login'})
        break
      case 403:
        console.log('token过期')
        router.push({path:'/login'})
        break
      case 404:
        console.log('404')
        break
      default:
        return Promise.reject(error);
    }
  });
  return instance(config)
}



