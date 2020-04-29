import Request from '@/utils/request.js';
export function getCode(data) {
    return new Promise((resolve, reject) => {
        Request({
            url: 'api/manageTool/captcha',
            method: 'get',
            data: data,
            success(res) {
                resolve(res);
            },
            fail(res) {
                reject(res);
            }
        })
    })
}
export function login(data) {
    return new Promise((resolve, reject) => {
        Request({
            url: 'api/manageTool/login',
            method: 'get',
            data: data,
            success(res) {
                resolve(res);
            },
            fail(res) {
                reject(res);
            }
        })
    })
}