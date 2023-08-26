import axios, {type AxiosRequestConfig} from "axios";
import {ElMessage, ElMessageBox} from 'element-plus'
import {useAuthStore} from "@/stores/auth";

axios.defaults.baseURL = "http://localhost:9010";
axios.defaults.timeout = 20 * 1000;
axios.defaults.maxBodyLength = 5 * 1024 * 1024;
axios.defaults.withCredentials = true
const authStore = useAuthStore();

axios.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {

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
    const res = response.data
    if (response.status !== 200) {
      ElMessage({
        message: res.message,
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject('error')
    }
    if (res.code != 200){
      // 401:未登录;
      if (res.code === 401) {
        ElMessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //TODO 跳转到登陆页面


        })
      }
      return Promise.reject('error')
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
  get<T>(url: string, params?: unknown): Promise<T>;

  post<T>(url: string, params?: unknown): Promise<T>;

  upload<T>(url: string, params: unknown): Promise<T>;

  put<T>(url: string, params: unknown): Promise<T>;

  delete<T>(url: string, params: unknown): Promise<T>;

  download(url: string): void;
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {params})
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },

  post(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },

  put(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .put(url, JSON.stringify(params))
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },

  delete(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .delete(url, {params})
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },

  upload(url, file) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, file, {
          headers: {"Content-Type": "multipart/form-data"},
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
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
