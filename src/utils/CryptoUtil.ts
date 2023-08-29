// @ts-ignore
import CryptoJS from 'crypto-js'

// 默认的 KEY 与 iv 如果没有给
const KEY = CryptoJS.enc.Utf8.parse('0000001728397354')
const IV = CryptoJS.enc.Utf8.parse('c2effmldhkl6m4vu')

/**
 * AES加密 ：字符串 key iv  返回base64
 */
export function Encrypt(word: any, keyStr?: any, ivStr?: any) {
    let key = KEY
    let iv = IV
    if (keyStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr)
        iv = CryptoJS.enc.Utf8.parse(ivStr)
    }
    const src = CryptoJS.enc.Utf8.parse(word)
    const encrypted = CryptoJS.AES.encrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    })
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext)
}

/**
 * AES 解密 ：字符串 key iv  返回base64
 *
 * @return {string}
 */
export function Decrypt(word: any, keyStr?: any, ivStr?: any) {
    let key = KEY
    let iv = IV

    if (keyStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr)
        iv = CryptoJS.enc.Utf8.parse(ivStr)
    }

    const base64 = CryptoJS.enc.Base64.parse(word)
    const src = CryptoJS.enc.Base64.stringify(base64)

    const decrypt = CryptoJS.AES.decrypt(src, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.ZeroPadding
    })

    return CryptoJS.enc.Utf8.stringify(decrypt)
}
