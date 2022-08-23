import request from '../util/request'

const http = {
  get(url: string, params?: object){
    const config = {
      method:'get',
      url:url,
      params:{}
    }
    if(params) config.params = params
    return request(config)
  },
  post(url: string, params?: object){
    const config = {
      method:'post',
      url:url,
      params:{}
    }
    if(params) config.params = params
    return request(config)
  },
  put(url: string, params?: object){
    const config = {
      method:'put',
      url:url,
      params:{}
    }
    if(params) config.params = params
    return request(config)
  },
  delete(url: string, params?: object){
    const config = {
      method:'delete',
      url:url,
      params:{}
    }
    if(params) config.params = params
    return request(config)
  }
}

export default http