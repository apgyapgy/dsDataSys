import Request from '@/utils/request.js';
export function getTaskList(data) {
    return new Promise((resolve, reject) => {
        Request({
            url: 'api/manageTool/getTaskList',
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