import http from "@/utils/http";
import {Encrypt} from "@/utils/CryptoUtil";

// 登陆
export async function apiUserLogin(userName:string, password:string){
    // 密码加密
    let pwd = Encrypt(password)
    return await http.get("/auth/user/jwtLogin", {username:userName, password:pwd})
}
// 获取验证码
export async function apiGetVerifyCode(email:string){
    return await http.get("/auth/user/getCode", {email:email})
}
// 注册
export async function apiUserRegister(userName:string, email:string , password:string, code:string){
    // 密码加密
    let pwd = Encrypt(password)
    return await http.post("/auth/user/register", {userName:userName, userPwd:pwd, mail:email, code:code})
}
