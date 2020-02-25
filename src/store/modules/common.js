import { GetCategory } from "@/api/news";
//七牛云地址
const state = {
    qiniuUrl: 'http://www-web-jshtml-cn-idva7mx.web-jshtml.cn/',
}
const getters = {
    qiniuUrl: state => state.qiniuUrl
}
const actions = {  // 可以回调处理事情 
    getInfoCategory(content, repuestData) {
        return new Promise((resolve, reject) => {
            GetCategory({}).then((response) => {
                resolve(response.data.data.data)
            }).catch(error => {
                reject(error)
            })
        })
    }
}


export default {
    namespaced: true,
    state,
    actions,
    getters
};
