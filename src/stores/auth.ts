import { defineStore } from 'pinia'
export const useAuthStore = defineStore('useAuthStore', {
    state: () => {
        return {
            isLogin:false,
            token: '' as string,
            userName: '' as string,
            userInfo: {}
        }
    },
    getters: {
        hasToken():boolean{
            return this.isLogin;
        },
        getToken():string{
            return this.token;
        }
    },
    actions: {
        // actions 同样支持异步写法
        setToken(token:string) {
            // 可以通过 this 访问 state 中的内容
            this.token = token;
        },
        setUserName(userName:string) {
            this.userName = userName;
        },
        setUserInfo(userInfo:any) {
            this.userInfo = userInfo;
        },
        setLogin(isLogin:boolean){
            this.isLogin = isLogin;
        }
    },
    persist: {
        storage: window.sessionStorage
    }
})
