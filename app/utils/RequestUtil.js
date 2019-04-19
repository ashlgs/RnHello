/**
 * @Description: get/post请求
 * @author han
 * @date 2019/4/9 0009
 */
const HOST = 'https://www.xueyuanwang.com/api';
export const get = function (url, headers) {
    url = HOST + url;
    return new Promise((resolve, reject) => {

        fetch(url, {
            method: 'GET',
            headers: headers,
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({status: response.status})
                }
            })
            .then(responseData => {
                resolve(responseData);
            })
            .catch(error => {
                reject(error)
            })
    })
};

export const post = function (url, data, headers) {
    url = HOST + url;
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'POST',
            headers: headers,
            body: data,
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    reject({status: response.status})
                }
            })
            .then(responseData => {
                resolve(responseData)
            })
            .catch(error => {
                reject(error)
            })
    })
};
