import axios, {type AxiosRequestConfig} from "axios";
import {ElMessage} from 'element-plus'
import {useAuthStore} from "@/stores/auth";

axios.defaults.baseURL = "http://localhost:9010";
axios.defaults.timeout = 20 * 1000;
axios.defaults.maxBodyLength = 5 * 1024 * 1024;
axios.defaults.withCredentials = true

axios.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    const authStore = useAuthStore();
    if (authStore.hasToken){
      config.params = {
        ...config.params,
        AuthUserName:authStore.userName,
        Authorization:authStore.token,
        t: Date.now(),
      }
    }else {
      config.params = {
        ...config.params,
        t: Date.now(),
      }
    }
    return config;
  },
  function (error) {
    console.log(error)
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response) => {
    const authStore = useAuthStore();
    const res : Response = response.data
    // 后台错误通过，状态码返回
    if (response.status !== 200) {
      // 401:未登录;
      if (response.status === 401) {
        ElMessage({
          message: '你已被登出，体验更多内容，请重新登录',
          type: 'error',
          duration: 3 * 1000
        })
        authStore.setAuth(false)
      }else {
        ElMessage({
          message: '后台服务异常，请联系系统管理员：' + response.status,
          type: 'error',
          duration: 3 * 1000
        })
      }
      return Promise.reject('error')
    }
    // 业务异常
    if (res == null || res.code != 200){
      ElMessage({
        message: res == null ? "后端响应为空" : res.msg,
        type: 'error',
        duration: 3 * 1000
      })
      console.log('业务异常状态码:'+ (res == null ? "后端响应为空" : res.code))
    }
    return response.data;
  },
  function (error) {
    console.log('err' + error)// for debug
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 3 * 1000
    })
    return Promise.reject(error);
  }
);

interface Http {
  get<T>(url: string, params?: unknown): Promise<Response>;

  post<T>(url: string, params?: unknown): Promise<Response>;

  upload<T>(url: string, params: unknown): Promise<Response>;

  put<T>(url: string, params: unknown): Promise<Response>;

  delete<T>(url: string, params: unknown): Promise<Response>;

  download(url: string): void;
}

export interface Response{
  /**
   * 状态码
   */
  code:number;

  /**
   * 信息
   */
  msg:string;

  /**
   * 数据
   */
  data:unknown;
}

const http: Http = {
  get(url, params){
    return axios.get(url, {params})
  },

  post(url, params) {
    return axios.post(url, params);
  },

  put(url, params) {
    return axios.put(url, JSON.stringify(params));
  },

  delete(url, params) {
    return axios.delete(url, {params})
  },

  upload(url, file) {
    return axios.post(url, file, {headers: {"Content-Type": "multipart/form-data"}});
  },

  download(url) {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    iframe.onload = function () {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  },
};

export default http;
